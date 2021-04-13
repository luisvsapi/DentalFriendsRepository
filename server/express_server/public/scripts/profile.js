$("#formProfile").submit(function(e){
    e.preventDefault();
    putFetch("/user/formProfile", {
        idCard: $("#id_card").val(),
        picture_url: $("#picture_url").val(),
        address: $("#address").val(),
        degree: $("#degree").val(), 
        birth: $("#birth").val(), 
        age: $("#age").val(), 
        phone: $("#phone").val(),
        recog: $("#recognitions").val(),
        school: $("#school").val(),
        phrase: $("#phrase").val(),
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