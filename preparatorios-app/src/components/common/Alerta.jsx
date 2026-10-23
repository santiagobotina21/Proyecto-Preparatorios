import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ICONOS = {
  exito: (
    <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M15 27l7 7 15-16" /></svg>
  ),
  error: (
    <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M18 18l16 16M34 18L18 34" /></svg>
  ),
  advertencia: (
    <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M26 14v16" /><circle cx="26" cy="37" r="1.6" className="pp-alerta-punto" /></svg>
  ),
  confirmar: (
    <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M20 20a6 6 0 1 1 8.5 5.5c-1.8.9-2.5 2-2.5 4v1.5" /><circle cx="26" cy="37" r="1.6" className="pp-alerta-punto" /></svg>
  ),
  info: (
    <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="24" /><path d="M26 23v15" /><circle cx="26" cy="16" r="1.6" className="pp-alerta-punto" /></svg>
  ),
};


export default function Alerta({ tipo = "info", titulo, mensaje, textoAceptar = "Aceptar", textoCancelar = "Cancelar", onAceptar, onCancelar }) {
  const botonRef = useRef(null);
  const esConfirmacion = tipo === "confirmar";

  useEffect(() => {
    botonRef.current?.focus();
    const alPresionar = (e) => {
      if (e.key === "Escape") (esConfirmacion ? onCancelar : onAceptar)?.();
    };
    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [esConfirmacion, onAceptar, onCancelar]);

  return createPortal(
    <div className="pp-overlay pp-overlay-alerta">
      <div className={`pp-alerta pp-alerta-${tipo}`} role="alertdialog" aria-modal="true" aria-labelledby="pp-alerta-titulo">
        <div className="pp-alerta-icono">{ICONOS[tipo]}</div>
        <h2 id="pp-alerta-titulo" className="pp-alerta-titulo">{titulo}</h2>
        {mensaje && <p className="pp-alerta-mensaje">{mensaje}</p>}
        <div className="pp-alerta-botones">
          {esConfirmacion && (
            <button type="button" className="pp-btn pp-btn-secundario" onClick={onCancelar}>
              {textoCancelar}
            </button>
          )}
          <button
            ref={botonRef}
            type="button"
            className={`pp-btn ${tipo === "error" || (esConfirmacion && textoAceptar.toLowerCase().includes("eliminar")) ? "pp-btn-peligro" : "pp-btn-primario"}`}
            onClick={onAceptar}
          >
            {textoAceptar}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
