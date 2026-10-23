import { useCallback, useMemo, useState } from "react";
import SelectorArea from "../../components/common/SelectorArea";
import SelectorPeriodo from "../../components/common/SelectorPeriodo";
import ModalBase from "../../components/common/ModalBase";
import Loader from "../../components/common/Loader";
import FormularioOferta from "./FormularioOferta";
import TablaOfertas from "./TablaOfertas";
import ModalInscritos from "./ModalInscritos";
import useFetch from "../../hooks/useFetch";
import useAlerta from "../../hooks/useAlerta";
import { listarOfertas, crearOferta, actualizarOferta, eliminarOferta } from "../../services/api";
import { MESES } from "../../data/mockData";
import { nombreArea, nombrePeriodo } from "../../utils/formato";

/**
 * Pantalla de Ofertas de Preparatorio: lista, filtra, crea, edita y elimina
 * las convocatorias, y permite consultar los estudiantes inscritos.
 */
export default function OfertasPreparatorio() {
  const alerta = useAlerta();
  const [filtros, setFiltros] = useState({ periodo: "2026-2", area: "", mes: "" });
  const [formulario, setFormulario] = useState({ abierto: false, oferta: null });
  const [ofertaInscritos, setOfertaInscritos] = useState(null);
  const [procesando, setProcesando] = useState("");

  const { datos: ofertas, cargando, error, recargar } = useFetch(() => listarOfertas(filtros), [filtros]);

  const cambiarFiltro = (campo) => (valor) => setFiltros((f) => ({ ...f, [campo]: valor }));

  const resumen = useMemo(() => {
    const lista = ofertas ?? [];
    return {
      total: lista.length,
      cupos: lista.reduce((t, o) => t + o.cupos, 0),
      inscritos: lista.reduce((t, o) => t + o.totalInscritos, 0),
    };
  }, [ofertas]);

  const abrirNueva = () => setFormulario({ abierto: true, oferta: null });
  const abrirEditar = useCallback((oferta) => setFormulario({ abierto: true, oferta }), []);
  const cerrarFormulario = () => setFormulario({ abierto: false, oferta: null });

  const guardar = async (datos) => {
    const editando = !!formulario.oferta;
    setProcesando(editando ? "Guardando cambios..." : "Creando oferta...");
    try {
      if (editando) await actualizarOferta(formulario.oferta.id, datos);
      else await crearOferta(datos);
      cerrarFormulario();
      await recargar();
      alerta.exito(
        editando ? "Oferta actualizada" : "Oferta creada",
        `Preparatorio de ${nombreArea(datos.area)} · ${datos.mes} · ${nombrePeriodo(datos.periodo)}.`
      );
    } catch (e) {
      alerta.error("No se pudo guardar la oferta", e.message);
    } finally {
      setProcesando("");
    }
  };

  const eliminar = useCallback(
    async (oferta) => {
      const confirmado = await alerta.confirmar(
        "¿Eliminar esta oferta?",
        `Se eliminará el preparatorio de ${nombreArea(oferta.area)} de ${oferta.mes} (${nombrePeriodo(oferta.periodo)}). Esta acción no se puede deshacer.`,
        { textoAceptar: "Sí, eliminar" }
      );
      if (!confirmado) return;
      setProcesando("Eliminando oferta...");
      try {
        await eliminarOferta(oferta.id);
        await recargar();
        alerta.exito("Oferta eliminada");
      } catch (e) {
        alerta.error("No se pudo eliminar", e.message);
      } finally {
        setProcesando("");
      }
    },
    [alerta, recargar]
  );

  return (
    <div className="pp-tarjeta">
      <div className="pp-barra-herramientas">
        <div className="pp-filtros">
          <SelectorPeriodo valor={filtros.periodo} onCambiar={cambiarFiltro("periodo")} incluirTodos />
          <div className="pp-campo">
            <label htmlFor="filtro-mes">Mes</label>
            <select id="filtro-mes" value={filtros.mes} onChange={(e) => cambiarFiltro("mes")(e.target.value)}>
              <option value="">Todos los meses</option>
              {MESES.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <SelectorArea valor={filtros.area} onCambiar={cambiarFiltro("area")} incluirTodas />
        </div>
        <button type="button" className="pp-btn pp-btn-primario" onClick={abrirNueva}>
          + Nueva oferta
        </button>
      </div>

      {!cargando && !error && (
        <div className="pp-resumen">
          <div><span>Ofertas</span><strong>{resumen.total}</strong></div>
          <div><span>Cupos totales</span><strong>{resumen.cupos}</strong></div>
          <div><span>Inscritos</span><strong>{resumen.inscritos}</strong></div>
        </div>
      )}

      {cargando ? (
        <Loader texto="Cargando ofertas..." />
      ) : error ? (
        <div className="pp-error-carga">
          <p>{error}</p>
          <button type="button" className="pp-btn pp-btn-secundario" onClick={recargar}>
            Reintentar
          </button>
        </div>
      ) : (
        <TablaOfertas ofertas={ofertas} onEditar={abrirEditar} onEliminar={eliminar} onVerInscritos={setOfertaInscritos} />
      )}

      <ModalBase
        abierto={formulario.abierto}
        onCerrar={cerrarFormulario}
        titulo={formulario.oferta ? "Editar oferta de preparatorio" : "Nueva oferta de preparatorio"}
        tamano="lg"
        bloquearCierre={!!procesando}
      >
        <FormularioOferta
          key={formulario.oferta?.id ?? "nueva"}
          ofertaInicial={formulario.oferta}
          periodoSugerido={filtros.periodo}
          onGuardar={guardar}
          onCancelar={cerrarFormulario}
          guardando={!!procesando}
        />
      </ModalBase>

      <ModalInscritos oferta={ofertaInscritos} onCerrar={() => setOfertaInscritos(null)} />

      {procesando && <Loader texto={procesando} pantallaCompleta />}
    </div>
  );
}
