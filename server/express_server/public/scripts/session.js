async function validateCredentials() {
    await getFetch('/user/check/credentials', {})
    .then((res) => {
      if (res.message == 1) {
            console.log("usuario válido");
      } else{
            console.log("usuario inválido");
            location.replace("../login");
      }
    })
    .catch((err) => {
        location.replace("../login");
    });
}
