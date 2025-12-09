class CardDetalles {
    constructor() {
        this.card = document.getElementById('card-detalles');
        this.imagen = document.querySelector('.card__detalles-imagen');
        this.listaIngredientes = document.getElementById('ingredientes-lista');
        this.cardCalorico = document.querySelector('.card__calorico');
        this.tituloReceta = document.getElementById('titulo-receta');
        this.personasActuales = 1;
        this.recetaActual = null;
    }

    mostrar(receta) {
        this.card.style.display = 'grid';
        this.imagen.src = receta.imagen;
        this.imagen.alt = receta.nombre;
        this.tituloReceta.textContent = receta.nombre;
        this.recetaActual = receta;
        this.personasActuales = 1;
        
        // Resetear contador visual
        document.getElementById('personas-cantidad').textContent = '1';
        
        this.actualizarIngredientes();
        this.actualizarCalorias();
    }

    actualizarIngredientes() {
        this.listaIngredientes.innerHTML = '';
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
            this.listaIngredientes.appendChild(li);
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
        this.cardCalorico.innerHTML = `
            <h3>Información Nutricional</h3>
            <p>Calorías: ${receta.calorias * mult} kcal</p>
            <p>Proteínas: ${receta.proteinas * mult} g</p>
            <p>Grasas: ${receta.grasas * mult} g</p>
            <p>Carbohidratos: ${receta.carbohidratos * mult} g</p>
        `;
    }

    cerrar() {
        this.card.style.display = 'none';
    }
}

// Crear instancia
const cardDetalles = new CardDetalles();

// crear función para usar la clase
function mostrarDetalles(receta) {
    cardDetalles.mostrar(receta);

    // add event listener para cerrar la tarjeta al hacer clic en el btón de cerrar
    const btnCerrar = document.getElementById('btn-cerrar-detalles');
    btnCerrar.onclick = () => {
        cardDetalles.cerrar();
    };
}

// Agrgar los Arrays de ingredientes y datos nutricionales de Paella de Mariscos Auténtica, Tacos al Pastor, Tiramisú Clasico Italiano, Gazpacho Andaluz Tradicional, Salmón Grilado con Espárragos, Tostada de Aguacate y Huevo Poché.

const paellaMariscos = {
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
    carbohidratos: 50
};

const tacosAlPastor = {
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
    carbohidratos: 20
};

const tiramisuClasico = {
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
    carbohidratos: 35
};
const gazpachoAndaluz = {
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
    carbohidratos: 12
};
const salmonGrilado = {
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
    carbohidratos: 5
};
const tostadaAguacateHuevo = {
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
    carbohidratos: 30
};

// funcion para mostrar la card de detalles con los datos de la receta seleccionada 
const recetas = {
    'Paella de Mariscos Auténtica': paellaMariscos,
    'Tacos al Pastor': tacosAlPastor,
    'Tiramisú Clásico Italiano': tiramisuClasico,
    'Gazpacho Andaluz Tradicional': gazpachoAndaluz,
    'Salmón Grilado con Espárragos': salmonGrilado,
    'Tostada de Aguacate y Huevo Poché': tostadaAguacateHuevo
};

function mostrarDetallesReceta(nombreReceta) {
    const receta = recetas[nombreReceta];
    if (receta) {
        mostrarDetalles(receta);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    // Prueba inicial mostrando la Paella de Mariscos
    mostrarDetallesReceta('Paella de Mariscos Auténtica');

    // Event listeners para el contador de personas
    document.getElementById('btn-sumar').addEventListener('click', () => {
        cardDetalles.cambiarPersonas(1);
    });

    document.getElementById('btn-restar').addEventListener('click', () => {
        cardDetalles.cambiarPersonas(-1);
    });

    // Al hacer clic en una receta, mostrar los detalles
    // const recetaCards = document.querySelectorAll('.receta-card');
    
    // recetaCards.forEach(card => {
    //     card.addEventListener('click', () => {
    //         const nombreReceta = card.dataset.receta;
    //         mostrarDetallesReceta(nombreReceta);
    //     });
    // });
});

