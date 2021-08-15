var express = require("express");
var router = express.Router();
const userModel = require("../models/user");
const userDetailsModel = require("../models/userDetails");
const pacientModel = require("../models/pacient");
const appointment = require("../models/appointment");
var validator = require("validator");
const { Op } = require("sequelize");

const jwtSecurity = require("../configs/jwtAuth.js");
const pacient = require("../models/pacient");
const utils = require("../scripts/utils");

const path = require("path");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./avatar");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage });
const { treatments } = require("../scripts/constants.js");

router.get(
  "/medicalResume",
  /*  jwtSecurity.authenticateJWT, */
  function (req, res, next) {
    res.render(`medicalResume`, { resume: {} });
  }
);

router.get("/profile", /*  jwtSecurity.authenticateJWT, */ async  (req, res, next) => { 
  res.render(`profile`, {}); 
  }
);

router.get(
  "/medicalRecord",
  /* jwtSecurity.authenticateJWT, */
  function (req, res, next) {
    
    res.render(`medicalRecord`, {});
  }
);

router.get(
  "/attention",
  /*  jwtSecurity.authenticateJWT, */
  function (req, res, next) {
    res.render(`attention`, {});
  }
);
/**
 * This router renders the principal view of the user. Which shows the appointment requests from pacients.
 */
router.get(
  "/home", function (req, res, next) { 
    res.render(`homeUser`, {});
  }
);

/**
 * This router renders the apointment acceptance view
 */
router.get(
  "/appointments/:action/:id",
  /*  jwtSecurity.authenticateJWT, */ async function (req, res, next) {
    let action = req.params.action;
    if (action === "Accept") {
      res.render(`appointmentUser`, { id: req.params.id }); //refator needed
    } else if (action === "Cancel") {
      await appointment
        .update(
          { state: "3" },
          { returning: true, where: { id: req.params.id } }
        )
        .then((dbresponse) => {
          if (dbresponse) {
            res.send({ message: 1 });
          } else {
            res.send({ message: 0 });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Database failure.",
          });
        });
    } else if (action === "Completed") {
      await appointment
        .update(
          { state: "2" },
          { returning: true, where: { id: req.params.id } }
        )
        .then((dbresponse) => {
          if (dbresponse) {
            res.send({ message: 1 });
          } else {
            res.send({ message: 0 });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Database failure.",
          });
        });
    }
  }
);

router.post("/", jwtSecurity.authenticateJWT, function (req, res, next) {
  res.send({ message: "Tu estas autorizado" });
});

/*  
 POST METHODS  
*/
/**
 * This method update the user details
 */
router.post(
  "/formProfile",
  /*upload.single("pictureUrl"),*/
  jwtSecurity.authenticateJWT,
  async (req, res, next) => {
    let requestBody = req.body;
    console.log(requestBody);
    let dict = {
      name: requestBody.name,
      age: requestBody.age,
      phone: requestBody.phone,
      recognitions: [requestBody.recognitions],
      university: requestBody.university,
      frase: requestBody.frase,
    };
    await userModel
      .findOne({
        where: { username: req.user.user },
      })
      .then((doc) => {
        if (doc) {
          userDetailsModel
            .update(
              {
                identityCard: requestBody.identityCard,
                address: requestBody.address,
                speciality: requestBody.speciality,
                details: dict,
                /*pictureUrl: req.file.path,*/
              },
              { returning: true, where: { idDetails: doc.idDetails } }
            )
            .then((dbresponse) => {
              if (dbresponse) {
                res.send({ message: 1 });
              } else {
                res.send({ message: 0 });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Database failure.",
              });
            });
        } else {
          res.send({ message: 0 });
        }
      });
  }
);
/**
 * This method updates the user profile picture
 */
router.post(
  "/formPictureProfile",
  upload.single("pictureUrl"),
  jwtSecurity.authenticateJWT,
  async (req, res, next) => {
    await userModel
      .findOne({
        where: { username: req.user.user },
      })
      .then((doc) => {
        if (doc) {
          userDetailsModel
            .update(
              {
                pictureUrl: req.file.path,
              },
              { returning: true, where: { idDetails: doc.idDetails } }
            )
            .then((dbresponse) => {
              if (dbresponse) {
                res.send({ message: 1 });
              } else {
                res.send({ message: 0 });
              }
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Database failure.",
              });
            });
        } else {
          res.send({ message: 0 });
        }
      });
  }
);

/***
 * This method filter the medical appointments that had been succesful completed (code 2)
 */

router.post("/medicalResume", jwtSecurity.authenticateJWT, async (req, res, next) => {
  try {
    let requestBody = req.body;
    const medicalResume = await appointment.findAll({
      attributes: ["id", "dateBegin", "state"],
      where: {
        state : "2",
        [Op.or]: [
          {
            "$pacient.id_card_pacient$": {
              [Op.like]: requestBody.filterMedicalResume,
            },
          },
          {
            "$pacient.name_pacient$": {
              [Op.like]: requestBody.filterMedicalResume,
            },
          },
          {
            "$pacient.email_pacient$": {
              [Op.like]: requestBody.filterMedicalResume,
            },
          },
        ],
      },
      include: [
        {
          model: pacient,
          attributes: ["namePacient", "lastnamePacient"],
        },
      ],
    });
    for (element in medicalResume) {
      /*
      let dateAppointment = new Date();
      dateAppointment.setTime(Date.parse(medicalResume[element].dateBegin));
      var dateToJson = dateAppointment.getDay() + " ";
      dateToJson = utils.addNameMonth(dateAppointment, dateToJson);
      dateToJson += " " + dateAppointment.getFullYear();
      medicalResume[element].dateBegin = dateToJson;*/
      
      var fullName =
      medicalResume[element]["pacient.namePacient"] +
      " " +
      medicalResume[element]["pacient.lastnamePacient"];
      delete medicalResume[element]["pacient.namePacient"];
      delete medicalResume[element]["pacient.lastnamePacient"];
      medicalResume[element]["nombrePaciente"] = fullName;  
    }
    res.send(medicalResume);
  } catch (error) {
    // deberia ser este formato res.send({ message: 0 });
    res.sendStatus(500);
  }
});

