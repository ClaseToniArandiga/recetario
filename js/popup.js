class BannerReceta {
    constructor() {
        this.overlay = document.getElementById('banner-overlay');
        this.personasActuales = 1;
        this.recetaActual = null;
    }

    generarHTML(receta) {
        return `
            <article id="card-detalles" class="card__detalles">
                <img src="${receta.imagen}" alt="${receta.nombre}" class="card__detalles-imagen" />
                <button class="btn__cerrar--detalles" id="btn-cerrar-detalles">✕</button>
                <div class="titulo-container">
                    <span class="etiqueta-categoria">${receta.categoria}</span>
                    <h2 class="titulo__receta" id="titulo-receta">${receta.nombre}</h2>
                </div>
                
                <section id="div-ingrediente" class="card__detalles-ingredientes">
                    <div class="ingredientes__header">
                        <h3>Ingredientes</h3>
                        <div class="contador-personas">
                            <button class="contador-btn" id="btn-restar">-</button>
                            <span class="contador-valor">
                                <span id="personas-cantidad">1</span>
                                <span class="contador-label">PERS</span>
                            </span>
                            <button class="contador-btn" id="btn-sumar">+</button>
                        </div>
                    </div>
                    <ul id="ingredientes-lista" class="ingredientes__lista"></ul>
                    <aside class="card__calorico"></aside>
                </section>
                
                <section class="card__detalles-instrucciones">
                    <div id="app">

                    </div>
                </section>
            </article>
        `;
    }

    mostrar(receta) {
        this.recetaActual = receta;
        
        // Cargar cantidad de personas desde localStorage (único por receta)
        const personasGuardadas = localStorage.getItem(`${receta.nombre}-personas-cantidad`);
        this.personasActuales = personasGuardadas ? parseInt(personasGuardadas) : 1;
        
        // Generar el HTML del banner
        this.overlay.innerHTML = this.generarHTML(receta);
        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll
        
        // Actualizar ingredientes y calorías
        this.actualizarIngredientes();
        this.actualizarCalorias();
        
        // Renderizar instrucciones (código de Dani)
        renderInstrucciones(receta.instrucciones);
        
        // Actualizar el contador en el HTML
        document.getElementById('personas-cantidad').textContent = this.personasActuales;
        
        // Añadir event listeners
        this.addEventListeners();
    }

    addEventListeners() {
        // Botón cerrar
        document.getElementById('btn-cerrar-detalles').addEventListener('click', () => {
            this.cerrar();
        });
        
        // Cerrar al hacer clic en el overlay (fuera del card)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.cerrar();
            }
        });
        
        // Botones del contador
        document.getElementById('btn-sumar').addEventListener('click', () => {
            this.cambiarPersonas(1);
        });

        
        document.getElementById('btn-restar').addEventListener('click', () => {
            this.cambiarPersonas(-1);
        });

        
    }

    actualizarIngredientes() {
        const lista = document.getElementById('ingredientes-lista');
        lista.innerHTML = '';
        
        this.recetaActual.ingredientes.forEach((ing, index) => {
            const li = document.createElement('li');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `ingrediente-${index}`;
            checkbox.name = `ingrediente-${index}`;
            
            const label = document.createElement('label');
            label.htmlFor = `ingrediente-${index}`;
            label.textContent = this.multiplicarCantidad(ing, this.personasActuales);
            
            li.appendChild(checkbox);
            li.appendChild(label);
            lista.appendChild(li);
        });
        // local storage para mantener el estado de los checkboxes (único por receta)
        const nombreReceta = this.recetaActual.nombre;
        const checkboxes = lista.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const storageKey = `${nombreReceta}-${checkbox.id}`;
            const savedState = localStorage.getItem(storageKey);
            if (savedState === 'checked') {
                checkbox.checked = true;
            }
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    localStorage.setItem(storageKey, 'checked');
                } else {
                    localStorage.removeItem(storageKey);
                }
            });
        });
    }

    multiplicarCantidad(ingrediente, multiplicador) {
        // Buscar números al inicio del string (ej: "300g", "1 litro", "100g")
        return ingrediente.replace(/^(\d+\.?\d*)/, (match) => {
            const numero = parseFloat(match);
            return (numero * multiplicador).toString();
        });
    }

    cambiarPersonas(delta) {
        const nuevaCantidad = this.personasActuales + delta;
        if (nuevaCantidad >= 1 && nuevaCantidad <= 20) {
            this.personasActuales = nuevaCantidad;
            document.getElementById('personas-cantidad').textContent = nuevaCantidad;
            this.actualizarIngredientes();
            this.actualizarCalorias();
            
            // Guardar cantidad de personas en localStorage (único por receta)
            localStorage.setItem(`${this.recetaActual.nombre}-personas-cantidad`, nuevaCantidad);
        }
    }

    actualizarCalorias() {
        const receta = this.recetaActual;
        const mult = this.personasActuales;
        const caloriasTotal = receta.calorias * mult;
        const porcentaje = Math.min((caloriasTotal / 800) * 100, 100);
        
        document.querySelector('.card__calorico').innerHTML = `
            <h3>Información Nutricional (por porción)</h3>
            <div class="calorias-barra">
                <span class="calorias-label">Calorías</span>
                <div class="calorias-barra-container">
                    <div class="calorias-barra-fill" style="width: ${porcentaje}%"></div>
                </div>
                <span class="calorias-valor">${caloriasTotal} kcal</span>
            </div>
            <div class="info-extra">
                <div class="info-item">
                    <span class="info-item-label">Dificultad</span>
                    <span class="info-item-valor">${receta.dificultad}</span>
                </div>
                <div class="info-item">
                    <span class="info-item-label">Tiempo</span>
                    <span class="info-item-valor">${receta.tiempo}</span>
                </div>
                <div class="info-item">
                    <span class="info-item-label">Puntuación</span>
                    <span class="info-item-valor">${receta.puntuacion}/5</span>
                </div>
            </div>
        `;
    }

    cerrar() {
        this.overlay.style.display = 'none';
        this.overlay.innerHTML = '';
        document.body.style.overflow = ''; // Restaurar scroll
        document.body.classList.remove('kitchen-mode'); // Desactivar modo cocina al cerrar
    }
}

