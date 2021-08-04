function resetCredentials() {
  sessionStorage.setItem("username", null);
  sessionStorage.setItem("token", null);
}

async function postFileFetch(url = "", form) {
  var formData = new FormData(form);
  let response = await fetch(url, {
    method: "POST",
    body: formData,
    headers: { 
      token: sessionStorage.getItem("token")
    }
  });
  return response.json();
}

async function postFetch(url = "", objectSend = {}) {
  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(objectSend),
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token")
    },
  });
  return response.json();
}

async function getFetch(url = "", objeto = {}) {
  let parametros = objeto;
  let query = Object.keys(parametros)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(parametros[k]))
    .join("&");
  let urlEnviar = url + "?" + query;
  let respuesta = await fetch(urlEnviar, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token")
    },
  });
  return respuesta.json();
}

async function putFetch(url = "", objectoEnviar = {}) {
  let response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(objectoEnviar),
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token")
    },
  });
  return response.json();
}

async function deleteFetch(url = "", objectoEnviar = {}) {
  let response = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(objectoEnviar),
    headers: {
      "Content-Type": "application/json",
      token: sessionStorage.getItem("token")
    },
  });
  return response.json();
}

function objectifyForm(formArray) {
  var returnArray = {};
  formArray.forEach((element) => {
    returnArray[element["name"]] = element["value"];
  });
  return returnArray;
}

function dateToInt(arg) {
  return new Date(arg).getTime();
}

function modificateActualTime(mode = "minute", date = "", value = 1) {
  var dateTmp = new Date(date).getTime();
  switch (mode) {
    case "day":
      dateTmp += value * 1000 * 60 * 60 * 24;
      break;
    case "hour":
      dateTmp += value * 1000 * 60 * 60;
      break;
    case "minute":
      dateTmp += value * 1000 * 60;
      break;
    case "second":
      dateTmp += value * 1000;
      break;
    default:
      break;
  }
  return new Date(dateTmp);
}
/**
 * This method generates a user friendly date
 * @param {*} dateUTC 
 * @returns date 
 */
function parseUtcDate(dateUTC){
  let date = new Date();
  date.setTime(new Date (dateUTC));
  var dateToJson = date.getDate() + " ";
  dateToJson = addNameMonth(date, dateToJson);
  dateToJson += " " + date.getFullYear();
  return dateToJson;
}
/**
 * This method asign the name of the month with the month number
 * @param {*} dateAppointment 
 * @param {*} dateToJson 
 * @returns 
 */
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
async function sendNotification(appointmentIdCancel) {
  let urlNotify = "/mail/send";
  postFetch(urlNotify, {
    appointmentId: appointmentIdCancel,
  }).then((res) => {
    return res;
  }).catch(function () {
    alertify.error("Error, el correo no pudo enviarse!");
  });
}
function localDateRestricted(){
  let date =  new Date ();
  date.setDate(date.getDate() +1);
  const year = date.getFullYear();
  const day = ("0" + (date.getDate())).slice(-2);
  const month =("0" + (date.getMonth()+1)).slice(-2);
  return year+"-"+month+"-"+day;
}