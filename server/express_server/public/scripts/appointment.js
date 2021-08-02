$(document).ready(function () {
  loadDoctors();
  loadTreatments();
});

async function loadDoctors() { 
  try {
    let listDoctors = await getFetch("/user/allDoctors");
    let htmlSelect = `<option value=''>Seleccione doctor</option>`;
    listDoctors.forEach((element) => { 
      if(element?.userDetail?.details)
        htmlSelect += `<option value=${element.id}>${element?.userDetail?.details?.name}</option>`;        
    });
    $("#doctorPac").html(htmlSelect);
  } catch (error) {
    //
  }  
}

async function loadTreatments() { 
  try {
    let listTreatments = await getFetch("/user/allTreatments");
    let htmlSelect = `<option value=''>Seleccione tratamiento</option>`;
    listTreatments.forEach((element) => {
      htmlSelect += `<option value=${element.descr.replace(/\s+/g, " ")}>${
        element.descr
      }</option>`;
    });
    $("#tratPac").html(htmlSelect);
  } catch (error) { 
    //
  } 
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
    try {
      postFetch(`/appointment/setAppointment`, data).then((res) => {
        if (res.message == 1) {
          alertify.success("Cita reservada exitosamente");
          location.reload();
        } else {
          alertify.error("Error en reservación de cita: " + res.infoAppointment);
        }
      });
    } catch (error) {
      alertify.error("Error en reservación de cita");
    }
  } 
});
