import { useState } from "react";
import OfertasPreparatorio from "./OfertasPreparatorio";
import EnConstruccion from "../EnConstruccion";

const PESTANAS = [
  { id: "ofertas", texto: "Ofertas de Preparatorio" },
  { id: "matriculas", texto: "Matrículas" },
  { id: "reportes", texto: "Reportes" },
];

/**
 * Contenedor de la sección "Administrar un Preparatorio".
 * Agrupa en pestañas las pantallas de Ofertas, Matrículas y Reportes.
 */
export default function AdministrarPreparatorio() {
  const [pestana, setPestana] = useState("ofertas");

  return (
    <section>
      <div className="pp-pagina-encabezado">
        <div>
          <h2>Administrar un Preparatorio</h2>
          <p className="pp-texto-suave">Configure las convocatorias, inscriba estudiantes y consulte los reportes de los preparatorios.</p>
        </div>
      </div>

      <div className="pp-pestanas" role="tablist">
        {PESTANAS.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={pestana === p.id}
            className={`pp-pestana ${pestana === p.id ? "activa" : ""}`}
            onClick={() => setPestana(p.id)}
          >
            {p.texto}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {pestana === "ofertas" && <OfertasPreparatorio />}
        {pestana === "matriculas" && (
          <EnConstruccion
            titulo="Matrículas"
            descripcion="Busque un estudiante e inscríbalo manualmente en una convocatoria ya creada."
            usaEstudiante
          />
        )}
        {pestana === "reportes" && (
          <EnConstruccion
            titulo="Reportes"
            descripcion="El módulo de reportes estará disponible en una próxima etapa."
          />
        )}
      </div>
    </section>
  );
}
