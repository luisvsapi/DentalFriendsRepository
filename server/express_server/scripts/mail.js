const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const constantsProject = require("./constants");
const utils = require("../scripts/utils");

async function sendMail(pacient, dentistDetails, appointment) {
  const mailoAuth = false;
  let transporter;
  let dateBeginAppointment = new Date();
  let dateFinishAppointment = new Date();
  dateBeginAppointment.setTime(Date.parse(appointment.dateBegin));
  dateFinishAppointment.setTime(Date.parse(appointment.dateFinish));
  console.log(dateBeginAppointment)
  var dateToStringBegin = ""
  dateToStringBegin =
    utils.addNameDay(dateBeginAppointment, dateToStringBegin) +
    ", " +
    dateBeginAppointment.getDate() +
    " de ";
  dateToStringBegin =
    utils.addNameMonth(dateBeginAppointment, dateToStringBegin) +
    " de " +
    dateBeginAppointment.getFullYear();
  console.log(dateToStringBegin)
  let hourBegin = `${dateBeginAppointment.getHours()}:${dateBeginAppointment.getMinutes()}`;
  let hourFinish = `${dateFinishAppointment.getHours()}:${dateFinishAppointment.getMinutes()}`;
  try {
    if (mailoAuth) {
      const oAuth2Credentials = constantsProject.mailCredentials[0];
      const oAuth2Client = new google.auth.OAuth2(
        oAuth2Credentials.clientId,
        oAuth2Credentials.clientSecret,
        oAuth2Credentials.redirectURI
      );
      oAuth2Client.setCredentials({
        refresh_token: oAuth2Credentials.refreshToken,
      });
      const accessToken = await oAuth2Client.getAccessToken();
      transporter = nodemailer.createTransport({
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
    }

    const authOptions = constantsProject.mailCredentials[1];
    transporter = nodemailer.createTransport({
      host: authOptions.host,
      port: authOptions.port,
      tls: { minVersion: "TLSv1" },
      auth: {
        user: authOptions.mail,
        pass: authOptions.pass,
      },
    });

    let mailParams = {
      subject: "",
      message: "",
      date: "",
    };
    // setup email data with unicode symbols
    switch (appointment.state) {
      case "0":
        mailParams.subject = "Asignación de cita odontológica";
        mailParams.message = "Su cita fue asignada con éxito.";
        mailParams.date = `${dateToStringBegin} en el horario de: ${hourBegin} - ${hourFinish}.`;
        break;
      case "2":
        mailParams.subject = "Finalización de cita odontológica";
        mailParams.message = "Su cita se efectuó con éxito.";
        mailParams.date = `${dateToStringBegin} en el horario de: ${hourBegin} - ${hourFinish}.`;
        break;
      case "3":
        mailParams.subject = "No existe disponibilidad de cita odontológica";
        mailParams.message =
          "Su solicitud de cita fue rechazada, por motivos de agenda del odontólogo. Favor vuelva a agendar otra cita en otro día si lo desea. Su petición tendrá una prioridad alta para el nuevo día que escoja.";
        mailParams.date = `Su cita no pudo ser asignada para el día ${dateToStringBegin}`;
        break;
      default:
        mailParams.subject = "Pendiente de cita odontológica";
        mailParams.message =
          "Su cita está pendiente de confirmación, para su inmediata asignación de la hora en el día escogido.";
        mailParams.date = "No asignada.";
    }
    let mailOptions = {
      from: `Agendamiento DentalFriends.EC <${authOptions.mail}>`, // sender address
      to: `${pacient.emailPacient}`, // list of receivers
      subject: `${mailParams.subject}`, // Subject line
      html: utils.generateMailTemplate(
        mailParams.subject,
        pacient.namePacient,
        pacient.lastnamePacient,
        pacient.idCardPacient,
        pacient.emailPacient,
        mailParams.date,
        dentistDetails.name,
        mailParams.message
      ),
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
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
  }
}
module.exports = sendMail;
