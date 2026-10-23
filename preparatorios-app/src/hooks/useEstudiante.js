import { useContext } from "react";
import { EstudianteContext } from "../context/EstudianteContext";

/**
 * Acceso rápido al estudiante seleccionado.
 * const { estudiante, seleccionarEstudiante, limpiarEstudiante } = useEstudiante();
 */
export default function useEstudiante() {
  const contexto = useContext(EstudianteContext);
  if (!contexto) {
    throw new Error("useEstudiante debe usarse dentro de <EstudianteProvider>.");
  }
  return contexto;
}
