const Sequelize = require("sequelize");
const db = require("./db");
const userDetails = require("./userDetails");

var user = db.define(
  "users",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    user_name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    id_details: Sequelize.INTEGER,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

userDetails.hasOne(user, { foreignKey: "id_details" });
user.belongsTo(userDetails, { foreignKey: "id_details" });

module.exports = user;
