// Claves de localStorage
const PACIENTES_KEY = 'nutri_pacientes';
const CONSULTAS_KEY = 'nutri_consultas';

export function getPacientes() {
    const data = localStorage.getItem(PACIENTES_KEY);
    return data ? JSON.parse(data) : [];
}

export function savePacientes(pacientes) {
    localStorage.setItem(PACIENTES_KEY, JSON.stringify(pacientes));
}

export function getConsultas() {
    const data = localStorage.getItem(CONSULTAS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveConsultas(consultas) {
    localStorage.setItem(CONSULTAS_KEY, JSON.stringify(consultas));
}

export function agregarPaciente(paciente) {
    const pacientes = getPacientes();
    pacientes.push(paciente);
    savePacientes(pacientes);
}

export function agregarConsulta(consulta) {
    const consultas = getConsultas();
    consultas.push(consulta);
    saveConsultas(consultas);
}

export function actualizarConsulta(consultaActualizada) {
    let consultas = getConsultas();
    consultas = consultas.map(c => c.id === consultaActualizada.id ? consultaActualizada : c);
    saveConsultas(consultas);
}

export function getConsultasByPaciente(pacienteId) {
    const consultas = getConsultas();
    return consultas.filter(c => c.pacienteId === pacienteId).sort((a, b) => {
        // Ordenar por fecha más reciente primero
        return new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora);
    });
}

export function cargarDatosIniciales() {
    // Inicializar con datos de ejemplo si está vacío
    if (getPacientes().length === 0) {
        const pacienteEjemplo = {
            id: 'p1',
            nombre: 'María González',
            edad: 32,
            peso: 68,
            altura: 1.65,
            imc: 24.98,
            diagnostico: 'peso normal'
        };
        agregarPaciente(pacienteEjemplo);
        
        const consultaEjemplo = {
            id: 'c1',
            pacienteId: 'p1',
            fecha: '2026-05-28',
            hora: '10:30',
            evolucion: 'Primera consulta. Paciente motivada.',
            plan: 'Dieta mediterránea, 3 comidas diarias'
        };
        agregarConsulta(consultaEjemplo);
    }
}

