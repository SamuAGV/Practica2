export function login() {
    const nombre = document.getElementById('nombreNutriologo').value.trim();
    const errorMsg = document.getElementById('errorMsg');
    
    if (!nombre) {
        errorMsg.textContent = 'Por favor, ingrese su nombre';
        return;
    }
    
    // Guardar en sessionStorage (se borra al cerrar pestaña)
    sessionStorage.setItem('nutriologo', nombre);
    window.location.href = 'panel.html';
}

export function protegerPanel() {
    const nutriologo = sessionStorage.getItem('nutriologo');
    if (!nutriologo) {
        window.location.href = 'index.html';
    }
}

export function logout() {
    sessionStorage.removeItem('nutriologo');
    window.location.href = 'index.html';
}

