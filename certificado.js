const nombrePorDefecto = 'Juan Pérez';
  const carreraPorDefecto = 'Ingeniería de Sistemas';

  window.addEventListener('message', function(event) {
    const { nombre, carrera } = event.data;

    if (nombre !== undefined) {
      document.getElementById('nombre').innerText = nombre.trim() || nombrePorDefecto;
    }

    if (carrera !== undefined) {
      document.getElementById('carrera').innerText = carrera.trim() || carreraPorDefecto;
    }
  });

  // Mostrar fecha actual al cargar
  window.onload = function() {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0');
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0');
    const anio = hoy.getFullYear();
    document.getElementById('fecha').innerText = `${dia}/${mes}/${anio}`;
  };