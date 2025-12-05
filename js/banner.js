// Array de imágenes para el banner
const imagenesBanner = [
  "img/salmon.avif",
  "img/gazpacho.avif",
  "img/paella.avif",
  "img/tacos.avif",
  "img/tiramisu.avif",
  "img/tostada.avif",
];

// Función para obtener una imagen aleatoria
function obtenerImagenAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * imagenesBanner.length);
  return imagenesBanner[indiceAleatorio];
}

// Función para cambiar la imagen del banner
export function cambiarImagenBanner() {
  const bannerImage = document.querySelector(".banner__image");
  if (bannerImage) {
    const nuevaImagen = obtenerImagenAleatoria();
    bannerImage.src = nuevaImagen;
    bannerImage.alt = "Receta del momento";
  }
}

// Ejecutar cuando se carga la página
window.addEventListener("load", cambiarImagenBanner);
