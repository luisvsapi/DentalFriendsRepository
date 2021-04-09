resetCredentials()     

$("#formLogin").submit(function (e) {
    e.preventDefault();
    if($("#register").length > 0){
        postFetch("/register", {
            username: $("#username").val(), password: $("#password").val(), email: $("#email").val()
        }).then((res) => { 
            console.log(res);
            if (res.message == 1) {  
                location.replace('/login')            
            } else {
                alertify.error('Un error al crear usuario');
            }  
        })   
    } else {
        postFetch("/login", {
            username: $("#username").val(), password: $("#password").val()
        }).then((res) => { 
            if (res.token !== undefined) {   
                location.replace(`./`)            
            } else {
                alertify.error('Credenciales invalidas');             
                resetCredentials();      
            }
        })        
    } 
});
 
$("#sendLogin").submit(function (e) {
    e.preventDefault(); 
});


 