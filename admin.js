function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if (user === 'manotas' && pass === 'conejita123*') {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');

    cargarListaProductos();
  } else {
    alert('Datos incorrectos');
  }
}

function showAdmin(section) {
  document.getElementById('admin-productos').classList.add('hidden');
  document.getElementById('admin-sobremi').classList.add('hidden');

  if (section === 'productos') {
    document.getElementById('admin-productos').classList.remove('hidden');
  }

  if (section === 'sobremi') {
    document.getElementById('admin-sobremi').classList.remove('hidden');
  }
}

async function guardarProducto() {
  const nombre = document.getElementById('nombre').value;
  const precio = document.getElementById('precio').value;
  const descripcion = document.getElementById('descripcion').value;

  const imagenFile = document.getElementById('imagen').files[0];
  const pdfFile = document.getElementById('pdf').files[0];

  const imagenNombre = Date.now() + imagenFile.name;
  const pdfNombre = Date.now() + pdfFile.name;

  await supabaseClient.storage
    .from('productos')
    .upload(imagenNombre, imagenFile);

  await supabaseClient.storage
    .from('productos')
    .upload(pdfNombre, pdfFile);

  const imagenUrl = `${SUPABASE_URL}/storage/v1/object/public/productos/${imagenNombre}`;

  const pdfUrl = `${SUPABASE_URL}/storage/v1/object/public/productos/${pdfNombre}`;

  await supabaseClient
    .from('productos')
    .insert([
      {
        nombre,
        precio,
        descripcion,
        imagen: imagenUrl,
        pdf: pdfUrl
      }
    ]);

  alert('Producto guardado');

  cargarListaProductos();
}

async function cargarListaProductos() {
  const { data } = await supabaseClient
    .from('productos')
    .select('*');

  const lista = document.getElementById('lista-productos');

  lista.innerHTML = '';

  data.forEach(producto => {
    lista.innerHTML += `
      <div style="background:white;padding:15px;margin-top:15px;border-radius:12px;">
        <strong>${producto.nombre}</strong>
        <br>
        ${producto.precio}
        <br><br>
        <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
      </div>
    `;
  });
}

async function eliminarProducto(id) {
  await supabaseClient
    .from('productos')
    .delete()
    .eq('id', id);

  cargarListaProductos();
}

async function guardarSobreMi() {
  const texto = document.getElementById('texto-sobremi').value;

  const archivos = document.getElementById('galeria-input').files;

  let urls = [];

  for (const file of archivos) {
    const nombre = Date.now() + file.name;

    await supabaseClient.storage
      .from('sobremi')
      .upload(nombre, file);

    urls.push(
      `${SUPABASE_URL}/storage/v1/object/public/sobremi/${nombre}`
    );
  }

  await supabaseClient
    .from('sobre_mi')
    .upsert([
      {
        id: 1,
        texto,
        galeria: urls.join(',')
      }
    ]);

  alert('Sobre mí actualizado');
}
