import { useState } from "react";
import SelectorArea from "../../components/common/SelectorArea";
import SelectorPeriodo from "../../components/common/SelectorPeriodo";
import { MESES, MODALIDADES } from "../../data/mockData";

const VACIO = { periodo: "", mes: "", area: "", fechaExamen: "", modalidad: "", cupos: "", valor: "" };

const hoyISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/**
 * Formulario para crear o editar una oferta (convocatoria) de preparatorio.
 *
 * Props:
 *  - ofertaInicial: null para crear; un objeto oferta para editar.
 *  - periodoSugerido: periodo que se propone al crear una oferta nueva.
 *  - onGuardar(datos): se llama con los datos validados.
 *  - onCancelar()
 *  - guardando: deshabilita el formulario mientras se guarda.
 */
export default function FormularioOferta({ ofertaInicial = null, periodoSugerido = "", onGuardar, onCancelar, guardando = false }) {
  const editando = !!ofertaInicial;
  const [valores, setValores] = useState(() =>
    editando
      ? { ...VACIO, ...ofertaInicial, cupos: String(ofertaInicial.cupos), valor: String(ofertaInicial.valor) }
      : { ...VACIO, periodo: periodoSugerido }
  );
  const [errores, setErrores] = useState({});

  const cambiar = (campo, valor) => {
    setValores((v) => {
      const nuevo = { ...v, [campo]: valor };
      // Al elegir la fecha del examen se completa el mes automáticamente.
      if (campo === "fechaExamen" && valor) nuevo.mes = MESES[Number(valor.split("-")[1]) - 1];
      return nuevo;
    });
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: "" }));
  };

  const validar = () => {
    const e = {};
    if (!valores.periodo) e.periodo = "Seleccione el periodo académico.";
    if (!valores.mes) e.mes = "Seleccione el mes.";
    if (!valores.area) e.area = "Seleccione el área jurídica.";
    if (!valores.fechaExamen) e.fechaExamen = "Indique la fecha del examen.";
    else if (!editando && valores.fechaExamen < hoyISO()) e.fechaExamen = "La fecha del examen no puede ser anterior a hoy.";
    else if (MESES[Number(valores.fechaExamen.split("-")[1]) - 1] !== valores.mes)
      e.fechaExamen = "La fecha no corresponde al mes seleccionado.";
    if (!valores.modalidad) e.modalidad = "Seleccione la modalidad.";

    const cupos = Number(valores.cupos);
    if (valores.cupos === "") e.cupos = "Indique el número de cupos.";
    else if (!Number.isInteger(cupos) || cupos <= 0) e.cupos = "Los cupos deben ser un número entero mayor que 0.";
    else if (editando && cupos < ofertaInicial.totalInscritos)
      e.cupos = `Ya hay ${ofertaInicial.totalInscritos} inscritos; los cupos no pueden ser menores.`;

    const valor = Number(valores.valor);
    if (valores.valor === "") e.valor = "Indique el valor del preparatorio.";
    else if (Number.isNaN(valor) || valor < 0) e.valor = "El valor debe ser un número igual o mayor que 0.";

    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const enviar = (ev) => {
    ev.preventDefault();
    if (!validar()) return;
    onGuardar({
      periodo: valores.periodo,
      mes: valores.mes,
      area: valores.area,
      fechaExamen: valores.fechaExamen,
      modalidad: valores.modalidad,
      cupos: Number(valores.cupos),
      valor: Number(valores.valor),
    });
  };

  return (
    <form className="pp-formulario" onSubmit={enviar} noValidate>
      <fieldset disabled={guardando}>
        <div className="pp-grid-2">
          <SelectorPeriodo valor={valores.periodo} onCambiar={(v) => cambiar("periodo", v)} requerido error={errores.periodo} />
          <SelectorArea valor={valores.area} onCambiar={(v) => cambiar("area", v)} etiqueta="Área jurídica" requerido error={errores.area} />

          <div className={`pp-campo ${errores.fechaExamen ? "pp-campo-error" : ""}`}>
            <label htmlFor="of-fecha">Fecha del examen<span className="pp-requerido"> *</span></label>
            <input id="of-fecha" type="date" value={valores.fechaExamen} min={editando ? undefined : hoyISO()} onChange={(e) => cambiar("fechaExamen", e.target.value)} />
            {errores.fechaExamen && <small className="pp-mensaje-error">{errores.fechaExamen}</small>}
          </div>

          <div className={`pp-campo ${errores.mes ? "pp-campo-error" : ""}`}>
            <label htmlFor="of-mes">Mes<span className="pp-requerido"> *</span></label>
            <select id="of-mes" value={valores.mes} onChange={(e) => cambiar("mes", e.target.value)}>
              <option value="">Seleccione el mes</option>
              {MESES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errores.mes && <small className="pp-mensaje-error">{errores.mes}</small>}
          </div>

          <div className={`pp-campo ${errores.modalidad ? "pp-campo-error" : ""}`}>
            <label htmlFor="of-modalidad">Modalidad<span className="pp-requerido"> *</span></label>
            <select id="of-modalidad" value={valores.modalidad} onChange={(e) => cambiar("modalidad", e.target.value)}>
              <option value="">Seleccione la modalidad</option>
              {MODALIDADES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            {errores.modalidad && <small className="pp-mensaje-error">{errores.modalidad}</small>}
          </div>

          <div className={`pp-campo ${errores.cupos ? "pp-campo-error" : ""}`}>
            <label htmlFor="of-cupos">Cupos<span className="pp-requerido"> *</span></label>
            <input id="of-cupos" type="number" min="1" step="1" inputMode="numeric" value={valores.cupos} onChange={(e) => cambiar("cupos", e.target.value)} />
            {errores.cupos && <small className="pp-mensaje-error">{errores.cupos}</small>}
          </div>

          <div className={`pp-campo pp-col-2 ${errores.valor ? "pp-campo-error" : ""}`}>
            <label htmlFor="of-valor">Valor (COP)<span className="pp-requerido"> *</span></label>
            <input id="of-valor" type="number" min="0" step="1000" inputMode="numeric" placeholder="Ej: 180000" value={valores.valor} onChange={(e) => cambiar("valor", e.target.value)} />
            {errores.valor && <small className="pp-mensaje-error">{errores.valor}</small>}
          </div>
        </div>

        <div className="pp-formulario-botones">
          <button type="button" className="pp-btn pp-btn-secundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="pp-btn pp-btn-primario">
            {editando ? "Guardar cambios" : "Crear oferta"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
