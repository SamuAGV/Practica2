const PACIENTES_KEY = 'nutri_pacientes';
const CONSULTAS_KEY = 'nutri_consultas';
const CITAS_KEY = 'nutri_citas';

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

export function getCitas() {
    const data = localStorage.getItem(CITAS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveCitas(citas) {
    localStorage.setItem(CITAS_KEY, JSON.stringify(citas));
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

export function agregarCita(cita) {
    const citas = getCitas();
    citas.push(cita);
    saveCitas(citas);
}

export function actualizarConsulta(consultaActualizada) {
    let consultas = getConsultas();
    consultas = consultas.map(c => c.id === consultaActualizada.id ? consultaActualizada : c);
    saveConsultas(consultas);
}

export function eliminarCita(citaId) {
    let citas = getCitas();
    citas = citas.filter(c => c.id !== citaId);
    saveCitas(citas);
}

export function getConsultasByPaciente(pacienteId) {
    const consultas = getConsultas();
    return consultas.filter(c => c.pacienteId === pacienteId).sort((a, b) => {
        return new Date(b.fecha + ' ' + b.hora) - new Date(a.fecha + ' ' + a.hora);
    });
}

export function getCitasPendientes() {
    const citas = getCitas();
    const hoy = new Date().toISOString().split('T')[0];
    return citas.filter(c => c.estado === 'pendiente').sort((a, b) => {
        return new Date(a.fecha + ' ' + a.hora) - new Date(b.fecha + ' ' + b.hora);
    });
}

export function cargarDatosIniciales() {
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
        
        const citaEjemplo = {
            id: 'cit1',
            pacienteId: 'p1',
            pacienteNombre: 'María González',
            fecha: '2026-06-05',
            hora: '11:00',
            motivo: 'Control de seguimiento',
            estado: 'pendiente'
        };
        agregarCita(citaEjemplo);
    }
}