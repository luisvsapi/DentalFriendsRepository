document.getElementById("logout").setAttribute("onclick", "resetCredentials()");

document.addEventListener("DOMContentLoaded", function () {
  validateCredentials();
  loadUserData();
});

async function loadUserData(){
  await getFetch(`/user/byUser/data`)
    .then((usuario) => {
      document.getElementById('idCard').setAttribute('value', usuario.userDetail.identityCard);
      document.getElementById('name').setAttribute('value', usuario.userDetail.details.name);
      document.getElementById('age').setAttribute('value', usuario.userDetail.details.age);
      document.getElementById('phone').setAttribute('value', usuario.userDetail.details.phone);
      document.getElementById('recognitions').setAttribute('value', usuario.userDetail.details.recognitions[0]);
      document.getElementById('degree').setAttribute('value', usuario.userDetail.speciality);
      document.getElementById('school').setAttribute('value', usuario.userDetail.details.university);
      document.getElementById('phrase').setAttribute('value', usuario.userDetail.details.frase);
      document.getElementById('address').setAttribute('value', usuario.userDetail.address);
      //foto
    })
    .catch(err=>console.log("Error en recuperación de los datos",err));
}

$("#formProfile").submit(function (e) {
  e.preventDefault();
    const data = {
      name: $("#name").val(),
      age: $("#age").val(),
      phone: $("#phone").val(),
      recognitions: $("#recognitions").val(),
      university: $("#school").val(),
      frase: $("#phrase").val(),
      identityCard: $("#idCard").val(),
      address: $("#address").val(),
      speciality: $("#degree").val(),
    }; 
    console.log("data",data);
    postFetch("/user/formProfile", data)
    .then((res) => {
      if (res.message == 1) {
        console.log("res:", res);
        alertify.success("Datos actualizados correctamente!!");
      } else {
        alertify.error("Hubo un error al guardar!!");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});

$("#formPictureProfile").submit(function (e) {
  e.preventDefault();
  var formPicture = document.getElementById("formPictureProfile");
  postFileFetch("/user/formPictureProfile", formPicture)
    .then((res) => {
      if (res.message == 1) {
        alertify.success("Foto actualizada correctamente!!");
      } else {
        alertify.error("Hubo un error al guardar la imagen!!");
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
});
