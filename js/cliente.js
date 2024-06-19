let g_id_cliente = "";

function agregarCliente(){
  //Variable con datos de formulario
  let txt_id_cliente = document.getElementById("txt_id_cliente").value;
  let txt_dv = document.getElementById("txt_dv").value;
  let txt_nombres= document.getElementById("txt_nombres").value;
  let txt_apellidos = document.getElementById("txt_apellidos").value;
  let txt_email = document.getElementById("txt_email").value;
  let txt_celular = document.getElementById("txt_celular").value;

  let fechaHoraActual = obtenerFechaHora()

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_cliente": txt_id_cliente,
    "dv": txt_dv,
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular,
    "fecha_registro": fechaHoraActual
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="../cliente/listar.html";
    }
    if(response.status == 400){
      alert("Error al ingresar un nuevo cliente")
    }
  })
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function listarCliente(){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente?_size=1000", requestOptions)
    .then((response) => response.json())
    .then((json) => {
      json.forEach(completarFila);
      $('#tbl_cliente').DataTable();
    })
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

function completarFila(element,index,arr){
  arr[index] = document.querySelector("#tbl_cliente tbody").innerHTML +=
  `<tr>
  <td>${element.id_cliente}</td>
  <td>${element.dv}</td>
  <td>${element.nombres}</td>
  <td>${element.apellidos}</td>
  <td>${element.email}</td>
  <td>${element.celular}</td>
  <td>${element.fecha_registro}</td>
  <td>
  <a href='actualizar.html?id=${element.id_cliente}' class='btn btn-warning btn-sm'>Actualizar</a>
  <a href='eliminar.html?id=${element.id_cliente}' class='btn btn-danger btn-sm'>Eliminar</a>
  </td>
  </tr>`
}

//Funciones para ACTUALIZAR datos clientes
function obtenerIdActualizar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id')
  g_id_cliente = p_id_cliente
  obtenerDatosActualizar(p_id_cliente)
}

function obtenerDatosActualizar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarFormularioActualizar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarFormularioActualizar(element){
  let dv = element.dv;
  document.getElementById('txt_dv').value = dv;
  let nombres = element.nombres;
  document.getElementById('txt_nombres').value = nombres;
  let apellidos = element.apellidos;
  document.getElementById('txt_apellidos').value = apellidos;
  let email = element.email;
  document.getElementById('txt_email').value = email;
  let celular = element.celular;
  document.getElementById('txt_celular').value = celular;
}

function actualizarCliente() {
  //obtenemos el valor de cliente desde el formulario
  let dv = document.getElementById("txt_dv").value;
  let nombres = document.getElementById("txt_nombres").value;
  let apellidos = document.getElementById("txt_apellidos").value;
  let email = document.getElementById("txt_email").value;
  let celular = document.getElementById("txt_celular").value;

  let fechaHoraActual = obtenerFechaHora();
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    dv,
    nombres,
    apellidos,
    email,
    celular,
    "fecha_registro": fechaHoraActual
  });
  
  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+ g_id_cliente, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="listar.html";
    }
    if(response.status == 400){
      alert("No es posible actualizar.")
    }
  })
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

//Funciones para ELIMINAR clientes
function obtenerIdEliminar(){
  const queryString = window.location.search;
  const parametros = new URLSearchParams(queryString);
  const p_id_cliente = parametros.get('id');
  g_id_cliente = p_id_cliente;
  obtenerDatosEliminar(p_id_cliente);
}

function obtenerDatosEliminar(p_id_cliente){
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente/"+p_id_cliente, requestOptions)
  .then((response) => response.json())
  .then((json) => json.forEach(completarEtiquetaEliminar))
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}

function completarEtiquetaEliminar(element){
  let nombres = element.nombres;
  document.getElementById('lbl_eliminar').innerHTML = "¿Desea eliminar al cliente <strong>"+nombres+"</strong> y todos sus datos?"
}

function eliminarCliente(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    redirect: "follow"
  };
  
  fetch("http://144.126.210.74:8080/api/cliente/"+g_id_cliente, requestOptions)
  .then((response) => {
    if(response.status == 200){
      location.href="../cliente/listar.html";
    }
    if(response.status == 400){
      alert("No es posible eliminar al cliente.")
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