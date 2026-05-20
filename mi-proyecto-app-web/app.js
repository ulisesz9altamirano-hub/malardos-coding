// Funciones para manejar el cartel flotante (Modal) de Login
function mostrarModal() {
    document.getElementById('login-modal').classList.remove('hidden');
}

function cerrarModal() {
    document.getElementById('login-modal').classList.add('hidden');
}

// Función para simular el inicio de sesión
function procesarLogin(event) {
    event.preventDefault(); // Evita que la página se recargue
    
    const email = document.getElementById('email').value;
    
    // Simulamos que el login fue exitoso
    cerrarModal();
    
    // Cambiamos los botones de la barra de navegación
    document.getElementById('btn-login-nav').classList.add('hidden');
    
    const userBadge = document.getElementById('user-badge');
    userBadge.classList.remove('hidden');
    userBadge.innerText = `¡Hola, ${email.split('@')[0]}! 💪`;
}