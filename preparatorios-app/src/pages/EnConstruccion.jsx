import { useState } from "react";
import BuscadorEstudiante from "../components/common/BuscadorEstudiante";
import useEstudiante from "../hooks/useEstudiante";
import { nombreCompleto } from "../utils/formato";

/**
 * Pantalla temporal para las secciones que aún no se han desarrollado.
 * Muestra el estudiante seleccionado para comprobar que el contexto se
 * comparte entre secciones.
 */
export default function EnConstruccion({ titulo, descripcion, usaEstudiante = false }) {
  const { estudiante } = useEstudiante();
  const [abierto, setAbierto] = useState(false);

  return (
    <section>
      <div className="pp-pagina-encabezado">
        <div>
          <h2>{titulo}</h2>
          <p className="pp-texto-suave">{descripcion}</p>
        </div>
      </div>
      <div className="pp-tarjeta pp-en-construccion">
        <p>
          <strong>Sección en desarrollo.</strong> Los componentes de esta sección se construirán en la siguiente etapa.
        </p>
        {usaEstudiante && (
          <p>
            {estudiante ? (
              <>Estudiante seleccionado: <strong>{nombreCompleto(estudiante)}</strong> ({estudiante.codigo})</>
            ) : (
              <>
                No hay estudiante seleccionado.{" "}
                <button type="button" className="pp-btn-enlace" onClick={() => setAbierto(true)}>
                  Buscar estudiante
                </button>
              </>
            )}
          </p>
        )}
      </div>
      <BuscadorEstudiante abierto={abierto} onCerrar={() => setAbierto(false)} />
    </section>
  );
}
