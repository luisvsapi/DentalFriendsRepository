const Sequelize = require("sequelize");
const db = require("./db");
const user = require("./user");
const pacient = require("./pacient");

var appointment = db.define(
  "appointment",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    state: { type: Sequelize.STRING },
    details: { type: Sequelize.JSON },
    idUser: {type: Sequelize.INTEGER, field: "id_user"},
    idPacient: {type: Sequelize.INTEGER, field: "id_pacient"},
    treatment: { type: Sequelize.STRING },
    dateBegin: { type: 'TIMESTAMP', allowNull: false },
    dateFinish: { type:'TIMESTAMP' },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

user.hasMany(appointment, { foreignKey: "id_user" });
appointment.belongsTo(user, { foreignKey: "id_user" });
pacient.hasMany(appointment, { foreignKey: "id_pacient" });
appointment.belongsTo(pacient, { foreignKey: "id_pacient" });

module.exports = appointment;
