resetCredentials();

$("#formLogin").submit(function (e) {
  e.preventDefault();
  if ($("#register").length > 0) {
    postFetch("/register", {
      username: $("#username").val(),
      password: $("#password").val(),
      email: $("#email").val(),
    }).then((res) => {
      if (res.message == 1) {
        location.replace("/login");
      } else {
        alertify.error("Un error al crear usuario");
      }
    });
  } else {
    postFetch("/login", {
      username: $("#username").val(),
      password: $("#password").val(),
    }).then((res) => {
      if (res.token !== undefined) {
        sessionStorage.setItem("username", res.username);
        sessionStorage.setItem("token", res.token);
        location.replace(`./user/home`);
      } else {
        alertify.error("Credenciales invalidas");
        resetCredentials();
      }
    });
  }
});

$("#sendLogin").submit(function (e) {
  e.preventDefault();
});
