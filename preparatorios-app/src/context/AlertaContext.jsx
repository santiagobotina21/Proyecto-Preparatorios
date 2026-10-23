import { createContext, useCallback, useMemo, useRef, useState } from "react";
import Alerta from "../components/common/Alerta";

export const AlertaContext = createContext(null);

/**
 * Proveedor de alertas. Se coloca una sola vez en App.jsx y permite que
 * cualquier componente muestre mensajes con useAlerta():
 *
 *   const alerta = useAlerta();
 *   alerta.exito("Oferta creada");
 *   alerta.error("No se pudo guardar", "Detalle del error");
 *   if (await alerta.confirmar("¿Eliminar la oferta?")) { ... }
 */
export function AlertaProvider({ children }) {
  const [alerta, setAlerta] = useState(null);
  const resolver = useRef(null);

  const mostrar = useCallback(
    (config) =>
      new Promise((resolve) => {
        resolver.current = resolve;
        setAlerta(config);
      }),
    []
  );

  const cerrar = useCallback((respuesta) => {
    setAlerta(null);
    resolver.current?.(respuesta);
    resolver.current = null;
  }, []);

  const api = useMemo(
    () => ({
      exito: (titulo, mensaje) => mostrar({ tipo: "exito", titulo, mensaje }),
      error: (titulo, mensaje) => mostrar({ tipo: "error", titulo, mensaje }),
      advertencia: (titulo, mensaje) => mostrar({ tipo: "advertencia", titulo, mensaje }),
      info: (titulo, mensaje) => mostrar({ tipo: "info", titulo, mensaje }),
      confirmar: (titulo, mensaje, { textoAceptar = "Sí, continuar", textoCancelar = "Cancelar" } = {}) =>
        mostrar({ tipo: "confirmar", titulo, mensaje, textoAceptar, textoCancelar }),
    }),
    [mostrar]
  );

  return (
    <AlertaContext.Provider value={api}>
      {children}
      {alerta && <Alerta {...alerta} onAceptar={() => cerrar(true)} onCancelar={() => cerrar(false)} />}
    </AlertaContext.Provider>
  );
}
