
fetch('./data/comidas.json')          // Ruta al archivo JSON
  .then(response => response.json())  // Convertir la respuesta en JSON
  .then(data => {                     // Aquí tienes acceso al JSON en formato de objeto JS
    console.log('Comidas cargadas desde JSON:');
    console.log(data);    
    comidas = data;                   // Asignar el JSON a la variable comidas
    mostrarComidas()
  })
  .catch(error => {                   // Manejo de errores al leer el archivo JSON
    console.error('Error al leer el archivo JSON:', error);
  });


let comidas = [];


const comidasContainer = document.getElementById("comidaContainer");


function mostrarComidas(){
  comidas.forEach (comida => {
comidaContainer.innerHTML +=
`
<article class ="card">
<h2>${comida.nombre}</h2>
<p>${comida.provincia}</p>
<span class= "categoria">${comida.categoria}</span>
<ul>
${comida.ingredientes.map(ingrediente => `<li>${ingrediente}</li>`).join('')}
</article>
`
  })
}


const agregarComidaForm = document.getElementById("agregarComidaForm")
agregarComidaForm.addEventListener("submit", (event)=>{
//alert("Comida agregada:" + event.target.nombre.value)

let nuevacomida ={
nombre: event.target.nombre.value,
provincia: event.target.provincia.value,
categoria: event.target.categoria.value,
ingredientes: event.target.ingredientes.value.split(",")
}

comidas.push(nuevacomida)
mostrarComidas(comidas)
event.target.reset()
})  

const filtroCategoria=document.getElementById("filtroCategoria")
const filtroProvincia=document.getElementById("filtroProvincia")
const busqueda=document.getElementById("busqueda")

function filtrar(){
  let comidasFiltradas = comidas.filter(comida=>{
    return comida.categoria.includes(filtroCategoria.value)
        && comida.provincia.includes(filtroProvincia.value)
  })
  mostrarComidas(comidasFiltradas)
}

function buscar(){
  let comidasFiltradas= comidas.filter(comida=>{
    return comida.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
        || comida.provincia.toLowerCase().includes(busqueda.value.toLowerCase() )
        || comida.categoria.toLowerCase().includes(busqueda.value.toLowerCase() )
   })
   mostrarComidas(comidasFiltradas)
}

filtroCategoria.addEventListener("change",filtrar)
filtroProvincia.addEventListener("change",filtrar)
busqueda.addEventListener("input", buscar)


