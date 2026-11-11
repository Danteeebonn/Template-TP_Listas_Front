let comidas = [];

const comidaContainer = document.getElementById("comidaContainer");
const agregarComidaForm = document.getElementById("agregarComidaForm");
const filtroCategoria = document.getElementById("filtroCategoria");
const filtroProvincia = document.getElementById("filtroProvincia"); // Corregido: antes apuntaba a filtroCategoria
const busqueda = document.getElementById("buscador");
const agregarIngredienteBtn = document.getElementById("agregarIngrediente");
const ingredientesContainer = document.querySelector(".contenedor-ingredientes");

// Cargar comidas en memoria desde el JSON
fetch('./data/comidas-extended.json')
  .then(response => response.json())
  .then(data => {
    comidas = data;
    mostrarComidas(comidas);
  })
  .catch(error => {
    console.error('Error al leer el archivo JSON:', error);
  });

// Función unificada para mostrar comidas (acepta cualquier array)
function mostrarComidas(arrayComidas) {
  comidaContainer.innerHTML = "";
  
  if (!arrayComidas || arrayComidas.length === 0) {
    comidaContainer.innerHTML = "<p>No se encontraron comidas.</p>";
    return;
  }

  arrayComidas.forEach(comida => {
    let ingredientesHTML = "";
    if (comida.ingredientes && Array.isArray(comida.ingredientes)) {
      ingredientesHTML = comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('');
    }

    comidaContainer.innerHTML += `
      <article class="card">
        <h2>${comida.nombre}</h2>
        <p>${comida.provincia}</p>
        <span class="categoria">${comida.categoria}</span>
        <ul>
          ${ingredientesHTML}
        </ul>
      </article>
    `;  
  });
}

// Filtrar por categoría y provincia
function filtrar() {
  let catVal = filtroCategoria.value;
  let provVal = filtroProvincia.value;

  let comidasFiltradas = comidas.filter(comida => {
    let coincideCat = catVal === "" || comida.categoria === catVal;
    let coincideProv = provVal === "" || comida.provincia === provVal;
    return coincideCat && coincideProv;
  });

  mostrarComidas(comidasFiltradas);
}

// Buscar por texto (nombre, provincia o categoría)
function buscar() {
  let textoBusq = busqueda.value.toLowerCase();

  let comidasFiltradas = comidas.filter(comida => {
    return comida.nombre.toLowerCase().includes(textoBusq) ||
           comida.provincia.toLowerCase().includes(textoBusq) ||
           comida.categoria.toLowerCase().includes(textoBusq);
  });

  mostrarComidas(comidasFiltradas);
}

// Eventos de filtros y búsqueda
if (filtroCategoria) filtroCategoria.addEventListener("change", filtrar);
if (filtroProvincia) filtroProvincia.addEventListener("change", filtrar);
if (busqueda) busqueda.addEventListener("input", buscar);

// Agregar nueva comida desde el formulario
agregarComidaForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Si usas un input separado por comas para los ingredientes:
  let ingredientesArray = event.target.ingredientes ? event.target.ingredientes.value.split(",").map(i => i.trim()) : [];

  let nuevaComida = {
    nombre: event.target.nombre.value,
    provincia: event.target.provincia.value,
    categoria: event.target.categoria.value,
    ingredientes: ingredientesArray
  };

  comidas.push(nuevaComida);
  mostrarComidas(comidas);
  event.target.reset();
});

// Agregar campo dinámico de ingrediente (si tenés ese botón en tu HTML)
if (agregarIngredienteBtn && ingredientesContainer) {
  agregarIngredienteBtn.addEventListener("click", () => {
    ingredientesContainer.innerHTML += `
      <input type="text" class="ingrediente" placeholder="Ingrediente" required>
    `;
  });
}