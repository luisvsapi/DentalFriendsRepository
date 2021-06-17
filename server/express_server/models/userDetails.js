const Sequelize = require("sequelize");
const db = require("./db");
const sequelize = require("./db");
const user = require("./user");

var userDetails = db.define(
  "userDetails",
  {
    idDetails: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_details",
    },
    identityCard: {type: Sequelize.STRING, field: "identity_card"},
    address: Sequelize.STRING,
    speciality: Sequelize.STRING,
    details: Sequelize.JSON,
    pictureUrl: {type: Sequelize.STRING, field: "picture_url"},
  },
  {
    timestamps: false,
    //freezeTableName: true,
    tableName: 'user_detail',
  }
);

module.exports = userDetails;
