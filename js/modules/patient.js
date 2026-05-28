import { getPacientes, agregarPaciente, savePacientes } from './storage.js';
import { calcularIMC, obtenerDiagnostico } from './helpers.js';
import { cargarSelectPacientes } from './ui.js';

export function registrarPaciente() {
    const nombre = document.getElementById('pacienteNombre').value.trim();
    const edad = parseInt(document.getElementById('pacienteEdad').value);
    const peso = parseFloat(document.getElementById('pacientePeso').value);
    const altura = parseFloat(document.getElementById('pacienteAltura').value);
    const msgDiv = document.getElementById('pacienteMsg');
    
    if (!nombre || isNaN(edad) || isNaN(peso) || isNaN(altura)) {
        msgDiv.textContent = 'Complete todos los campos';
        msgDiv.style.color = '#dc3545';
        return;
    }
    
    const imc = calcularIMC(peso, altura);
    const diagnostico = obtenerDiagnostico(imc);
    
    const paciente = {
        id: Date.now().toString(),
        nombre,
        edad,
        peso,
        altura,
        imc,
        diagnostico
    };
    
    agregarPaciente(paciente);
    
    // Limpiar formulario
    document.getElementById('pacienteNombre').value = '';
    document.getElementById('pacienteEdad').value = '';
    document.getElementById('pacientePeso').value = '';
    document.getElementById('pacienteAltura').value = '';
    
    msgDiv.textContent = `Paciente ${nombre} registrado. IMC: ${imc} (${diagnostico})`;
    msgDiv.style.color = '#28a745';
    
    // Actualizar select de pacientes
    cargarSelectPacientes();
    
    setTimeout(() => msgDiv.textContent = '', 3000);
}

export function getPacienteById(id) {
    const pacientes = getPacientes();
    return pacientes.find(p => p.id === id);
}
