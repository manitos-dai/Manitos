function login(){

  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if(user === 'manotas' && pass === 'conejita123*'){

    alert('Login correcto');

  }else{

    alert('Datos incorrectos');

  }
}
