let g_id_resultado = "";

function agregarResultado(){
  //Variable con datos de formulario
  let txt_nombre_resultado = document.getElementById("txt_nombre_resultado").value;

  let fechaHoraActual = obtenerFechaHora()

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "nombre_resultado": txt_nombre_resultado,
    "fecha_registro": fechaHoraActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado", requestOptions)
  .then((response) => {
    if (response.status == 200) {
      location.href="../resultado/listar.html";
    }
    if(response.status == 400){
      alert("Error al ingresar un nuevo resultado")
    }
  })
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function listarResultado(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado?_size=1000", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_resultado').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element,index,arr){
  arr[index] = document.querySelector("#tbl_resultado tbody").innerHTML +=
  `<tr>
  <td>${element.id_resultado}</td>
  <td>${element.nombre_resultado}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_resultado}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_resultado}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}

//Funciones para ACTUALIZAR datos clientes
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id')
  g_id_resultado = p_id_resultado
  obtenerDatosActualizar(p_id_resultado)
}

function obtenerDatosActualizar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFormularioActualizar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarFormularioActualizar(element){
  let nombre_resultado = element.nombre_resultado;
  document.getElementById('txt_nombre_resultado').value = nombre_resultado;
}

function actualizarResultado() {
  //obtenemos el valor del resultado desde el formulario
  let nombre_resultado = document.getElementById("txt_nombre_resultado").value;

  let fechaHoraActual = obtenerFechaHora();
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "nombre_resultado": nombre_resultado,
    "fecha_registro": fechaHoraActual
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+ g_id_resultado, requestOptions)
  .then((response) => {
    if (response.status == 200) {
      location.href="../resultado/listar.html";
    }
    if(response.status == 400){
      alert("No es posible actualizar resultado.")
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

//Funciones para ELIMINAR clientes
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_resultado = parametros.get('id');
  g_id_resultado = p_id_resultado;
  obtenerDatosEliminar(p_id_resultado);
}

function obtenerDatosEliminar(p_id_resultado){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/resultado/"+p_id_resultado, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarEtiquetaEliminar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarEtiquetaEliminar(element){
  let nombre_resultado = element.nombre_resultado;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar el resultado <strong>"+nombre_resultado+"</strong> para siempre?"
}

function eliminarResultado(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/resultado/"+g_id_resultado, requestOptions)
  .then((response) => {
    if (response.status == 200) {
      location.href="../resultado/listar.html";
    }
    if(response.status == 400){
      alert("No es posible eliminar el resultado seleccionado.")
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