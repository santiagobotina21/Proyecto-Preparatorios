import TablaDatos from "../../components/common/TablaDatos";
import { formatoFecha, formatoMoneda, nombreArea, nombrePeriodo } from "../../utils/formato";

/**
 * Tabla de convocatorias de preparatorio con las acciones de ver inscritos,
 * editar y eliminar. Se apoya en el componente reutilizable <TablaDatos />.
 *
 * Props:
 *  - ofertas: arreglo de ofertas.
 *  - onEditar(oferta), onEliminar(oferta), onVerInscritos(oferta)
 */
export default function TablaOfertas({ ofertas = [], onEditar, onEliminar, onVerInscritos }) {
  const columnas = [
    { clave: "periodo", titulo: "Periodo", render: (o) => nombrePeriodo(o.periodo) },
    { clave: "mes", titulo: "Mes" },
    { clave: "area", titulo: "Área", render: (o) => <span className={`pp-etiqueta pp-area-${o.area.toLowerCase()}`}>{nombreArea(o.area)}</span> },
    { clave: "fechaExamen", titulo: "Fecha de examen", render: (o) => formatoFecha(o.fechaExamen) },
    { clave: "modalidad", titulo: "Modalidad" },
    {
      clave: "cupos",
      titulo: "Inscritos / Cupos",
      alinear: "centro",
      render: (o) => {
        const porcentaje = Math.min(100, Math.round((o.totalInscritos / o.cupos) * 100));
        return (
          <div className="pp-ocupacion" title={`${porcentaje}% de ocupación`}>
            <span>{o.totalInscritos} / {o.cupos}</span>
            <div className="pp-ocupacion-barra"><div style={{ width: `${porcentaje}%` }} /></div>
          </div>
        );
      },
    },
    { clave: "valor", titulo: "Valor", alinear: "der", render: (o) => formatoMoneda(o.valor) },
  ];

  return (
    <TablaDatos
      columnas={columnas}
      filas={ofertas}
      porPagina={8}
      mensajeVacio="No hay ofertas de preparatorio con los filtros seleccionados."
      acciones={(o) => (
        <div className="pp-grupo-acciones">
          <button type="button" className="pp-btn-icono" onClick={() => onVerInscritos(o)} title="Ver inscritos" aria-label="Ver inscritos">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5" /><path d="M16 4.8a3.3 3.3 0 0 1 0 6.4M18 14.7c2 .7 3.2 2.4 3.5 5.3" /></svg>
          </button>
          <button type="button" className="pp-btn-icono" onClick={() => onEditar(o)} title="Editar" aria-label="Editar oferta">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="M13.5 6.5l4 4" /></svg>
          </button>
          <button type="button" className="pp-btn-icono peligro" onClick={() => onEliminar(o)} title="Eliminar" aria-label="Eliminar oferta">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>
          </button>
        </div>
      )}
    />
  );
}
