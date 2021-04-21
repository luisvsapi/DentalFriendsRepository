const Sequelize = require('sequelize')
const db = require('./db'); 
const user = require('./user');
const pacient = require('./pacient');

var appointment = db.define('appointment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    state: {type: Sequelize.STRING },
    details: {type: Sequelize.JSON},
    id_user: Sequelize.INTEGER,
    id_pacient: Sequelize.INTEGER,
    treatment: {type: Sequelize.STRING },
    date: {type: Sequelize.DATE, allowNull: false},
}, {
    timestamps: false,
    freezeTableName: true
})

user.hasMany(appointment, {foreignKey: 'id_user'});
appointment.belongsTo(user, {foreignKey: 'id_user'});
pacient.hasMany(appointment, {foreignKey: 'id_pacient'});
appointment.belongsTo(pacient, {foreignKey: 'id_pacient'});
 
module.exports = appointment