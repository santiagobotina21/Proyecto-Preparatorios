// ------------------------------------------------------------------
// SERVICIO DE DATOS
// Mientras no exista backend, estas funciones simulan la API usando
// los datos de prueba (mockData). Cuando se conecte la API real, solo
// se cambia el contenido de estas funciones; las pantallas no cambian.
// ------------------------------------------------------------------

import { ESTUDIANTES, OFERTAS } from "../data/mockData";

const RETARDO_MS = 400;

// Copia en memoria para que crear/editar/eliminar no modifique mockData.
let ofertas = OFERTAS.map((o) => ({ ...o, inscritos: [...o.inscritos] }));
let siguienteId = Math.max(0, ...ofertas.map((o) => o.id)) + 1;

const simular = (resultado) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(resultado)), RETARDO_MS));

const fallar = (mensaje) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(mensaje)), RETARDO_MS));

// Lo que recibe la pantalla: la oferta con el total de inscritos, sin la lista de ids.
const aPublica = ({ inscritos, ...resto }) => ({ ...resto, totalInscritos: inscritos.length });

const normalizar = (texto) =>
  String(texto ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

/* ----------------------------- Ofertas ----------------------------- */

/**
 * Lista las ofertas aplicando los filtros (los vacíos se ignoran).
 * @param {{ periodo?: string, area?: string, mes?: string }} filtros
 */
export function listarOfertas(filtros = {}) {
  const { periodo, area, mes } = filtros;
  const resultado = ofertas
    .filter((o) => (!periodo || o.periodo === periodo) && (!area || o.area === area) && (!mes || o.mes === mes))
    .sort((a, b) => a.fechaExamen.localeCompare(b.fechaExamen))
    .map(aPublica);
  return simular(resultado);
}

export function crearOferta(datos) {
  const duplicada = ofertas.some((o) => o.periodo === datos.periodo && o.mes === datos.mes && o.area === datos.area);
  if (duplicada) return fallar("Ya existe una oferta para esa área en el mismo mes y periodo.");

  const nueva = { ...datos, id: siguienteId++, inscritos: [] };
  ofertas.push(nueva);
  return simular(aPublica(nueva));
}

export function actualizarOferta(id, datos) {
  const actual = ofertas.find((o) => o.id === id);
  if (!actual) return fallar("La oferta ya no existe.");

  const duplicada = ofertas.some(
    (o) => o.id !== id && o.periodo === datos.periodo && o.mes === datos.mes && o.area === datos.area
  );
  if (duplicada) return fallar("Ya existe una oferta para esa área en el mismo mes y periodo.");
  if (datos.cupos < actual.inscritos.length)
    return fallar(`Ya hay ${actual.inscritos.length} inscritos; los cupos no pueden ser menores.`);

  Object.assign(actual, datos, { id, inscritos: actual.inscritos });
  return simular(aPublica(actual));
}

export function eliminarOferta(id) {
  const oferta = ofertas.find((o) => o.id === id);
  if (!oferta) return fallar("La oferta ya no existe.");
  if (oferta.inscritos.length > 0)
    return fallar("No se puede eliminar una oferta que ya tiene estudiantes inscritos.");

  ofertas = ofertas.filter((o) => o.id !== id);
  return simular(true);
}

/** Estudiantes inscritos en una oferta. */
export function obtenerInscritos(idOferta) {
  const oferta = ofertas.find((o) => o.id === idOferta);
  if (!oferta) return fallar("La oferta ya no existe.");

  const inscritos = oferta.inscritos.map((id) => ESTUDIANTES.find((e) => e.id === id)).filter(Boolean);
  return simular(inscritos);
}

/* --------------------------- Estudiantes --------------------------- */

/** Busca estudiantes por código, documento o nombre. */
export function buscarEstudiantes(texto) {
  const buscado = normalizar(texto);
  const resultado = ESTUDIANTES.filter((e) =>
    [e.codigo, e.documento, `${e.nombres} ${e.apellidos}`].some((campo) => normalizar(campo).includes(buscado))
  );
  return simular(resultado);
}
