const Sequelize = require("sequelize");
const db = require("./db");

var pacient = db.define(
  "pacient",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    idCardPacient: { type: Sequelize.STRING, field: "id_card_pacient" },
    namePacient: { type: Sequelize.STRING, field: "name_pacient" },
    lastnamePacient: { type: Sequelize.STRING, field: "lastname_pacient" },
    agePacient: { type: Sequelize.INTEGER, field: "age_pacient" },
    genderPacient: { type: Sequelize.STRING, field: "gender_pacient"},
    addressPacient: { type: Sequelize.STRING, field: "address_pacient"},
    phonePacient: { type: Sequelize.STRING, field: "phone_pacient"},
    emailPacient: { type: Sequelize.STRING, field: "email_pacient"},
    detailsPacient: { type: Sequelize.JSON, field: "details_pacient"},
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = pacient;
