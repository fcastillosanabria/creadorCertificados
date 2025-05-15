  const nombreInput = document.getElementById('nombre');
  const carreraSelect = document.getElementById('carrera-select');
  const carreraInput = document.getElementById('carrera-input');
  const toggleButton = document.getElementById('btn-toggle-carrera');
  const iframe = document.getElementById('iframe-certificado');

  let usandoInputPersonalizado = false;

  function enviarCampo(campo, valor) {
    const mensaje = {};
    mensaje[campo] = valor;
    iframe.contentWindow.postMessage(mensaje, '*');
  }

  nombreInput.addEventListener('input', () => {
    enviarCampo('nombre', nombreInput.value);
  });

  carreraSelect.addEventListener('change', () => {
    if (!usandoInputPersonalizado) {
      enviarCampo('carrera', carreraSelect.value);
    }
  });

  carreraInput.addEventListener('input', () => {
    if (usandoInputPersonalizado) {
      enviarCampo('carrera', carreraInput.value);
    }
  });

  toggleButton.addEventListener('click', () => {
    usandoInputPersonalizado = !usandoInputPersonalizado;

    if (usandoInputPersonalizado) {
      carreraSelect.style.display = 'none';
      carreraInput.style.display = 'block';
      toggleButton.innerText = 'Carreras UNDC';
      enviarCampo('carrera', carreraInput.value);
      carreraInput.focus();
    } else {
      carreraInput.style.display = 'none';
      carreraSelect.style.display = 'block';
      toggleButton.innerText = '¿Otra carrera?';
      enviarCampo('carrera', carreraSelect.value);
    }
  });
