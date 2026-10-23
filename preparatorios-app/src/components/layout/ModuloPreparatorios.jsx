import { useState } from "react";
import { NavLink } from "react-router-dom";

const SECCIONES = [
  { ruta: "/administrar", texto: "Administrar Preparatorio" },
  { ruta: "/exoneraciones", texto: "Exoneraciones" },
  { ruta: "/novedades", texto: "Novedades" },
  { ruta: "/historial", texto: "Historial" },
  { ruta: "/promedios", texto: "Promedios" },
];

/**
 * Plantilla (layout) del módulo de Preparatorios: encabezado, menú de
 * navegación entre secciones y área donde se muestra cada pantalla.
 */
export default function ModuloPreparatorios({ children }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <div className="pp-app">
      <header className="pp-encabezado">
        <div className="pp-encabezado-titulo">
          <button
            type="button"
            className="pp-menu-boton"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
          >
            ☰
          </button>
          <div>
            <span className="pp-encabezado-sup">Facultad de Derecho</span>
            <h1>Módulo de Preparatorios</h1>
          </div>
        </div>
      </header>

      <div className="pp-cuerpo">
        <nav className={`pp-menu ${menuAbierto ? "abierto" : ""}`} aria-label="Secciones del módulo">
          {SECCIONES.map((s) => (
            <NavLink
              key={s.ruta}
              to={s.ruta}
              className={({ isActive }) => `pp-menu-item ${isActive ? "activo" : ""}`}
              onClick={() => setMenuAbierto(false)}
            >
              {s.texto}
            </NavLink>
          ))}
        </nav>
        <main className="pp-contenido">{children}</main>
      </div>
    </div>
  );
}
