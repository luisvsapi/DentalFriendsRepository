$('#myForm a').click(function(e) {
    e.preventDefault();
    $(this).tab('show');
  })

  
$("#formRecord").submit(function(e){
  e.preventDefault();
  putFetch("/user/formRecord", {
      idCard: $("#id_card").val(),
      name: $("#name").val(),
      lastname: $("#lastname").val(),
      gender: $("#gender").val(),
      age: $("#age").val(), 
      address: $("#address").val(),
      phone: $("#phone").val(),
      email: $("#email").val(),
  }).then((res) => {
      if (res.message == 1) {
          alertify.success('Datos Guardados Satisfactoriamente');
      } else {
          alertify.error('Hubo un error al guardar los datos!!');
      }
  }).catch(err=>{ 
      console.log(err.message);
  })
});