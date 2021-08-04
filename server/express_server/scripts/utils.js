var bcrypt = require("bcrypt");

function modificateActualTime(mode = "day", value = 1) {
  var date = new Date();
  switch (mode) {
    case "day":
      date.setDate(date.getDate() + value);
      break;
    case "hour":
      date.setHours(date.getHours() + value);
      break;
    case "minute":
      date.setMinutes(date.getMinutes() + value);
      break;
    default:
      break;
  }
  return date;
}

function addNameMonth(dateAppointment, dateToJson) {
  switch (dateAppointment.getMonth()) {
    case 0:
      dateToJson += "Enero";
      break;
    case 1:
      dateToJson += "Febrero";
      break;
    case 2:
      dateToJson += "Marzo";
      break;
    case 3:
      dateToJson += "Abril";
      break;
    case 4:
      dateToJson += "Mayo";
      break;
    case 5:
      dateToJson += "Junio";
      break;
    case 6:
      dateToJson += "Julio";
      break;
    case 7:
      dateToJson += "Agosto";
      break;
    case 8:
      dateToJson += "Septiembre";
      break;
    case 9:
      dateToJson += "Octubre";
      break;
    case 10:
      dateToJson += "Noviembre";
      break;
    case 11:
      dateToJson += "Diciembre";
      break;
    default:
      dateToJson += "Indet.";
  }
  return dateToJson;
}

function addNameDay(dateAppointment, dateToJson) {
  switch (dateAppointment.getDay()) {
    case 0:
      dateToJson += "Domingo";
      break;
    case 1:
      dateToJson += "Lunes";
      break;
    case 2:
      dateToJson += "Martes";
      break;
    case 3:
      dateToJson += "Miércoles";
      break;
    case 4:
      dateToJson += "Jueves";
      break;
    case 5:
      dateToJson += "Viernes";
      break;
    case 6:
      dateToJson += "Sábado";
      break;
    default:
      dateToJson += "Indet.";
  }
  return dateToJson;
}

async function cryptPassword(password = "") {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

function comparePassword(plainPass = "", hashword = "") {
  bcrypt.compare(plainPass, hashword, function (err, result) {
    return result;
  });
}
function generateMailTemplate(
  mailParamsSubject,
  pacientNamePacient,
  pacientLastnamePacient,
  pacientIdCardPacient,
  pacientEmailPacient,
  mailParamsDate,
  dentistDetailsName,
  mailParamsMessage
) {
  return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xml:lang="EN" xmlns="http://www.w3.org/1999/xhtml">

<head>
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>MailDentalFriendsEC</title>
  <meta content="" name="description">
  <meta content="" name="keywords">
  <style>
    body {
      font-family: "Open Sans", sans-serif;
      color: #444444;
    }

    a {
      color: #34b7a7;
    }

    a:hover {
      color: #51cdbe;
      text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Raleway", sans-serif;
      margin-top: 1px;
    }

    #main {
      margin-top: 50px;
    }

    @media (max-width: 992px) {
      #main {
        margin-top: 30px;
      }
    }


    /*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
    #header {
      background: #e9e8e6;
      box-shadow: 0px 0px 25px 0 rgba(0, 0, 0, 0.08);
      z-index: 997;
      padding: 15px 0;
    }

    #header .logo {
      font-size: 32px;
      margin: 0;
      padding: 0;
      line-height: 1;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    #header .logo a {
      color: #222222;
      text-align: left;
    }

    #header .logo img {
      max-height: 16px;
      max-width: 16px;
      padding-left: 2px;
    }

    #header .header-social-links {
      align-items: right;
    }

    @media (max-width: 992px) {
      #header .logo {
        font-size: 28px;
      }
    }

    /*--------------------------------------------------------------
# Table
--------------------------------------------------------------*/
    table {
      background: #f6f6f6;
      box-shadow: 0px 0px 25px 0 rgba(0, 0, 0, 0.08);
      z-index: 997;
      padding: 15px 15px;
      width: 100%;
    }

    td img {
      width: 100%;
    }

    td h1,
    tr h1 {
      font-weight: bold;
      text-transform: uppercase;
      position: relative;
    }

    h2 {
      color: #34b7a7;
    }

    h3 {
      text-align: justify;
    }

    /*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
    #footer {
      background: #e9e8e6;
      padding: 30px 0;
      color: #222222;
      font-size: 14px;
      text-align: center;
    }

    #footer .credits {
      padding-top: 5px;
      font-size: 13px;
    }

    #footer .credits a {
      color: #34b7a7;
    }
  </style>
</head>

<body>
  <table role="none">
    <td>
      <!-- ======= Header ======= -->
      <header id="header" class="fixed-top">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <h1 class="logo"><a href="http://dentalfriend.ec/">DentalFriends.ec</a></h1>
        </div>
      </header><!-- End Header -->
      <!-- ======= Mail Body ======= -->
      <table role="none">
        <tr>
          <td>
            <table role="none">
              <tr>
                <h1 style="text-align: center">${mailParamsSubject} de cita odontológica</h1>
              </tr>
              <tr>
                <td>
                  <h2>Detalles</h2>
                  <ul>
                    <li>
                      <h3>Nombre: ${pacientNamePacient} ${pacientLastnamePacient} de cédula
                        ${pacientIdCardPacient}</h3>
                    </li>
                    <li>
                      <h3>Email: ${pacientEmailPacient}</h3>
                    </li>
                    <li>
                      <h3>Fecha: ${mailParamsDate} </h3>
                    </li>
                    <li>
                      <h3>Odontólogo: ${dentistDetailsName}</h3>
                    </li>
                  </ul>
                </td>
              </tr>
            </table>
            <table role="none">
              <td>
                <h2>${mailParamsMessage}</h2>
              </td>
            </table>
          </td>
        </tr>
    </td>
    </tr>
    </td>
    </tr>
  </table>
  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>DentalFriends</span></strong>. All Rights Reserved
      </div>
      <div class="credits">
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer><!-- End  Footer -->
  </td>
  </table>
</body>

</html>`;
}
function dateRestriction(){
  let date =  new Date ();
  date.setDate(date.getDate() +1);
  const year = date.getFullYear();
  const day = ("0" + (date.getDate())).slice(-2);
  const month =("0" + (date.getMonth()+1)).slice(-2);
  return year+"-"+month+"-"+day;
}

module.exports = {
  modificateActualTime,
  addNameMonth,
  addNameDay,
  cryptPassword,
  comparePassword,
  generateMailTemplate,
};
