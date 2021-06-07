const express = require('express');
const router = express.Router();
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
const sendController = require('../scripts/mail');

router.post('/send', async (req, res, next) => {
    let appointmentId = req.body.appointmentId
    const appointmentResult = await appointment.findOne({
      where:{
        id: appointmentId
      },
    })
    const appointmentObject = appointmentResult.dataValues
    console.log(appointmentObject)
    const pacientResult = await pacientModel.findOne({
      where:{
        id: appointmentObject.id_pacient
      },
    })
    const userResult = await userModel.findOne({
      where:{
        id: appointmentObject.id_user
      },
    })
    const pacientObject = pacientResult.dataValues
    const userObject = userResult.dataValues
    console.log(pacientObject)
    console.log(userObject)
    // sendController.sendMail()
  })

module.exports = router;