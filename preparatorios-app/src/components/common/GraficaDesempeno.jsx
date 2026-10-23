import { useState } from "react";

/**
 * Gráfica sencilla de barras o líneas hecha con SVG (no necesita librerías).
 * Se usa en el Historial del estudiante y en los reportes de resultados.
 *
 * Props:
 *  - datos: [{ etiqueta, valor }]
 *  - tipo: "barras" | "lineas"
 *  - valorMaximo: valor más alto del eje (por defecto el mayor de los datos; para notas use 5).
 *  - decimales: decimales que se muestran en cada valor.
 *  - titulo: texto opcional sobre la gráfica.
 */
export default function GraficaDesempeno({ datos = [], tipo = "barras", valorMaximo, decimales = 0, titulo }) {
  const [activo, setActivo] = useState(null);

  if (datos.length === 0) {
    return <p className="pp-texto-suave">No hay datos para graficar.</p>;
  }

  const ancho = 640;
  const alto = 260;
  const margen = { arriba: 24, derecha: 16, abajo: 36, izquierda: 40 };
  const anchoUtil = ancho - margen.izquierda - margen.derecha;
  const altoUtil = alto - margen.arriba - margen.abajo;

  // Se calcula un máximo "redondo" para que el eje muestre valores fáciles de leer (0, 2, 4, 6, 8...).
  const pasos = 4;
  const maximoDatos = Math.max(...datos.map((d) => d.valor), 0);
  const pasoCrudo = (valorMaximo ?? (maximoDatos || 1)) / pasos;
  const potencia = 10 ** Math.floor(Math.log10(pasoCrudo));
  const paso = valorMaximo ? pasoCrudo : [1, 2, 2.5, 5, 10].map((f) => f * potencia).find((p) => p >= pasoCrudo);
  const maximo = paso * pasos;
  const lineasGuia = Array.from({ length: pasos + 1 }, (_, i) => paso * i);

  const banda = anchoUtil / datos.length;
  const x = (i) => margen.izquierda + banda * i + banda / 2;
  const y = (v) => margen.arriba + altoUtil - (v / maximo) * altoUtil;
  const anchoBarra = Math.min(56, banda * 0.55);

  return (
    <figure className="pp-grafica">
      {titulo && <figcaption>{titulo}</figcaption>}
      <svg viewBox={`0 0 ${ancho} ${alto}`} role="img" aria-label={titulo || "Gráfica"}>
        {lineasGuia.map((v) => (
          <g key={v}>
            <line x1={margen.izquierda} x2={ancho - margen.derecha} y1={y(v)} y2={y(v)} className="pp-grafica-guia" />
            <text x={margen.izquierda - 8} y={y(v)} className="pp-grafica-eje" textAnchor="end" dominantBaseline="middle">
              {Number.isInteger(v) ? v : v.toFixed(1)}
            </text>
          </g>
        ))}

        {tipo === "lineas" && (
          <polyline className="pp-grafica-linea" points={datos.map((d, i) => `${x(i)},${y(d.valor)}`).join(" ")} />
        )}

        {datos.map((d, i) => (
          <g key={d.etiqueta} onMouseEnter={() => setActivo(i)} onMouseLeave={() => setActivo(null)}>
            {tipo === "barras" ? (
              <rect
                x={x(i) - anchoBarra / 2}
                y={y(d.valor)}
                width={anchoBarra}
                height={Math.max(0, margen.arriba + altoUtil - y(d.valor))}
                rx="4"
                className={`pp-grafica-barra ${activo === i ? "activo" : ""}`}
              />
            ) : (
              <circle cx={x(i)} cy={y(d.valor)} r={activo === i ? 6 : 4.5} className="pp-grafica-punto" />
            )}
            <text x={x(i)} y={y(d.valor) - 8} textAnchor="middle" className="pp-grafica-valor">
              {d.valor.toFixed(decimales)}
            </text>
            <text x={x(i)} y={alto - margen.abajo + 20} textAnchor="middle" className="pp-grafica-eje">
              {d.etiqueta}
            </text>
          </g>
        ))}
      </svg>
    </figure>
  );
}
