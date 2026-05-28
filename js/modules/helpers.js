export function calcularIMC(peso, altura) {
    if (!peso || !altura || altura <= 0) return 0;
    return parseFloat((peso / (altura * altura)).toFixed(2));
}

export function obtenerDiagnostico(imc) {
    if (imc < 18.5) return 'bajo peso';
    if (imc < 25) return 'peso normal';
    if (imc < 30) return 'sobrepeso';
    return 'obesidad';
}

export function obtenerFechaHoraActual() {
    const ahora = new Date();
    const fecha = ahora.toISOString().split('T')[0];
    const hora = ahora.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return { fecha, hora };
}
