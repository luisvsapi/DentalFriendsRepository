const Sequelize = require('sequelize')
const db = require('./db')
const sequelize = require('./db')
const user =require('./user')

var userDetails = db.define('user_detail', {
    id_details: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    identity_card: Sequelize.STRING,
    address: Sequelize.STRING,
    speciality: Sequelize.STRING,
    details: Sequelize.JSON,
    picture_url: Sequelize.STRING
}, {
    timestamps: false,
    freezeTableName: true
});
  
module.exports = userDetails