// Crear instancia del banner
const bannerReceta = new BannerReceta();


// Datos de las recetas
const recetas = {
    'Paella de Mariscos Auténtica': {
        nombre: 'Paella de Mariscos Auténtica',
        imagen: 'img/paella.avif',
        categoria: 'ALMUERZO',
        ingredientes: [
            '300g de arroz bomba',
            '150g de camarones',
            '150g de mejillones',
            '150g de calamares',
            '1 pimiento rojo',
            '100g de guisantes',
            '1 tomate maduro',
            '1 litro de caldo de pescado',
            'Azafrán',
            'Aceite de oliva',
            'Sal al gusto'
        ],
        instrucciones: [
            { id: 1, text: "Calienta el aceite en la paellera y sofríe los calamares.", timerMinutes: 5 },
            { id: 2, text: "Añade el pimiento y el tomate rallado, sofríe bien.", timerMinutes: 5 },
            { id: 3, text: "Incorpora el caldo caliente y el azafrán, deja hervir.", timerMinutes: 5 },
            { id: 4, text: "Añade el arroz distribuyéndolo uniformemente.", timerMinutes: 2 },
            { id: 5, text: "Cocina a fuego fuerte los primeros 10 minutos.", timerMinutes: 10 },
            { id: 6, text: "Baja el fuego y añade los mariscos, cocina 10 minutos más.", timerMinutes: 10 },
            { id: 7, text: "Deja reposar tapado con un paño antes de servir.", timerMinutes: 5 }
        ],
        calorias: 450,
        proteinas: 30,
        grasas: 15,
        carbohidratos: 50,
        dificultad: 'Media',
        tiempo: '80 min',
        puntuacion: 4.8
    },
    'Tacos al Pastor': {
        nombre: 'Tacos al Pastor',
        imagen: 'img/tacos.avif',
        categoria: 'CENA',
        ingredientes: [
            '500g de carne de cerdo',
            '100g de piña',
            '2 cucharadas de achiote',
            '1 cebolla',
            'Cilantro al gusto',
            'Tortillas de maíz'
        ],
        instrucciones: [
            { id: 1, text: "Marina la carne con el achiote y especias durante al menos 2 horas.", timerMinutes: 120 },
            { id: 2, text: "Corta la piña en rodajas y la cebolla en aros.", timerMinutes: 5 },
            { id: 3, text: "Cocina la carne en una sartén o plancha a fuego alto.", timerMinutes: 15 },
            { id: 4, text: "Asa la piña junto con la carne hasta que caramelice.", timerMinutes: 5 },
            { id: 5, text: "Calienta las tortillas y arma los tacos con cilantro y cebolla.", timerMinutes: 3 }
        ],
        calorias: 300,
        proteinas: 25,
        grasas: 15,
        carbohidratos: 20,
        dificultad: 'Fácil',
        tiempo: '45 min',
        puntuacion: 4.6
    },
    'Tiramisú Clásico Italiano': {
        nombre: 'Tiramisú Clásico Italiano',
        imagen: 'img/tiramisu.avif',
        categoria: 'POSTRE',
        ingredientes: [
            '250g de queso mascarpone',
            '200g de bizcochos de soletilla',
            '100g de azúcar',
            '3 huevos',
            'Café espresso',
            'Cacao en polvo'
        ],
        instrucciones: [
            { id: 1, text: "Bate las yemas con la mitad del azúcar hasta que blanqueen.", timerMinutes: 5 },
            { id: 2, text: "Incorpora el mascarpone poco a poco a las yemas batidas.", timerMinutes: 2 },
            { id: 3, text: "Monta las claras a punto de nieve con el resto del azúcar.", timerMinutes: 5 },
            { id: 4, text: "Mezcla suavemente las claras con la crema de mascarpone con movimientos envolventes.", timerMinutes: 3 },
            { id: 5, text: "Moja rápidamente los bizcochos en el café (y licor) y haz una base en el molde.", timerMinutes: 5 },
            { id: 6, text: "Cubre con la mitad de la crema. Repite: capa de bizcochos, capa de crema.", timerMinutes: 5 },
            { id: 7, text: "Espolvorea con cacao y refrigera por al menos 4 horas.", timerMinutes: 240 }
        ],
        calorias: 450,
        proteinas: 8,
        grasas: 30,
        carbohidratos: 35,
        dificultad: 'Media',
        tiempo: '30 min',
        puntuacion: 4.9
    },
    'Gazpacho Andaluz Tradicional': {
        nombre: 'Gazpacho Andaluz Tradicional',
        imagen: 'img/gazpacho.avif',
        categoria: 'ENTRANTE',
        ingredientes: [
            '1kg de tomates maduros',
            '1 pepino',
            '1 pimiento verde',
            '1 diente de ajo',
            '50ml de aceite de oliva',
            '20ml de vinagre de vino',
            'Sal al gusto'
        ],
        instrucciones: [
            { id: 1, text: "Lava y trocea los tomates, pepino y pimiento.", timerMinutes: 3 },
            { id: 2, text: "Tritura todos los vegetales con el ajo en la batidora.", timerMinutes: 2 },
            { id: 3, text: "Añade el aceite en hilo mientras bates para emulsionar.", timerMinutes: 2 },
            { id: 4, text: "Agrega el vinagre y la sal, mezcla bien.", timerMinutes: 1 },
            { id: 5, text: "Cuela si prefieres una textura más fina.", timerMinutes: 3 },
            { id: 6, text: "Refrigera al menos 2 horas antes de servir.", timerMinutes: 120 }
        ],
        calorias: 150,
        proteinas: 3,
        grasas: 10,
        carbohidratos: 12,
        dificultad: 'Fácil',
        tiempo: '15 min',
        puntuacion: 4.5
    },
    'Salmón Grilado con Espárragos': {
        nombre: 'Salmón Grilado con Espárragos',
        imagen: 'img/salmon.avif',
        categoria: 'CENA',
        ingredientes: [
            '2 filetes de salmón',
            '200g de espárragos verdes',
            '2 cucharadas de aceite de oliva',
            '1 limón',
            'Sal y pimienta al gusto'
        ],
        instrucciones: [
            { id: 1, text: "Precalienta la parrilla o sartén a fuego medio-alto.", timerMinutes: 3 },
            { id: 2, text: "Sazona el salmón con sal, pimienta y un chorrito de limón.", timerMinutes: 2 },
            { id: 3, text: "Cocina el salmón por el lado de la piel primero.", timerMinutes: 5 },
            { id: 4, text: "Voltea y cocina hasta que esté dorado.", timerMinutes: 4 },
            { id: 5, text: "Mientras, saltea los espárragos con aceite de oliva.", timerMinutes: 5 },
            { id: 6, text: "Sirve el salmón sobre los espárragos con rodajas de limón.", timerMinutes: 1 }
        ],
        calorias: 350,
        proteinas: 40,
        grasas: 20,
        carbohidratos: 5,
        dificultad: 'Fácil',
        tiempo: '25 min',
        puntuacion: 4.7
    },
    'Tostada de Aguacate y Huevo Poché': {
        nombre: 'Tostada de Aguacate y Huevo Poché',
        imagen: 'img/tostada.avif',
        categoria: 'DESAYUNO',
        ingredientes: [
            '2 rebanadas de pan integral',
            '1 aguacate maduro',
            '2 huevos',
            'Sal y pimienta al gusto',
            'Pimentón dulce para espolvorear'
        ],
        instrucciones: [
            { id: 1, text: "Pon agua a hervir con un chorrito de vinagre.", timerMinutes: 3 },
            { id: 2, text: "Tuesta el pan hasta que esté crujiente.", timerMinutes: 3 },
            { id: 3, text: "Machaca el aguacate con sal y pimienta.", timerMinutes: 2 },
            { id: 4, text: "Crea un remolino en el agua y añade el huevo para pochar.", timerMinutes: 3 },
            { id: 5, text: "Unta el aguacate sobre las tostadas.", timerMinutes: 1 },
            { id: 6, text: "Coloca el huevo poché encima y espolvorea pimentón.", timerMinutes: 1 }
        ],
        calorias: 400,
        proteinas: 15,
        grasas: 25,
        carbohidratos: 30,
        dificultad: 'Fácil',
        tiempo: '15 min',
        puntuacion: 4.4
    }
};

