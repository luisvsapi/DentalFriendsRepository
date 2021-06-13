console.log("Validando credenciales - DEBUG - BORRAR FIN DEV")

if([null, ""].includes(sessionStorage.getItem("username")) || 
    [null, ""].includes(sessionStorage.getItem("token"))) {
    location.replace("/login");
}

