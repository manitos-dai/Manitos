const loginScreen = document.getElementById('loginScreen');
const adminWrapper = document.getElementById('adminWrapper');

const USER = 'CONEJITA';
const PASS = 'meme356*';

const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click',()=>{

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username === USER && password === PASS){

    loginScreen.style.display='none';
    adminWrapper.style.display='block';

    cargarAdminProductos();
    cargarDatosSobreMi();

  }else{

    alert('Usuario o contraseña incorrectos');

  }

});

async function agregarProducto(){

  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;

  const pdfFile = document.getElementById('pdf').files[0];
  const imageFile = document.getElementById('imagen').files[0];

  if(!pdfFile || !imageFile){
    alert('Debes subir PDF e imagen');
    return;
  }

  const pdfName = Date.now() + '-' + pdfFile.name;
  const imageName = Date.now() + '-' + imageFile.name;

  await supabaseClient.storage
  .from(PRODUCTOS_BUCKET)
  .upload(pdfName,pdfFile);

  await supabaseClient.storage
  .from(PRODUCTOS_BUCKET)
  .upload(imageName,imageFile);

  const pdfUrl = supabaseClient.storage
  .from(PRODUCTOS_BUCKET)
  .getPublicUrl(pdfName).data.publicUrl;

  const imageUrl = supabaseClient.storage
  .from(PRODUCTOS_BUCKET)
  .getPublicUrl(imageName).data.publicUrl;

  await supabaseClient
  .from('productos')
  .insert([{
    nombre,
    precio,
    pdf:pdfUrl,
    imagen:imageUrl
  }]);

  alert('Producto agregado');

  cargarAdminProductos();

}

async function cargarAdminProductos(){

  const { data } = await supabaseClient
  .from('productos')
  .select('*')
  .order('id',{ascending:false});

  const container = document.getElementById('adminProductos');

  container.innerHTML='';

  data.forEach(producto=>{

    container.innerHTML += `

      <div class="admin-product">

        <h3>${producto.nombre}</h3>

        <p>$${producto.precio}</p>

        <button class="delete-btn" onclick="eliminarProducto(${producto.id})">
          Eliminar
        </button>

      </div>

    `;

  });

}

async function eliminarProducto(id){

  await supabaseClient
  .from('productos')
  .delete()
  .eq('id',id);

  cargarAdminProductos();

}

async function guardarSobreMi(){

  const titulo = document.getElementById('sobreTitulo').value;
  const texto = document.getElementById('sobreTexto').value;

  const imageFile = document.getElementById('sobreImagen').files[0];

  let imageUrl = '';

  if(imageFile){

    const imageName = Date.now() + '-' + imageFile.name;

    await supabaseClient.storage
    .from(SOBREMI_BUCKET)
    .upload(imageName,imageFile);

    imageUrl = supabaseClient.storage
    .from(SOBREMI_BUCKET)
    .getPublicUrl(imageName).data.publicUrl;

  }

  await supabaseClient
  .from('sobre_mi')
  .upsert([
    {
      id:1,
      titulo,
      texto,
      imagen
    }
  ]);

  alert('Información guardada');

}

async function cargarDatosSobreMi(){

  const { data } = await supabaseClient
  .from('sobre_mi')
  .select('*')
  .limit(1)
  .single();

  if(!data) return;

  document.getElementById('sobreTitulo').value = data.titulo || '';
  document.getElementById('sobreTexto').value = data.texto || '';
  document.getElementById('sobreImagen').value = data.imagen || '';

}

document.getElementById('guardarProducto')
.addEventListener('click',agregarProducto);


document.getElementById('guardarSobre')
.addEventListener('click',guardarSobreMi);
