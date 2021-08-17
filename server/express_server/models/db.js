const Sequelize = require("sequelize");
const dbConfig = require("../configs/db.config.js");

var sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false
});

sequelize
  .authenticate()
  .then(() => {
    console.log("db connection succesful!");
  })
  .catch((err) => {
    console.error.bind(console, "db connection error:");
  });

module.exports = sequelize;
