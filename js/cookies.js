// ============================================
// SISTEMA DE GESTIÓN DE COOKIES CON CREACIÓN DINÁMICA
// ============================================

// Exportar funciones principales
export function mostrarModalCookies() {
    console.log('[COOKIES.JS] mostrarModalCookies() llamada');

    // Crear el modal de cookies si no existe
    if (!document.querySelector('.cookie-preferences')) {
        console.log('[COOKIES.JS] Modal no existe, creando...');
        crearModalCookies();
    } else {
        console.log('[COOKIES.JS] Modal ya existe');
    }

    // Aplicar blur y desactivar enlaces en el contenido principal
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    if (header) header.classList.add('desactivado');
    if (main) main.classList.add('desactivado');
    if (footer) footer.classList.add('desactivado');

    // Mostrar el modal de cookies
    const cookieModal = document.querySelector('.cookie-preferences');
    console.log('[COOKIES.JS] Cookie modal encontrado:', !!cookieModal);
    if (cookieModal) {
        cookieModal.classList.remove('hide');
        cookieModal.classList.add('show');
        console.log('[COOKIES.JS] Modal mostrado');
    }

    // Configurar los botones
    configurarBotonesCookies();

    // Configurar enlace de política de privacidad
    configurarEnlacePolitica();
}

export function desbloquearPagina() {
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
        cookieModal.classList.remove('show');
        cookieModal.classList.add('hide');
    }
}

// ============================================
// CREAR MODAL DE COOKIES DINÁMICAMENTE
// ============================================
function crearModalCookies() {
    console.log('[COOKIES.JS] crearModalCookies() iniciando');

    // Crear section principal
    const section = document.createElement('section');
    section.className = 'cookie-preferences hide';
    console.log('[COOKIES.JS] Section creada:', section);

    // Crear formulario
    const form = document.createElement('form');
    form.action = '#';
    form.method = 'get';
    form.className = 'cookies-form';

    // HTML del modal
    form.innerHTML = `
        <article class="cookies-header">
            <h2>Datos para mejorar tu experiencia</h2>
            
            <section class="cookies-description">
                <p>
                    Para mejorar tu experiencia en nuestras plataformas
                    y poder mostrarte información más relevante,
                    utilizamos cookies y tecnologías similares, tanto
                    propiedad de Nike como de terceros, así como datos
                    enviados directamente desde nuestros servidores.
                    Puedes modificar lo que quieras en cualquier momento
                    en la sección "Privacidad" de la configuración de tu
                    cuenta o haciendo clic en el enlace "Configuración
                    de privacidad y cookies" que verás en la parte
                    inferior de Nike.com. Para más información, consulta
                    nuestra
                    <a href="#">Política de privacidad y cookies</a>.
                </p>
                <p>
                    Estrictamente necesarias (siempre activado) Permitir
                    las funcionalidades principales para desplegar tu
                    idioma, ubicación y cesta. También contribuye a la
                    seguridad, la gestión de red y la accesibilidad.
                </p>
            </section>
        </article>

        <section class="cookies-options">
            <hr />
            <p>
                Permitir el uso de datos de comportamiento para
                optimizar el rendimiento, revisar cómo interactúas con
                nuestros sitios web y aplicaciones, y mejorar las
                experiencias de Nike.
            </p>
            <div class="cookie-controls">
                <label class="radio-control">
                    <input type="radio" name="performance" value="accept" />
                    <span class="radio-label">Aceptar</span>
                </label>
                <label class="radio-control">
                    <input type="radio" name="performance" value="reject" />
                    <span class="radio-label">Rechazar</span>
                </label>
            </div>

            <hr />
            <p>
                Mediante cookies y otras tecnologías se permite el uso
                de datos de comportamiento para mejorar tu experiencia y
                ofrecerte contenido relevante en las plataformas y
                comunicaciones de Nike.
            </p>
            <div class="cookie-controls">
                <label class="radio-control">
                    <input type="radio" name="experiences" value="accept" />
                    <span class="radio-label">Aceptar</span>
                </label>
                <label class="radio-control">
                    <input type="radio" name="experiences" value="reject" />
                    <span class="radio-label">Rechazar</span>
                </label>
            </div>

            <hr />
            <p>
                Permitir compartir datos de comportamiento con socios
                publicitarios. Estos datos se utilizan para mejorar e
                informar sobre la experiencia de publicidad
                personalizada en los sitios de nuestros socios
                publicitarios.
            </p>
            <div class="cookie-controls">
                <label class="radio-control">
                    <input type="radio" name="advertising" value="accept" />
                    <span class="radio-label">Aceptar</span>
                </label>
                <label class="radio-control">
                    <input type="radio" name="advertising" value="reject" />
                    <span class="radio-label">Rechazar</span>
                </label>
            </div>

            <hr />
            <p>
                Permitir compartir tu dirección de correo electrónico y
                número de teléfono con socios publicitarios para
                personalizar la publicidad en función de tus intereses y
                medir la eficacia de la publicidad en sitios de nuestros
                socios publicitarios.
            </p>
            <div class="cookie-controls">
                <label class="radio-control">
                    <input type="radio" name="profile-advertising" value="accept" />
                    <span class="radio-label">Aceptar</span>
                </label>
                <label class="radio-control">
                    <input type="radio" name="profile-advertising" value="reject" />
                    <span class="radio-label">Rechazar</span>
                </label>
            </div>
        </section>

        <div class="form-controls">
            <button type="submit" class="cuardar-preferencias">
                Guardar preferencias
            </button>
        </div>
        <section class="footer_buttons">
            <button type="button" class="aceptar-todo">
                Aceptar todas las cookies
            </button>
            <button type="button" class="rechazar-todo">
                Rechazar todas las cookies
            </button>
        </section>
    `;

    section.appendChild(form);
    console.log('[COOKIES.JS] Form añadido a section');

    document.body.appendChild(section);
    console.log('[COOKIES.JS] Section añadida al body');
    console.log('[COOKIES.JS] Modal creado exitosamente');
}

