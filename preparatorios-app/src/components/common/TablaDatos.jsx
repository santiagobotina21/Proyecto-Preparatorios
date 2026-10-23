import { useEffect, useMemo, useState } from "react";

/**
 * Tabla genérica reutilizable.
 *
 * Props:
 *  - columnas: [{ clave, titulo, render?(fila), alinear?: "izq"|"centro"|"der", ancho? }]
 *  - filas: arreglo de objetos.
 *  - claveFila: nombre del campo que identifica cada fila (por defecto "id").
 *  - seleccionable: permite seleccionar una fila con clic.
 *  - filaSeleccionada / onSeleccionar(fila): control de la fila seleccionada.
 *  - acciones(fila): función que devuelve los botones de la última columna.
 *  - porPagina: filas por página (0 = sin paginación).
 *  - mensajeVacio: texto cuando no hay registros.
 */
export default function TablaDatos({
  columnas,
  filas = [],
  claveFila = "id",
  seleccionable = false,
  filaSeleccionada = null,
  onSeleccionar,
  acciones,
  porPagina = 8,
  mensajeVacio = "No hay registros para mostrar.",
}) {
  const [pagina, setPagina] = useState(1);
  const totalPaginas = porPagina > 0 ? Math.max(1, Math.ceil(filas.length / porPagina)) : 1;

  // Si cambian los datos (por un filtro) y la página ya no existe, se vuelve a la última válida.
  useEffect(() => {
    if (pagina > totalPaginas) setPagina(totalPaginas);
  }, [pagina, totalPaginas]);

  const visibles = useMemo(
    () => (porPagina > 0 ? filas.slice((pagina - 1) * porPagina, pagina * porPagina) : filas),
    [filas, pagina, porPagina]
  );

  const claseAlineacion = (a) => (a === "centro" ? "pp-centro" : a === "der" ? "pp-derecha" : "");

  return (
    <div className="pp-tabla-contenedor">
      <div className="pp-tabla-scroll">
        <table className="pp-tabla">
          <thead>
            <tr>
              {columnas.map((c) => (
                <th key={c.clave} className={claseAlineacion(c.alinear)} style={c.ancho ? { width: c.ancho } : undefined}>
                  {c.titulo}
                </th>
              ))}
              {acciones && <th className="pp-centro">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {visibles.length === 0 ? (
              <tr>
                <td colSpan={columnas.length + (acciones ? 1 : 0)} className="pp-tabla-vacia">
                  {mensajeVacio}
                </td>
              </tr>
            ) : (
              visibles.map((fila) => {
                const seleccionada = seleccionable && filaSeleccionada?.[claveFila] === fila[claveFila];
                return (
                  <tr
                    key={fila[claveFila]}
                    className={`${seleccionable ? "pp-fila-seleccionable" : ""} ${seleccionada ? "pp-fila-seleccionada" : ""}`}
                    onClick={seleccionable ? () => onSeleccionar?.(fila) : undefined}
                    aria-selected={seleccionable ? seleccionada : undefined}
                  >
                    {columnas.map((c) => (
                      <td key={c.clave} className={claseAlineacion(c.alinear)} data-titulo={c.titulo}>
                        {c.render ? c.render(fila) : fila[c.clave]}
                      </td>
                    ))}
                    {acciones && (
                      <td className="pp-centro pp-tabla-acciones" onClick={(e) => e.stopPropagation()}>
                        {acciones(fila)}
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {porPagina > 0 && filas.length > porPagina && (
        <div className="pp-paginacion">
          <span>
            {(pagina - 1) * porPagina + 1}–{Math.min(pagina * porPagina, filas.length)} de {filas.length}
          </span>
          <div>
            <button type="button" className="pp-btn pp-btn-secundario pp-btn-sm" disabled={pagina === 1} onClick={() => setPagina(pagina - 1)}>
              Anterior
            </button>
            <button
              type="button"
              className="pp-btn pp-btn-secundario pp-btn-sm"
              disabled={pagina === totalPaginas}
              onClick={() => setPagina(pagina + 1)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
