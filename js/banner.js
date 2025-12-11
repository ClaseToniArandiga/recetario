// Array de objetos con imágenes y títulos para el banner
const imagenesBanner = [
  {
    imagen: "img/salmon.avif",
    titulo: "Salmón grillado con espárragos",
    subtitulo:
      "Una cena ligera, saludable y llena de Omega-3. Perfecto para una noche entre semana.",
  },
  {
    imagen: "img/gazpacho.avif",
    titulo: "Gazpacho Andaluz Tradicional",
    subtitulo:
      "La sopa fría por excelencia del verano español. Vitaminas puras en cada cucharada.",
  },
  {
    imagen: "img/paella.avif",
    titulo: "Paella de Mariscos Auténtica",
    subtitulo:
      "Un clásico español. Arroz impregnado de sabor a mar, azafrán y un sofrito rico, cargado de mariscos frescos.",
  },
  {
    imagen: "img/tacos.avif",
    titulo: "Tacos al Pastor Caseros",
    subtitulo:
      "El rey de la calle en México. Cerdo marinado en achiote y especias, servido con piña dulce y cilantro.",
  },
  {
    imagen: "img/tiramisu.avif",
    titulo: "Tiramisú clásico italiano",
    subtitulo:
      "Postre elegante y cremoso que no requiere horno. Café intenso, mascarpone suave y cacao.",
  },
  {
    imagen: "img/tostada.avif",
    titulo: "Tostada de aguacate y huevo poché",
    subtitulo:
      "Desayuno nutritivo y delicioso con aguacate cremoso y huevo perfectamente cocido.",
  },
];

// Función para obtener una imagen aleatoria
function obtenerImagenAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * imagenesBanner.length);
  return imagenesBanner[indiceAleatorio];
}

// Función para cambiar la imagen, título y subtítulo del banner
export function cambiarImagenBanner() {
  const bannerImage = document.querySelector(".banner__image");
  const bannerTitulo = document.querySelector(".banner__title");
  const bannerDescripcion = document.querySelector(".banner__description");

  if (bannerImage && bannerTitulo && bannerDescripcion) {
    const nuevaImagen = obtenerImagenAleatoria();
    bannerImage.src = nuevaImagen.imagen;
    bannerImage.alt = nuevaImagen.titulo;
    bannerTitulo.textContent = nuevaImagen.titulo;
    bannerDescripcion.textContent = nuevaImagen.subtitulo;
  }
}

// Ejecutar cuando se carga la página
window.addEventListener("load", cambiarImagenBanner);
