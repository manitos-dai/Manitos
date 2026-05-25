const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');

menuToggle.addEventListener('click',()=>{

  sideMenu.classList.toggle('active');

});

function showSection(id){

  document.getElementById('hero').style.display='none';

  const sections = document.querySelectorAll('.section');

  sections.forEach(section=>{

    section.classList.remove('active');

  });

  document.getElementById(id).classList.add('active');

  sideMenu.classList.remove('active');
}

async function cargarProductos(){

  try{

    const { data,error } = await supabaseClient
    .from('productos')
    .select('*');

    if(error){

      console.log(error);
      return;

    }

    const container = document.getElementById('productosContainer');

    container.innerHTML='';

    data.forEach(producto=>{

      container.innerHTML += `

      <div class="card">

        <img src="${producto.imagen}">

        <h3>${producto.nombre}</h3>

        <p>$ ${producto.precio}</p>

        <a
        class="card-btn"
        href="${producto.pdf}"
        target="_blank"
        >
        Ver PDF
        </a>

      </div>

      `;

    });

  }catch(err){

    console.log(err);

  }
}

async function cargarSobreMi(){

  try{

    const { data,error } = await supabaseClient
    .from('sobre_mi')
    .select('*')
    .limit(1)
    .single();

    if(error){

      console.log(error);
      return;

    }

    document.getElementById('sobreMiContainer').innerHTML = `

      <img src="${data.imagen}">

      <p>${data.texto}</p>

    `;

  }catch(err){

    console.log(err);

  }
}

cargarProductos();
cargarSobreMi();
