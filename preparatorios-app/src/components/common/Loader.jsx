/**
 * Indicador de carga / espera.
 *
 * Props:
 *  - texto: mensaje que acompaña al indicador.
 *  - pantallaCompleta: si es true, cubre toda la pantalla y bloquea los clics
 *    (útil mientras se guarda o elimina información).
 *  - pequeno: versión reducida para usar dentro de botones o celdas.
 */
export default function Loader({ texto = "Cargando...", pantallaCompleta = false, pequeno = false }) {
  const contenido = (
    <div className={`pp-loader ${pequeno ? "pp-loader-pequeno" : ""}`} role="status" aria-live="polite">
      <span className="pp-loader-circulo" aria-hidden="true" />
      {texto && <span className="pp-loader-texto">{texto}</span>}
    </div>
  );

  if (pantallaCompleta) {
    return <div className="pp-overlay pp-overlay-loader">{contenido}</div>;
  }
  return contenido;
}
