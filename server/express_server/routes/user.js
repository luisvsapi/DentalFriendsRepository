var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
var validator = require('validator')
const { Op } = require("sequelize")

const jwtSecurity = require('../configs/jwtAuth.js')
const user = require('../models/user')
const pacient = require('../models/pacient')
const utils = require('../scripts/utils')

const path = require('path')
const multer = require('multer')

let storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, './avatar')
  },
  filename:(req, file, cb)=>{
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({storage})
const {treatments} = require("../scripts/constants.js")
 
router.get('/medicalResume', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.render(`medicalResume`, {resume: {}})
})

router.get('/profile', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.render(`profile`, {})
})

router.get('/medicalRecord', jwtSecurity.authenticateJWT, function (req, res, next) {
   res.render(`medicalRecord`, {})
})

router.get('/attention', jwtSecurity.authenticateJWT, function (req, res, next) { 
  res.render(`attention`, {})
})
/**
 * This router renders the principal view of the user. Which shows the appointment requests from pacients.
 */
router.get('/home', jwtSecurity.authenticateJWT, function (req,res,next){
  res.render(`homeUser`,{})
})

/**
 * This router renders the apointment acceptance view
 */
router.get('/appointments/:action/:id', jwtSecurity.authenticateJWT, async function (req, res, next) {
  let action = req.params.action;
  if(action === 'Accept'){
    res.render(`appointmentUser`, {id: req.params.id})
  }else if (action === 'Cancel' ){
    let appointmentInstance =await appointment.update(
      {state: '3'},
      {returning: true, where:{id: req.params.id} } 
    ).then(dbresponse => {
      if(dbresponse){
        res.send({message:1})  
      }else{
        res.send({message:0})
      }
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Database failure."
      })
    }) 
  } 
})

router.post('/', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.send({ message: 'Tu estas autorizado' })
})

/* 
 * -------------------------------------------------------------------------------------------------
 POST METHODS 
 * -------------------------------------------------------------------------------------------------
*/

router.post('/formProfile', upload.single('picture_url') , jwtSecurity.authenticateJWT , async (req, res, next) => { //cambio a put, prueba
  console.log(req.file)
  let requestBody = req.body
  let dict = {
    "birthday": requestBody.birth,
    "age": requestBody.age,
    "phone": requestBody.phone,
    "recognitions": [requestBody.recog],
    "university": requestBody.school,
    "frase": requestBody.phrase
  }
  const doctor =  await userModel.findOne({
    where: {user_name: req.cookies.user},
    raw: true
  }).then(doc => {
    if(doc){
      userDetailsModel.update(
        {identity_card: requestBody.idCard,
          address: requestBody.address,
          speciality: requestBody.degree,
          details: dict,
          picture_url:  req.file.path},
        {returning: true, where:{id_details: doc.id_details} } 
      ).then(dbresponse => {
        if(dbresponse){
          res.send({message:1})  
        }else{
          res.send({message:0})
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Database failure."
        })
      }) 
    }else{
      res.send({message:0})
    }
  })
  
})

//jwtSecurity.authenticateJWT,
router.post('/medicalResume',  async (req, res, next) => {
  try {
    let requestBody = req.body
    const medicalResume = await appointment.findAll({
      attributes: ['id', 'dateBegin',],
      where: {
        [Op.or]:[
          {'$pacient.id_card_pacient$':{
            [Op.like]: requestBody.filterMedicalResume,  
          }},
          {'$pacient.name_pacient$':{
            [Op.like]: requestBody.filterMedicalResume,
          }},
          {'$pacient.email_pacient$':{
            [Op.like]: requestBody.filterMedicalResume,
          }},
        ],
      },
      include: [{
        model: pacient,
        attributes: [ 'name_pacient', 'lastname_pacient']
      }],
      raw: true,
    }) 
    for (element in medicalResume){
      let dateAppointment = new Date();
      dateAppointment.setTime(Date.parse(medicalResume[element].dateBegin));
      var dateToJson = dateAppointment.getDay() + " "
      dateToJson = utils.addNameMonth(dateAppointment, dateToJson)      
      dateToJson += " "+dateAppointment.getFullYear()
      medicalResume[element].dateBegin = dateToJson
      var fullName = medicalResume[element]['pacient.name_pacient']+" "+medicalResume[element]['pacient.lastname_pacient']
      delete medicalResume[element]['pacient.name_pacient']
      delete medicalResume[element]['pacient.lastname_pacient']
      medicalResume[element]['nombrePaciente'] = fullName
    } 
    res.send(medicalResume)
  } catch (error) {
    console.log("\nError en medicalResume:",error)
    res.sendStatus(500)
  }
})

//jwtSecurity.authenticateJWT,
router.post('/medicalResume/details', async (req, res, next) => {
  try {
    let requestBody = req.body
    const detalles = await appointment.findOne({
      attributes: ['details'],
      where:{
        id: requestBody.idAppointment
      },
    })
    res.send(detalles)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/all', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }, 
      include: [userDetailsModel]}) 
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allAppoinment', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }})
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allDoctors', async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }})
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allTreatments', async (req, res, next) => {
  try {
    res.send(treatments)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/:id', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    if(validator.isInt(req.params.id)){
      let userTmp = await userModel.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } })
      res.json(userTmp)
    } 
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  } 
})

router.post('/formRecord',jwtSecurity.authenticateJWT , async (req, res, next) => { //cambio a put, prueba
  console.log(req.file);
  let requestBody = req.body;
  let dict = {
    "reason": requestBody.reason,
    "enfermedad": requestBody.enfermedad,
    "embarazo": requestBody.embarazo,
    "alergiaAntibiotico": requestBody.antecedente1,
    "alergia Anestesia": requestBody.antecedente2,
    "hemorragias": requestBody.antecedente3,
    "SIDA": requestBody.antecedente4,
    "asma": requestBody.antecedente5,
    "diabetes": requestBody.antecedente6,
    "hipertension": requestBody.antecedente7,
    "tuberculosis": requestBody.antecedente8,
    "otraenfermdad": requestBody.otraenfermdad,
    "presion": requestBody.presion,
    "frecuenciac": requestBody.frecuenciac,
    "frecuenciar": requestBody.frecuenciar,
    "temperatura": requestBody.temperatura,
    "diagnostico": requestBody.diagnostico,
    "tratamiento": requestBody.tratamiento  
  };
    console.log(requestBody.reason)

    pacientModel.update(
        {details_pacient: dict},
        {returning: true, where:{id_card_pacient: requestBody.id_card} }

      ).then(dbresponse => {
        if(dbresponse){
          res.send({message:1});  
        }else{
          res.send({message:0});
        }
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Database failure."
        });
      });
      res.send({ message: 1 }); 
  
})

module.exports = router;