import { useEffect, useRef, useState } from "react";
import ModalBase from "./ModalBase";
import Loader from "./Loader";
import TablaDatos from "./TablaDatos";
import useEstudiante from "../../hooks/useEstudiante";
import { buscarEstudiantes } from "../../services/api";

/**
 * Ventana de búsqueda de estudiantes.
 * Se usa en Matrículas y en Procesos Académicos (Promedios, Novedades,
 * Exoneraciones e Historial).
 *
 * Props:
 *  - abierto / onCerrar
 *  - onSeleccionar(estudiante): se llama al elegir un estudiante.
 *  - guardarEnContexto: si es true (por defecto), el estudiante también queda
 *    guardado en EstudianteContext para las demás secciones.
 */
export default function BuscadorEstudiante({ abierto, onCerrar, onSeleccionar, guardarEnContexto = true }) {
  const { seleccionarEstudiante } = useEstudiante();
  const [texto, setTexto] = useState("");
  const [resultados, setResultados] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [aviso, setAviso] = useState("");
  const [abiertoPrevio, setAbiertoPrevio] = useState(abierto);
  const inputRef = useRef(null);

  // Al abrir la ventana se limpia la búsqueda anterior (durante el render,
  // como recomienda React al ajustar estado cuando cambia una prop).
  if (abierto !== abiertoPrevio) {
    setAbiertoPrevio(abierto);
    if (abierto) {
      setTexto("");
      setResultados(null);
      setAviso("");
    }
  }

  // Al abrir la ventana se enfoca el campo de búsqueda.
  useEffect(() => {
    if (abierto) setTimeout(() => inputRef.current?.focus(), 0);
  }, [abierto]);

  const buscar = async (e) => {
    e.preventDefault();
    if (texto.trim().length < 3) {
      setAviso("Escriba al menos 3 caracteres para buscar.");
      return;
    }
    setAviso("");
    setCargando(true);
    try {
      setResultados(await buscarEstudiantes(texto));
    } catch {
      setAviso("No fue posible realizar la búsqueda. Intente de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  const elegir = (estudiante) => {
    if (guardarEnContexto) seleccionarEstudiante(estudiante);
    onSeleccionar?.(estudiante);
    onCerrar();
  };

  const columnas = [
    { clave: "codigo", titulo: "Código" },
    { clave: "documento", titulo: "Documento" },
    { clave: "nombre", titulo: "Nombre", render: (e) => `${e.nombres} ${e.apellidos}` },
    { clave: "semestre", titulo: "Sem.", alinear: "centro" },
  ];

  return (
    <ModalBase abierto={abierto} onCerrar={onCerrar} titulo="Buscar estudiante" tamano="md">
      <form className="pp-buscador" onSubmit={buscar}>
        <input
          ref={inputRef}
          type="search"
          placeholder="Código, documento o nombre del estudiante"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          aria-label="Texto de búsqueda"
        />
        <button type="submit" className="pp-btn pp-btn-primario" disabled={cargando}>
          Buscar
        </button>
      </form>
      {aviso && <p className="pp-mensaje-error">{aviso}</p>}

      {cargando ? (
        <Loader texto="Buscando estudiantes..." />
      ) : (
        resultados && (
          <TablaDatos
            columnas={columnas}
            filas={resultados}
            porPagina={6}
            mensajeVacio="No se encontraron estudiantes con ese criterio."
            acciones={(e) => (
              <button type="button" className="pp-btn pp-btn-primario pp-btn-sm" onClick={() => elegir(e)}>
                Seleccionar
              </button>
            )}
          />
        )
      )}
    </ModalBase>
  );
}
