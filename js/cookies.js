// Sistema de gestión de cookies con bloqueo de página
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario ya aceptó las cookies
    const cookiesAceptadas = localStorage.getItem('cookiesAceptadas');
    
    if (!cookiesAceptadas) {
        // Si no ha aceptado, mostrar el modal y bloquear la página
        mostrarModalCookies();
    } else {
        // Si ya aceptó, permitir el acceso normal
        desbloquearPagina();
    }
});

function mostrarModalCookies() {
    // Aplicar blur y desactivar enlaces en el contenido principal
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    if (header) header.classList.add('desactivado');
    if (main) main.classList.add('desactivado');
    if (footer) footer.classList.add('desactivado');
    
    // Mostrar el modal de cookies (descomentar en HTML)
    const cookieModal = document.querySelector('.cookie-preferences');
    if (cookieModal) {
        cookieModal.style.display = 'block';
    }
    
    // Configurar los botones
    configurarBotonesCookies();
}

function desbloquearPagina() {
    // Remover blur y reactivar enlaces
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');
    
    if (header) {
        header.classList.remove('desactivado');
        header.style.filter = 'none';
        header.style.overflow = 'visible';
    }
    if (main) {
        main.classList.remove('desactivado');
        main.style.filter = 'none';
        main.style.overflow = 'visible';
    }
    if (footer) {
        footer.classList.remove('desactivado');
        footer.style.filter = 'none';
        footer.style.overflow = 'visible';
    }
    
    // Ocultar el modal
    const cookieModal = document.querySelector('.cookie-preferences');
    if (cookieModal) {
        cookieModal.style.display = 'none';
    }
}

function configurarBotonesCookies() {
    // Botón "Aceptar todas las cookies"
    const btnAceptarTodo = document.querySelector('.aceptar-todo');
    if (btnAceptarTodo) {
        btnAceptarTodo.addEventListener('click', function(e) {
            e.preventDefault();
            guardarPreferencias({
                performance: 'accept',
                experiences: 'accept',
                advertising: 'accept',
                profileAdvertising: 'accept'
            });
            localStorage.setItem('cookiesAceptadas', 'true');
            desbloquearPagina();
        });
    }
    
    // Botón "Rechazar todas las cookies"
    const btnRechazarTodo = document.querySelector('.rechazar-todo');
    if (btnRechazarTodo) {
        btnRechazarTodo.addEventListener('click', function(e) {
            e.preventDefault();
            guardarPreferencias({
                performance: 'reject',
                experiences: 'reject',
                advertising: 'reject',
                profileAdvertising: 'reject'
            });
            localStorage.setItem('cookiesAceptadas', 'true');
            desbloquearPagina();
        });
    }
    
    // Botón "Guardar preferencias"
    const btnGuardarPreferencias = document.querySelector('.cuardar-preferencias');
    if (btnGuardarPreferencias) {
        btnGuardarPreferencias.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener las preferencias seleccionadas
            const preferencias = {
                performance: document.querySelector('input[name="performance"]:checked')?.value || 'reject',
                experiences: document.querySelector('input[name="experiences"]:checked')?.value || 'reject',
                advertising: document.querySelector('input[name="advertising"]:checked')?.value || 'reject',
                profileAdvertising: document.querySelector('input[name="profile-advertising"]:checked')?.value || 'reject'
            };
            
            guardarPreferencias(preferencias);
            localStorage.setItem('cookiesAceptadas', 'true');
            desbloquearPagina();
        });
    }
}

function guardarPreferencias(preferencias) {
    // Guardar las preferencias en localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferencias));
    console.log('Preferencias de cookies guardadas:', preferencias);
}

// Función para resetear las cookies (útil para testing)
function resetearCookies() {
    localStorage.removeItem('cookiesAceptadas');
    localStorage.removeItem('cookiePreferences');
    location.reload();
}
