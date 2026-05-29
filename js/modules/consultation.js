import { getConsultas, agregarConsulta, actualizarConsulta, getConsultasByPaciente } from './storage.js';
import { obtenerFechaHoraActual } from './helpers.js';
import { getPacienteById } from './patient.js';
import { renderizarHistorial } from './ui.js';

let editandoConsultaId = null;

export function guardarConsulta() {
    const pacienteId = document.getElementById('selectPaciente').value;
    const evolucion = document.getElementById('evolucion').value.trim();
    const planAlimentacion = document.getElementById('planAlimentacion').value.trim();
    const msgDiv = document.getElementById('consultaMsg');
    
    if (!pacienteId) {
        msgDiv.textContent = 'Seleccione un paciente';
        msgDiv.style.color = '#e74c3c';
        return;
    }
    
    if (!evolucion || !planAlimentacion) {
        msgDiv.textContent = 'Complete evolución y plan de alimentación';
        msgDiv.style.color = '#e74c3c';
        return;
    }
    
    const { fecha, hora } = obtenerFechaHoraActual();
    
    if (editandoConsultaId) {
        const consultaActualizada = {
            id: editandoConsultaId,
            pacienteId,
            fecha,
            hora,
            evolucion,
            plan: planAlimentacion
        };
        actualizarConsulta(consultaActualizada);
        msgDiv.textContent = 'Consulta actualizada correctamente';
        editandoConsultaId = null;
        document.getElementById('btnGuardarConsulta').textContent = 'Guardar Consulta';
    } else {
        const nuevaConsulta = {
            id: Date.now().toString(),
            pacienteId,
            fecha,
            hora,
            evolucion,
            plan: planAlimentacion
        };
        agregarConsulta(nuevaConsulta);
        msgDiv.textContent = 'Consulta guardada correctamente';
    }
    
    msgDiv.style.color = '#2ecc71';
    
    document.getElementById('evolucion').value = '';
    document.getElementById('planAlimentacion').value = '';
    
    cargarHistorial(pacienteId);
    
    setTimeout(() => msgDiv.textContent = '', 3000);
}

export function editarConsulta(consultaId) {
    const consultas = getConsultas();
    const consulta = consultas.find(c => c.id === consultaId);
    
    if (consulta) {
        document.getElementById('evolucion').value = consulta.evolucion;
        document.getElementById('planAlimentacion').value = consulta.plan;
        document.getElementById('selectPaciente').value = consulta.pacienteId;
        
        editandoConsultaId = consultaId;
        document.getElementById('btnGuardarConsulta').textContent = 'Guardar Cambios';
        
        const paciente = getPacienteById(consulta.pacienteId);
        if (paciente) {
            const infoDiv = document.getElementById('infoPaciente');
            infoDiv.innerHTML = `
                <strong>Paciente:</strong> ${paciente.nombre} | 
                <strong>Edad:</strong> ${paciente.edad} años | 
                <strong>Peso:</strong> ${paciente.peso} kg | 
                <strong>Altura:</strong> ${paciente.altura} m | 
                <strong>IMC:</strong> ${paciente.imc} (${paciente.diagnostico})
            `;
        }
        
        document.getElementById('consultaMsg').textContent = 'Editando consulta...';
        document.getElementById('consultaMsg').style.color = '#f39c12';
    }
}

export function cargarHistorial(pacienteId) {
    const consultas = getConsultasByPaciente(pacienteId);
    renderizarHistorial(consultas);
}