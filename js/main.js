// IMPORTACIONES DE OTROS MÓDULOS DE JS
import { cambiarImagenBanner } from './banner.js';

// Cambiar imagen del banner cuando se carga la página
window.addEventListener("load", cambiarImagenBanner);



// MENÚ DESPLEGABLE PARA MOBILE - DEBE IR EN UN ARCHIVO JS APARTE Y SER IMPORTADA??
// 1. Encuentra el botón por su id
const btnMenu = document.getElementById('btn-menu');

// 2. Añade el evento clic directamente
btnMenu.onclick = () => {
    // cambiar el style del menú desplegable a display:none/block
    const menuDesplegable = document.getElementById('nav');
    if (menuDesplegable.style.display === 'block') {
        menuDesplegable.style.display = 'none';
        btnMenu.src = 'img/svg/menu.svg';
    } else {
        // cambio de estilo de CSS en HTML
        menuDesplegable.style.display = 'block';
        // cambiar el contenido del atributo src de la imagen (menu.svg a menuX.svg)
        btnMenu.src = 'img/svg/menuX.svg';
    }
};