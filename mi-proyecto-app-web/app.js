document.addEventListener('DOMContentLoaded', () => {
    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const proyectos = document.querySelectorAll(".proyecto-card");

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            const categoriaSeleccionada = boton.getAttribute("data-categoria");

            proyectos.forEach(proyecto => {
                const categoriaProyecto = proyecto.getAttribute("data-categoria");

                if (categoriaSeleccionada === "todos" || categoriaProyecto === categoriaSeleccionada) {
                    proyecto.style.display = "flex";
                    setTimeout(() => {
                        proyecto.style.opacity = "1";
                        proyecto.style.transform = "translateY(0) scale(1)";
                    }, 50);
                } else {
                    proyecto.style.opacity = "0";
                    proyecto.style.transform = "translateY(10px) scale(0.98)";
                    setTimeout(() => {
                        proyecto.style.display = "none";
                    }, 300);
                }
            });
        });
    });

    const tarjetasGlow = document.querySelectorAll('.proyecto-card, .comunidad-card, .hero-content');
    tarjetasGlow.forEach(target => {
        target.addEventListener('mousemove', (e) => {
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            target.style.setProperty('--mouse-x', `${x}px`);
            target.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    const secciones = document.querySelectorAll('.hero, #proyectos, #comunidad');
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const seccionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('seccion-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    secciones.forEach(seccion => {
        seccion.classList.add('seccion-oculta');
        seccionObserver.observe(seccion);
    });

    const tituloTerminal = document.querySelector('.terminal-body h1');
    if (tituloTerminal) {
        const textoSinPrompt = "CODEA SIN MIEDO AL EXITO REY";
        tituloTerminal.innerHTML = '<span class="prompt">//</span> ';
        let i = 0;
        function escribirLetra() {
            if (i < textoSinPrompt.length) {
                tituloTerminal.innerHTML += textoSinPrompt.charAt(i);
                i++;
                setTimeout(escribirLetra, 50);
            }
        }
        setTimeout(escribirLetra, 400);
    }
});

function abrirModalUnirse() {
    if (document.getElementById('modal-unirse')) return;

    const modal = document.createElement('div');
    modal.id = 'modal-unirse';
    modal.className = 'modal-overlay';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="terminal-header">
                <span class="dot red" id="btn-cerrar-modal" title="Cerrar"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="terminal-title">registro_malardo.sh</span>
            </div>
            <div class="modal-body">
                <h3><span class="prompt">></span> ÚNETE AL CLUB REY</h3>
                <p class="modal-subtitle">Ingresá tus datos para empezar a codear sin miedo:</p>
                <form id="form-registro">
                    <div class="form-group">
                        <label for="nombre"><i class="fa-solid fa-user"></i> Nombre:</label>
                        <input type="text" id="nombre" placeholder="Ej: Fran Esquivel" required autocomplete="name">
                    </div>
                    <div class="form-group">
                        <label for="email"><i class="fa-solid fa-envelope"></i> Email:</label>
                        <input type="email" id="email" placeholder="tu_mail@malardo.com" required autocomplete="email">
                    </div>
                    <div class="form-group">
                        <label for="stack"><i class="fa-solid fa-code"></i> Tu Stack de interés:</label>
                        <select id="stack">
                            <option value="python">Python Devs</option>
                            <option value="bd">Bases de Datos</option>
                            <option value="automation">Automatización</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-submit">
                        <i class="fa-solid fa-terminal"></i> EJECUTAR REGISTRO
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    document.addEventListener('keydown', escucharTeclado);
    document.getElementById('form-registro').addEventListener('submit', manejarRegistro);
}

function cerrarModal() {
    const modal = document.getElementById('modal-unirse');
    if (modal) {
        modal.remove();
        document.removeEventListener('keydown', escucharTeclado);
    }
}

function escucharTeclado(e) {
    if (e.key === 'Escape') cerrarModal();
}

function manejarRegistro(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const stack = document.getElementById('stack').value;

    alert(`¡Bienvenido al club, ${nombre}!\n\nTe registraste correctamente en el área de [${stack.toUpperCase()}].\nRevisá tu correo: ${email} para las instrucciones.`);
    cerrarModal();
}
