const session = require("express-session");
const jwt = require("jsonwebtoken");
const keySecret = "sPbZ3P7SSVVVgxNsyUTJ3z2pRfpAJVfwpY43sqSrDr9JvzbNeMb9DuQLWgqeDVvR";
const utils = require("../scripts/utils");

const authenticateJWT = (req, res, next) => { 
  const token = req.headers.token;  
  if (token) {
    jwt.verify(token, keySecret, (err, user) => { 
      if (err) {
        return res.sendStatus(403);
      }        
      req.user = user;
      next();
    });
  } else {
    res.locals.message = "Forbidden";
    res.locals.error = { status: "403", stack: "Acceso no permitido" };
    res.render("error");
  }
};

const sign = (user='', password='', details="") => {
  var payload = {
    details: details,
    user: user,
    password: password
  };
  return jwt.sign(payload, keySecret, { expiresIn: "1 days" });
};

module.exports = { authenticateJWT, jwt, keySecret, sign };
