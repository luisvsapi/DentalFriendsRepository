document.getElementById("logout").setAttribute("onclick", "resetCredentials()");
let resume = {};

document.addEventListener("DOMContentLoaded",  function () {
  validateCredentials();
});

$(document).ready(function () {
  //let htmlSelect = `<tr> <th>Id</th> <th>Fecha</th> <th>Paciente</th> <th>Detalles</th></tr>`;
  //htmlSelect += `<tr><td>1</td><td>01/06/2021</td><td>Nombre</td><td><button type="button" id=1 onclick="mostrarDetalles(this.id,event)" class="btn btn-primary" data-toggle="modal" data-target="#modalMedicalResume">Detalles</button></td></tr>`;
  //$("#medicalResumeTable").html(htmlSelect);
});

$("#searchMedicalResume").submit(async function (e) {
  e.preventDefault();
  resume = await postFetch("/user/medicalResume", {
    filterMedicalResume: $("#filterMedicalResume").val(),
  })
    .then((res) => {
      return res;
    })
    .catch(function () {
      alertify.error("Error contacte con administrador");
    });
  let htmlSelect = `<tr> <th>Id</th> <th>Fecha</th> <th>Paciente</th> <th>Detalles</th></tr>`;
  resume.forEach((element) => {
    htmlSelect += `<tr><td>${element.id}</td><td>${parseUtcDateWithHours( element.dateBegin,true, "numeral")}</td><td>${element.pacient.namePacient}</td><td><button type="button" id=${element.id} onclick="mostrarDetalles(this.id,event)" class="btn btn-primary" data-toggle="modal" data-target="#modalMedicalResume">Detalles</button></td></tr>`;
  });
  $("#medicalResumeTable").html(htmlSelect);
});

async function mostrarDetalles(id, e) {
  e.preventDefault();
  let detalles = await postFetch("/user/medicalResume/details", {
    idAppointment: id,
  })
    .then((res) => {
      return res;
    })
    .catch(function () {
      alert("Error en detalles contacte con administrador");
    });
  let htmlSelect = "";
  if (detalles.details == null) {
    htmlSelect = `<p>Detalles no existe</p>`;
  }
  htmlSelect += "";
  htmlSelect += `Cita Nº: ${detalles.id}</br>`;
  htmlSelect += `Iniciada: ${ parseUtcDateWithHours( detalles.dateBegin,true, "numeral") }</br>`;
  htmlSelect += `Finalizada: ${ parseUtcDateWithHours( detalles.dateFinish,true, "numeral") }</br>`;
  if(detalles.details.diagnostico!= undefined){
    htmlSelect += `Dignóstico: ${detalles.details.diagnostico}</br>`;
    htmlSelect += `Tratamiento: ${detalles.details.tratamiento}</br>`;   
  }
  
  $("#modalBodyMedicalResume").html(htmlSelect);
}
