"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import "../css/About.css"; // Conectamos tu CSS Puro desde tu nueva carpeta

const STATS = [
  { value: "10+", label: "Años de experiencia" },
  { value: "800+", label: "Clientas satisfechas" },
  { value: "20+", label: "Tratamientos" },
];

export default function About() {
  const textRef = useScrollReveal({ direction: "left", duration: 1 });
  const imageRef = useScrollReveal({
    direction: "right",
    duration: 1,
    delay: 0.2,
  });
  const statsRef = useScrollReveal({
    direction: "up",
    stagger: 0.15,
    delay: 0.3,
  });

  return (
    <section id="nosotros" className="section-content aboutSection">
      <div className="container">
        {/* ── BLOQUE DE TEXTO */}
        <div ref={textRef}>
          <span className="subtitle">Nuestro espacio</span>
          <h2 className="title">¿QUIÉN SOY?</h2>
          <p className="description">
            Soy Dayana, esteticista especializada en estética avanzada y
            graduada en Arte-Miss (Zaragoza). Con una sólida trayectoria en el
            sector, me especializo en técnicas como la maderoterapia y el
            dermapen, diseñando experiencias personalizadas que garantizan
            resultados visibles y bienestar real. En Mimarte Estética transformo
            el cuidado personal en un ritual de calma y renovación, combinando
            rigor profesional, atención cercana y una dedicación absoluta a la
            salud de tu piel.
          </p>

          {/* Estadísticas */}
          <div ref={statsRef} className="statsGrid">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="statValue">{value}</p>
                <p className="statLabel">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOQUE DE IMAGEN */}
        <div ref={imageRef} className="imageWrapper">
          <div className="imageFrame">
            <div
              className="imageSrc"
              style={{ backgroundImage: `url('/images/Dayana.png')` }}
            />
          </div>
          {/* Decoraciones en capas inferiores */}
          <div className="decoLine" />
          <div className="decoBox" />
        </div>
      </div>
    </section>
  );
}
