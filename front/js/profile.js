window.onload = function(){

    let op = sessionStorage.getItem("op");
    let id_contacto = sessionStorage.getItem("id_contacto");

    if (op == "edit"){
        document.getElementById("boton").innerHTML ="Editar contacto";
        cargarDatos(id_contacto);
    }
    else{
        document.getElementById("bloque_id").style.display ="none";
        document.getElementById("boton").innerHTML ="Crear contacto";

    }
}

function cargarDatos(id_contacto){

    let url = "localhost:5000/contacto?id_contacto="+id_contacto;

    fetch(url, {
        method: 'GET'
    })
    .then(res => res.json())
    .then(res => {
        document.getElementById("id").value = res.id;
        document.getElementById("nombre").value = res.nombre;
        document.getElementById("apellidos").value = res.apellidos;
        document.getElementById("direccion").value = res.direccion;
        document.getElementById("email").value = res.email;
        document.getElementById("telefono").value = res.telefono;

    })
}

function operar(){

    let op = sessionStorage.getItem("op");
    
    if (op == "edit"){
        editar_contacto();
    }
    else{
        crear_contacto();
    }
}

function editar_contacto(){

    Swal.fire({
        title: "El contacto sera editado, ¿Desea continuar?",
        showCancelButton: true,
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed){
            editar();
        }
        
    })
}

function editar(){

    let id = document.getElementById("id").value;
    let nombre= document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;

    let url = "localhost:5000/contacto?id="+id+"&nombre="+nombre+
        "&apellidos="+apellidos+"&direccion="+direccion+"&email="+email+"&telefono="+telefono;
    fetch(url, {
        method: 'PUT'
    })
    .then(res => res.json())
    .then(res => {
        if (res.result != false){
            swal.fire("Editar", "Contacto editado satisfactoriamente", "success")
            .then(() => {
                sessionStorage.clear();
                location.href = "main.html";
            })
        }
        else{
            swal("Editar", "Error al editar el contacto", "error");
        }
    })
}

function crear_contacto(){

    Swal.fire({
        title: "El contacto sera creado, ¿Desea continuar?",
        showCancelButton: true,
        confirmButtonText: "OK",
    }).then((result) => {
        if (result.isConfirmed){
            crear();
        }
        
    })
}

function crear(){

    let id_usuario = document.getElementById("id").value;
    let nombre= document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let direccion = document.getElementById("direccion").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;

    let url = "localhost:5000/contacto?id_usuario="+id_usuario+"&nombre="+nombre+
        "&apellidos="+apellidos+"&direccion="+direccion+"&email="+email+"&telefono="+telefono;
    fetch(url, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(res => {
        if (res.result != false){
            swal.fire("Crear", "Contacto creado satisfactoriamente", "success")
            .then(() => {
                sessionStorage.clear();
                location.href = "main.html";
            })
        }
        else{
            swal("Crear", "Error al crear el contacto", "error");
        }
    })
}