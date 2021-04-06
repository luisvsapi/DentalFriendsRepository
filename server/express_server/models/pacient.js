const Sequelize = require('sequelize')
const db = require('./db');
const appointment = require('./appointment')

var pacient = db.define('pacient', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    id_card_pacient: { type: Sequelize.STRING },
    name_pacient: { type: Sequelize.STRING},
    lastname_pacient: { type: Sequelize.STRING},
    age_pacient: { type: Sequelize.INTEGER},
    gender_pacient: { type: Sequelize.STRING },
    address_pacient: { type: Sequelize.STRING},
    phone_pacient: { type: Sequelize.STRING},
    email_pacient: { type: Sequelize.STRING},
    details_pacient: { type: Sequelize.JSON }
},
    {
        timestamps: false,
        freezeTableName: true
    }) 

module.exports = pacient