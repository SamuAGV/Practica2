import { agregarCita, getCitasPendientes, eliminarCita, actualizarCita, getCitas } from './storage.js';
import { getPacienteById } from './patient.js';
import { cargarCitasPendientesUI } from './ui.js';

let editandoCitaId = null;

export function agendarCita() {
    const pacienteId = document.getElementById('selectPacienteCita').value;
    const fecha = document.getElementById('citaFecha').value;
    const hora = document.getElementById('citaHora').value;
    const motivo = document.getElementById('citaMotivo').value.trim();
    
    if (!pacienteId || !fecha || !hora || !motivo) {
        alert('Complete todos los campos de la cita');
        return;
    }
    
    const paciente = getPacienteById(pacienteId);
    
    if (editandoCitaId) {
        // Editar cita existente
        const citaActualizada = {
            id: editandoCitaId,
            pacienteId,
            pacienteNombre: paciente.nombre,
            fecha,
            hora,
            motivo,
            estado: 'pendiente'
        };
        actualizarCita(citaActualizada);
        alert('Cita actualizada correctamente');
        editandoCitaId = null;
        document.getElementById('btnAgendarCita').textContent = 'Agendar Cita';
        document.getElementById('btnAgendarCita').classList.remove('btn-warning');
        document.getElementById('btnAgendarCita').classList.add('btn-secondary');
    } else {
        // Nueva cita
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
        alert('Cita agendada correctamente');
    }
    
    document.getElementById('citaFecha').value = '';
    document.getElementById('citaHora').value = '';
    document.getElementById('citaMotivo').value = '';
    document.getElementById('selectPacienteCita').value = '';
    
    cargarCitasPendientes();
}

export function editarCita(citaId) {
    const citas = getCitas();
    const cita = citas.find(c => c.id === citaId);
    
    if (cita) {
        document.getElementById('selectPacienteCita').value = cita.pacienteId;
        document.getElementById('citaFecha').value = cita.fecha;
        document.getElementById('citaHora').value = cita.hora;
        document.getElementById('citaMotivo').value = cita.motivo;
        
        editandoCitaId = citaId;
        const btnAgendar = document.getElementById('btnAgendarCita');
        btnAgendar.textContent = ' Guardar Cambios Cita';
        btnAgendar.classList.remove('btn-secondary');
        btnAgendar.classList.add('btn-warning');
        
        // Hacer scroll al formulario
        document.querySelector('.card:nth-child(2)').scrollIntoView({ behavior: 'smooth' });
        
        alert('Editando cita. Modifique los campos y presione "Guardar Cambios Cita"');
    }
}

export function completarCita(citaId) {
    if (confirm('¿Marcar esta cita como completada?')) {
        eliminarCita(citaId);
        cargarCitasPendientes();
        alert('Cita marcada como completada');
    }
}

export function cargarCitasPendientes() {
    const citas = getCitasPendientes();
    cargarCitasPendientesUI(citas);
}