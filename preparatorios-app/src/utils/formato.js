import { AREAS, PERIODOS } from "../data/mockData";

export const formatoMoneda = (valor) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor);

export const formatoFecha = (fechaISO) => {
  if (!fechaISO) return "";
  const [a, m, d] = fechaISO.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" });
};

export const nombreArea = (id) => AREAS.find((a) => a.id === id)?.nombre ?? id;
export const nombrePeriodo = (id) => PERIODOS.find((p) => p.id === id)?.nombre ?? id;
export const nombreCompleto = (e) => (e ? `${e.nombres} ${e.apellidos}` : "");