/*
 * =====================================================
 * INSTRUCCIONES PARA PAU - Configuración de las Cards
 * =====================================================
 * 
 * Este código busca todos los elementos con la clase "receta-card"
 * y les añade un evento click para abrir el banner de detalles.
 * 
 * IMPORTANTE: Cada card debe tener:
 * 1. La clase "receta-card" en el elemento article/div
 * 2. Un atributo data-receta con el NOMBRE EXACTO de la receta
 * 
 * Los nombres disponibles son (deben coincidir exactamente):
 * - "Paella de Mariscos Auténtica"
 * - "Tacos al Pastor"
 * - "Tiramisú Clásico Italiano"
 * - "Gazpacho Andaluz Tradicional"
 * - "Salmón Grilado con Espárragos"
 * - "Tostada de Aguacate y Huevo Poché"
 * 
 * Ejemplo de HTML para una card:
 * <article class="receta-card" data-receta="Paella de Mariscos Auténtica">
 *     <img src="img/paella-mariscos.avif" alt="Paella">
 *     <h2>Paella de Mariscos</h2>
 * </article>
 * 
 * El diseño CSS de las cards es libre, solo necesitas la clase
 * "receta-card" y el data-receta para que funcione el click.
 * =====================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Buscar todas las cards con la clase 'receta-card'
    const recetaCards = document.querySelectorAll('.receta-card');
    
    // A cada card le añadimos un evento click
    recetaCards.forEach(card => {
        card.addEventListener('click', () => {
            // Obtener el nombre de la receta del atributo data-receta
            const nombreReceta = card.dataset.receta;
            
            // Buscar la receta en el objeto 'recetas'
            const receta = recetas[nombreReceta];
            
            // Si existe la receta, mostrar el banner
            if (receta) {
                bannerReceta.mostrar(receta);
            }
        });
    });
});


// CODIGO DE DANI
// Variables y funciones para las instrucciones de recetas con temporizadores

// Estado del temporizador global
let countdownInterval = null;

// Icono SVG del reloj (definido como constante para reusar)
const clockIcon = `
    <svg class="timer-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
`;

/**
 * Función que renderiza las instrucciones de la receta.
 * @param {Array} steps - Array de pasos de la receta
 */
