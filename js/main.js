class BannerReceta {
    constructor() {
        this.overlay = document.getElementById('banner-overlay');
        this.personasActuales = 1;
        this.recetaActual = null;
    }

    generarHTML(receta) {
        return `
            <div id="card-detalles" class="card__detalles">
                <img src="${receta.imagen}" alt="${receta.nombre}" class="card__detalles-imagen" />
                <button class="btn__cerrar--detalles" id="btn-cerrar-detalles">✕</button>
                <h2 class="titulo__receta" id="titulo-receta">${receta.nombre}</h2>
                
                <div id="div-ingrediente" class="card__detalles-ingredientes">
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
                    <div class="card__calorico"></div>
                </div>
                
                <div class="card__detalles-instrucciones">
                    <h3>Instrucciones</h3>
                    <!-- Aquí irán las instrucciones (pendiente/Dani) -->
                    <ol class="instrucciones__lista"></ol>
                </div>
            </div>
        `;
    }

    mostrar(receta) {
        this.recetaActual = receta;
        this.personasActuales = 1;
        
        // Generar el HTML del banner
        this.overlay.innerHTML = this.generarHTML(receta);
        this.overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Bloquear scroll
        
        // Actualizar ingredientes y calorías
        this.actualizarIngredientes();
        this.actualizarCalorias();
        
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
        document.removeEventListener('keydown', this.handleEscape.bind(this));
    }
}

// Crear instancia del banner
const bannerReceta = new BannerReceta();


// Datos de las recetas
const recetas = {
    'Paella de Mariscos Auténtica': {
        nombre: 'Paella de Mariscos Auténtica',
        imagen: 'img/paella-mariscos.avif',
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
        imagen: 'img/tacos-al-pastor.avif',
        ingredientes: [
            '500g de carne de cerdo',
            '100g de piña',
            '2 cucharadas de achiote',
            '1 cebolla',
            'Cilantro al gusto',
            'Tortillas de maíz'
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
        imagen: 'img/tiramisu-clasico.avif',
        ingredientes: [
            '250g de queso mascarpone',
            '200g de bizcochos de soletilla',
            '100g de azúcar',
            '3 huevos',
            'Café espresso',
            'Cacao en polvo'
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
        imagen: 'img/gazpacho-andaluz.avif',
        ingredientes: [
            '1kg de tomates maduros',
            '1 pepino',
            '1 pimiento verde',
            '1 diente de ajo',
            '50ml de aceite de oliva',
            '20ml de vinagre de vino',
            'Sal al gusto'
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
        imagen: 'img/salmon-grilado.avif',
        ingredientes: [
            '2 filetes de salmón',
            '200g de espárragos verdes',
            '2 cucharadas de aceite de oliva',
            '1 limón',
            'Sal y pimienta al gusto'
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
        imagen: 'img/tostada-aguacate-huevo.avif',
        ingredientes: [
            '2 rebanadas de pan integral',
            '1 aguacate maduro',
            '2 huevos',
            'Sal y pimienta al gusto',
            'Pimentón dulce para espolvorear'
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

