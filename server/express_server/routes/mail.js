const express = require("express");
const router = express.Router();
const userModel = require("../models/user");
const userDetailsModel = require("../models/userDetails");
const pacientModel = require("../models/pacient");
const appointment = require("../models/appointment");
const sendMail = require("../scripts/mail");

router.post("/send", async (req, res, next) => {
  let appointmentId = req.body.appointmentId;
  const appointmentResult = await appointment.findOne({
    where: {
      id: appointmentId,
    },
  });
  const appointmentObject = appointmentResult.dataValues; 
  const pacientResult = await pacientModel.findOne({
    where: {
      id: appointmentObject.idPacient,
    },
  });
  const userResult = await userModel.findOne({
    where: {
      id: appointmentObject.idUser,
    },
  });
  const pacientObject = pacientResult.dataValues;
  const userObject = userResult.dataValues; 
  const userDetailsResult = await userDetailsModel.findOne({
    where: {
      idDetails: userObject.idDetails,
    },
  });
  const userDetailsObject = userDetailsResult.dataValues; 
  const userDetails = userDetailsObject.details; 
  sendMail(pacientObject, userDetails, appointmentObject);
});

module.exports = router;
