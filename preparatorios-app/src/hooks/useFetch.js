import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook personalizado para consultar datos.
 * Devuelve los datos, si está cargando, el error y una función para recargar.
 *
 * @param {Function} funcion  Función que retorna una promesa (por ejemplo, listarOfertas).
 * @param {Array}    deps     Dependencias: cuando cambian, se vuelve a consultar.
 *
 * Ejemplo:
 *   const { datos, cargando, error, recargar } = useFetch(() => listarOfertas(filtros), [filtros]);
 */
export default function useFetch(funcion, deps = []) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const ultimaPeticion = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const ejecutar = useCallback(funcion, deps);

  const recargar = useCallback(async () => {
    const id = ++ultimaPeticion.current;
    setCargando(true);
    setError(null);
    try {
      const resultado = await ejecutar();
      if (id === ultimaPeticion.current) setDatos(resultado);
    } catch (e) {
      if (id === ultimaPeticion.current) setError(e.message || "Ocurrió un error al consultar los datos.");
    } finally {
      if (id === ultimaPeticion.current) setCargando(false);
    }
  }, [ejecutar]);

  useEffect(() => {
    recargar();
  }, [recargar]);

  return { datos, cargando, error, recargar };
}