//jwtSecurity.authenticateJWT,
router.post("/medicalResume/details", async (req, res, next) => {
  try {
    let requestBody = req.body;
    const detalles = await appointment.findOne({
      /*attributes: ["details"],*/
      where: {
        id: requestBody.idAppointment,
      },
    });
    res.send(detalles);
  } catch (error) { 
    res.sendStatus(500);
  }
});
//¿Donde se usa?
router.get("/all", jwtSecurity.authenticateJWT, async (req, res, next) => {
  try {
    const users = await userModel.findAll({
      attributes: { exclude: ["password"] },
      include: [userDetailsModel],
    });
    res.send(users);
  } catch (error) { 
    res.sendStatus(500);
  }
});

router.get(
  "/allAppoinment",
  jwtSecurity.authenticateJWT,
  async (req, res, next) => {
    try {
      const users = await userModel.findAll({
        attributes: { exclude: ["password"] },
      });
      res.send(users);
    } catch (error) { 
      res.sendStatus(500);
    }
  }
);
//validar que solo se muestren ls doctores con true, y hacder include para sacar name y apellido
router.get("/allDoctors", async (req, res, next) => {
  try {
    const users = await userModel.findAll({
      attributes: { exclude: ["password"] },
      where: {
        active: true,
      },
      include: [
        {
          model: userDetailsModel,
          attributes: ["details"],
        },
      ],
    });
    res.send(users);
  } catch (error) { 
    res.sendStatus(500);
  }
});
/**
 * This method returns an array of treatments
 */
router.get("/allTreatments", async (req, res, next) => {
  try {
    res.send(treatments);
  } catch (error) { 
    res.sendStatus(500);
  }
});
/**
 * This method search and returns a doctor per id
 */
router.get("/:id", jwtSecurity.authenticateJWT, async (req, res, next) => {
  try {
    if (validator.isInt(req.params.id)) {
      let userTmp = await userModel.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["password"] },
      });
      res.json(userTmp);
    }
  } catch (error) { 
    res.sendStatus(500);
  }
});
/**
 * This method recieve the pacient detail and asociate it to the
 * actual approved state appointment asigned to it id
 * Note: it does not change the state of the appointment. 
 */
router.post("/setRecord", async (req, res, next) => {
  let requestBody = req.body;
  let dict = {
    reason: requestBody.reason,
    enfermedad: requestBody.enfermedad,
    embarazo: requestBody.embarazo,
    alergiaAntibiotico: requestBody.alergiaAntibiotico,
    alergiaAnestesia: requestBody.alergiaAnestesia,
    hemorragias: requestBody.hemorragias,
    SIDA: requestBody.SIDA,
    asma: requestBody.asma,
    diabetes: requestBody.diabetes,
    hipertension: requestBody.hipertension,
    tuberculosis: requestBody.tuberculosis,
    enfermedadCardiaca: requestBody.enfermedadCardiaca,
    otraenfermdad: requestBody.otraenfermdad,
    presion: requestBody.presion,
    frecuenciac: requestBody.frecuenciac,
    frecuenciar: requestBody.frecuenciar,
    temperatura: requestBody.temperatura,
    diagnostico: requestBody.diagnostico,
    tratamiento: requestBody.tratamiento,
  };
  try {
    const appointmentData = await pacientModel.findAll({
      where: {
        [Op.and]: [
          {
            idCardPacient: requestBody.idCardPacient,
          },
          {
            "$appointments.state$" : '0',
          }
        ], 
        
      },
      include:  [ 
        {
        model: appointment
        }
      ],
    });
    
    await pacientModel.update(
      {
        detailsPacient: dict,
        active: true,
      },
      { where: { idCardPacient: requestBody.idCardPacient } }
    );
    await appointment.update(
      {
        details: dict,
      },
      {
        where: { id: appointmentData[0].appointments[0].id}
      }
    )
  } catch (err) { 
    res.send({ message: 0 });
  }
  res.send({ message: 1 });
});
/**
 * this method returns the data of a user by his username
 */
router.get("/byUser/data", jwtSecurity.authenticateJWT, async (req, res, next) => {
  let user = req.user.details.split(",")[0];
  try {
    if (validator.isInt(user)) {
      let userData = await userModel.findAll({
        attributes: {exclude: ["password"]},
        where: {
          id: user,
        },
        include: [
          {
            model: userDetailsModel,
          },
        ],
      });
      res.json(userData[0]);
    }
  } catch (error) { 
    res.send({message: 0});
  }
});

/**
 * This method validates if a view has a valid token
 */
 router.get(
  "/check/credentials",
   jwtSecurity.authenticateJWT,  function (req, res, next) {
    res.send({message:1});
  }
);

module.exports = router;
