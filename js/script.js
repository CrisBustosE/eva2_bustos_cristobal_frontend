// Esperamos a que el DOM cargue completamente
document.addEventListener('DOMContentLoaded', function () {

    // Capturamos los elementos del DOM
    const contactForm = document.getElementById('contact-form');
    const inputName = document.getElementById('name');
    const inputEmail = document.getElementById('email');
    const inputSubject = document.getElementById('subject');
    const inputMessage = document.getElementById('message');
    const divAlert = document.getElementById('message-alert');
    let alertTimer;

    // EVENTO 1: Validación en tiempo real al intentar enviar (CE1, CE2)
    contactForm.addEventListener('submit', function (event) {
        // Evitamos que la página se recargue (comportamiento por defecto)
        event.preventDefault();

        // Limpia un posible timer de un formulario exitoso previo que generaba race condition
        clearTimeout(alertTimer);

        let validForm = true;

        // Limpiamos clases de error previas
        contactForm.classList.remove('was-validated');

        // Modificación del DOM 1: Alteramos las clases de los inputs para dar feedback visual (CE3)
        // Validación 1: Nombre vacío
        if (inputName.value.trim() === '') {
            inputName.classList.add('is-invalid');
            validForm = false;
        } else {
            inputName.classList.remove('is-invalid');
            inputName.classList.add('is-valid');
        }

        // Validación 2: Correo con Regex (Formato válido)
        const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexCorreo.test(inputEmail.value.trim())) {
            inputEmail.classList.add('is-invalid');
            validForm = false;
        } else {
            inputEmail.classList.remove('is-invalid');
            inputEmail.classList.add('is-valid');
        }
        // Validación 2.5: Asunto (mínimo 5 caracteres)
        if (inputSubject.value.trim().length < 5) {
            inputSubject.classList.add('is-invalid');
            validForm = false;
        } else {
            inputSubject.classList.remove('is-invalid');
            inputSubject.classList.add('is-valid');
        }

        // Validación 3: Mensaje (mínimo 10 caracteres)
        if (inputMessage.value.trim().length < 10) {
            inputMessage.classList.add('is-invalid');
            validForm = false;
        } else {
            inputMessage.classList.remove('is-invalid');
            inputMessage.classList.add('is-valid');
        }

        if (validForm) {

            // Modificación del DOM 2: Cambiamos las clases del contenedor de alerta para hacerlo visible (CE3)
            // 1. Preparamos las clases visuales de Bootstrap
            divAlert.className = 'alert alert-success mt-3 d-block fade show';

            // 2. Limpiamos cualquier contenido previo de forma segura
            divAlert.textContent = '';

            // Modificación del DOM 3: Creación de nuevos elementos HTML e inyección segura en el DOM (CE3)
            // 3. Creamos la etiqueta <strong> dinámicamente
            const strongTag = document.createElement('strong');
            strongTag.textContent = '¡Éxito! ';

            // 4. Inyectamos la negrita y el texto de forma segura usando append()
            divAlert.append(strongTag, `Gracias por contactarnos, ${inputName.value}. Su mensaje ha sido enviado.`);

            // --- INICIO REQUISITO EVENTO PERSONALIZADO 'compk' (CE3 / Indicador 1.4) ---
            const compkEvent = new CustomEvent('compk', {
                detail: { status: 'Completado', user: inputName.value }
            });
            contactForm.dispatchEvent(compkEvent);
            // --- FIN REQUISITO ---

            // Limpiamos el formulario
            contactForm.reset();
            // Quitamos las clases de validación verdes
            inputName.classList.remove('is-valid');
            inputEmail.classList.remove('is-valid');
            inputSubject.classList.remove('is-valid');
            inputMessage.classList.remove('is-valid');

            // Ocultar alerta después de 5 segundos (Uso de temporizador)
            alertTimer = setTimeout(() => {
                divAlert.classList.remove('d-block');
                divAlert.classList.add('d-none');
            }, 5000);

        } else {
            // Si hay errores, mostramos mensaje de error general
            divAlert.className = 'alert alert-danger mt-3 d-block fade show';

            divAlert.textContent = ''; // Limpiamos

            const strongTagError = document.createElement('strong');
            strongTagError.textContent = 'Error: ';

            divAlert.append(strongTagError, 'Por favor, corrija los campos marcados en rojo antes de enviar.');
        }
    });

    // EVENTO 2: Interacción visual extra (CE1) - Cambiar color del botón al pasar el mouse
    const btnSend = document.getElementById('btn-send');
    btnSend.addEventListener('mouseover', function () {
        this.style.backgroundColor = 'var(--muni-yellow)';
        this.style.color = '#000';
    });
    btnSend.addEventListener('mouseout', function () {
        this.style.backgroundColor = 'var(--muni-blue)';
        this.style.color = '#fff';
    });
    // EVENTO 3: Limpiar alertas y errores visuales
    // Seleccionamos todos los campos que el usuario puede llenar (inputs y el textarea)
    const formFields = contactForm.querySelectorAll('input, textarea');

    // Le agregamos el evento 'input' a cada campo por separado
    formFields.forEach(field => {
        field.addEventListener('input', function () {
            // 1. Ocultamos la alerta general superior apenas el usuario muestra intención de corregir algo
            divAlert.classList.remove('d-block');
            divAlert.classList.add('d-none');

            // 2. Quitamos el borde rojo (error) SOLO del campo que el usuario está escribiendo en este momento
            this.classList.remove('is-invalid');

            // Extra: Quitamos también el borde verde por si está editando un campo que antes estaba correcto
            this.classList.remove('is-valid');
        });
    });

    // EVENTO 4: Click en botones para abrir Modal Genérico (CE1)
    // MODIFICACIONES DEL DOM 4 y 5 (CE3)

    const modalButtons = document.querySelectorAll('.btn-modal-info');
    const modalInstance = new bootstrap.Modal(document.getElementById('modal-generic'));
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modal-body-message');

    modalButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Extraemos la información oculta en los atributos "data-" del HTML
            const title = this.getAttribute('data-title');
            const message = this.getAttribute('data-message');

            // Modificacion del DOM 4: Cambiamos el texto del título del modal dinámicamente
            modalTitle.textContent = title;

            // Modificacion del DOM 5: Cambiamos el cuerpo del mensaje dinámicamente
            modalBody.textContent = message;

            // Mostramos el modal
            modalInstance.show();
        });
    });

    // EVENTO 5: Scroll de ventana - Botón Flotante "Volver Arriba"

    const btnGoUp = document.getElementById('btn-go-up');

    window.addEventListener('scroll', function () {
        // Si el usuario baja más de 400 píxeles, mostramos el botón
        if (window.scrollY > 400) {
            // Modificacion del DOM 6: Aparece el botón flotante modificando sus estilos en línea
            btnGoUp.style.opacity = '1';
            btnGoUp.style.visibility = 'visible';
            btnGoUp.style.transform = 'translateY(0)';
        } else {
            // Si vuelve arriba, lo volvemos a ocultar
            btnGoUp.style.opacity = '0';
            btnGoUp.style.visibility = 'hidden';
            btnGoUp.style.transform = 'translateY(20px)';
        }
    });

    // EVENTO 6: Custom Event "compk" (Requisito estricto Apunte 2 - Indicador 1.4)
    contactForm.addEventListener('compk', function (e) {
        console.log('¡Evento personalizado compk ejecutado con éxito!');
        console.log('Detalles del evento:', e.detail);
    });

      // EVENTO EXTRA ASOCIADO: Acción de volver arriba suavemente al hacer click
    btnGoUp.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' /* Hace que suba deslizando, no de golpe */
        });
    });
});