function login(){

  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if(user === 'manotas' && pass === 'conejita123*'){

    localStorage.setItem('adminLogged','true');

    window.location.href = 'dashboard.html';

  }else{

    alert('Usuario o contraseña incorrectos');

  }
}
