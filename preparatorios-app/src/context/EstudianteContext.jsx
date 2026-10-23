import { createContext, useCallback, useMemo, useState } from "react";

/**
 * Contexto que guarda el estudiante seleccionado en la búsqueda.
 * Lo comparten Exoneraciones, Novedades, Historial y Promedios para que
 * el funcionario no tenga que buscar al mismo estudiante en cada sección.
 */
export const EstudianteContext = createContext(null);

export function EstudianteProvider({ children }) {
  const [estudiante, setEstudiante] = useState(null);

  const seleccionarEstudiante = useCallback((e) => setEstudiante(e), []);
  const limpiarEstudiante = useCallback(() => setEstudiante(null), []);

  const valor = useMemo(
    () => ({ estudiante, seleccionarEstudiante, limpiarEstudiante }),
    [estudiante, seleccionarEstudiante, limpiarEstudiante]
  );

  return <EstudianteContext.Provider value={valor}>{children}</EstudianteContext.Provider>;
}
