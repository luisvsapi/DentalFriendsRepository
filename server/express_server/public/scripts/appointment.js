$(document).ready(function () {
  loadDoctors();
  loadTreatments();
});

async function loadDoctors() {
  let listDoctors;
  try {
    listDoctors = await getFetch("/user/allDoctors");
  } catch (error) {
    console.log("Error en loadDoctors:", error);
  }
  let htmlSelect = `<option value=''>Seleccione doctor</option>`;
  listDoctors.forEach((element) => {
    htmlSelect += `<option value=${element.id}>${element.userDetail.details.name}</option>`;
  });
  $("#doctorPac").html(htmlSelect);
}

async function loadTreatments() {
  let listTreatments;
  try {
    listTreatments = await getFetch("/user/allTreatments");
  } catch (error) {
    console.log("Error en loadTreatments:", error);
  }
  let htmlSelect = `<option value=''>Seleccione tratamiento</option>`;

  listTreatments.forEach((element) => {
    htmlSelect += `<option value=${element.descr.replace(/\s+/g, " ")}>${
      element.descr
    }</option>`;
  });
  $("#tratPac").html(htmlSelect);
}


$("#saveAppointment").submit(function (e) {
  var response = grecaptcha.getResponse();
  if(response.length == 0){
    alertify.error("Captcha no verificado");
  }
  else{
    e.preventDefault();
    const data = {
      idCardPacient: $("#cedPac").val(),
      namePacient: $("#nombrePac").val(),
      lastnamePacient: $("#apellidoPac").val(),
      agePacient: 0,
      genderPacient: "M",
      addressPacient: "",
      phonePacient: "0",
      emailPacient: $("#emailPac").val(),
      detailsPacient: {},
      date: $("#datepicker").val(),
      treat: $("#tratPac").val(),
      doctor: $("#doctorPac").val(),
    };
    console.log("Datos a enviar al service:", data);
    try {
      postFetch(`/appointment/setAppointment`, data).then((res) => {
        if (res.message == 1) {
          alertify.success("Cita reservada exitosamente");
        } else {
          alertify.error("Error en reservación de cita: " + res.infoAppointment);
        }
      });
    } catch (error) {
      console.log("Error en guardar cita.", error);
    }
  } 
});
