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
    let user = req.user.details.split(",")[0];
    await appointment
      .findAll({
        where: {
          state: value,
          idUser: user,
          dateBegin: {
            [Op.lt]: utils.modificateActualTime("day", +15),
            [Op.gt]: utils.modificateActualTime("day", -1),
          },
        },
        include: [
          {
            model: pacient,
          },
        ],
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

router.post(
  "/stateAndDate",
  jwtSecurity.authenticateJWT,
  async function (req, res, next) {       
    try {
      let requestBody = req.body;        
      await appointment
      .findAll({
        where: {
          state: `${requestBody.state}`, 
          idUser: req.user.details.split(",")[0],
          dateBegin: {             
            [Op.between]: [ new Date(requestBody.dateStart), new Date(requestBody.dateFinal)]
          },
        },
        include: [ { model: pacient } ],
      })
      .then((data) =>  { res.json(data); })
      .catch((err) => { 
        res.status(500).send({ message: err.message || "Failure server", });
      });
    } catch (error) {
      res.status(500).send({ message: err.message || "Failure server", });
    }   
  }
);
/**
 * This method receives state, idAppointment, dateBegin, dateFinish to
 * changue the appointment status.
 * returns mmessage 1, 0
 */
router.put(
  "/changeState",
  jwtSecurity.authenticateJWT,
  async function (req, res, next) {
    let requestBody = req.body; 
    try {
      if (requestBody.state >3 || requestBody.state<0){
        throw err;
      }
      await appointment
        .update(
          {
            state: requestBody.state,
            dateBegin: requestBody.dateBegin,
            dateFinish: requestBody.dateFinish,
          },
          { returning: true, where: { id: requestBody.id } }
        )
        .then((dbresponse) => {
          if (dbresponse[0]>0) { 
            res.send({ message: 1 });
          }else {
            res.send({message: 0});
          }
        });
    } catch (error) {
      res.sendStatus(500);
    }
  }
);

router.get("/byUser", jwtSecurity.authenticateJWT, async (req, res, next) => {
  let user = req.user.details.split(",")[0];
  try {
    if (validator.isInt(user)) {
      let appointments = await appointment.findAll({
        where: {
          idUser: user,
          state: "0",
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
    res.sendStatus(500);
  }
});
/**
 * this method creates an appoiment request
 * It only creates a request if the pacient has no associated state 0,1 appointments
 */
router.post("/setAppointment", async (req, res, next) => {
  let requestBody = req.body;
  try {
    let dateValidation =  utils.localDateRestricted(new Date(requestBody.date));
    if( dateValidation === false){
      throw err;
    }
    let pacientTmp = await pacientModel.findOne({
      where: { idCardPacient: requestBody.idCardPacient },
    });
    if (pacientTmp == null) {
      pacientTmp = await pacientModel.create(req.body);
      await pacientTmp.save();
    }
    let { count, appointmentTmp } = await appointment.findAndCountAll({
      where: {
        idPacient: pacientTmp.id,
        [Op.or]: [
          {
            state: "0",
          },
          {
            state: "1",
          },
        ],
      },
      offset: 10,
      limit: 2,
    });
    if (count > 0) {
      res.send({
        message: 2,
        infoAppointment: "Ya existe una cita a su nombre!",
      });
    } else {
      const dataTemp = {
        state: "1",
        details: {},
        idUser: requestBody.doctor,
        idPacient: pacientTmp.id,
        treatment: requestBody.treat,
        dateBegin: requestBody.date,
      };
      let appointmentNew = await appointment.create(dataTemp);
      await appointmentNew.save();

      res.send({ message: 1, infoAppointment: "Ok" });
    }
  } catch (err) { 
    res.send({ message: 0 });
  }
});

router.post("/insert", jwtSecurity.authenticateJWT, async (req, res, next) => {
  let requestBody = req.body;
  try {
    requestBody.state = 0;
    let appointmentTmp = await appointment.findOne({
      where: { idUser: requestBody.idUser, dateBegin: requestBody.date },
    });
    if (appointmentTmp == null) {
      appointmentTmp = await appointment.create(req.body);
      await appointmentTmp.save();
      res.send({ message: 1, infoAppointment: appointmentTmp });
    } else {
      res.send({ message: 2, infoAppointment: "Ya existe" });
    }
  } catch (err) { 
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
      res.send({ message: 0 });
    }
  }
);

router.get("/:id", jwtSecurity.authenticateJWT, async (req, res, next) => {
  let id = req.params.id;
  try {
    if (validator.isInt(id)) {
      let appointmentInstance = await appointment.findByPk(id);
      res.json(appointmentInstance);
    }
  } catch (error) { 
    res.sendStatus(500);
  }
});
module.exports = router;