// ============================================
// CREAR SECCIÓN DE POLÍTICA DINÁMICAMENTE
// ============================================
function crearSeccionPolitica() {
    const section = document.createElement('section');
    section.className = 'politica-privacidad hide';

    section.innerHTML = `
        <div class="politica-container">
            <div class="politica-header">
                <button class="btn-volver-cookies" aria-label="Volver a cookies">
                    ← Volver
                </button>
                <h1>Política de Privacidad y Cookies</h1>
                <p class="politica-subtitle">Transparencia y seguridad en el tratamiento de tus datos personales</p>
            </div>

            <div class="politica-content">
                <div class="politica-updated">
                    📅 Última actualización: 10 de diciembre de 2025
                </div>

                <nav class="politica-toc">
                    <h2>📑 Índice de Contenidos</h2>
                    <ul>
                        <li><a href="#pol-introduccion">1. Introducción</a></li>
                        <li><a href="#pol-responsable">2. Responsable del Tratamiento</a></li>
                        <li><a href="#pol-datos">3. Datos que Recopilamos</a></li>
                        <li><a href="#pol-finalidad">4. Finalidad del Tratamiento</a></li>
                        <li><a href="#pol-cookies">5. Política de Cookies</a></li>
                        <li><a href="#pol-derechos">6. Tus Derechos</a></li>
                        <li><a href="#pol-seguridad">7. Seguridad de los Datos</a></li>
                        <li><a href="#pol-contacto">8. Contacto</a></li>
                    </ul>
                </nav>

                <section id="pol-introduccion" class="politica-section">
                    <h2>1. Introducción</h2>
                    <p>
                        En <strong>Nombre de Tu Empresa</strong>, nos comprometemos a proteger tu privacidad y garantizar 
                        la seguridad de tus datos personales. Esta Política de Privacidad y Cookies explica cómo recopilamos, 
                        usamos, almacenamos y protegemos tu información de acuerdo con el Reglamento General de Protección 
                        de Datos (RGPD) y la Ley Orgánica de Protección de Datos y Garantía de los Derechos Digitales (LOPDGDD).
                    </p>
                    <div class="politica-highlight">
                        <p><strong>Importante:</strong> Al utilizar nuestro sitio web, aceptas los términos descritos en esta política. 
                        Te recomendamos leerla detenidamente.</p>
                    </div>
                </section>

                <section id="pol-responsable" class="politica-section">
                    <h2>2. Responsable del Tratamiento</h2>
                    <p><strong>Identidad del Responsable:</strong></p>
                    <ul>
                        <li><strong>Nombre:</strong> Nombre de Tu Empresa</li>
                        <li><strong>NIF/CIF:</strong> B-XXXXXXXX</li>
                        <li><strong>Dirección:</strong> Calle Principal, 123, 12345 Ciudad, España</li>
                        <li><strong>Teléfono:</strong> +34 900 000 000</li>
                        <li><strong>Email:</strong> info@empresa.com</li>
                    </ul>
                </section>

                <section id="pol-datos" class="politica-section">
                    <h2>3. Datos que Recopilamos</h2>
                    <p>Recopilamos diferentes tipos de información para mejorar nuestros servicios:</p>
                    
                    <h3>3.1 Datos de Identificación</h3>
                    <ul>
                        <li>Nombre y apellidos</li>
                        <li>Dirección de correo electrónico</li>
                        <li>Número de teléfono</li>
                        <li>Dirección postal</li>
                    </ul>

                    <h3>3.2 Datos de Navegación</h3>
                    <ul>
                        <li>Dirección IP</li>
                        <li>Tipo de navegador</li>
                        <li>Sistema operativo</li>
                        <li>Páginas visitadas</li>
                        <li>Tiempo de permanencia</li>
                        <li>Cookies y tecnologías similares</li>
                    </ul>
                </section>

                <section id="pol-finalidad" class="politica-section">
                    <h2>4. Finalidad del Tratamiento</h2>
                    <p>Utilizamos tus datos personales para los siguientes propósitos:</p>
                    
                    <ol>
                        <li><strong>Prestación de servicios:</strong> Gestionar y procesar tus solicitudes y pedidos.</li>
                        <li><strong>Comunicación:</strong> Responder a consultas y enviar información relevante.</li>
                        <li><strong>Marketing:</strong> Enviar newsletters y ofertas (solo con tu consentimiento).</li>
                        <li><strong>Análisis y mejora:</strong> Mejorar la experiencia del usuario y nuestros servicios.</li>
                        <li><strong>Seguridad:</strong> Proteger nuestro sitio web contra fraudes y amenazas.</li>
                        <li><strong>Cumplimiento legal:</strong> Cumplir con obligaciones legales y regulatorias.</li>
                    </ol>

                    <div class="politica-highlight">
                        <p><strong>Base legal:</strong> El tratamiento de tus datos se basa en tu consentimiento, 
                        la ejecución de un contrato, el cumplimiento de obligaciones legales y nuestro interés legítimo.</p>
                    </div>
                </section>

                <section id="pol-cookies" class="politica-section">
                    <h2>5. Política de Cookies</h2>
                    <p>
                        Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro sitio web. 
                        Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo.
                    </p>

                    <h3>5.1 Tipos de Cookies que Utilizamos</h3>
                    
                    <h4>🔸 Cookies Técnicas (Necesarias)</h4>
                    <p>Permiten la navegación y el uso de las funciones básicas del sitio web. Sin ellas, el sitio no funcionaría correctamente.</p>

                    <h4>🔸 Cookies de Análisis</h4>
                    <p>Nos ayudan a entender cómo los usuarios interactúan con el sitio web, permitiéndonos mejorar su funcionamiento.</p>

                    <h4>🔸 Cookies de Personalización</h4>
                    <p>Permiten recordar tus preferencias para ofrecerte una experiencia más personalizada.</p>

                    <h4>🔸 Cookies de Publicidad</h4>
                    <p>Se utilizan para mostrarte anuncios relevantes según tus intereses (solo con tu consentimiento).</p>

                    <h3>5.2 Gestión de Cookies</h3>
                    <p>Puedes gestionar tus preferencias de cookies en cualquier momento:</p>
                    <ul>
                        <li>A través del panel de configuración de cookies en nuestro sitio web</li>
                        <li>Desde la configuración de tu navegador</li>
                        <li>Eliminando las cookies almacenadas en tu dispositivo</li>
                    </ul>

                    <div class="politica-highlight">
                        <p><strong>Nota:</strong> Bloquear o eliminar ciertas cookies puede afectar la funcionalidad del sitio web.</p>
                    </div>
                </section>

                <section id="pol-derechos" class="politica-section">
                    <h2>6. Tus Derechos</h2>
                    <p>De acuerdo con la legislación vigente, tienes los siguientes derechos:</p>

                    <ul>
                        <li><strong>✅ Derecho de Acceso:</strong> Conocer qué datos personales tenemos sobre ti.</li>
                        <li><strong>✏️ Derecho de Rectificación:</strong> Corregir datos inexactos o incompletos.</li>
                        <li><strong>🗑️ Derecho de Supresión:</strong> Solicitar la eliminación de tus datos.</li>
                        <li><strong>🚫 Derecho de Oposición:</strong> Oponerte al tratamiento de tus datos.</li>
                        <li><strong>📦 Derecho a la Portabilidad:</strong> Recibir tus datos en formato estructurado.</li>
                        <li><strong>⏸️ Derecho de Limitación:</strong> Restringir el tratamiento de tus datos.</li>
                    </ul>

                    <div class="politica-highlight">
                        <p><strong>¿Cómo ejercer tus derechos?</strong><br>
                        Puedes ejercer tus derechos enviando un correo electrónico a <strong>info@empresa.com</strong> 
                        o mediante carta postal a nuestra dirección. Deberás acreditar tu identidad.</p>
                    </div>
                </section>

                <section id="pol-seguridad" class="politica-section">
                    <h2>7. Seguridad de los Datos</h2>
                    <p>
                        Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos personales 
                        contra el acceso no autorizado, la pérdida, la destrucción o la alteración:
                    </p>

                    <ul>
                        <li>🔐 Cifrado SSL/TLS para transmisión segura de datos</li>
                        <li>🛡️ Firewalls y sistemas de detección de intrusiones</li>
                        <li>🔑 Control de acceso restringido a datos personales</li>
                        <li>💾 Copias de seguridad regulares</li>
                        <li>👥 Formación continua del personal en protección de datos</li>
                        <li>📋 Auditorías de seguridad periódicas</li>
                    </ul>
                </section>

                <section id="pol-contacto" class="politica-section">
                    <h2>8. Contacto</h2>
                    <p>Si tienes preguntas sobre esta Política de Privacidad o sobre el tratamiento de tus datos personales, puedes contactarnos:</p>

                    <div class="politica-highlight">
                        <p><strong>📧 Email:</strong> info@empresa.com</p>
                        <p><strong>📞 Teléfono:</strong> +34 900 000 000</p>
                        <p><strong>📍 Dirección:</strong> Calle Principal, 123, 12345 Ciudad, España</p>
                        <p><strong>🕒 Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
                    </div>
                </section>
            </div>
        </div>
    `;

    document.body.appendChild(section);
}

