import { useId } from "react";
import { PERIODOS } from "../../data/mockData";

/**
 * Lista desplegable de periodos académicos.
 *
 * Props:
 *  - valor / onCambiar(valor)
 *  - etiqueta: texto de la etiqueta (por defecto "Periodo académico").
 *  - incluirTodos: agrega la opción "Todos" (útil en filtros).
 *  - requerido, deshabilitado, error (mensaje de validación).
 */
export default function SelectorPeriodo({
  valor,
  onCambiar,
  etiqueta = "Periodo académico",
  incluirTodos = false,
  requerido = false,
  deshabilitado = false,
  error = "",
  nombre = "periodo",
}) {
  const id = useId();
  return (
    <div className={`pp-campo ${error ? "pp-campo-error" : ""}`}>
      <label htmlFor={id}>
        {etiqueta}
        {requerido && <span className="pp-requerido"> *</span>}
      </label>
      <select id={id} name={nombre} value={valor} onChange={(e) => onCambiar(e.target.value)} disabled={deshabilitado} aria-invalid={!!error}>
        <option value="">{incluirTodos ? "Todos los periodos" : "Seleccione un periodo"}</option>
        {PERIODOS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.nombre}
          </option>
        ))}
      </select>
      {error && <small className="pp-mensaje-error">{error}</small>}
    </div>
  );
}
