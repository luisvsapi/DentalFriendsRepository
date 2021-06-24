//document.getElementById("logout").setAttribute("onclick", "resetCredentials()");
$(document).ready(function () {
  let url = "/appointment/state/0";
  getFetch(url, {})
    .then((res) => {
      if (res) {
        loadAppointment(res);
        alertify.success("Solicitudes cargadas");
      } else {
        alertify.error("Error al cargar la información, recarge la página!!");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

let loadAppointment = (data) => {
  let table = document.getElementById("attentionTable");
  for (let appointment of data) {
    let tr = document.createElement("tr");

    let date = document.createElement("td");
    date.innerText = parseUtcDate(appointment.dateBegin);
    let name = document.createElement("td");
    name.innerText = appointment.pacient.namePacient + " " + appointment.pacient.lastnamePacient;
    let treatment = document.createElement("td");
    treatment.innerText = appointment.treatment;
    let id_card = document.createElement("td");
    id_card.innerText = appointment.pacient.idCardPacient;

    let link = document.createElement("button");
    link.className = "btn btn-info";
    link.setAttribute("onclick", "goMedicalRecord()");
    link.innerText = "Llenar Ficha";

    let finalizar = document.createElement("button");
    finalizar.className = "btn btn-info";
    finalizar.setAttribute("onclick", "finishRequest(" + appointment.id + ")");
    finalizar.innerText = "Finalizar";
    tr.appendChild(date);
    tr.appendChild(name);
    tr.appendChild(id_card);
    tr.appendChild(link);
    tr.appendChild(treatment);
    tr.appendChild(finalizar)
    table.appendChild(tr);
  }
  
};


function goMedicalRecord() {
  let url = "./medicalRecord";
  location.replace(url);
}

function finishRequest(appointmentId) {
  let url = "./appointments/" + "Completed/" + appointmentId;
  getFetch(url, {})
    .then((res) => {
      if (res.message) {
        sendNotification(Completed);
      } else {
        alertify.error("Error al finalizar la cita");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
    location.reload();
  }