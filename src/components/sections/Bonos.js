"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/Bonos.css";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_PHONE = "34641882041";

const getWhatsAppBonoLink = (bonoTitle) => {
  const message = `¡Hola! Me gustaría pedir información/cita para el bono: *${bonoTitle}*.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

const MAIN_TABS = [
  { id: "faciales", label: "BONOS FACIALES" },
  { id: "corporales", label: "BONOS CORPORALES" },
];

const BONOS = [
  // ── FACIALES ──
  {
    id: "glow",
    type: "faciales",
    name: "Bono Facial Glow",
    sessions: "2 SESIONES",
    price: "115 €",
    includes: [
      "Dermolimpieza avanzada",
      "Tratamiento personalizado: Lumina C, Hyaluronic Hidratación, Retinol Repair u Oxibalance",
    ],
    terms: [
      "Tratamiento personalizado a definir según valoración facial previa.",
    ],
  },
  {
    id: "deluxe",
    type: "faciales",
    name: "Bono Facial Deluxe",
    sessions: "3 SESIONES",
    price: "179 €",
    featured: true,
    badge: "El más completo",
    options: [
      {
        title: "Opción 1",
        items: [
          "1 Dermolimpieza Avanzada",
          "2 tratamientos faciales personalizados a elegir entre: Lumina C, Hyaluronic – Hidratación Profunda, Retinol Repair u Oxibalance",
        ],
      },
      {
        title: "Opción 2",
        items: [
          "1 Dermolimpieza Avanzada",
          "1 tratamiento facial personalizado",
          "1 sesión de Radiofrecuencia Facial Mimarte",
        ],
      },
    ],
    terms: [
      "Tratamientos personalizados según valoración facial previa y necesidades de la piel.",
    ],
  },
  {
    id: "rf-mimarte",
    type: "faciales",
    name: "Radiofrecuencia Facial Mimarte",
    sessions: "Tratamiento Premium",
    price: "Desde 290 €",
    badge: "Efecto Lifting",
    description: "Nuestro tratamiento premium de reafirmación y bienestar.",
    duration: "60 min",
    pricingDetails: ["Bono 4 sesiones: 290 €", "Bono 8 sesiones: 520 €"],
    terms: [
      "Tratamiento completo que combina radiofrecuencia con doble limpieza, sérum de ácido hialurónico, presoterapia ocular y Masaje Mimarte para mejorar firmeza, luminosidad y calidad de la piel.",
    ],
  },
  {
    id: "rf-totalface",
    type: "faciales",
    name: "Radiofrecuencia Facial Total Face",
    sessions: "Rostros Completos",
    price: "Desde 240 €",
    description: "Tratamiento reafirmante de rostro completo.",
    duration: "45 min",
    pricingDetails: ["Bono 4 sesiones: 240 €", "Bono 8 sesiones: 460 €"],
    terms: [
      "Enfocado en estimular colágeno y elastina para mejorar la firmeza, elasticidad y minimizar arrugas.",
    ],
  },
  {
    id: "rf-mirada",
    type: "faciales",
    name: "Radiofrecuencia Mirada Perfecta",
    sessions: "Zona Específica",
    price: "Desde 140 €",
    description:
      "Tratamiento específico para reafirmar y revitalizar el contorno de ojos.",
    duration: "20 min",
    pricingDetails: ["Bono 4 sesiones: 140 €", "Bono 8 sesiones: 250 €"],
    terms: [
      "Ayuda a mejorar la firmeza de la piel y suavizar la apariencia de líneas de expresión, bolsas y ojeras.",
    ],
  },
  {
    id: "rf-surco",
    type: "faciales",
    name: "Radiofrecuencia Surco Nasogeniano",
    sessions: "Zona Específica",
    price: "Desde 140 €",
    description:
      "Tratamiento localizado para mejorar la firmeza y suavizar líneas de expresión del contorno de labios.",
    duration: "20 min",
    pricingDetails: ["Bono 4 sesiones: 140 €", "Bono 8 sesiones: 250 €"],
    terms: [
      "Tratamiento específico para la zona alrededor de la boca, orientado a suavizar el aspecto del surco nasogeniano y mejorar la firmeza de la piel.",
    ],
  },
  {
    id: "rf-cuello-escote",
    type: "faciales",
    name: "Radiofrecuencia Cuello y Escote",
    sessions: "Zona Específica",
    price: "Desde 165 €",
    description: "Firmeza y cuidado para cuello y escote.",
    duration: "30 min",
    pricingDetails: ["Bono 4 sesiones: 165 €", "Bono 8 sesiones: 310 €"],
    terms: [
      "Tratamiento específico para mejorar firmeza, elasticidad y aspecto general de la piel del cuello y escote.",
    ],
  },

  // ── CORPORALES ──
  {
    id: "rf-corporal",
    type: "corporales",
    name: "Radiofrecuencia Corporal",
    sessions: "Corporal Reafirmante",
    price: "Desde 180 €",
    description:
      "Tratamiento corporal con acción reafirmante, lipolítica y anticelulítica.",
    duration: "30 o 50 min",
    options: [
      {
        title: "Sesiones de 30 min · 1 zona corporal",
        items: ["Bono 4 sesiones: 180 €", "Bono 8 sesiones: 340 €"],
      },
      {
        title: "Sesiones de 50 min · 2 zonas contiguas",
        items: ["Bono 4 sesiones: 280 €", "Bono 8 sesiones: 547 €"],
      },
    ],
    terms: [
      "Ayuda a mejorar de forma progresiva flacidez, celulitis y grasa localizada.",
    ],
  },
  {
    id: "vacumterapia",
    type: "corporales",
    name: "VacumTerapia",
    sessions: "Circulatorio y Remodelador",
    price: "Desde 165 €",
    description:
      "Tratamiento corporal que ayuda a mejorar la circulación, trabajar la celulitis y favorecer un aspecto más uniforme de la piel.",
    duration: "30 o 50 min",
    options: [
      {
        title: "Sesiones de 30 min · 1 zona corporal",
        items: ["Bono 4 sesiones: 165 €", "Bono 8 sesiones: 310 €"],
      },
      {
        title: "Sesiones de 50 min · 2 zonas contiguas",
        items: ["Bono 4 sesiones: 240 €", "Bono 8 sesiones: 460 €"],
      },
    ],
    terms: [
      "Especialmente indicada para trabajar celulitis, tejido congestionado y retención de líquidos.",
    ],
  },
  {
    id: "cavitacion",
    type: "corporales",
    name: "Cavitación",
    sessions: "Grasa Localizada",
    price: "Desde 165 €",
    description:
      "Tratamiento corporal enfocado en trabajar la grasa localizada mediante ondas ultrasónicas.",
    duration: "30 min",
    pricingDetails: ["Bono 4 sesiones: 165 €", "Bono 8 sesiones: 310 €"],
    terms: [
      "Indicada para trabajar zonas con acumulaciones localizadas de grasa y complementar planes de remodelación corporal.",
    ],
  },
  {
    id: "maderoterapia",
    type: "corporales",
    name: "Maderoterapia",
    sessions: "Remodelación Manual",
    price: "Desde 189 €",
    description:
      "Tratamiento manual con instrumentos de madera diseñado para estimular la circulación, trabajar la celulitis y favorecer la remodelación corporal.",
    duration: "60 min",
    pricingDetails: ["Bono 4 sesiones: 189 €", "Bono 8 sesiones: 360 €"],
    terms: [
      "Un protocolo corporal completo que combina masaje y diferentes maniobras de maderoterapia para trabajar el tejido de forma progresiva.",
    ],
  },
  {
    id: "presoterapia",
    type: "corporales",
    name: "Presoterapia",
    sessions: "Drenaje y Circulación",
    price: "Desde 150 €",
    description:
      "Tratamiento de drenaje que ayuda a aliviar la sensación de piernas cansadas, favorecer la circulación y reducir la retención de líquidos.",
    duration: "30 min",
    pricingDetails: ["Bono 6 sesiones: 150 €"],
    terms: [
      "Ideal para favorecer el drenaje, aliviar la sensación de pesadez y acompañar otros tratamientos corporales.",
    ],
  },
];

export default function Bonos() {
  const titleRef = useScrollReveal({ direction: "up" });
  const cardsRef = useRef(null);
  const [activeMainTab, setActiveMainTab] = useState("faciales");
  const [flippedCards, setFlippedCards] = useState({});

  const handleMainTabChange = (tabId) => {
    setActiveMainTab(tabId);
    setFlippedCards({});
  };

  const filteredBonos = BONOS.filter((bono) => bono.type === activeMainTab);

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
  }, [activeMainTab]);

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

          {/* PESTAÑAS PRINCIPALES */}
          <div className="bonosMainTabs" style={{ marginBottom: "24px" }}>
            {MAIN_TABS.map((tab) => (
              <button
                key={tab.id}
                className={`filterBtn ${activeMainTab === tab.id ? "active" : ""}`}
                onClick={() => handleMainTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* GRID DE BONOS */}
        <div ref={cardsRef} className="bonosGrid">
          {filteredBonos.map((bono) => {
            const isFlipped = flippedCards[bono.id];

            return (
              <div key={bono.id} className="bonoCardContainer">
                <div
                  className={`flipCardInner ${isFlipped ? "isFlipped" : ""}`}
                >
                  {/* CARA DELANTERA STRICTA: SOLO NOMBRE, SESIONES Y PRECIO */}
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

                    {/* 1. Nombre */}
                    <h2 className="cardTitle">{bono.name}</h2>

                    {/* 2. Sesiones */}
                    <p className="sessionsTag">{bono.sessions}</p>

                    {/* 3. Precio */}
                    <div className="priceWrapper">
                      <span className="priceText">{bono.price}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFlip(bono.id)}
                      className="btnFlipTrigger"
                    >
                      + Info
                    </button>
                  </div>

                  {/* CARA TRASERA: DESCRIPCIÓN, DURACIÓN, OPCIONES Y CONDICIONES */}
                  <div
                    className={`cardBack bonoCard ${bono.featured ? "cardFeatured" : "cardNormal"}`}
                  >
                    <div className="backContent">
                      <h4 className="backTermsTitle">Incluye & Detalles</h4>

                      {/* Descripción corta si existe */}
                      {bono.description && (
                        <p
                          style={{
                            fontSize: "1rem",
                            marginBottom: "8px",
                            opacity: 0.9,
                          }}
                        >
                          {bono.description}
                        </p>
                      )}

                      {/* Duración si aplica */}
                      {bono.duration && (
                        <p
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: "600",
                            marginBottom: "8px",
                          }}
                        >
                          ⏱ Duración: {bono.duration} por sesión
                        </p>
                      )}

                      {/* Caso A: Incluye directo */}
                      {bono.includes && (
                        <ul className="termsList">
                          {bono.includes.map((item, idx) => (
                            <li key={idx}>• {item}</li>
                          ))}
                        </ul>
                      )}

                      {/* Caso B: Opciones */}
                      {bono.options && (
                        <div className="backOptionsWrapper">
                          {bono.options.map((opt, idx) => (
                            <div key={idx} style={{ marginBottom: "8px" }}>
                              <strong style={{ fontSize: "1rem" }}>
                                {opt.title}
                              </strong>
                              <ul className="termsList">
                                {opt.items.map((item, i) => (
                                  <li key={i}>• {item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Caso C: Desglose de precios de bonos */}
                      {bono.pricingDetails && (
                        <ul className="termsList">
                          {bono.pricingDetails.map((p, idx) => (
                            <li key={idx} style={{ fontWeight: "600" }}>
                              ✓ {p}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Términos o notas de valoración previa */}
                      {bono.terms && (
                        <div
                          style={{
                            marginTop: "6px",
                            fontSize: "0.82rem",
                            opacity: 0.85,
                          }}
                        >
                          {bono.terms.map((term, index) => (
                            <p key={index} style={{ margin: "2px 0" }}>
                              {term}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="cardActionButtons">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(bono.id);
                        }}
                        className="btnBono btnBackTurn"
                      >
                        ← Volver
                      </button>
                      <a
                        href={getWhatsAppBonoLink(bono.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btnBono btnWhatsapp"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Reservar WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FRASE FINAL */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <p
            style={{
              fontStyle: "italic",
              opacity: 0.85,
              fontSize: "1.05rem",
            }}
          >
            Cuidados continuados para potenciar tus resultados
          </p>
        </div>
      </div>
    </section>
  );
}
