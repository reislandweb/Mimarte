"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/Bonos.css";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_PHONE = "34641882041";

const getWhatsAppLink = (bonoName, optionDetail = "") => {
  const detailText = optionDetail ? ` (${optionDetail})` : "";
  const message = `¡Hola! Me gustaría información o reservar el *${bonoName}*${detailText}.\n\n¿Podríais darme disponibilidad de citas?`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

const BONOS = [
  // ── PACKS Y PROGRAMAS FACIALES ──
  {
    id: "glow",
    category: "packs",
    name: "Bono Facial Glow",
    sessions: 2,
    treatment: "Limpieza Avanzada + Tratamiento Personalizado",
    price: 115,
    featured: false,
    badge: "Especial Luminosidad",
    features: [
      "1ª Sesión: Dermolimpieza Avanzada",
      "2ª Sesión a elegir: Lumina C, Hyaluronic, Retinol Repair u Oxibalance",
      "Piel equilibrada, limpia y luminosa",
      "Diagnóstico de piel personalizado",
    ],
    terms: [
      "Diseñado para preparar la piel y potenciar resultados",
      "Uso exclusivo individual y nominal",
      "Validez de 12 meses desde la compra",
      "Sujeto a reserva y cita previa",
    ],
  },
  {
    id: "deluxe",
    category: "packs",
    name: "Bono Facial Deluxe",
    sessions: 3,
    treatment: "Cuidado Facial Completo Personalizado",
    price: 179,
    featured: true,
    badge: "El más completo",
    features: [
      "1 Dermolimpieza Avanzada incluida",
      "Opción A: +2 Tratamientos a elegir (Lumina C, Hyaluronic, Retinol, Oxibalance)",
      "Opción B: +1 Tratamiento personalizado + 1 Radiofrecuencia Mimarte",
      "Máxima revitalización y nutrición",
    ],
    terms: [
      "Elección de Opción 1 u Opción 2 en la primera sesión",
      "Tratamientos adaptados a las necesidades de tu piel",
      "Validez de 12 meses desde la compra",
      "Cancelaciones con 24h de antelación",
    ],
  },

  // ── RADIOFRECUENCIA FACIAL ──
  {
    id: "rf-mimarte",
    category: "rf",
    name: "Radiofrecuencia Mimarte",
    sessions: "Bono 4 u 8",
    treatment: "Tratamiento Reafirmante Integral",
    price: "Desde 290",
    featured: false,
    badge: "Efecto Lifting",
    features: [
      "Sesión individual: 78€",
      "Bono 4 sesiones: 290€ (Ahorras 22€)",
      "Bono 8 sesiones: 520€ (Ahorras 104€)",
      "Estimulación profunda de colágeno",
    ],
    terms: [
      "Plan recomendado para firmeza progresiva",
      "Sesiones continuadas según pauta recomendada",
      "Validez de 12 meses",
      "Sujeto a valoración previa de la piel",
    ],
  },
  {
    id: "rf-totalface",
    category: "rf",
    name: "RF Total Face",
    sessions: "Bono 4 u 8",
    treatment: "Rejuvenecimiento Facial Global",
    price: "Desde 240",
    featured: false,
    features: [
      "Sesión individual: 65€",
      "Bono 4 sesiones: 240€ (Ahorras 20€)",
      "Bono 8 sesiones: 460€ (Ahorras 60€)",
      "Mejora tono, elasticidad y textura",
    ],
    terms: [
      "Trabaja la firmeza de forma progresiva",
      "Adaptado al objetivo de tu piel",
      "Validez de 12 meses",
    ],
  },
  {
    id: "rf-cuello-escote",
    category: "rf",
    name: "RF Cuello y Escote",
    sessions: "Bono 4 u 8",
    treatment: "Tratamiento Localizado Zonas Delicadas",
    price: "Desde 165",
    featured: false,
    features: [
      "Sesión individual: 45€",
      "Bono 4 sesiones: 165€ (Ahorras 15€)",
      "Bono 8 sesiones: 310€ (Ahorras 50€)",
      "Combate flacidez en cuello y escote",
    ],
    terms: [
      "Tratamiento intensivo redensificante",
      "Resultados visibles progresivos",
      "Validez de 12 meses",
    ],
  },
  {
    id: "rf-mirada-surco",
    category: "rf",
    name: "RF Mirada u Opción Surco",
    sessions: "Bono 4 u 8",
    treatment: "Zona Específica (Contorno o Surco Nasogeniano)",
    price: "Desde 140",
    featured: false,
    features: [
      "Sesión individual: 40€",
      "Bono 4 sesiones: 140€ (Ahorras 20€)",
      "Bono 8 sesiones: 250€ (Ahorras 70€)",
      "Tratamiento focalizado de arrugas de expresión",
    ],
    terms: [
      "Elige entre Mirada Perfecta o Surco Nasogeniano",
      "Atenuación de líneas y patas de gallo",
      "Validez de 12 meses",
    ],
  },
];

export default function Bonos() {
  const titleRef = useScrollReveal({ direction: "up" });
  const cardsRef = useRef(null);
  const [filter, setFilter] = useState("all");
  const [flippedCards, setFlippedCards] = useState({});

  const filteredBonos = BONOS.filter((bono) => {
    if (filter === "all") return true;
    return bono.category === filter;
  });

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const containers = cardsRef.current?.querySelectorAll(".bonoCardContainer");
    if (!containers || containers.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containers,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
        },
      );
    });

    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="bonos" className="section-content bonosSection">
      <div className="bonosContainer">
        {/* CABECERA */}
        <div ref={titleRef} className="headerText">
          <span className="bonosSubtitle">Cuida tu piel y ahorra</span>
          <h2 className="bonosTitle">
            Bonos <em>Especiales</em>
          </h2>
          <p className="bonosDesc">
            Programas pensados para trabajar la firmeza y mantener resultados de
            forma progresiva. Recomendamos la opción ideal según las necesidades
            de tu piel.
          </p>

          {/* FILTROS / CATEGORÍAS */}
          <div className="bonosFilterWrapper">
            <button
              className={`filterBtn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              Todos los bonos
            </button>
            <button
              className={`filterBtn ${filter === "packs" ? "active" : ""}`}
              onClick={() => setFilter("packs")}
            >
              Faciales Glow & Deluxe
            </button>
            <button
              className={`filterBtn ${filter === "rf" ? "active" : ""}`}
              onClick={() => setFilter("rf")}
            >
              Radiofrecuencia
            </button>
          </div>
        </div>

        {/* GRID DE BONOS 3D (FLIP CARDS) */}
        <div ref={cardsRef} className="bonosGrid">
          {filteredBonos.map((bono) => {
            const isFlipped = flippedCards[bono.id];

            return (
              <div key={bono.id} className="bonoCardContainer">
                <div
                  className={`flipCardInner ${isFlipped ? "isFlipped" : ""}`}
                >
                  {/* CARA DELANTERA (FRONT) */}
                  <div
                    className={`cardFront bonoCard ${bono.featured ? "cardFeatured" : "cardNormal"}`}
                  >
                    {bono.badge && (
                      <span
                        className={`tagPopular ${bono.featured ? "goldTag" : ""}`}
                      >
                        {bono.badge}
                      </span>
                    )}

                    <p className="sessionsTag">
                      {typeof bono.sessions === "number"
                        ? `${bono.sessions} sesiones`
                        : bono.sessions}
                    </p>

                    <h3 className="cardTitle">{bono.name}</h3>
                    <p className="cardTreatment">{bono.treatment}</p>

                    {/* Precio */}
                    <div className="priceWrapper">
                      <span className="priceText">
                        {typeof bono.price === "number"
                          ? `${bono.price}€`
                          : bono.price + "€"}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="featuresList">
                      {bono.features.map((f, fIdx) => (
                        <li key={fIdx} className="featureItem">
                          <span className="checkIcon">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Botón para girar */}
                    <button
                      type="button"
                      onClick={() => toggleFlip(bono.id)}
                      className="btnFlipTrigger"
                    >
                      Ver condiciones 🔄
                    </button>
                  </div>

                  {/* CARA TRASERA (BACK) */}
                  <div
                    className={`cardBack bonoCard ${bono.featured ? "cardFeatured" : "cardNormal"}`}
                  >
                    <div className="backContent">
                      <h4 className="backTermsTitle">Condiciones e Info</h4>
                      <ul className="termsList">
                        {bono.terms.map((term, index) => (
                          <li key={index}>• {term}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="cardActionButtons">
                      <button
                        type="button"
                        onClick={() => toggleFlip(bono.id)}
                        className="btnBono btnBackTurn"
                      >
                        ← Volver
                      </button>
                      <a
                        href={getWhatsAppLink(bono.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btnBono btnWhatsapp"
                      >
                        Reservar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Nota legal */}
        <p className="bonosNotice">
          * Precios e información sujetos a valoración en centro. Bonos
          nominales e intransferibles. Validez de 12 meses desde la fecha de
          compra.
        </p>
      </div>
    </section>
  );
}