function renderInstrucciones(steps) {
    const app = document.getElementById('app');
    if (!app || !steps || steps.length === 0) {
        if (app) app.innerHTML = '<p>No hay instrucciones disponibles.</p>';
        return;
    }
    
    // Construcción del HTML
    let htmlContent = `
        <div class="header">
            <h1>Instrucciones</h1>
            <div class="toggle-container">
                <label class="switch">
                    <input type="checkbox" id="kitchenModeToggle">
                    <span class="slider"></span>
                </label>
                <span>Modo Cocina</span>
            </div>
        </div>
        <ul class="step-list">
    `;

    steps.forEach(step => {
        let timerButton = '';
        if (step.timerMinutes > 0) {
            // Solo se añade el botón si tiene un temporizador asignado
            timerButton = `
                <button class="timer-btn" onclick="window.startCountdown(${step.timerMinutes})">
                    ${clockIcon}
                    Temporizador ${step.timerMinutes} min
                </button>
            `;
        }
        
        // Aseguramos que la función startCountdown esté disponible globalmente (en el window)
        // para que funcione con el atributo onclick en el HTML generado.
        htmlContent += `
            <li class="step-item">
                <div class="step-number">${step.id}</div>
                <div class="step-content">
                    <div class="step-text">${step.text}</div>
                    ${timerButton}
                </div>
            </li>
        `;
    });

    htmlContent += `</ul>`;

    // Inyectar HTML
    app.innerHTML = htmlContent;

    // Asignar el listener para el interruptor después de que se haya inyectado en el DOM
    document.getElementById('kitchenModeToggle').addEventListener('change', toggleKitchenMode);
}


