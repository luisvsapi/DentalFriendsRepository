const Sequelize = require("sequelize");
const db = require("./db");
const userDetails = require("./userDetails");

var user = db.define(
  "users",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: Sequelize.STRING, field: "user_name" },
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    idDetails: { type: Sequelize.INTEGER, field: "id_details" },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

userDetails.hasOne(user, { foreignKey: "idDetails" });
user.belongsTo(userDetails, { foreignKey: "idDetails" });

module.exports = user;
