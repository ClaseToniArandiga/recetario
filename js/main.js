// importar script de cookies
import { mostrarModalCookies, desbloquearPagina } from './cookies.js';

console.log('[MAIN.JS] Módulo cargado');

// 1. Encuentra el botón por su id

const btnMenu = document.getElementById('btn-menu');

// 2. Añade el evento clic directamente
if (btnMenu) {
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
}


// Función para inicializar cookies
function inicializarCookies() {
    console.log('[MAIN.JS] inicializarCookies() ejecutándose');
    // Verificar si el usuario ya aceptó las cookies
    const cookiesAceptadas = localStorage.getItem('cookiesAceptadas');
    console.log('[MAIN.JS] cookiesAceptadas:', cookiesAceptadas);

    if (!cookiesAceptadas) {
        // Si no ha aceptado, mostrar el modal y bloquear la página
        console.log('[MAIN.JS] Llamando a mostrarModalCookies()');
        mostrarModalCookies();
    } else {
        // Si ya aceptó, permitir el acceso normal
        console.log('[MAIN.JS] Llamando a desbloquearPagina()');
        desbloquearPagina();
    }
}

// Ejecutar inmediatamente (los módulos se cargan de forma diferida)
console.log('[MAIN.JS] Ejecutando inicialización');
console.log('[MAIN.JS] document.readyState:', document.readyState);
inicializarCookies();