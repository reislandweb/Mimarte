"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "../css/BodyZones.css";

// Coordenadas aproximadas en % sobre la imagen para posicionar los puntos
// Coordenadas corregidas basadas exactamente en tu imagen
const HOTSPOTS = [
  // ── FIGURA FRONTAL (Izquierda)
  { id: "triceps", label: "Tríceps", x: 26, y: 36, type: "frontal" },
  { id: "flancos", label: "Flancos", x: 29, y: 45, type: "frontal" },
  { id: "abdomen", label: "Abdomen", x: 34, y: 48, type: "frontal" },
  { id: "m-interno", label: "Muslo interno", x: 33.8, y: 62, type: "frontal" },
  {
    id: "m-anterior",
    label: "Muslo anterior",
    x: 28.5,
    y: 64,
    type: "frontal",
  },
  { id: "rodillas", label: "Rodillas", x: 37, y: 73, type: "frontal" },

  // ── FIGURA TRASERA (Derecha)
  { id: "aleta", label: "Aleta dorsal", x: 69, y: 37, type: "trasera" },
  {
    id: "espalda-baja",
    label: "Espalda baja",
    x: 64,
    y: 45,
    type: "trasera",
  },
  { id: "gluteos", label: "Glúteos", x: 60, y: 53.5, type: "trasera" },
  { id: "cartucheras", label: "Cartucheras", x: 72, y: 58.5, type: "trasera" },
  {
    id: "m-posterior",
    label: "Muslo posterior",
    x: 67.7,
    y: 68,
    type: "trasera",
  },
];

export default function BodyZones() {
  const [selectedZone, setSelectedZone] = useState("abdomen");
  const titleRef = useScrollReveal({ direction: "up" });
  const contentRef = useScrollReveal({ direction: "up", delay: 0.2 });

  return (
    <section id="zonas-corporales" className="section-content zonesSection">
      <div className="zonesContainer">
        {/* ── CABECERA */}
        <div ref={titleRef} className="zonesHeader">
          <span className="zonesSubtitle">Guía de aplicación</span>
          <h2 className="zonesTitle">
            Zonas corporales <em>a tratar</em>
          </h2>
          <p className="zonesDesc">
            Cada sesión se adapta a la zona que quieras trabajar y al tiempo
            necesario para realizar el tratamiento correctamente.
          </p>
        </div>

        <div ref={contentRef} className="zonesGrid">
          {/* ── COLUMNA IZQUIERDA: MAPA INTERACTIVO DE LA IMAGEN */}
          <div className="zonesInteractiveWrapper">
            <div className="imageContainer">
              <img
                src="/images/zonas-corporales.png"
                alt="Mapa de zonas corporales a tratar"
                className="baseImage"
              />

              {/* Renderizado de los puntos interactivos (Hotspots) */}
              {HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                  className={`hotspotDot ${selectedZone === spot.id ? "active" : ""}`}
                  onClick={() => setSelectedZone(spot.id)}
                  aria-label={`Ver información de ${spot.label}`}
                >
                  <span className="dotPulse" />
                  <span className="dotTooltip">{spot.label}</span>
                </button>
              ))}
            </div>
            <p className="interactiveHint">
              💡 <em>Haz clic en las zonas marcadas para interactuar.</em>
            </p>
          </div>

          {/* ── COLUMNA DERECHA: EXPLICACIÓN DE TIEMPOS Y REGLAS */}
          <div className="zonesInfoCard">
            {/* Bloque 30 Minutos */}
            <div className="timeBlock">
              <div className="timeHeader">
                <span className="timeBadge">30 Minutos</span>
                <h3>1 zona corporal</h3>
              </div>
              <p className="timeDesc">
                Indicada para trabajar de manera focalizada una zona concreta
                donde se acumula mayor necesidad.
              </p>
              <div className="zonesPills">
                {HOTSPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedZone(spot.id)}
                    className={`zonePill ${selectedZone === spot.id ? "selected" : ""}`}
                  >
                    {spot.label}
                  </button>
                ))}
              </div>
            </div>

            <hr className="zonesDivider" />

            {/* Bloque 50 Minutos */}
            <div className="timeBlock">
              <div className="timeHeader">
                <span className="timeBadge badgeGold">50 Minutos</span>
                <h3>Hasta 2 zonas contiguas</h3>
              </div>
              <p className="timeDesc">
                Permite trabajar dos zonas adyacentes para una remodelación más
                completa dentro de la misma área.
              </p>

              {/* Ejemplos de zonas contiguas */}
              <div className="examplesBox">
                <p className="examplesTitle">
                  💡 Ejemplos de combinaciones válidas:
                </p>
                <ul className="examplesList">
                  <li>✓ Abdomen + Flancos</li>
                  <li>✓ Glúteos + Cartucheras</li>
                  <li>✓ Glúteos + Muslo posterior</li>
                </ul>
              </div>

              {/* Advertencia / Nota importante */}
              <div className="warningBox">
                <p>
                  <strong>Importante:</strong> Las zonas deben ser contiguas
                  para garantizar la eficacia del tiempo de trabajo. No se
                  combinan en una misma sesión zonas alejadas como{" "}
                  <em>abdomen + glúteos</em>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
