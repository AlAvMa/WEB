function enviar(){

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let url = "localhost:5000/usuario?email="+email+"&password="+password;

    //Llamada AJAX
    fetch(url, {
        method: 'GET',
    })
    //para recibir el resultado en formato json y esta guardado en res
    .then(res => res.json())
    .then(res => {
        //usuario existe
        if (res.result != 0){
            localStorage.setItem("id", res.result); //en main.html se accede localStorage.getItem("id");
            location.href = "main.html";
        }
        else{
            Swal.fire({
                title: "Login",
                text: "Las credenciales no son correctas",
                icon: "error"
              });
        }
    });

}
