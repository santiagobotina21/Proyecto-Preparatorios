import { useId } from "react";
import { AREAS } from "../../data/mockData";

/**
 * Lista desplegable de las áreas del derecho (Laboral, Penal, Privado y Público).
 *
 * Props:
 *  - valor / onCambiar(valor)
 *  - etiqueta: texto de la etiqueta (por defecto "Área").
 *  - incluirTodas: agrega la opción "Todas" (útil en filtros).
 *  - requerido, deshabilitado, error (mensaje de validación).
 */
export default function SelectorArea({
  valor,
  onCambiar,
  etiqueta = "Área",
  incluirTodas = false,
  requerido = false,
  deshabilitado = false,
  error = "",
  nombre = "area",
}) {
  const id = useId();
  return (
    <div className={`pp-campo ${error ? "pp-campo-error" : ""}`}>
      <label htmlFor={id}>
        {etiqueta}
        {requerido && <span className="pp-requerido"> *</span>}
      </label>
      <select id={id} name={nombre} value={valor} onChange={(e) => onCambiar(e.target.value)} disabled={deshabilitado} aria-invalid={!!error}>
        <option value="">{incluirTodas ? "Todas las áreas" : "Seleccione un área"}</option>
        {AREAS.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nombre}
          </option>
        ))}
      </select>
      {error && <small className="pp-mensaje-error">{error}</small>}
    </div>
  );
}
