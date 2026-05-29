# NutriSAGV - Sistema de Gestión Clínica para Nutriólogos

## Descripción
Sistema web local para gestión de pacientes, consultas e historial clínico con cálculo automático de IMC.

## Funcionalidades
- Login seguro con sessionStorage
- Registro de pacientes con cálculo IMC y diagnóstico
- Consultas médicas con evolución y plan alimentación
- Historial cronológico (más reciente arriba)
- Edición de consultas en tiempo real
- Persistencia de datos con localStorage

##️ Tecnologías
- HTML5, CSS3, JavaScript ES6+
- Módulos JS (import/export)
- Web Storage API (sessionStorage, localStorage)

## Instalación y uso local
1. Clonar el repositorio
2. Abrir `index.html` en el navegador
3. Ingresar nombre del nutriólogo
4. Comenzar a registrar pacientes y consultas

## Demo en producción
https://practica2-alpha.vercel.app/

## Autores
[Tu nombre]

## Estructura del proyecto
- Módulos separados por responsabilidad
- Protección de rutas
- Cero duplicación de datos
- Edición de consultas sin recargar página

## Criterios cumplidos
Separación de código (módulos ES6)
Control de datos (sessionStorage + localStorage)
Relación de datos por ID (cero duplicación)
Edición en tiempo real sin F5
Desplegado en la nube
