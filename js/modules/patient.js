import { getPacientes, agregarPaciente } from './storage.js';
import { calcularIMC, obtenerDiagnostico } from './helpers.js';
import { cargarSelectPacientes, cargarSelectPacientesCitas } from './ui.js';
import { cargarCitasPendientes } from './appointments.js';

export function registrarPaciente() {
    const nombre = document.getElementById('pacienteNombre').value.trim();
    const edad = parseInt(document.getElementById('pacienteEdad').value);
    let peso = parseFloat(document.getElementById('pacientePeso').value);
    let altura = parseFloat(document.getElementById('pacienteAltura').value);
    const msgDiv = document.getElementById('pacienteMsg');
    
    if (!nombre || isNaN(edad) || isNaN(peso) || isNaN(altura)) {
        msgDiv.textContent = 'Complete todos los campos correctamente';
        msgDiv.style.color = '#e74c3c';
        return;
    }
    
    if (altura <= 0 || peso <= 0) {
        msgDiv.textContent = 'Peso y altura deben ser mayores a 0';
        msgDiv.style.color = '#e74c3c';
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
    
    document.getElementById('pacienteNombre').value = '';
    document.getElementById('pacienteEdad').value = '';
    document.getElementById('pacientePeso').value = '';
    document.getElementById('pacienteAltura').value = '';
    
    msgDiv.textContent = `${nombre} registrado. IMC: ${imc} (${diagnostico})`;
    msgDiv.style.color = '#2ecc71';
    
    cargarSelectPacientes();
    cargarSelectPacientesCitas();
    cargarCitasPendientes();
    
    setTimeout(() => msgDiv.textContent = '', 3000);
}

export function getPacienteById(id) {
    const pacientes = getPacientes();
    return pacientes.find(p => p.id === id);
}