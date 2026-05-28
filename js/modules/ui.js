import { getPacientes } from './storage.js';
import { getPacienteById } from './patient.js';
import { editarConsulta } from './consultation.js';
import { completarCita } from './appointments.js';

export function cargarSelectPacientes() {
    const pacientes = getPacientes();
    const select = document.getElementById('selectPaciente');
    const valorActual = select.value;
    
    select.innerHTML = '<option value="">-- Seleccionar paciente --</option>';
    
    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = `${paciente.nombre} - IMC: ${paciente.imc} (${paciente.diagnostico})`;
        select.appendChild(option);
    });
    
    if (valorActual && pacientes.find(p => p.id === valorActual)) select.value = valorActual;
}

export function cargarSelectPacientesCitas() {
    const pacientes = getPacientes();
    const select = document.getElementById('selectPacienteCita');
    const valorActual = select.value;
    
    select.innerHTML = '<option value="">-- Seleccionar paciente --</option>';
    
    pacientes.forEach(paciente => {
        const option = document.createElement('option');
        option.value = paciente.id;
        option.textContent = paciente.nombre;
        select.appendChild(option);
    });
    
    if (valorActual && pacientes.find(p => p.id === valorActual)) select.value = valorActual;
}

export function mostrarInfoPaciente(pacienteId) {
    const paciente = getPacienteById(pacienteId);
    const infoDiv = document.getElementById('infoPaciente');
    
    if (paciente) {
        infoDiv.innerHTML = `
            <strong>${paciente.nombre}</strong> | 
            Edad: ${paciente.edad} años | 
            Peso: ${paciente.peso} kg | 
            Altura: ${paciente.altura} m | 
            IMC: ${paciente.imc} (${paciente.diagnostico})
        `;
    } else {
        infoDiv.innerHTML = '';
    }
}

export function renderizarHistorial(consultas) {
    const historialDiv = document.getElementById('historial');
    
    if (consultas.length === 0) {
        historialDiv.innerHTML = '<p style="color: #a0aec0; text-align: center; padding: 40px;">No hay consultas previas</p>';
        return;
    }
    
    historialDiv.innerHTML = consultas.map(consulta => `
        <div class="consulta-item">
            <div class="consulta-fecha">
                ${consulta.fecha} -  ${consulta.hora}
            </div>
            <div class="consulta-evolucion">
                <strong>Evolución:</strong> ${consulta.evolucion}
            </div>
            <div class="consulta-plan">
                <strong>Plan alimentación:</strong> ${consulta.plan}
            </div>
            <button class="btn-editar" data-id="${consulta.id}">✏️ Editar</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const consultaId = btn.getAttribute('data-id');
            editarConsulta(consultaId);
        });
    });
}

export function cargarCitasPendientesUI(citas) {
    const citasDiv = document.getElementById('citasPendientes');
    
    if (citas.length === 0) {
        citasDiv.innerHTML = '<p style="color: #a0aec0; text-align: center; padding: 20px;">No hay citas pendientes</p>';
        return;
    }
    
    citasDiv.innerHTML = citas.map(cita => `
        <div class="cita-item">
            <div class="cita-fecha">
                ${cita.fecha} -  ${cita.hora}
            </div>
            <div><strong>Paciente:</strong> ${cita.pacienteNombre}</div>
            <div class="cita-motivo"><strong>Motivo:</strong> ${cita.motivo}</div>
            <button class="btn-completar" data-id="${cita.id}">✓ Completar</button>
        </div>
    `).join('');
    
    document.querySelectorAll('.btn-completar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const citaId = btn.getAttribute('data-id');
            completarCita(citaId);
        });
    });
}