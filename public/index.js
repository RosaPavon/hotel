
monstrarClientes()

let localClientes=[]

function mostrarClientes() {
    fetch("/clientes")
      .then((res) => res.json())
      .then(function (datos) {
        if (datos.error) {
          feedback("Ha habido un error");
        } else {
          imprimir(datos);
        }
      });s
  }

  
function buscar() {
    fetch(`/clientes${document.getElementById("dni2").value}`)
      .then(res => res.json())
      .then(function (datos) {
        if (datos.error) {
          feedback("Cliente no encontrado");
        } else {
          imprimir(datos);
        }
      });
  }


  function anyadir() {
    fetch("/clientes/registro", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  nombre: document.getElementById("nombre").value,
  apellido: document.getElementById("apellido").value,
  dni: document.getElementById("dni").value,

  
  }),
})
  .then(res => res.json())
  .then(function (datos) {
    datos.contenido.insertedCount >= 1
      ? imprimir(datos).localClientes=datos.contenido
      : feedback("Ha habido un error")
      
  });
}

function anyadirReserva() {
    fetch("/reservas/registro", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
  room:parseInt(document.getElementById("room").value),
  dni: document.getElementById("dni2").value,
  in: document.getElementById("fechain").value,
  out: document.getElementById("fechaout").value,

  
  }),
})
  .then(res => res.json())
  .then(function (datos) {
    datos.contenido.insertedCount >= 1
      ? imprimir(datos).localClientes=datos.contenido
      : feedback("Ha habido un error")
      
  });
}

function modificar(indice) {
    document.getElementById("editnombre").value = localClientes[indice].nombre
    document.getElementById("editapellido").value = localClientes[indice].apellido
  
  }

function imprimir(datos) {
    let parrafo = "";
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].nombre}<td><td>${datos.contenido[i].apellido}</td><td>${datos.contenido[i].dni}</td></tr>`;
    }
    document.getElementById("hotel").innerHTML = `<table><th>Nombre:</th><th>Apellido:</th><th>Dni:</th>${parrafo}</table>`;
}

function feedback(string) {
  document.getElementById("feedback").innerHTML = `<p>${string}</p>`,mostrarCliente();
}
