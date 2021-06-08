const nodemailer = require("nodemailer");
const CryptoJS = require("crypto-js");
const { google } = require("googleapis");
const constantsProject = require("./constants");
const utils = require("../scripts/utils");

async function sendMail(pacient, dentistDetails, appointment) {
  const oAuth2Credentials = constantsProject.mailCredentials;
  const oAuth2Client = new google.auth.OAuth2(
    oAuth2Credentials.clientId,
    oAuth2Credentials.clientSecret,
    oAuth2Credentials.redirectURI
  );
  oAuth2Client.setCredentials({
    refresh_token: oAuth2Credentials.refreshToken,
  });
  let dateBeginAppointment = new Date();
  let dateFinishAppointment = new Date();
  dateBeginAppointment.setTime(Date.parse(appointment.dateBegin));
  dateFinishAppointment.setTime(Date.parse(appointment.dateFinish));
  var dateToStringBegin =
    utils.addNameDay(dateBeginAppointment, dateToStringBegin) +
    ", " +
    dateBeginAppointment.getDate +
    " de ";
  dateToStringBegin =
    utils.addNameMonth(dateBeginAppointment, dateToStringBegin) +
    " de " +
    dateBeginAppointment.getFullYear();
  let hourBegin = `${dateBeginAppointment.getHours()}:${dateBeginAppointment.getMinutes()}`;
  let hourFinish = `${dateFinishAppointment.getHours()}:${dateFinishAppointment.getMinutes()}`;
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: oAuth2Credentials.mail,
        clientId: oAuth2Credentials.clientId,
        clientSecret: oAuth2Credentials.clientSecret,
        refreshToken: oAuth2Credentials.refreshToken,
        accessToken: accessToken,
      },
    });

    let mailParams = {
      subject: "",
      message: "",
      date: "",
    };
    // setup email data with unicode symbols
    switch (appointment.state) {
      case 0:
        mailParams.subject = "Asignación";
        mailParams.message = "Su cita fue asignada con éxito";
        mailParams.date = `${dateToStringBegin} en el horario de: ${hourBegin} - ${hourFinish}`;
        break;
      case 2:
        mailParams.subject = "Finalización";
        mailParams.message = "Su cita se efectuó, con éxito";
        mailParams.date = `${dateToStringBegin} en el horario de: ${hourBegin} - ${hourFinish}`;
        break;
      case 3:
        mailParams.subject = "Cancelación";
        mailParams.message =
          "Su cita fue cancelada, por motivos de fuerza mayor. Favor vuelva a agendar otra cita si desea, su petición tendrá la mayor prioridad";
        mailParams.date = `${dateToStringBegin} en el horario de: ${hourBegin} - ${hourFinish}`;
        break;
      default:
        mailParams.subject = "Pendiente";
        mailParams.message =
          "Su cita está pendiente de confirmación, para su inmediata asignación de la hora, en el día escogido";
        mailParams.date = "No asignada";
    }
    let mailOptions = {
      from: `Dental Friends EC  <${oAuth2Credentials.mail}>`, // sender address
      to: `${pacient.email_pacient}`, // list of receivers
      subject: `${mailParams.subject} de cita`, // Subject line
      html: `
            <h1>${mailParams.subject} de cita odontológica</h1>
            <h3>Detalles</h3>
            <ul>  
                <li><h2>Nombre: ${pacient.name_pacient} ${pacient.lastname_pacient} de cédula ${pacient.id_card_pacient}</h2></li>
                <li><h2>Email: ${pacient.email_pacient}</li>
                <li><h2>Fecha: ${mailParams.date} </h2></li>
                <li><h2>Odontólogo: ${dentistDetails.name}</h2></li>
            </ul>
            <h3>Mensaje</h3>
            <p>${mailParams.message}</p>
            `, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
        console.log(error);
        return error;
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).jsonp(requestBody);
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
module.exports = sendMail;
