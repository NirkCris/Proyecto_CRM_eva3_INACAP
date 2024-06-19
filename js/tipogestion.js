//Variables globales
var g_id_tipo_gestion ="";

function agregarTipoGestion(){
  //obtenemos el valor de tipo de gestion desde el formulario
  var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    "nombre_tipo_gestion": nombre_tipo_gestion,
    "fecha_registro": "2024-04-23 12:46:30"
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  fetch("http://144.126.210.74:8080/api/tipo_gestion", requestOptions)
    .then((response) => {
      if(response.status == 200){
        location.href="listar.html";
      }
      if(response.status == 400){
        alert("No es posible agregar tipo de gestión")
      }
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function listarTipoGestion() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion?_size=200", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_tipo_gestion').DataTable();

    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element,index,arr) {
  arr[index] = document.querySelector("#tbl_tipo_gestion tbody").innerHTML +=
  `<tr>
  <td>${element.id_tipo_gestion}</td>
  <td>${element.nombre_tipo_gestion}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_tipo_gestion}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_tipo_gestion}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}

function obtenerIdActualizar() {
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosActualizar(p_id_tipo_gestion);
}


function obtenerDatosActualizar (p_id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFormulario))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function obtenerIdEliminar() {
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_tipo_gestion = parametros.get('id');
  g_id_tipo_gestion = p_id_tipo_gestion;
  obtenerDatosEliminar(p_id_tipo_gestion);
}

function obtenerDatosEliminar (p_id_tipo_gestion) {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+p_id_tipo_gestion, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarEtiquetaEliminar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarEtiquetaEliminar(element,index,arr) {
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar el tipo de gestión <strong>"+ nombre_tipo_gestion +"</strong> para siempre?";
}

function eliminarTipoGestion() {
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="listar.html";
    }
    if(response.status == 400){
      alert("No se puede eliminar el tipo de gestión")
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarFormulario(element,index,arr) {
  var nombre_tipo_gestion = element.nombre_tipo_gestion;
  document.getElementById('txt_nombre_tipo_gestion').value = nombre_tipo_gestion;
}

function actualizarTipoGestion() {
  //obtenemos el valor de tipo de gestion desde el formulario
  var nombre_tipo_gestion = document.getElementById("txt_nombre_tipo_gestion").value;

  let fechaHoraActual = obtenerFechaHora();
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "nombre_tipo_gestion": nombre_tipo_gestion,
    "fecha_registro": fechaHoraActual
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/tipo_gestion/"+ g_id_tipo_gestion, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="listar.html";
    }
    if(response.status == 400){
      alert("No es posible actualizar el tipo de gestión")
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}


