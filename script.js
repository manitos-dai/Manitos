const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click',()=>{
  sidebar.classList.toggle('active');
});

const menuButtons = document.querySelectorAll('[data-section]');

menuButtons.forEach(button=>{

  button.addEventListener('click',()=>{

    const target = button.dataset.section;

    document.getElementById('hero').style.display='none';

    document.querySelectorAll('.section').forEach(section=>{
      section.classList.remove('active');
    });

    document.getElementById(target).classList.add('active');

    sidebar.classList.remove('active');

    window.scrollTo(0,0);

  });

});

async function cargarProductos(){

  const { data } = await supabaseClient
  .from('productos')
  .select('*')
  .order('id',{ascending:false});

  const container = document.getElementById('productosContainer');

  container.innerHTML='';

  data.forEach(producto=>{

    container.innerHTML += `
      <div class="product-card">

        <img src="${producto.imagen}" alt="${producto.nombre}">

        <h3>${producto.nombre}</h3>

        <div class="price">$${producto.precio}</div>

        <a href="${producto.pdf}" target="_blank" class="card-btn">
          Ver PDF
        </a>

      </div>
    `;

  });

}

async function cargarSobreMi(){

  const { data } = await supabaseClient
  .from('sobre_mi')
  .select('*')
  .limit(1)
  .single();

  if(!data) return;

  document.getElementById('sobreContainer').innerHTML = `

    <img src="${data.imagen}" alt="Sobre mí">

    <h2>${data.titulo}</h2>

    <p>${data.texto}</p>

  `;

}

cargarProductos();
cargarSobreMi();
