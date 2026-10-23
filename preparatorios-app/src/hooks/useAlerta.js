import { useContext } from "react";
import { AlertaContext } from "../context/AlertaContext";

/** Devuelve { exito, error, advertencia, info, confirmar } para mostrar alertas. */
export default function useAlerta() {
  const contexto = useContext(AlertaContext);
  if (!contexto) {
    throw new Error("useAlerta debe usarse dentro de <AlertaProvider>.");
  }
  return contexto;
}
