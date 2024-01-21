document.addEventListener('DOMContentLoaded', function() {
  var header = document.querySelector('header h1');
  header.addEventListener('click', function() {
    alert('¡Has hecho clic en el encabezado!');
  });

  var secciones = document.querySelectorAll('section');
  secciones.forEach(function(seccion) {
    seccion.addEventListener('mouseover', function() {
      this.style.backgroundColor = '#e0e0e0';
    });

    seccion.addEventListener('mouseout', function() {
      this.style.backgroundColor = '#fff';
    });
  });
});
