"use client";

import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import "../css/Treatments.css";

const WHATSAPP_PHONE = "34641882041";

const getWhatsAppLink = (treatmentTitle) => {
  const message = `¡Hola! Me gustaría reservar cita para el tratamiento: *${treatmentTitle}*.\n\n¿Qué días y horas tenéis disponibles?`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

const CATEGORIES = [
  { id: "facial", label: "Faciales" },
  { id: "corporal", label: "Corporales y Masajes" },
  { id: "bonos", label: "Packs y Bonos ⭐" },
];

const SERVICES = {
  facial: [
    {
      title: "Higiene Facial",
      subtitle: "Limpieza y Salud Cutánea",
      price: "45€",
      duration: "45-60 min",
      img: "/images/services/facial-1.jpg",
      benefits: [
        "Elimina impurezas y células muertas",
        "Devuelve luminosidad y equilibrio",
        "Preparación ideal para otros protocolos",
      ],
      idealFor: "Todo tipo de pieles, piel apagada o poros obstruidos.",
      desc: "Una piel limpia es el primer paso para una piel saludable. Eliminamos impurezas, células muertas y exceso de grasa para devolver luminosidad, frescura y equilibrio a tu piel. Ideal como tratamiento de mantenimiento o preparación.",
    },
    {
      title: "Dermolimpieza Avanzada",
      subtitle: "Higiene Profunda y Ultrasónica",
      price: "59€",
      duration: "60 min",
      img: "/images/services/facial-3.jpg",
      benefits: [
        "Extracción manual y espátula ultrasónica",
        "Desobstruye poros e impurezas eficazmente",
        "Piel fresca, equilibrada y muy luminosa",
      ],
      idealFor: "Todo tipo de pieles que busquen una limpieza profunda.",
      desc: "Tratamiento de higiene facial profunda y personalizada que combina extracción manual y espátula ultrasónica para limpiar la piel de forma eficaz y respetuosa, preparándola para potenciar tratamientos posteriores.",
    },
    {
      title: "Lumina C – Iluminador",
      subtitle: "Acción Antioxidante y Vitalidad",
      price: "70€",
      duration: "50 min",
      img: "/images/services/facial-5.jpg",
      benefits: [
        "Aporta luminosidad e hidratación",
        "Protege frente al envejecimiento prematuro",
        "Rostro fresco, uniforme y radiante",
      ],
      idealFor: "Mantener una piel luminosa, hidratada y llena de vitalidad.",
      desc: "Tratamiento facial manual con acción antioxidante que revitaliza la piel, aporta luminosidad e hidratación y ayuda a protegerla frente al envejecimiento prematuro.",
    },
    {
      title: "Retinol Repair",
      subtitle: "Renovación y Antimanchas",
      price: "70€",
      duration: "50 min",
      img: "/images/services/facial-7.jpg",
      benefits: [
        "Atenúa la apariencia de manchas",
        "Favorece la renovación celular",
        "Mejora firmeza, luminosidad y textura",
      ],
      idealFor: "Pieles con manchas, falta de firmeza o textura irregular.",
      desc: "Tratamiento facial manual a base de retinol que favorece la renovación de la piel, disminuye la apariencia de manchas y mejora la firmeza para dejar un aspecto visiblemente más joven.",
    },
    {
      title: "Hyaluronic Hidratación",
      subtitle: "Nutrición e Hidratación Profunda",
      price: "70€",
      duration: "50 min",
      img: "/images/services/facial-4.jpg",
      benefits: [
        "Hidratación profunda y duradera",
        "Mejora la elasticidad y suavidad",
        "Aporta confort y vitalidad al rostro",
      ],
      idealFor: "Pieles deshidratadas, secas o con falta de confort.",
      desc: "Tratamiento facial intensivo con ácido hialurónico que proporciona una hidratación intensa, mejora la elasticidad y devuelve confort y suavidad a la piel.",
    },
    {
      title: "Oxibalance Detox",
      subtitle: "Oxigenante y Anti-Polución",
      price: "75€",
      duration: "50 min",
      img: "/images/services/facial-6.jpg",
      benefits: [
        "Protege del estrés y contaminación",
        "Activos antioxidantes y prebióticos",
        "Restaura el equilibrio natural cutáneo",
      ],
      idealFor: "Pieles expuestas a la contaminación urbana o estrés diario.",
      desc: "Diseñado para revitalizar y equilibrar la piel frente al estrés diario. Su combinación de prebióticos y antioxidantes favorece la oxigenación natural y restaura su salud.",
    },
    {
      title: "Tratamiento Antiacné",
      subtitle: "Seborregulador + Fototerapia LED",
      price: "85€",
      duration: "60 min",
      packs: "Bono 4 ses: 310€ | Bono 8 ses: 552€",
      img: "/images/services/facial-8.jpg",
      benefits: [
        "Regula el exceso de sebo",
        "Reduce granitos y comedones",
        "Estimula la regeneración cutánea",
      ],
      idealFor: "Pieles acneicas, con exceso de grasa e imperfecciones.",
      desc: "Protocolo específico purificante y seborregulador combinado con fototerapia LED para calmar la piel, controlar el sebo y reducir imperfecciones. Disponible en bonos de 4 y 8 sesiones.",
    },
    {
      title: "Dermapen Restaurador",
      subtitle: "Microagujas y Activos Personalizados",
      price: "80€",
      duration: "60 min",
      img: "/images/services/facial-2.jpg",
      benefits: [
        "Induce la penetración profunda de activos",
        "Trata manchas, arrugas o marcas de acné",
        "Sesiones 100% personalizadas",
      ],
      idealFor:
        "Tratar marcas, cicatrices de acné, manchas y rejuvenecimiento.",
      desc: "Tratamiento facial que utiliza microagujas para favorecer la penetración de activos específicos seleccionados según tus necesidades (hidratación, manchas, antiedad o marcas).",
    },
    {
      title: "Radiofrecuencia Facial Mimarte ⭐",
      subtitle: "Reafirmación y Bienestar Premium",
      price: "78€",
      duration: "60 min",
      packs: "Bono 4 ses: 290€ | Bono 8 ses: 520€",
      img: "/images/services/facial-9.jpg",
      benefits: [
        "Valoración + doble limpieza + hialurónico",
        "Incluye presoterapia ocular",
        "Exclusivo Masaje Mimarte estimulante",
      ],
      idealFor:
        "Reafirmación profunda combinada con una experiencia relajante.",
      desc: "Nuestro tratamiento premium. Combina la eficacia de la radiofrecuencia con valoración, sérum de ácido hialurónico, presoterapia ocular y el Masaje Mimarte para potenciar firmeza y luminosidad.",
    },
    {
      title: "RF Total Face",
      subtitle: "Reafirmante Facial Completo",
      price: "65€",
      duration: "45 min",
      packs: "Bono 4 ses: 240€ | Bono 8 ses: 460€",
      img: "/images/services/facial-9.jpg",
      benefits: [
        "Estimula colágeno y elastina",
        "Mejora firmeza y calidad de la piel",
        "Mantenimiento ideal de RF Mimarte",
      ],
      idealFor: "Tratamiento específico de reafirmación en todo el rostro.",
      desc: "Tratamiento reafirmante de rostro completo enfocado en estimular la producción natural de colágeno y elastina para mejorar la firmeza y elasticidad.",
    },
    {
      title: "RF Zonas Específicas",
      subtitle: "Mirada / Surco / Cuello y Escote",
      price: "Desde 40€",
      duration: "20 - 30 min",
      img: "/images/services/facial-9.jpg",
      benefits: [
        "Mirada Perfecta (40€ / 20 min)",
        "Surco Nasogeniano (40€ / 20 min)",
        "Cuello y Escote (45€ / 30 min)",
      ],
      idealFor: "Tratar zonas focalizadas que han perdido firmeza.",
      desc: "Tratamientos localizados para reafirmar áreas concretas: atenúa bolsas y ojeras en los ojos, suaviza el surco nasogeniano o reafirma la piel de cuello y escote.",
    },
  ],
  corporal: [
    {
      title: "Radiofrecuencia Corporal",
      subtitle: "Reafirmación y Remodelación",
      price: "49€ / 75€",
      duration: "30 min / 50 min",
      packs:
        "30m: 4 ses (180€) - 8 ses (340€) | 50m: 4 ses (280€) - 8 ses (547€)",
      img: "/images/services/corp-5.jpg",
      benefits: [
        "Mejora la firmeza en zonas con flacidez",
        "Reduce la apariencia de la celulitis",
        "Actúa sobre adiposidad localizada",
      ],
      idealFor: "Reafirmar y remodelar áreas corporales específicas.",
      desc: "Tratamiento enfocado en reafirmar, remodelar y mejorar el aspecto de la piel por zonas. Incluye asesoría corporal personalizada antes de comenzar.",
    },
    {
      title: "Cavitación",
      subtitle: "Ultrasonidos Reductores",
      price: "45€",
      duration: "30 min",
      packs: "Pack 4 ses: 165€ | Pack 8 ses: 310€",
      img: "/images/services/corp-1.jpg",
      benefits: [
        "Moviliza la grasa acumulada",
        "Remodela el contorno corporal",
        "Complemento ideal para celulitis",
      ],
      idealFor: "Moldear y definir zonas específicas con grasa localizada.",
      desc: "Utiliza ultrasonidos sobre la grasa acumulada en zonas específicas, favoreciendo su movilización y posterior eliminación. Técnica enfocada en moldear la figura.",
    },
    {
      title: "Vacumterapia",
      subtitle: "Succión Controlada y Drenaje",
      price: "45€ / 65€",
      duration: "30 min / 45 min",
      packs:
        "30m: 4 ses (165€) - 8 ses (310€) | 45m: 4 ses (240€) - 8 ses (460€)",
      img: "/images/services/corp-6.jpg",
      benefits: [
        "Favorece el drenaje linfático",
        "Elimina líquidos retenidos",
        "Moldea abdomen, piernas y glúteos",
      ],
      idealFor: "Tratar la celulitis y retención de líquidos.",
      desc: "Masaje mediante succión controlada para movilizar tejidos, favorecer el drenaje y trabajar el contorno corporal en abdomen, piernas y glúteos.",
    },
    {
      title: "Maderoterapia",
      subtitle: "Técnica Natural Reafirmante",
      price: "50€",
      duration: "60 min",
      packs: "Pack 4 ses: 189€ | Pack 8 ses: 360€",
      img: "/images/services/corp-3.jpg",
      benefits: [
        "Mejora la apariencia de la celulitis",
        "Activa circulación y firmeza",
        "Libera tensión y relaja la musculatura",
      ],
      idealFor: "Remodelar la silueta y liberar carga muscular.",
      desc: "Tratamiento corporal manual realizado con elementos anatómicos de madera para movilizar tejidos, activar circulación y remodelar la silueta.",
    },
    {
      title: "Presoterapia",
      subtitle: "Drenaje y Sensación de Ligereza",
      price: "27€",
      duration: "30 min",
      packs: "Bono Especial 6 sesiones: 150€",
      img: "/images/services/corp-4.jpg",
      benefits: [
        "Estimula la circulación de retorno",
        "Alivia piernas pesadas y cansadas",
        "Favorece la eliminación de toxinas",
      ],
      idealFor: "Retención de líquidos y descongestión de piernas.",
      desc: "Compresión neumática secuencial que estimula el sistema linfático y venoso, aportando una descongestión inmediata y ligereza a las extremidades.",
    },
    {
      title: "Masaje Cuerpo Entero",
      subtitle: "Relajante con Aceites Esenciales",
      price: "49€",
      duration: "60 min",
      img: "/images/services/est-3.jpg",
      benefits: [
        "Libera tensiones acumuladas",
        "Favorece relajación física y mental",
        "Experiencia envolvente de bienestar",
      ],
      idealFor: "Regalarte una pausa y desconectar del ritmo diario.",
      desc: "Un masaje pensado para recuperar el equilibrio. Mediante maniobras suaves y aceites esenciales, trabajamos todo el cuerpo para aliviar tensión y estrés.",
    },
    {
      title: "Masaje de Espalda",
      subtitle: "Relajante Localizado",
      price: "35€",
      duration: "30 min",
      img: "/images/services/est-1.jpg",
      benefits: [
        "Libera tensión muscular acumulada",
        "Alivia sobrecarga en cuello y hombros",
        "Proporciona descanso inmediato",
      ],
      idealFor: "Sobrecarga cervical, dorsal o estrés diario.",
      desc: "Masaje enfocado en liberar las tensiones en espalda, cuello y hombros. Disminuye la sensación de sobrecarga para recuperar el bienestar.",
    },
    {
      title: "Masaje Circulatorio Piernas",
      subtitle: "Drenante y Tonificante",
      price: "35€",
      duration: "30 min",
      img: "/images/services/est-2.jpg",
      benefits: [
        "Favorece la circulación sanguínea",
        "Moviliza líquidos retenidos",
        "Sensación de piernas ligeras",
      ],
      idealFor: "Sensación de pesadez, hinchazón o piernas cansadas.",
      desc: "Maniobras específicas que activan la circulación y movilizan líquidos, proporcionando ligereza y descanso a tus piernas de forma inmediata.",
    },
  ],
  bonos: [
    {
      title: "Bono Facial Glow ✨",
      subtitle: "Programa de 2 Sesiones",
      price: "115€",
      duration: "2 Sesiones",
      img: "/images/services/facial-5.jpg",
      benefits: [
        "1ª Sesión: Dermolimpieza Avanzada",
        "2ª Sesión: Tratamiento Personalizado a elegir",
        "A elegir entre: Lumina C, Hyaluronic, Retinol u Oxibalance",
      ],
      idealFor: "Preparar la piel para eventos o conseguir un cambio radiante.",
      desc: "Diseñado para preparar la piel y potenciar resultados. Combina una higiene profunda inicial con un tratamiento específico según lo que tu piel necesite.",
    },
    {
      title: "Bono Facial Deluxe 👑",
      subtitle: "Programa Completo de 3 Sesiones",
      price: "179€",
      duration: "3 Sesiones",
      img: "/images/services/facial-9.jpg",
      benefits: [
        "Opción A: 1 Dermolimpieza + 2 Faciales Personalizados",
        "Opción B: 1 Dermolimpieza + 1 Facial + 1 RF Mimarte",
        "Elige entre Lumina C, Hyaluronic, Retinol u Oxibalance",
      ],
      idealFor: "Un cuidado intensivo completo para resultados duraderos.",
      desc: "La experiencia facial definitiva. Tres sesiones estratégicamente combinadas para limpiar, tratar y/o reafirmar tu rostro con la máxima efectividad.",
    },
  ],
};

export default function Treatments() {
  const [activeTab, setActiveTab] = useState("facial");

  const titleRef = useScrollReveal({ direction: "up" });
  const tabsRef = useScrollReveal({ direction: "up", delay: 0.1 });
  const gridRef = useScrollReveal({
    direction: "up",
    delay: 0.2,
    duration: 0.8,
  });

  return (
    <section id="tratamientos" className="section-content treatmentsSection">
      <div className="treatmentsContainer">
        {/* ── CABECERA */}
        <div ref={titleRef} className="treatmentsHeader">
          <span className="treatmentsSubtitle">Nuestra Carta</span>
          <h2 className="treatmentsTitle">
            Servicios de <em>bienestar</em>
          </h2>
        </div>

        {/* ── TABS */}
        <div ref={tabsRef} className="treatmentsTabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`tabBtn ${activeTab === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── REJILLA TARJETAS */}
        <div ref={gridRef} className="treatmentsGrid">
          {SERVICES[activeTab].map((service, idx) => (
            <div key={`${activeTab}-${idx}`} className="treatmentCardContainer">
              <div className="flipCardInner">
                {/* ── DELANTE (FRONT) */}
                <div className="cardFront">
                  <div className="treatmentImageWrapper">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="treatmentImage"
                      loading="lazy"
                    />
                  </div>

                  <div className="cardFrontBody">
                    <div>
                      <div className="treatmentCardHeader">
                        <h3 className="treatmentItemTitle">{service.title}</h3>
                        {service.duration && (
                          <span className="treatmentDuration">
                            ⏱ {service.duration}
                          </span>
                        )}
                      </div>

                      {/* Lista de beneficios */}
                      <ul className="benefitsList">
                        {service.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="benefitItem">
                            <span className="checkIcon">✓</span> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Precio y pista para girar */}
                    <div>
                      <div className="priceBox">
                        <span className="priceLabel">Precio</span>
                        <span className="treatmentPrice">{service.price}</span>
                      </div>

                      <span className="flipHint">Ver detalles completos ↺</span>
                    </div>
                  </div>
                </div>

                {/* ── DETRÁS (BACK) */}
                <div className="cardBack">
                  <div className="cardBackContent">
                    <h4 className="backTitle">{service.title}</h4>

                    {/* Subtítulo destacado en negrita */}
                    {service.subtitle && (
                      <span className="backSubtitle">{service.subtitle}</span>
                    )}

                    {/* Ideal para */}
                    {service.idealFor && (
                      <p className="idealForText">
                        <strong>Ideal para:</strong> {service.idealFor}
                      </p>
                    )}

                    {/* Descripción completa */}
                    <p className="treatmentFullDesc">{service.desc}</p>

                    {/* Precios de Bonos si existen */}
                    {service.packs && (
                      <div className="packsBox">
                        <span className="packsTitle">Ahorra con Bonos:</span>
                        <span className="packsText">{service.packs}</span>
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="cardActionButtons">
                    <a href="#contacto" className="treatmentBackBtn secondary">
                      + info
                    </a>
                    <a
                      href={getWhatsAppLink(service.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="treatmentBackBtn primary"
                    >
                      Reservar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
