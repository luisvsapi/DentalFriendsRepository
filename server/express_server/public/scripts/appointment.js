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
    htmlSelect += `<option value=${element.id}>${element['user_detail.details'].name}</option>`;
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
  e.preventDefault();
  const data = {
    id_card_pacient: $("#cedPac").val(),
    name_pacient: $("#nombrePac").val(),
    lastname_pacient: $("#apellidoPac").val(),
    age_pacient: 0,
    gender_pacient: "M",
    address_pacient: "",
    phone_pacient: "0",
    email_pacient: $("#emailPac").val(),
    details_pacient: {},
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
});
