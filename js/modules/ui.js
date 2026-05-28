import { getPacientes } from './storage.js';
import { getPacienteById } from './patient.js';
import { editarConsulta } from './consultation.js';

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
    
    if (valorActual) select.value = valorActual;
}

export function mostrarInfoPaciente(pacienteId) {
    const paciente = getPacienteById(pacienteId);
    const infoDiv = document.getElementById('infoPaciente');
    
    if (paciente) {
        infoDiv.innerHTML = `
            <strong>Paciente:</strong> ${paciente.nombre} | 
            <strong>Edad:</strong> ${paciente.edad} años | 
            <strong>Peso:</strong> ${paciente.peso} kg | 
            <strong>Altura:</strong> ${paciente.altura} m | 
            <strong>IMC:</strong> ${paciente.imc} (${paciente.diagnostico})
        `;
    } else {
        infoDiv.innerHTML = '';
    }
}

export function renderizarHistorial(consultas) {
    const historialDiv = document.getElementById('historial');
    
    if (consultas.length === 0) {
        historialDiv.innerHTML = '<p style="color: #999; text-align: center;">No hay consultas previas</p>';
        return;
    }
    
    historialDiv.innerHTML = consultas.map(consulta => `
        <div class="consulta-item">
            <div class="consulta-fecha">
             ${consulta.fecha} - ${consulta.hora}
            </div>
            <div class="consulta-evolucion">
                <strong>Evolución:</strong> ${consulta.evolucion}
            </div>
            <div class="consulta-plan">
                <strong>Plan alimentación:</strong> ${consulta.plan}
            </div>
            <button class="btn-editar" data-id="${consulta.id}">✏️ Editar consulta</button>
        </div>
    `).join('');
    
    // Agregar event listeners a los botones de editar
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const consultaId = btn.getAttribute('data-id');
            editarConsulta(consultaId);
        });
    });
}

