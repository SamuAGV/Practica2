import { agregarCita, getCitasPendientes, eliminarCita } from './storage.js';
import { getPacienteById } from './patient.js';
import { cargarCitasPendientesUI } from './ui.js';

export function agendarCita() {
    const pacienteId = document.getElementById('selectPacienteCita').value;
    const fecha = document.getElementById('citaFecha').value;
    const hora = document.getElementById('citaHora').value;
    const motivo = document.getElementById('citaMotivo').value.trim();
    const msgDiv = document.getElementById('consultaMsg');
    
    if (!pacienteId || !fecha || !hora || !motivo) {
        alert('Complete todos los campos de la cita');
        return;
    }
    
    const paciente = getPacienteById(pacienteId);
    
    const nuevaCita = {
        id: Date.now().toString(),
        pacienteId,
        pacienteNombre: paciente.nombre,
        fecha,
        hora,
        motivo,
        estado: 'pendiente'
    };
    
    agregarCita(nuevaCita);
    
    document.getElementById('citaFecha').value = '';
    document.getElementById('citaHora').value = '';
    document.getElementById('citaMotivo').value = '';
    
    alert('Cita agendada correctamente');
    cargarCitasPendientes();
}

export function completarCita(citaId) {
    eliminarCita(citaId);
    cargarCitasPendientes();
    alert('Cita marcada como completada');
}

export function cargarCitasPendientes() {
    const citas = getCitasPendientes();
    cargarCitasPendientesUI(citas);
}