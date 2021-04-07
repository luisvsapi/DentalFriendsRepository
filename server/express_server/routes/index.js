var express = require('express')
var router = express.Router()
// const userModel = require('../models/user')
var sequelize = require('../models/db')
const jwtSecurity = require('../configs/jwtAuth.js');
const userModel = require('../models/user');
const userDetailsModel = require('../models/userDetails');  
/* 
 GET METHODS 
*/
router.get('/', function (req, res, next) {
  //consultrar en db con el token, que tipod  de user para decidir entre las 3 interfaces
  //si esta logeado mostrar el boton Salir
  //else 
  res.render(`home`, {})
});

router.get('/login', function (req, res, next) {
  res.render('login', { action: 'login' })
});

router.get('/register', function (req, res, next) {
  res.render('login', { action: 'register' })
});

router.get('/aboutus', function (req, res, next) {  
  res.render(`aboutus`, {})
});

router.get('/appointment', function (req, res, next) {
  res.render(`appointment`, {})
});

router.get('/adminAppointment', function (req, res, next) {
  res.render(`adminAppointment`, {})
});

router.get('/dentalcare', function (req, res, next) {
  res.render(`dentalcare`, {})
});

router.get('/portafolio', function (req, res, next) {
  res.render(`portafolio`, {})
});

router.get('/treatment', function (req, res, next) {
  res.render(`treatment`, {})
});

router.get('/professional', function (req, res, next) {  
  userModel.findAll({
    include: {
      model: userDetailsModel,
      required: true
    },
    raw: true  
  }).then(data => { 
    res.render(`professional`, { title: "profesionales", docs: data })
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Database failure."
    });
  });
});
 
/* 
 POST METHODS 
*/

router.post('/login', async (req, res, next) => {
  let requestBody = req.body
  const [results, metadata] = await sequelize.query(`select login_user ('${requestBody.username}', '${requestBody.password}')` )  
  if (results.length > 0) {
    const newUser = {
      idUser: results[0].login_user,
      username: requestBody.username,
      token: jwtSecurity.jwt.sign({ username: requestBody.username, role: requestBody.password },
        jwtSecurity.keySecret)
    }; 
    req.session.user = newUser
    res.send(newUser)
  } else {
    res.send({})
  } 
})

router.post('/register', async (req, res, next) => {
  let requestBody = req.body
  try {
    let user = await userModel.findOne({ where: { user_name: requestBody.username }, attributes: { exclude: ['password'] } }); 
    if (user == null) {
      sequelize.query(`select create_user ('${requestBody.username}', 
        '${requestBody.password}', '${requestBody.email}')`)
        .then(async response => {  
            let userDetails = await userDetailsModel.create({});            
            await userDetails.save() 
            let user = await userModel.findOne({ where: { user_name: requestBody.username }, attributes: { exclude: ['password'] } }); 
            user.id_details = userDetails.id_details
            await user.save() 
            res.send({ message: 1 }); 
        });
    } else {
      res.send({ message: 2 });
    }
  } catch (err) {
    res.send({ message: 0});
  }
})

module.exports = router;