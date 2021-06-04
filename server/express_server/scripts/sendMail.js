const nodemailer = require('nodemailer');
const CryptoJS = require("crypto-js");
const constantsProject = require('./constants');

function sendMail(pacient, dentist, appointment) {
    try {

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host : constantsProject.mailCredentials.host,
            port : 587,
            secure : false, // true for 465, false for other ports
            auth : {
                user: constantsProject.mailCredentials.mail, // generated ethereal user
                pass: CryptoJS.AES.decrypt(constantsProject.mailCredentials.passwordHash, constantsProject.mailCredentials.key).toString(CryptoJS.enc.Utf8) // generated ethereal password
            },
            tls : {
            rejectUnauthorized : false
            }
        });
        
        let mailParams = {
            subject : '',
            message : '',
            appointment: ''
        }
        // setup email data with unicode symbols
        switch (appointment.status) {
            case 0 :
                mailParams.subject = 'Asignación';
                mailParams.message = 'Su cita fue asignada con éxito'
                mailParams.appointment = appointment
                break
            case 2 :
                mailParams.subject = 'Finalización';
                mailParams.message = 'Su cita se efectuó, con éxito'
                mailParams.appointment = appointment
                break
            case 3:
                mailParams.subject = 'Cancelación';
                mailParams.message = 'Su cita fue cancelada, por motivos de fuerza mayor. Favor vuelva a agendar otra cita si desea, su petición tendrá la mayor prioridad'
                mailParams.appointment = appointment
                break
            default:
                mailParams.subject = 'Pendiente';
                mailParams.message = 'Su cita está pendiente de confirmación, para su inmediata asignación de la hora, en el día que acaba de seleccionar'               
                mailParams.appointment = 'Pendiente'
        }
        let mailOptions = {
            from: `<${constantsProject.mailCredentials.mail}>`, // sender address
            to: `${pacient.email_pacient}`, // list of receivers
            subject: `${mailParams.subject} de cita`, // Subject line
            html: `
            <p>${mailParams.subject} de cita odontológica</p>
            <h3>Detalles</h3>
            <ul>  
                <li>Nombre: ${pacient.name_pacient} ${pacient.lastname_pacient} de cédula ${pacient.id_card_pacient}</li>
                <li>Email: ${pacient.email_pacient}</li>
                <li>Fecha: ${mailParams.appointment.date} en las de ${mailParams.appointment.beginHour} - ${mailParams.appointment.endHour}</li>
                <li>Odontólogo: ${dentist.user_name}</li>
            </ul>
            <h3>Mensaje</h3>
            <p>${mailParams.message}</p>
            ` // html body
        };
        
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send(error.message)
                console.log(error);
                return error
            }
            else {
                console.log('Message sent: %s', info.messageId);   
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                res.status(200).jsonp(requestBody)
            }
      });
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
  }
module.exports = sendMail;
