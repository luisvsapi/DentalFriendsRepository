//document.getElementById("logout").setAttribute("onclick", "resetCredentials()");
$("#myForm a").click(function (e) {
  e.preventDefault();
  $(this).tab("show");
});


$("#formRecord").submit(function (e) {
  e.preventDefault();
  if ($('#embarazo').prop('checked') ) {
    var embarazoValue = true
  };
  if ($('#antecedente1').prop('checked') ) {
    var alergiaAntibioticoV = true
  };
  if ($('#antecedente2').prop('checked') ) {
    var alergiaAnestesiaV = true
  };
  if ($('#antecedente3').prop('checked') ) {
    var hemorragiasV = true
  };
  if ($('#antecedente4').prop('checked') ) {
    var SIDAV = true
  };
  if ($('#antecedente5').prop('checked') ) {
    var asmaV = true
  };
  if ($('#antecedente6').prop('checked') ) {
    var diabetesV = true
  };
  if ($('#antecedente7').prop('checked') ) {
    var hipertensionV = true
  };
  if ($('#antecedente8').prop('checked') ) {
    var enfermedadCardiacaV = true
  };
  if ($('#antecedente9').prop('checked') ) {
    var tuberculosisV = true
  };
  const data = {
    idCardPacient: $("#id_card").val(),
    reason: $("#reason").val(),
    enfermedad: $("#enfermedad").val(),
    embarazo: embarazoValue,
    alergiaAntibiotico: alergiaAntibioticoV,
    alergiaAnestesia: alergiaAnestesiaV,
    hemorragias: hemorragiasV,
    SIDA: SIDAV,
    asma: asmaV,
    diabetes: diabetesV,
    hipertension: hipertensionV,
    enfermedadCardiaca: enfermedadCardiacaV,
    tuberculosis: tuberculosisV,
    otraenfermdad: $("#otraenfermdad").val(),
    presion:$("#presion").val(),
    frecuenciac:$("#frecuenciac").val(),
    frecuenciar: $("#frecuenciar").val(),
    temperatura: $("#temperatura").val(),
    diagnostico: $("#diagnostico").val(),
    tratamiento: $("#tratamiento").val(),
  };
   console.log("Datos a enviar al service:", data);
  try {
    postFetch("/user/setRecord", data).then((res) => {
      if (res.message == 1) {
        alertify.success("Datos Guardado Corectamente");
      } else {
        alertify.error("Error al guardar los datos");
      }
    });
  } catch (error) {
    console.log("Error al guardar los datos", error);
  }
});


function goAttention() {
  let url = "./attention";
  location.replace(url);
}


