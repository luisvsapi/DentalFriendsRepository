var express = require("express");
var router = express.Router();
const constants = require("../scripts/constants");
var sequelize = require("../models/db");
const jwtSecurity = require("../configs/jwtAuth");
const userModel = require("../models/user");
const userDetailsModel = require("../models/userDetails");
const utils = require("../scripts/utils");
var path = require("path");

router.get("/avatar/:dir", async (req, res, next) => {
  let filePath = "../avatar/" + req.params.dir;
  res.sendFile(path.join(__dirname, filePath));
});

router.get("/", function (req, res, next) {
  res.render(`home`, {});
});

router.get("/login", function (req, res, next) {
  var cookies = req.cookies;
  if (cookies.token && cookies.user && cookies.idUser) {
    res.clearCookie("token");
    res.clearCookie("user");
    res.clearCookie("idUser");
    res.clearCookie("connect.sid");
  }
  res.render("login", { action: "login" });
});

router.get("/register", function (req, res, next) {
  res.render("login", { action: "register" });
});

router.get("/aboutus", function (req, res, next) {
  res.render(`aboutus`, {});
});

router.get("/appointment", function (req, res, next) {
  res.render(`appointment`, {});
});

router.get("/dentalcare", function (req, res, next) {
  res.render(`dentalcare`, {});
});

router.get("/portafolio", function (req, res, next) {
  res.render(`portafolio`, {});
});

router.get("/treatment", function (req, res, next) {
  res.render(`treatment`, {});
});

router.get("/professional", function (req, res, next) {
  userModel
    .findAll({
      include: {
        model: userDetailsModel,
        required: true,
      },
      raw: true,
    })
    .then((data) => {
      res.render(`professional`, { title: "profesionales", docs: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Database failure.",
      });
    });
});

/* POST METHODS */
router.post("/login", async (req, res, next) => {
  let requestBody = req.body;
  const [results] = await sequelize.query(
    `select login_user ('${requestBody.username}', '${requestBody.password}')`
  );
  if (results.length > 0) {
    let encryptPassword = await utils.cryptPassword(requestBody.password);
    const token = jwtSecurity.sign(requestBody.username, encryptPassword);
    res.cookie("token", token, {
      maxAge: constants.MAX_AGE_COOKIE,
      httpOnly: true,
    });
    res.cookie("idUser", results[0].login_user, {
      maxAge: constants.MAX_AGE_COOKIE,
      httpOnly: true,
    });
    res.cookie("user", requestBody.username, {
      maxAge: constants.MAX_AGE_COOKIE,
      httpOnly: true,
    });
    res.send({ username: requestBody.username, token: token });
  } else {
    res.status(400);
    res.send({});
  }
});

router.post("/loginApp", async (req, res, next) => {
  let requestBody = req.body;
  const [results] = await sequelize.query(
    `select login_user ('${requestBody.username}', '${requestBody.password}')`
  );
  if (results.length > 0) {
    let encryptPassword = await utils.cryptPassword(requestBody.password);
    const token = jwtSecurity.sign(requestBody.username, encryptPassword);
    res.send({ username: requestBody.username, token: token });
  } else {
    res.status(400);
    res.send({});
  }
});

router.post("/register", async (req, res, next) => {
  let requestBody = req.body;
  try {
    let user = await userModel.findOne({
      where: { user_name: requestBody.username },
      attributes: { exclude: ["password"] },
    });
    if (user == null) {
      sequelize
        .query(
          `select create_user ('${requestBody.username}', 
        '${requestBody.password}', '${requestBody.email}')`
        )
        .then(async (response) => {
          let userDetails = await userDetailsModel.create({});
          await userDetails.save();
          user = await userModel.findOne({
            where: { user_name: requestBody.username },
            attributes: { exclude: ["password"] },
          });
          user.id_details = userDetails.id_details;
          await user.save();
          res.send({ message: 1 });
        });
    } else {
      res.send({ message: 2 });
    }
  } catch (err) {
    res.send({ message: 0 });
  }
});

module.exports = router;
