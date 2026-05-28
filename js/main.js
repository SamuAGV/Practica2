import { protegerPanel, logout } from './modules/auth.js';
import { cargarSelectPacientes, mostrarInfoPaciente, cargarSelectPacientesCitas } from './modules/ui.js';
import { registrarPaciente } from './modules/patient.js';
import { guardarConsulta, cargarHistorial } from './modules/consultation.js';
import { agendarCita, cargarCitasPendientes } from './modules/appointments.js';
import { cargarDatosIniciales } from './modules/storage.js';

protegerPanel();

const nutriologo = sessionStorage.getItem('nutriologo');
document.getElementById('nombreNutri').textContent = ` ${nutriologo}`;

cargarDatosIniciales();

document.getElementById('btnLogout').addEventListener('click', logout);
document.getElementById('btnRegistrarPaciente').addEventListener('click', registrarPaciente);
document.getElementById('btnGuardarConsulta').addEventListener('click', guardarConsulta);
document.getElementById('btnAgendarCita').addEventListener('click', agendarCita);

document.getElementById('selectPaciente').addEventListener('change', (e) => {
    if (e.target.value) {
        mostrarInfoPaciente(e.target.value);
        cargarHistorial(e.target.value);
    }
});
// Cargar datos iniciales en UI
cargarSelectPacientes();
cargarSelectPacientesCitas();
cargarCitasPendientes();