// ============================================
// CONFIGURAR BOTONES DE COOKIES
// ============================================
function configurarBotonesCookies() {
    // Botón "Aceptar todas las cookies"
    const btnAceptarTodo = document.querySelector('.aceptar-todo');
    if (btnAceptarTodo) {
        btnAceptarTodo.addEventListener('click', function (e) {
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
        btnRechazarTodo.addEventListener('click', function (e) {
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
        btnGuardarPreferencias.addEventListener('click', function (e) {
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

// ============================================
// CONFIGURAR NAVEGACIÓN ENTRE COOKIES Y POLÍTICA
// ============================================
function configurarEnlacePolitica() {
    // Obtener el enlace "Política de privacidad y cookies"
    const enlacePolitica = document.querySelector('.cookies-description a[href="#"]');

    if (enlacePolitica) {
        enlacePolitica.addEventListener('click', function (e) {
            e.preventDefault();
            mostrarPoliticaPrivacidad();
        });
    }

    // Configurar botón "Volver" de la política
    const btnVolver = document.querySelector('.btn-volver-cookies');
    if (btnVolver) {
        btnVolver.addEventListener('click', function (e) {
            e.preventDefault();
            volverACookies();
        });
    }

    // Configurar smooth scroll para enlaces internos de la política
    configurarScrollPolitica();
}

function mostrarPoliticaPrivacidad() {
    // Crear la sección de política si no existe
    if (!document.querySelector('.politica-privacidad')) {
        crearSeccionPolitica();
        // Reconfigurar el botón volver después de crear la sección
        const btnVolver = document.querySelector('.btn-volver-cookies');
        if (btnVolver) {
            btnVolver.addEventListener('click', function (e) {
                e.preventDefault();
                volverACookies();
            });
        }
        configurarScrollPolitica();
    }

    // Ocultar el modal de cookies
    const cookieModal = document.querySelector('.cookie-preferences');
    if (cookieModal) {
        cookieModal.classList.remove('show');
        cookieModal.classList.add('hide');
    }

    // Mostrar la sección de política
    const politicaSection = document.querySelector('.politica-privacidad');
    if (politicaSection) {
        politicaSection.classList.remove('hide');
        politicaSection.classList.add('show');
        // Scroll hacia arriba suavemente
        politicaSection.scrollTop = 0;
    }
}

function volverACookies() {
    // Ocultar la política
    const politicaSection = document.querySelector('.politica-privacidad');
    if (politicaSection) {
        politicaSection.classList.remove('show');
        politicaSection.classList.add('hide');
    }

    // Mostrar el modal de cookies
    const cookieModal = document.querySelector('.cookie-preferences');
    if (cookieModal) {
        cookieModal.classList.remove('hide');
        cookieModal.classList.add('show');
    }
}

function configurarScrollPolitica() {
    // Smooth scroll para enlaces internos de la tabla de contenidos
    const enlacesInternos = document.querySelectorAll('.politica-toc a[href^="#"]');

    enlacesInternos.forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Obtener el contenedor con scroll
                const politicaSection = document.querySelector('.politica-privacidad');

                if (politicaSection) {
                    // Calcular la posición del elemento dentro del contenedor
                    const elementPosition = targetElement.offsetTop;
                    const politicaContainer = document.querySelector('.politica-container');
                    const offset = politicaContainer ? politicaContainer.offsetTop : 0;

                    // Scroll suave
                    politicaSection.scrollTo({
                        top: elementPosition - offset - 20,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// FUNCIÓN PARA RESETEAR COOKIES (útil para testing)
// ============================================
function resetearCookies() {
    localStorage.removeItem('cookiesAceptadas');
    localStorage.removeItem('cookiePreferences');
    location.reload();
}
