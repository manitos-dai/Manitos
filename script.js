const sections = ['productos', 'sobreMi', 'sesiones'];

const ingresarBtn = document.getElementById('ingresar-btn');
const landing = document.getElementById('landing');
const mainSite = document.getElementById('main-site');
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

ingresarBtn.addEventListener('click', () => {

  landing.style.opacity = '0';
  landing.style.transition = '0.6s';

  setTimeout(() => {

    landing.style.display = 'none';

    mainSite.classList.remove('hidden');

    showSection('productos');

  }, 600);

});

menuToggle.addEventListener('click', () => {
  menu.classList.toggle('hidden-menu');
});

function showSection(id) {

  sections.forEach(section => {
    document.getElementById(section).classList.add('hidden');
  });

  document.getElementById(id).classList.remove('hidden');
}

async function cargarProductos() {

  const { data } = await supabaseClient
    .from('productos')
    .select('*');

  const container = document.getElementById('productos-container');

  container.innerHTML = '';

  data.forEach(producto => {

    container.innerHTML += `
      <div class="card">
        <img src="${producto.imagen}" />

        <h3>${producto.nombre}</h3>

        <p>${producto.descripcion || ''}</p>

        <strong>${producto.precio}</strong>

        <br>

        <a href="${producto.pdf}" target="_blank">
          📄 Ver PDF
        </a>
      </div>
    `;

  });
}

async function cargarSobreMi() {

  const { data } = await supabaseClient
    .from('sobre_mi')
    .select('*')
    .limit(1)
    .single();

  document.getElementById('sobre-mi-texto').innerHTML = `
    <p>${data.texto}</p>
  `;

  const galeria = document.getElementById('galeria');

  galeria.innerHTML = '';

  const imagenes = data.galeria
    ? data.galeria.split(',')
    : [];

  imagenes.forEach(img => {

    galeria.innerHTML += `
      <img src="${img.trim()}" />
    `;

  });
}

cargarProductos();
cargarSobreMi();
