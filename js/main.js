import { protegerPanel, logout } from './modules/auth.js';
import { cargarSelectPacientes, mostrarInfoPaciente } from './modules/ui.js';
import { registrarPaciente } from './modules/patient.js';
import { guardarConsulta, editarConsulta, cargarHistorial } from './modules/consultation.js';
import { cargarDatosIniciales } from './modules/storage.js';

// Proteger acceso al panel
protegerPanel();

// Mostrar nombre del nutriólogo
const nutriologo = sessionStorage.getItem('nutriologo');
document.getElementById('nombreNutri').textContent = `${nutriologo}`;

// Cargar datos iniciales
cargarDatosIniciales();

// Eventos
document.getElementById('btnLogout').addEventListener('click', logout);
document.getElementById('btnRegistrarPaciente').addEventListener('click', registrarPaciente);
document.getElementById('selectPaciente').addEventListener('change', (e) => {
    if (e.target.value) {
        mostrarInfoPaciente(e.target.value);
        cargarHistorial(e.target.value);
    }
});
document.getElementById('btnGuardarConsulta').addEventListener('click', guardarConsulta);

// Cargar pacientes en el select
cargarSelectPacientes();

