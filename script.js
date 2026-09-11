// ============================================
// DATOS — catálogo real de RetroLab
// ============================================
const camisetas = [
  {
    id: 'boca-97-local',
    name: 'Boca Juniors 1997 Local',
    team: 'Boca Juniors',
    year: '1997',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/q_auto,f_auto/boca-97-local-1.jpg',
    type: 'Local',
    era: '90s',
    category: 'clubes',
    description: 'Un ícono xeneize de los 90',
    isAvailable: true,
    immediateStock: ['L'],
  },
  {
    id: 'argentina-84-local',
    name: 'Argentina 1984 Local',
    team: 'Argentina',
    year: '1984',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/v1787627192/argentina-84-local-1.jpg',
    type: 'Local',
    era: '80s',
    category: 'selecciones',
    description: 'La Albiceleste en una de sus épocas más icónicas',
    isAvailable: true,
    immediateStock: ['M', 'L'],
  },
  {
    id: 'francia-96-away',
    name: 'Francia 1996 Visitante',
    team: 'Francia',
    year: '1996',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/v1787627192/francia-96-away-1.jpg',
    type: 'Visitante',
    era: '90s',
    category: 'selecciones',
    description: 'Les Bleus en una de sus camisetas más recordadas de los 90',
    isAvailable: true,
    immediateStock: ['L'],
  },
  {
    id: 'lazio-98-away',
    name: 'Lazio 1998 Visitante',
    team: 'Lazio',
    year: '1998',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/v1787627192/lazio-98-away-11.jpg',
    type: 'Visitante',
    era: '90s',
    category: 'clubes',
    description: 'Una pieza clásica de la Lazio de finales de los 90',
    isAvailable: true,
    immediateStock: ['L'],
  },
  {
    id: 'inter-97-local',
    name: 'Inter 1997 Local',
    team: 'Inter',
    year: '1997',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/v1787627192/inter-97-local-1.jpg',
    type: 'Local',
    era: '90s',
    category: 'clubes',
    description: 'Las icónicas rayas nerazzurri en una camiseta clásica de los 90',
    isAvailable: true,
    immediateStock: ['L'],
  },
  {
    id: 'united-92-local',
    name: 'Manchester United 1992 Local',
    team: 'Manchester United',
    year: '1992',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/v1787627192/united-92-local-11.jpg',
    type: 'Local',
    era: '90s',
    category: 'clubes',
    description: 'Una pieza clásica de los Red Devils en el inicio de una era histórica',
    isAvailable: true,
    immediateStock: ['L'],
  },
  {
    id: 'francia-98-away',
    name: 'Francia 1998 Visitante',
    team: 'Francia',
    year: '1998',
    price: 125000,
    image: 'https://res.cloudinary.com/dvfdblmct/image/upload/v1787627192/francia-98-away-2.jpg',
    type: 'Visitante',
    era: '90s',
    category: 'selecciones',
    description: 'La camiseta visitante de Les Bleus en el histórico Mundial de 1998',
    isAvailable: true,
    immediateStock: ['M', 'L', 'XL'],
  },
];

// Formato de precio en pesos colombianos
const formatoPrecio = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

// ============================================
// CATÁLOGO — generación dinámica del DOM
// ============================================
const catalogoGrid = document.getElementById('catalogo-grid');

function crearTarjeta(camiseta) {
  const tarjeta = document.createElement('article');
  tarjeta.className = 'camiseta-card';

  tarjeta.innerHTML = `
    <div class="imagen-wrapper">
      <img src="${camiseta.image}" alt="Camiseta ${camiseta.name}, versión ${camiseta.type}">
      <span class="badge ${camiseta.isAvailable ? 'disponible' : 'agotado'}">
        ${camiseta.isAvailable ? 'Disponible ya' : 'Agotado'}
      </span>
    </div>
    <div class="info">
      <h3>${camiseta.name}</h3>
      <p>${camiseta.description}</p>
      <p class="precio">${formatoPrecio.format(camiseta.price)}</p>
    </div>
  `;

  return tarjeta;
}

function renderizarCatalogo(lista) {
  catalogoGrid.innerHTML = '';
  lista.forEach((camiseta) => {
    catalogoGrid.appendChild(crearTarjeta(camiseta));
  });
}

// Primer render: todo el catálogo
renderizarCatalogo(camisetas);

// ============================================
// FILTRO POR CATEGORÍA
// ============================================
const botonesFiltro = document.querySelectorAll('#filtros button');

function filtrarPorCategoria(categoria) {
  if (categoria === 'todos') {
    return camisetas;
  }
  return camisetas.filter((c) => c.category === categoria);
}

botonesFiltro.forEach((boton) => {
  boton.addEventListener('click', () => {
    // Quitar la clase activo de todos y ponerla solo en el que se hizo clic
    botonesFiltro.forEach((b) => b.classList.remove('activo'));
    boton.classList.add('activo');

    const categoriaSeleccionada = boton.dataset.categoria;
    const camisetasFiltradas = filtrarPorCategoria(categoriaSeleccionada);
    renderizarCatalogo(camisetasFiltradas);
  });
});

// ============================================
// MENÚ HAMBURGUESA (móvil)
// ============================================
const botonMenu = document.getElementById('menu-toggle');
const menuNav = document.querySelector('#nav-menu ul');

botonMenu.addEventListener('click', () => {
  const estaAbierto = menuNav.classList.toggle('nav-abierto');
  botonMenu.setAttribute('aria-expanded', estaAbierto);
});