document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. INTERACTIVIDAD DE TARJETAS (COMUNIDAD)
    // ==========================================
    const cards = document.querySelectorAll('.comunidad-card');
    
    cards.forEach(card => {
        card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease';
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // ==========================================
    // 2. FILTRADO DINÁMICO DE PROYECTOS
    // ==========================================
    const botonesFiltro = document.querySelectorAll(".btn-filtro");
    const proyectos = document.querySelectorAll(".proyecto-card");

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", () => {
            // Cambiar estado activo en los botones
            botonesFiltro.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            const categoriaSeleccionada = boton.getAttribute("data-categoria");

            // Filtrar las tarjetas de proyectos con transición
            proyectos.forEach(proyecto => {
                const categoriaProyecto = proyecto.getAttribute("data-categoria");

                if (categoriaSeleccionada === "todos" || categoriaProyecto === categoriaSeleccionada) {
                    proyecto.style.display = "flex";
                    setTimeout(() => {
                        proyecto.style.opacity = "1";
                        proyecto.style.transform = "scale(1)";
                    }, 50);
                } else {
                    proyecto.style.opacity = "0";
                    proyecto.style.transform = "scale(0.95)";
                    setTimeout(() => {
                        proyecto.style.display = "none";
                    }, 300);
                }
            });
        });
    });
});

// ==========================================
// 3. FUNCIONES DEL MODAL "UNIRME"
// ==========================================

function abrirModalUnirse() {
    // Si el modal ya está abierto, no hacemos nada para evitar duplicados
    if (document.getElementById('modal-unirse')) return;

    // Crear el contenedor principal del modal (overlay)
    const modal = document.createElement('div');
    modal.id = 'modal-unirse';
    modal.className = 'modal-overlay';

    // Inyectar la estructura HTML estilo terminal
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

    // Añadir el modal al cuerpo del documento
    document.body.appendChild(modal);

    // Asignar el evento de cierre al botón rojo de la terminal
    document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);
    
    // Cerrar si hacen clic fuera de la ventana de la terminal (en el fondo oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarModal();
    });

    // Escuchar la tecla Escape para cerrar
    document.addEventListener('keydown', escucharTeclado);

    // Escuchar el envío del formulario
    document.getElementById('form-registro').addEventListener('submit', manejarRegistro);
}

function cerrarModal() {
    const modal = document.getElementById('modal-unirse');
    if (modal) {
        modal.remove(); 
        // Limpiamos el event listener global para no dejar basura en memoria
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

    // Mensaje de éxito al estilo Malardo
    alert(`¡Bienvenido al club, ${nombre}!\n\nTe registraste correctamente en el área de [${stack.toUpperCase()}].\nRevisá tu correo: ${email} para las instrucciones.`);
    
    cerrarModal();
}
