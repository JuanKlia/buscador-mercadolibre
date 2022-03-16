function mostrarResultados(results) {
  //template permite crear html en la esctructura, que no se va a mostrar por defecto
  //sirve para duplicar el contenido de template cuantas veces necesitemos
  //al ser clones, se ven igual, y tienen las mismas clases

  const template = document.querySelector("#result-item-template"); //con id localizar al template
  const contenedor = document.querySelector(".resultados");

  //navegarlo para buscar los elementos que queremos modificar, template.content es un fragmento del documento, con todos los elementos internos
  //los elementos del template no estan en pantalla, hay que meterlos
  const titleEl = template.content.querySelector(
    ".producto-informacion-titulo"
  );

  titleEl.textContent = "Hola soy la funcion mostrarResultados";

  //se crea un clon del contenido del template, true es que es TODO el contenido
  const clon = document.importNode(template.content, true);

  //finalmente ese clon se lo pusheamos al contenedor que si tendra un resultado visual
  contenedor.appendChild(clon);
}

function creandoClonesTemplate(results) {
  const template = document.querySelector("#result-item-template");
  const contenedor = document.querySelector(".resultados");
  if (results.length == 0) {
    const noResultados = document.createElement("h1");
    noResultados.textContent = "No hay resultados en su busqueda";
    contenedor.appendChild(noResultados);
  } else {
    for (const product of results) {
      const titleEl = template.content.querySelector(
        ".producto-informacion-titulo"
      );
      titleEl.textContent = product.title;

      const precioEl = template.content.querySelector(".producto-precio");
      precioEl.textContent = "$" + product.price;

      const imagenEl = template.content.querySelector(".producto-imagen");
      imagenEl.src = product.thumbnail;

      const condicionEl = template.content.querySelector(
        ".producto-informacion-estado"
      );
      condicionEl.textContent = product.condition;

      const vendidosEl = template.content.querySelector(
        ".producto-informacion-vendidos"
      );
      vendidosEl.textContent = "Vendidos: " + product.sold_quantity;

      const clon = document.importNode(template.content, true);
      contenedor.appendChild(clon);
    }
  }
}

function removerResultados() {
  const containerEl = document.querySelector(".resultados");
  while (containerEl.lastElementChild) {
    containerEl.removeChild(containerEl.lastElementChild);
  }
}

function cantidadDeResultados(resNumb) {
  const contadorEl = document.querySelector(".contador-resultados");
  contadorEl.textContent = "Resultados: " + resNumb;
}

function main() {
  const formEl = document.querySelector(".formulario");

  formEl.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const formulario = evento.target;
    const busqueda = formulario.busqueda.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + busqueda)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        removerResultados();
        cantidadDeResultados(res.paging["total"]);
        creandoClonesTemplate(res.results);
      });
  });
}
main();
