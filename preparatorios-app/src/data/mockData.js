// ------------------------------------------------------------------
// DATOS DE PRUEBA
// Mientras no exista backend, el módulo trabaja con esta información.
// Cuando se conecte la API real, este archivo deja de usarse.
// ------------------------------------------------------------------

export const AREAS = [
  { id: "LABORAL", nombre: "Laboral" },
  { id: "PENAL", nombre: "Penal" },
  { id: "PRIVADO", nombre: "Privado" },
  { id: "PUBLICO", nombre: "Público" },
];

export const PERIODOS = [
  { id: "2026-2", nombre: "2026 - II" },
  { id: "2026-1", nombre: "2026 - I" },
  { id: "2025-2", nombre: "2025 - II" },
];

export const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const MODALIDADES = ["Presencial", "Virtual"];

export const ESTUDIANTES = [
  { id: 1, codigo: "2021101001", documento: "1085301122", nombres: "Laura Camila", apellidos: "Benavides Ortiz", semestre: 10 },
  { id: 2, codigo: "2021101002", documento: "1085302233", nombres: "Juan David", apellidos: "Rosero Muñoz", semestre: 10 },
  { id: 3, codigo: "2021101003", documento: "1085303344", nombres: "Valentina", apellidos: "Guerrero Pantoja", semestre: 9 },
  { id: 4, codigo: "2021101004", documento: "1085304455", nombres: "Andrés Felipe", apellidos: "Bastidas Erazo", semestre: 10 },
  { id: 5, codigo: "2021101005", documento: "1085305566", nombres: "María José", apellidos: "Delgado Cabrera", semestre: 9 },
  { id: 6, codigo: "2021101006", documento: "1085306677", nombres: "Santiago", apellidos: "Insuasty Paz", semestre: 10 },
  { id: 7, codigo: "2021101007", documento: "1085307788", nombres: "Daniela", apellidos: "Montenegro Ruiz", semestre: 10 },
  { id: 8, codigo: "2021101008", documento: "1085308899", nombres: "Carlos Andrés", apellidos: "Narváez López", semestre: 9 },
  { id: 9, codigo: "2021101009", documento: "1085309900", nombres: "Natalia", apellidos: "Chamorro Villota", semestre: 10 },
  { id: 10, codigo: "2021101010", documento: "1085310011", nombres: "Sebastián", apellidos: "Obando Jurado", semestre: 10 },
  { id: 11, codigo: "2021101011", documento: "1085311122", nombres: "Isabella", apellidos: "Ortega Burbano", semestre: 9 },
  { id: 12, codigo: "2021101012", documento: "1085312233", nombres: "Miguel Ángel", apellidos: "Zambrano Rivas", semestre: 10 },
];

export const OFERTAS = [
  { id: 1, periodo: "2026-2", mes: "Agosto", area: "LABORAL", fechaExamen: "2026-08-22", modalidad: "Presencial", cupos: 30, valor: 180000, inscritos: [1, 2, 4, 6, 7] },
  { id: 2, periodo: "2026-2", mes: "Septiembre", area: "PENAL", fechaExamen: "2026-09-19", modalidad: "Presencial", cupos: 25, valor: 180000, inscritos: [3, 5, 9] },
  { id: 3, periodo: "2026-2", mes: "Octubre", area: "PRIVADO", fechaExamen: "2026-10-24", modalidad: "Virtual", cupos: 40, valor: 165000, inscritos: [1, 8, 10, 11, 12, 2] },
  { id: 4, periodo: "2026-2", mes: "Noviembre", area: "PUBLICO", fechaExamen: "2026-11-21", modalidad: "Presencial", cupos: 30, valor: 180000, inscritos: [] },
  { id: 5, periodo: "2026-1", mes: "Abril", area: "PENAL", fechaExamen: "2026-04-18", modalidad: "Virtual", cupos: 35, valor: 170000, inscritos: [4, 6, 7, 10] },
  { id: 6, periodo: "2026-1", mes: "Mayo", area: "LABORAL", fechaExamen: "2026-05-23", modalidad: "Presencial", cupos: 20, valor: 170000, inscritos: [9, 11] },
  { id: 7, periodo: "2025-2", mes: "Octubre", area: "PUBLICO", fechaExamen: "2025-10-25", modalidad: "Presencial", cupos: 30, valor: 160000, inscritos: [3, 5, 8, 12] },
];
