
  const form = document.getElementById('form-estudiante');
  const toggleButton = document.getElementById('btn-toggle-carrera');
  const carreraSelect = document.getElementById('carrera-select');
  const carreraInput = document.getElementById('carrera-input');
  const nombreInput = document.getElementById('nombre');

  const nombreError = document.getElementById('nombre-error');
  const carreraError = document.getElementById('carrera-error');
  const nombreContador = document.getElementById('nombre-contador');
  const carreraContador = document.getElementById('carrera-contador');

  const aceptarCheckbox = document.getElementById('aceptarTerminos');
  const btnGenerar = document.getElementById('btnGenerar');

  let usandoInputPersonalizado = false;

  toggleButton.addEventListener('click', () => {
    usandoInputPersonalizado = !usandoInputPersonalizado;

    if (usandoInputPersonalizado) {
      carreraSelect.style.display = 'none';
      carreraInput.style.display = 'block';
      carreraInput.value = '';
      toggleButton.innerText = 'Carreras UNDC';
      carreraContador.style.display= 'block';
      carreraInput.focus();
    } else {
      carreraContador.style.display= 'none';
      carreraInput.style.display = 'none';
      carreraSelect.style.display = 'block';
      toggleButton.innerText = '¿Otra carrera?';
      carreraError.style.display = 'none';
      carreraInput.classList.remove('input-error');
    }
  });

  function capitalizarPalabras(texto) {
    return texto
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
      .join(' ');
  }

  function validarNombre(nombre) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return nombre.trim() !== '' && regex.test(nombre);
  }

  function validarCarreraPersonalizada(carrera) {
    return carrera.trim() !== '';
  }

  // ✨ EVENTO INPUT PARA NOMBRE
nombreInput.addEventListener('input', () => {
  let valorOriginal = nombreInput.value;

  // Cortar si se pasa del máximo permitido
  if (valorOriginal.length > 50) {
    valorOriginal = valorOriginal.slice(0, 50);
    nombreInput.value = valorOriginal;
  }

  // Capitalización automática (solo si no acaba en espacio)
  if (!valorOriginal.endsWith(' ')) {
    const capitalizado = capitalizarPalabras(valorOriginal);
    nombreInput.value = capitalizado;
    valorOriginal = capitalizado;
  }

  // Contador
  const longitud = valorOriginal.length;
  nombreContador.innerText = `${longitud}/50`;

  // Parpadeo si llega al máximo
  if (longitud === 50) {
    nombreInput.classList.add('parpadeo');
    nombreContador.classList.add('parpadeo');

    setTimeout(() => {
      nombreInput.classList.remove('parpadeo');
      nombreContador.classList.remove('parpadeo');
    }, 1500);
  }

  // Validación de solo letras (con espacios)
  if (validarNombre(valorOriginal)) {
    nombreError.style.display = 'none';
    nombreInput.classList.remove('input-error');
  } else {
    nombreError.style.display = 'block';
    nombreInput.classList.add('input-error');
  }
});


  // ✨ EVENTO INPUT PARA CARRERA PERSONALIZADA
carreraInput.addEventListener('input', () => {
  let valor = carreraInput.value;

  // Si excede los 20 caracteres, cortar inmediatamente
  if (valor.length > 20) {
    valor = valor.slice(0, 20);
    carreraInput.value = valor;
  }

  // Actualizar contador
  const longitud = valor.length;
  const carreraContador = document.getElementById('carrera-contador');
  carreraContador.innerText = `${longitud}/20`;

  // Parpadeo al llegar a 20
  if (longitud === 20) {
    carreraInput.classList.add('parpadeo');
    carreraContador.classList.add('parpadeo');

    setTimeout(() => {
      carreraInput.classList.remove('parpadeo');
      carreraContador.classList.remove('parpadeo');
    }, 1500);
  }

  // Validación simple (no vacío)
  if (validarCarreraPersonalizada(valor)) {
    carreraError.style.display = 'none';
    carreraInput.classList.remove('input-error');
  } else {
    carreraError.style.display = 'block';
    carreraInput.classList.add('input-error');
  }
});

aceptarCheckbox.addEventListener('change', function () {
    if (this.checked) {
      btnGenerar.disabled = false;
      btnGenerar.style.opacity = '1';
      btnGenerar.style.pointerEvents = 'auto';
    } else {
      btnGenerar.disabled = true;
      btnGenerar.style.opacity = '0.5';
      btnGenerar.style.pointerEvents = 'none';
    }
  });

  form.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombreValido = validarNombre(nombreInput.value);
  const carreraValida = usandoInputPersonalizado
    ? validarCarreraPersonalizada(carreraInput.value)
    : true;

  if (!nombreValido) {
    nombreError.style.display = 'block';
    nombreInput.classList.add('input-error');
  } else {
    nombreError.style.display = 'none';
    nombreInput.classList.remove('input-error');
  }

  if (!carreraValida) {
    carreraError.style.display = 'block';
    carreraInput.classList.add('input-error');
  } else {
    carreraError.style.display = 'none';
    carreraInput.classList.remove('input-error');
  }

  if (nombreValido && carreraValida) {
    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    modal.show();

    const nombre = encodeURIComponent(nombreInput.value);
    const carrera = encodeURIComponent(usandoInputPersonalizado ? carreraInput.value : carreraSelect.value);

    fetch(`https://script.google.com/macros/s/AKfycbyG2dA5cIU-rgKe3D7S-3rQGt5g0sfyPpk3JxRtbqemfYstbwaid6P9bEEVKTI-wPKahQ/exec?nombre=${nombre}&carrera=${carrera}`)
      .then(response => response.json())
      .then(data => {
        if(data.url){
          window.open(data.url, '_blank');
        } else {
          alert('Ocurrió un error al generar el certificado.');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al conectarse con el servidor.');
      });
  }
});