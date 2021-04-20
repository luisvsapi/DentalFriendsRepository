var express = require('express')
var router = express.Router()
const userModel = require('../models/user')
const userDetailsModel = require("../models/userDetails")
const pacientModel = require('../models/pacient')
const appointment = require('../models/appointment')
var validator = require('validator');
const { Op } = require("sequelize");

const jwtSecurity = require('../configs/jwtAuth.js')
const user = require('../models/user')
const pacient = require('../models/pacient')

const path = require('path')
const multer = require('multer')
let storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, './subidas')
  },
  filename:(req, file, cb)=>{
    cb(null, file.fieldname + '-' + Date.extname(file.originalname));
  }
})
const upload = multer({storage});
const {treatments} = require("../scripts/constants.js");



router.get('/medicalResume', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.render(`medicalResume`, {resume: {}})
})

router.get('/profile', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.render(`profile`, {})
})

router.get('/medicalRecord', jwtSecurity.authenticateJWT, function (req, res, next) {
  console.log('medical');
  res.render(`medicalRecord`, {})
});

router.get('/home', jwtSecurity.authenticateJWT, function (req,res,next){
  res.render(`homeUser`,{})
})

router.post('/', jwtSecurity.authenticateJWT, function (req, res, next) {
  res.send({ message: 'Tu estas autorizado' })
});



/* 
 POST METHODS 
*/
router.put('/formProfile', upload.single('file') , jwtSecurity.authenticateJWT , async (req, res, next) => { //cambio a put, prueba
  
  let requestBody = req.body;
  let dict = {
    "birthday": requestBody.birth,
    "age": requestBody.age,
    "phone": requestBody.phone,
    "recognitions": [requestBody.recog],
    "university": requestBody.school,
    "frase": requestBody.phrase
  };
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
          picture_url: req.file.path},
        {returning: true, where:{id_details: doc.id_details} }

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

    }else{
      res.send({message:0});
    }
  });
  
})

router.post('/medicalResume', jwtSecurity.authenticateJWT, async (req, res, next) => {
  try {
    let requestBody = req.body;
    const medicalResume = await appointment.findAll({
      attributes: ['id', 'date',],
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
    });
    for (element in medicalResume){
      var dateAppointment = medicalResume[element].date
      var dateToJson = dateAppointment.getDay()+" "
      switch (dateAppointment.getMonth()){
        case 0:
          dateToJson += "Enero";
          break;
        case 1:
          dateToJson += "Febrero";
          break;
        case 2:
          dateToJson += "Marzo";
          break;
        case 3:
          dateToJson += "Abril";
          break;
        case 4:
          dateToJson += "Mayo";
          break;
        case 5:
          dateToJson += "Junio";
          break;
        case 6:
          dateToJson += "Julio";
          break;
        case 7:
          dateToJson += "Agosto";
          break;
        case 8:
          dateToJson += "Septiembre";
          break;
        case 9:
          dateToJson += "Octubre";
          break;
        case 10:
          dateToJson += "Noviembre";
          break;
        case 11:
          dateToJson += "Diciembre";
          break;
        default:
          dateToJson += "Indet.";
      }
      dateToJson += " "+dateAppointment.getFullYear()
      medicalResume[element].date = dateToJson
      var fullName = medicalResume[element]['pacient.name_pacient']+" "+medicalResume[element]['pacient.lastname_pacient']
      delete medicalResume[element]['pacient.name_pacient']
      delete medicalResume[element]['pacient.lastname_pacient']
      medicalResume[element]['nombrePaciente'] = fullName
    }
    res.send(medicalResume)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/medicalResume/details',  jwtSecurity.authenticateJWT, async (req, res, next) => {
  try {
    let requestBody = req.body;
    const detalles = await appointment.findOne({
      attributes: ['details'],
      where:{
        id: requestBody.idAppointment
      },
    });
    res.send(detalles)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/all', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }, 
      include: [userDetailsModel]}); 
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allAppoinment', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }}); 
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allDoctors', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    const users = await userModel.findAll({attributes: { exclude: ['password'] }}); 
    res.send(users)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/allTreatments', async (req, res, next) => {
  try {
    console.log("Tratamientos:",treatments)
    res.send(treatments)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/:id', jwtSecurity.authenticateJWT , async (req, res, next) => {
  try {
    if(validator.isInt(req.params.id)){
      let user = await userModel.findOne({ where: { id: req.params.id }, attributes: { exclude: ['password'] } })
      res.json(user)
    } 
  } catch (error) {
      console.log(error)
      res.sendStatus(500)
  } 
})

router.put('/formRecord', jwtSecurity.authenticateJWT , async (req, res, next) => { 
  let requestBody = req.body;
  pacientModel.update(
    {id_card_pacient: requestBody.id_card_pacient,
     name_pacient: requestBody.name_pacient,
     lastname_pacient: requestBody.lastname_pacient,
     age_pacient: requestBody.age_pacient,
     gender_pacient: requestBody.gender_pacient,
     address_pacient: requestBody.address_pacient,
     phone_pacient: requestBody.phone_pacient},
    {returning: true, where:{id_card_pacient: requestBody.id_card_pacient} }
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
})



 

module.exports = router;
