import { protegerPanel, logout } from './modules/auth.js';
import { cargarSelectPacientes, mostrarInfoPaciente, cargarSelectPacientesCitas, cargarCitasPendientesUI } from './modules/ui.js';
import { registrarPaciente } from './modules/patient.js';
import { guardarConsulta, cargarHistorial } from './modules/consultation.js';
import { agendarCita, cargarCitasPendientes } from './modules/appointments.js';
import { cargarDatosIniciales, limpiarTodosLosDatos, getPacientes, getConsultas, getCitas } from './modules/storage.js';

protegerPanel();

const nutriologo = sessionStorage.getItem('nutriologo');
document.getElementById('nombreNutri').textContent = ` ${nutriologo}`;

cargarDatosIniciales();

function limpiarDatos() {
    if (confirm('¿Estás seguro? Esto eliminará TODOS los pacientes, consultas y citas. Esta acción no se puede deshacer.')) {
        limpiarTodosLosDatos();
        
        cargarDatosIniciales();
        
        cargarSelectPacientes();
        cargarSelectPacientesCitas();
        cargarCitasPendientes();
        
        document.getElementById('infoPaciente').innerHTML = '';
        document.getElementById('historial').innerHTML = '<p style="color: #a0aec0; text-align: center; padding: 40px;">No hay consultas previas</p>';
        document.getElementById('selectPaciente').value = '';
        document.getElementById('selectPacienteCita').value = '';
        
        alert('Todos los datos han sido limpiados. Se han cargado datos de ejemplo.');
    }
}

document.getElementById('btnLogout').addEventListener('click', logout);
document.getElementById('btnLimpiarDatos').addEventListener('click', limpiarDatos);
document.getElementById('btnRegistrarPaciente').addEventListener('click', registrarPaciente);
document.getElementById('btnGuardarConsulta').addEventListener('click', guardarConsulta);
document.getElementById('btnAgendarCita').addEventListener('click', agendarCita);

document.getElementById('selectPaciente').addEventListener('change', (e) => {
    if (e.target.value) {
        mostrarInfoPaciente(e.target.value);
        cargarHistorial(e.target.value);
    }
});

cargarSelectPacientes();
cargarSelectPacientesCitas();
cargarCitasPendientes();