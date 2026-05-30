
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

document.addEventListener('DOMContentLoaded', () => {
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
});
