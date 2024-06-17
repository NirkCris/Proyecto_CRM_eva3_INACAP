function agregarUsuario(){
    let txt_id_usuario = document.getElementById("txt_id_cliente").value;
    let txt_dv_usuario = document.getElementById("txt_dv_usuario").value;
    let txt_nombres_usuario = document.getElementById("txt_nombres_usuario").value;
    let txt_apellidos_usuario = document.getElementById("txt_apellidos_usuario").value;
    let txt_email_usuario = document.getElementById("txt_email_usuario").value;
    let txt_celular_usuario = document.getElementById("txt_celular_usuario").value;
    let txt_username_usuario = document.getElementById("txt_username_usuario").value;
    let txt_password_usuario = document.getElementById("txt_password_usuario").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let fechaHoraActual = obtenerFechaHora();

    const raw = JSON.stringify({
      "id_usuario": txt_id_usuario,
      "dv_usuario": txt_dv_usuario,
      "nombres_usuario": txt_nombres_usuario,
      "apellidos_usuario": txt_apellidos_usuario,
      "email_usuario": txt_email_usuario,
      "celular_usuario": txt_celular_usuario,
      "username_usuario": txt_username_usuario,
      "password_usuario": txt_password_usuario,
      "fecha_registro": fechaHoraActual
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://144.126.210.74:8080/api/usuario", requestOptions)
      .then((response) => {
        if(response.status == 200){
          location.href="listar.html";
        }
        if(response.status == 400) (
            alert("Se ha producido un error al ingresar la gestión.")
        )
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

//Funcion para listar
function listarUsuario() {
    
}