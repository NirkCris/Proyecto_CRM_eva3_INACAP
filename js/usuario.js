let g_id_usuario = "";
//agregando los datos a la api
function agregarUsuario(){
    let txt_id_usuario = document.getElementById("txt_id_usuario").value;
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
      "dv": txt_dv_usuario,
      "nombres": txt_nombres_usuario,
      "apellidos": txt_apellidos_usuario,
      "email": txt_email_usuario,
      "celular": txt_celular_usuario,
      "username": txt_username_usuario,
      "password": txt_password_usuario,
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
          location.href="../usuario/listar.html";
        }
        if(response.status == 400) (
            alert("Se ha producido un error al ingresar al nuevo usuario.")
        )
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

//Funcion para listar usuario
function listarUsuario(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario?_size=1000", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_usuario').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element,index,arr){
  arr[index] = document.querySelector("#tbl_usuario tbody").innerHTML +=
  `<tr>
  <td>${element.id_usuario}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.username}</td>
  <td>${element.password}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_usuario}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_usuario}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}

//Funciones para ACTUALIZAR datos usuarios
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id')
  g_id_usuario = p_id_usuario
  obtenerDatosActualizar(p_id_usuario)
}

function obtenerDatosActualizar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFormularioActualizar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarFormularioActualizar(element){
  let dv_usuario = element.dv;
  document.getElementById('txt_dv_usuario').value = dv_usuario;
  let nombres_usuario = element.nombres;
  document.getElementById('txt_nombres_usuario').value = nombres_usuario;
  let apellidos_usuario = element.apellidos;
  document.getElementById('txt_apellidos_usuario').value = apellidos_usuario;
  let email_usuario = element.email;
  document.getElementById('txt_email_usuario').value = email_usuario;
  let celular_usuario = element.celular;
  document.getElementById('txt_celular_usuario').value = celular_usuario;
  let username_usuario = element.username;
  document.getElementById('txt_username_usuario').value = username_usuario;
  let password_usuario = element.password;
  document.getElementById('txt_password_usuario').value = password_usuario;
}

function actualizarUsuario() {
  //obtenemos el valor del usuario desde el formulario
  let dv_usuario = document.getElementById('txt_dv_usuario').value;
  let nombres_usuario = document.getElementById('txt_nombres_usuario').value;
  let apellidos_usuario = document.getElementById('txt_apellidos_usuario').value;
  let email_usuario = document.getElementById('txt_email_usuario').value;
  let celular_usuario = document.getElementById('txt_celular_usuario').value;
  let username_usuario = document.getElementById('txt_username_usuario').value;
  let password_usuario = document.getElementById('txt_password_usuario').value;

  let fechaHoraActual = obtenerFechaHora();
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "dv": dv_usuario,
    "nombres": nombres_usuario,
    "apellidos": apellidos_usuario,
    "email": email_usuario,
    "celular": celular_usuario,
    "username": username_usuario,
    "password": password_usuario,
    "fecha_registro": fechaHoraActual
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+ g_id_usuario, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="../usuario/listar.html";
    }
    if(response.status == 400){
      alert("No es posible actualizar el usuario.")
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

//Funciones para ELIMINAR clientes
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_usuario = parametros.get('id');
  g_id_usuario = p_id_usuario;
  obtenerDatosEliminar(p_id_usuario);
}

function obtenerDatosEliminar(p_id_usuario){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/usuario/"+p_id_usuario, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarEtiquetaEliminar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarEtiquetaEliminar(element){
  let usuario = element.id_usuario;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar el usuario <strong>"+usuario+"</strong> para siempre?"
}

function eliminarUsuario(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/usuario/"+g_id_usuario, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="../usuario/listar.html";
    }
    if(response.status == 400){
      alert("No es posible eliminar el usuario seleccionado.")
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}


function obtenerFechaHora(){
  var fechaActual = new Date();
  var fechaFormateada = fechaActual.toLocaleString('es-ES',{
    hour12:false,
    year:'numeric',
    month:'2-digit',
    day:'2-digit',
    hour:'2-digit',
    minute:'2-digit',
    second:'2-digit'
  }).replace(/(\d+)\/(\d+)\/(\d+)\,\s*(\d+):(\d+):(\d+)/,'$3-$2-$1 $4:$5:$6');
  return fechaFormateada;
}