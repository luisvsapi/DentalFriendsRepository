var bcrypt = require('bcrypt')

function modificateActualTime(mode = 'day', value = 1) {
  var date = new Date()
  switch (mode) {
    case 'day':
      date.setDate(date.getDate() + value)
      break
    case 'hour':
      date.setHours(date.getHours() + value)
      break
    case 'minute':
      date.setMinutes(date.getMinutes() + value)
      break
    default:
      break
  }
  return date
}

function addNameMonth(dateAppointment, dateToJson) {
  switch (dateAppointment.getMonth()) {
    case 0:
      dateToJson += "Enero"
      break
    case 1:
      dateToJson += "Febrero"
      break
    case 2:
      dateToJson += "Marzo"
      break
    case 3:
      dateToJson += "Abril"
      break
    case 4:
      dateToJson += "Mayo"
      break
    case 5:
      dateToJson += "Junio"
      break
    case 6:
      dateToJson += "Julio"
      break
    case 7:
      dateToJson += "Agosto"
      break
    case 8:
      dateToJson += "Septiembre"
      break
    case 9:
      dateToJson += "Octubre"
      break
    case 10:
      dateToJson += "Noviembre"
      break
    case 11:
      dateToJson += "Diciembre"
      break
    default:
      dateToJson += "Indet."
  }
  return dateToJson
}

async function cryptPassword(password = '') {  
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
} 
 
function comparePassword(plainPass = '', hashword = '') {
  bcrypt.compare(plainPass, hashword, function(err, result) {
      return result
  });
}  

module.exports = { modificateActualTime, addNameMonth, cryptPassword, comparePassword }