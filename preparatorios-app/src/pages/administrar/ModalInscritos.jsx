import ModalBase from "../../components/common/ModalBase";
import Loader from "../../components/common/Loader";
import TablaDatos from "../../components/common/TablaDatos";
import useFetch from "../../hooks/useFetch";
import { obtenerInscritos } from "../../services/api";
import { formatoFecha, nombreArea } from "../../utils/formato";

const COLUMNAS = [
  { clave: "codigo", titulo: "Código" },
  { clave: "documento", titulo: "Documento" },
  { clave: "nombre", titulo: "Nombre", render: (e) => `${e.nombres} ${e.apellidos}` },
  { clave: "semestre", titulo: "Semestre", alinear: "centro" },
];

function ContenidoInscritos({ oferta }) {
  const { datos, cargando, error } = useFetch(() => obtenerInscritos(oferta.id), [oferta.id]);

  if (cargando) return <Loader texto="Consultando inscritos..." />;
  if (error) return <p className="pp-mensaje-error">{error}</p>;

  return (
    <>
      <div className="pp-detalle-oferta">
        <span><strong>Área:</strong> {nombreArea(oferta.area)}</span>
        <span><strong>Fecha:</strong> {formatoFecha(oferta.fechaExamen)}</span>
        <span><strong>Modalidad:</strong> {oferta.modalidad}</span>
        <span><strong>Inscritos:</strong> {datos.length} de {oferta.cupos}</span>
      </div>
      <TablaDatos columnas={COLUMNAS} filas={datos} porPagina={8} mensajeVacio="Aún no hay estudiantes inscritos en esta convocatoria." />
    </>
  );
}

/**
 * Ventana emergente con los estudiantes inscritos en una convocatoria.
 * Props: oferta (null = cerrada), onCerrar()
 */
export default function ModalInscritos({ oferta, onCerrar }) {
  return (
    <ModalBase abierto={!!oferta} onCerrar={onCerrar} titulo="Estudiantes inscritos" tamano="lg">
      {oferta && <ContenidoInscritos oferta={oferta} />}
    </ModalBase>
  );
}
