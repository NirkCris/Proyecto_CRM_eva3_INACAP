function agregarCliente(){
  //Variable con datos de formulario
  var txt_id_cliente = document.getElementById("txt_id_cliente").value;
  var txt_dv = document.getElementById("txt_dv").value;
  var txt_nombres= document.getElementById("txt_nombres").value;
  var txt_apellidos = document.getElementById("txt_apellidos").value;
  var txt_email = document.getElementById("txt_email").value;
  var txt_celular = document.getElementById("txt_celular").value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "id_cliente": txt_id_cliente,
    "dv": txt_dv,
    "nombres": txt_nombres,
    "apellidos": txt_apellidos,
    "email": txt_email,
    "celular": txt_celular,
    "fecha_registro": "2024-05-15 12:22:21"
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://144.126.210.74:8080/api/cliente", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}