import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

/**
 * Ventana emergente genérica. Sirve de base para el buscador de estudiantes,
 * el formulario de ofertas, la lista de inscritos, etc.
 *
 * Props:
 *  - abierto: muestra u oculta la ventana.
 *  - titulo: texto del encabezado.
 *  - onCerrar: se llama al presionar la X, la tecla Escape o el fondo oscuro.
 *  - pie: contenido opcional para la parte inferior (botones).
 *  - tamano: "sm" | "md" | "lg".
 *  - bloquearCierre: impide cerrar mientras se está guardando.
 */
export default function ModalBase({ abierto, titulo, onCerrar, children, pie, tamano = "md", bloquearCierre = false }) {
  const idTitulo = useId();

  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e) => {
      if (e.key === "Escape" && !bloquearCierre) onCerrar?.();
    };
    document.addEventListener("keydown", alPresionar);
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alPresionar);
      document.body.style.overflow = overflowAnterior;
    };
  }, [abierto, onCerrar, bloquearCierre]);

  if (!abierto) return null;

  return createPortal(
    <div className="pp-overlay" onMouseDown={(e) => e.target === e.currentTarget && !bloquearCierre && onCerrar?.()}>
      <div className={`pp-modal pp-modal-${tamano}`} role="dialog" aria-modal="true" aria-labelledby={idTitulo}>
        <header className="pp-modal-encabezado">
          <h2 id={idTitulo}>{titulo}</h2>
          <button type="button" className="pp-modal-cerrar" onClick={onCerrar} disabled={bloquearCierre} aria-label="Cerrar">
            ×
          </button>
        </header>
        <div className="pp-modal-cuerpo">{children}</div>
        {pie && <footer className="pp-modal-pie">{pie}</footer>}
      </div>
    </div>,
    document.body
  );
}
