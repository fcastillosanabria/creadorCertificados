    // Función para obtener la fecha actual
    function obtenerFechaActual() {
        const hoy = new Date();
        
        // Obtenemos el día, mes y año
        const dia = hoy.getDate();
        const mes = hoy.getMonth() + 1;  // Los meses en JavaScript van de 0 a 11
        const anio = hoy.getFullYear();
        
        // Aseguramos que el mes y el día tengan siempre dos dígitos (por ejemplo, 09, 05)
        const diaFormateado = dia < 10 ? '0' + dia : dia;
        const mesFormateado = mes < 10 ? '0' + mes : mes;

        // Formateamos la fecha como "DD/MM/AAAA"
        return `${diaFormateado}/${mesFormateado}/${anio}`;
    }

    // Mostrar la fecha actual en el certificado
    window.onload = function() {
        document.getElementById("fecha-certificado").innerText = obtenerFechaActual();
    };

    document.getElementById('form-estudiante').addEventListener('submit', function(e) {
        e.preventDefault();
  
        const nombre = document.getElementById('nombre').value;
        const carrera = document.getElementById('carrera').value;
  
        const datos = { nombre, carrera };
  
        // Enviar datos al iframe
        const iframe = document.getElementById('iframe-certificado');
        iframe.contentWindow.postMessage(datos, '*'); // usar '*' o dominio exacto
      });

  const iframe = document.getElementById("iframe-certificado");
  iframe.onload = function () {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    iframe.style.height = doc.body.scrollHeight + "px";
  };
