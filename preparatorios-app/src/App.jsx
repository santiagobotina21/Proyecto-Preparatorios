import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { EstudianteProvider } from "./context/EstudianteContext";
import { AlertaProvider } from "./context/AlertaContext";
import ModuloPreparatorios from "./components/layout/ModuloPreparatorios";
import AdministrarPreparatorio from "./pages/administrar/AdministrarPreparatorio";
import EnConstruccion from "./pages/EnConstruccion";
import "./styles/preparatorios.css";

/**
 * Componente raíz. Define los proveedores globales (estudiante seleccionado
 * y alertas) y las rutas de cada sección del módulo de Preparatorios.
 */
export default function App() {
  return (
    <BrowserRouter>
      <AlertaProvider>
        <EstudianteProvider>
          <ModuloPreparatorios>
            <Routes>
              <Route path="/" element={<Navigate to="/administrar" replace />} />
              <Route path="/administrar" element={<AdministrarPreparatorio />} />
              <Route
                path="/exoneraciones"
                element={<EnConstruccion titulo="Exoneraciones" descripcion="Promedios por área del estudiante y gestión de su exoneración del preparatorio." usaEstudiante />}
              />
              <Route
                path="/novedades"
                element={<EnConstruccion titulo="Novedades" descripcion="Corrección de notas de preparatorio y reporte de novedades." usaEstudiante />}
              />
              <Route
                path="/historial"
                element={<EnConstruccion titulo="Historial" descripcion="Preparatorios presentados por el estudiante y su desempeño histórico." usaEstudiante />}
              />
              <Route
                path="/promedios"
                element={<EnConstruccion titulo="Promedios" descripcion="Promedio de las asignaturas del estudiante en Laboral, Penal, Privado y Público." usaEstudiante />}
              />
              <Route path="*" element={<Navigate to="/administrar" replace />} />
            </Routes>
          </ModuloPreparatorios>
        </EstudianteProvider>
      </AlertaProvider>
    </BrowserRouter>
  );
}
