var express = require("express");
var router = express.Router();
const jwtSecurity = require("../configs/jwtAuth.js");
const pacientModel = require("../models/pacient");
const appointment = require("../models/appointment");
var validator = require("validator");
const { Op } = require("sequelize");
const utils = require("../scripts/utils.js");
const pacient = require("../models/pacient");

/**
 * This router returns appointments per state
 */
router.get(
  "/state/:state",
  jwtSecurity.authenticateJWT,
  async function (req, res, next) {
    let value = req.params.state;
    let user = req.cookies.idUser.split(",")[0];
    await appointment
      .findAll({
        where: {
          state: value,
          id_user: user.slice(1),
        },
        include: [
          {
            model: pacient,
            attributes: ["name_pacient", "lastname_pacient", "id_card_pacient"],
          },
        ],
        raw: true,
      })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Database failure.",
        });
      });
  }
);
/**
 * This method receives state, idAppointment, dateBegin, dateFinish to 
 * changue the appointment status.
 * returns mmessage 1, 0
 */
router.put("/changeState", jwtSecurity.authenticateJWT,  async function (req, res, next) {
  let requestBody = req.body;
  try{
    await appointment.update(
      {state: requestBody.state,
       dateBegin: requestBody.dateBegin,
       dateFinish: requestBody.dateFinish,
      },
      {returning: true, where: {id: requestBody.id}}
    ).then((dbresponse) => {
      if(dbresponse) {
        res.send({message: 1});
      }
    })
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get(
  "/byUser",
  jwtSecurity.authenticateJWT,
  async (req, res, next) => {
    let user = req.cookies.idUser.split(",")[0];
    try {
      if (validator.isInt(user.slice(1))) {
        let appointments = await appointment.findAll({
          where: {
            id_user: user.slice(1),
            state: '0',
            dateBegin: {
              [Op.lt]: utils.modificateActualTime("day", +15),
              [Op.gt]: utils.modificateActualTime("day", -1),
            },
          },
          include: [
            {
              model: pacientModel,
            },
          ],
        });
        res.json(appointments);
      }
    } catch (error) {
      console.log("Error en recuperacion de datos",error);
      res.sendStatus(500);
    }
  }
);
/**
 * this method creates an appoiment request
 * It only creates a request if the pacient has no associated state 0,1 appointments
 */
router.post("/setAppointment", async (req, res, next) => {
  let requestBody = req.body;
  try {
    let pacient = await pacientModel.findOne({
      where: { id_card_pacient: requestBody.id_card_pacient },
    });
    if (pacient == null) {
      pacient = await pacientModel.create(req.body);
      await pacient.save();
    }
    let {count, appointmentTmp} = await appointment.findAndCountAll({
      where: { 
        id_pacient: pacient.id, 
        [Op.or]: [
          {
            state: '0'
          },
          {
            state: '1'
          },
        ] 
      },
      offset: 10,
      limit: 2
    });
    if (count > 0) {
      res.send({
        message: 2,
        infoAppointment: "Ya existe una cita a su nombre!",
      });
    } else {
      let date =new Date(requestBody.date).setUTCHours(12);
      const dataTemp = {
        state: "1",
        details: {},
        id_user: requestBody.doctor,
        id_pacient: pacient.id,
        treatment: requestBody.treat,
        dateBegin: new Date(date),
      };
      let appointmentNew = await appointment.create(dataTemp);
      await appointmentNew.save();
      
      res.send({ message: 1, infoAppointment: "Ok" });
    }
  } catch (err) {
    console.log("Error en guardar cita",err);
    res.send({ message: 0 });
  }
});

router.post("/insert", jwtSecurity.authenticateJWT, async (req, res, next) => {
  let requestBody = req.body;
  try {
    requestBody.state = 0;
    let appointmentTmp = await appointment.findOne({
      where: { id_user: requestBody.id_user, dateBegin: requestBody.date },
    });
    if (appointmentTmp == null) {
      appointmentTmp = await appointment.create(req.body);
      await appointmentTmp.save();
      res.send({ message: 1, infoAppointment: appointmentTmp });
    } else {
      res.send({ message: 2, infoAppointment: "Ya existe" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: 0 });
  }
});

router.delete(
  "/delete",
  jwtSecurity.authenticateJWT,
  async (req, res, next) => {
    let requestBody = req.body;
    try {
      await appointment.destroy({
        where: {
          id: requestBody.id,
        },
      });
      res.send({ message: 1, messageHuman: "Borrado exitoso" });
    } catch (err) {
      console.log("Error en borrar cita",err);
      res.send({ message: 0 });
    }
  }
);


module.exports = router;