/**
 * Habilita o deshabilita el Modo Cocina, cambiando el tamaño de la fuente.
 */
function toggleKitchenMode(event) {
    const isChecked = event.target.checked;
    // Si está marcado, añade la clase 'kitchen-mode' al body, activando el CSS de fuente grande
    if (isChecked) {
        document.body.classList.add('kitchen-mode');
    } else {
        document.body.classList.remove('kitchen-mode');
    }
}


// --- LÓGICA DEL TEMPORIZADOR ---

/**
 * Inicia la cuenta atrás visible en la esquina inferior izquierda.
 * Esta función se hace global para que sea accesible desde el onclick en el HTML.
 */
window.startCountdown = function(minutes) {
    const displayContainer = document.getElementById('floating-timer');
    const displayTime = document.getElementById('countdown-display');
    
    // Detener cualquier temporizador activo previo
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    let totalSeconds = minutes * 60;
    
    // Mostrar el contenedor
    displayContainer.style.display = 'flex';
    updateDisplay(totalSeconds, displayTime);

    // Iniciar intervalo
    countdownInterval = setInterval(() => {
        totalSeconds--;
        
        if (totalSeconds >= 0) {
            updateDisplay(totalSeconds, displayTime);
        } else {
            clearInterval(countdownInterval);
            // Mostrar mensaje de fin y ocultar
            displayTime.textContent = "¡FIN!";
            setTimeout(() => {
                 displayContainer.style.display = 'none';
            }, 1500); // 1.5 segundos de pausa antes de ocultar
        }
    }, 1000);
}

/**
 * Formatea los segundos restantes a formato MM:SS y actualiza el elemento DOM.
 */
function updateDisplay(seconds, element) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    // Formatear con ceros a la izquierda
    element.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}


// Las instrucciones se renderizan automáticamente cuando se abre el banner de una receta

