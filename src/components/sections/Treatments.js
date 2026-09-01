"use client";

import { useState } from "react";
import "../css/Treatments.css";
import BodyZones from "./BodyZones";

const WHATSAPP_PHONE = "34641882041";

const getWhatsAppLink = (treatmentTitle) => {
  const message = `¡Hola! Me gustaría pedir información/cita para: *${treatmentTitle}*.`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
};

const CATEGORIES = [
  { id: "faciales", label: "FACIALES" },
  { id: "corporales", label: "CORPORALES" },
  { id: "masajes", label: "MASAJES" },
];

const SERVICES = {
  faciales: [
    {
      title: "Higiene Facial",
      price: "45 €",
      img: "/images/services/higiene-facial.jpg",
      benefits:
        "Limpia en profundidad, elimina células muertas y devuelve luminosidad y equilibrio a tu piel.",
      desc: "Una piel limpia es el primer paso para una piel saludable. Eliminamos impurezas, células muertas y exceso de grasa para devolver luminosidad, frescura y equilibrio a tu piel. Ideal como tratamiento de mantenimiento o como preparación para otros protocolos faciales.",
    },
    {
      title: "Dermolimpieza Avanzada",
      price: "59 €",
      img: "/images/services/dermolimpieza.jpg",
      benefits:
        "Higiene profunda con extracción manual y espátula ultrasónica sin agredir la piel.",
      desc: "Nuestra Dermolimpieza Avanzada es un tratamiento de higiene facial profunda y personalizada que combina extracción manual y espátula ultrasónica para limpiar la piel, desobstruir los poros y eliminar impurezas de forma eficaz y respetuosa. El resultado es una piel más fresca, equilibrada, luminosa y preparada para potenciar cualquier tratamiento posterior.",
    },
    {
      title: "Lumina C – Tratamiento Iluminador",
      price: "70 €",
      img: "/images/services/lumina-c.jpg",
      benefits:
        "Acción antioxidante, máxima luminosidad e hidratación profunda frente al envejecimiento.",
      desc: "Lumina C es un tratamiento facial manual con acción antioxidante que revitaliza la piel, aporta luminosidad e hidratación y ayuda a protegerla frente al envejecimiento prematuro. El resultado es un rostro más fresco, uniforme y naturally radiante.",
    },
    {
      title: "Retinol Repair",
      price: "70 €",
      img: "/images/services/retinol-repair.jpg",
      benefits:
        "Atenúa manchas, favorece la renovación celular y mejora la firmeza del rostro.",
      desc: "Tratamiento facial manual a base de retinol que favorece la renovación de la piel, ayuda a disminuir la apariencia de las manchas y mejora la firmeza y luminosidad del rostro. Su acción reparadora deja la piel más uniforme, suave y revitalizada, con un aspecto visiblemente más joven y saludable.",
    },
    {
      title: "Hyaluronic – Hidratación Profunda",
      price: "70 €",
      img: "/images/services/hyaluronic.jpg",
      benefits:
        "Hidratación intensa y duradera, recupera la elasticidad y aporta confort inmediato.",
      desc: "Tratamiento facial intensivo con ácido hialurónico que proporciona una hidratación intensa, mejora la elasticidad y devuelve confort a la piel. Su acción nutritiva ayuda a mantener un rostro más suave, luminoso y revitalizado, con un aspecto fresco y saludable.",
    },
    {
      title: "Oxibalance – Detox y Oxigenante",
      price: "75 €",
      img: "/images/services/oxibalance.jpg",
      benefits:
        "Protege frente a la contaminación, oxigena el tejido y restaura el equilibrio natural.",
      desc: "Tratamiento facial detox y oxigenante diseñado para revitalizar y equilibrar la piel frente al estrés diario y la contaminación ambiental. Su combinación de activos antioxidantes y prebióticos ayuda a proteger la piel de las agresiones externas, favorece su oxigenación natural y restaura su equilibrio, dejando el rostro más fresco, uniforme y saludable.",
    },
    {
      title: "Tratamiento Antiacné",
      price: "85 €",
      img: "/images/services/antiacne.jpg",
      benefits:
        "Regula el exceso de sebo, calma la piel y reduce la aparición de granitos con LED.",
      desc: "Tratamiento facial específico para pieles con tendencia acneica, exceso de grasa e imperfecciones. Combina un protocolo purificante y seborregulador con fototerapia LED para ayudar a calmar la piel, controlar el exceso de sebo y reducir la aparición de granitos y comedones.",
      hasBonoLink: true,
      bonoInfo: "Bono 4 sesiones: 310 € | Bono 8 sesiones: 552 €",
    },
    {
      title: "Radiofrecuencia Facial Mimarte",
      price: "78 €",
      duration: "60 min",
      isGold: true,
      img: "/images/services/rf-mimarte.jpg",
      benefits:
        "Reafirmación integral, valoración, doble limpieza, presoterapia ocular y Masaje Mimarte.",
      desc: "Nuestro tratamiento premium de reafirmación y bienestar. La Radiofrecuencia Facial Mimarte combina la eficacia de la radiofrecuencia con un protocolo exclusivo diseñado para cuidar tu piel de forma integral. Incluye valoración personalizada, doble limpieza, aplicación de sérum de ácido hialurónico, presoterapia ocular y el exclusivo Masaje Mimarte, potenciando la firmeza, la luminosidad y la regeneración de la piel mientras disfrutas de una experiencia de relajación y bienestar.",
    },
    {
      title: "Radiofrecuencia Facial Total Face",
      price: "65 €",
      duration: "45 min",
      img: "/images/services/rf-total-face.jpg",
      benefits:
        "Estimula la producción de colágeno y elastina para mejorar la firmeza global del rostro.",
      desc: "Tratamiento reafirmante de rostro completo enfocado en estimular la producción de colágeno y elastina para mejorar la firmeza, la elasticidad y la calidad de la piel. Una opción ideal para mantener los resultados de la Radiofrecuencia Facial Mimarte o como tratamiento específico de reafirmación facial.",
    },
    {
      title: "Radiofrecuencia Mirada Perfecta",
      price: "40 €",
      duration: "20 min",
      img: "/images/services/rf-mirada.jpg",
      benefits:
        "Suaviza líneas de expresión, disminuye bolsas y ojeras en el contorno de ojos.",
      desc: "Tratamiento específico para el contorno de ojos que ayuda a reafirmar la piel, suavizar las líneas de expresión y mejorar el aspecto de bolsas y ojeras, consiguiendo una mirada más fresca y descansada.",
    },
    {
      title: "Radiofrecuencia Surco Nasogeniano",
      price: "40 €",
      duration: "20 min",
      img: "/images/services/rf-surco.jpg",
      benefits:
        "Reafirma la zona peribucal y difumina el rictus y líneas de expresión.",
      desc: "Tratamiento localizado que mejora la firmeza de la piel alrededor de la boca, ayudando a suavizar el surco nasogeniano y las líneas de expresión de esta zona.",
    },
    {
      title: "Radiofrecuencia Cuello y Escote",
      price: "45 €",
      duration: "30 min",
      img: "/images/services/rf-cuello.jpg",
      benefits:
        "Recupera la elasticidad y firmeza en la piel delicada del cuello y escote.",
      desc: "Tratamiento específico para reafirmar la piel del cuello y escote, mejorando su elasticidad y contribuyendo a mantener un aspecto más firme y uniforme.",
    },
    {
      title: "Dermapen",
      price: "80 €",
      img: "/images/services/dermapen.jpg",
      benefits:
        "Microagujas para la penetración profunda de activos (antiedad, manchas o cicatrices).",
      desc: "Tratamiento facial que utiliza microagujas para favorecer la penetración de activos específicos en la piel, seleccionados de forma personalizada según sus necesidades y los objetivos del tratamiento. Ya sea para aportar hidratación, combatir los signos del envejecimiento, tratar manchas o mejorar cicatrices y marcas de acné.",
    },
  ],
  corporales: [
    {
      title: "Radiofrecuencia Corporal",
      price: "49 € / 75 €",
      duration: "30 min / 50 min",
      // Lista de zonas donde aplica este tratamiento
      areas: ["abdomen", "gluteos", "piernas", "brazos", "espalda"],
      img: "/images/services/rf-corporal.jpg",
      benefits:
        "Reafirma zonas con flacidez, reduce la celulitis y actúa sobre grasa localizada.",
      desc: "Tratamiento corporal enfocado en reafirmar, remodelar y mejorar el aspecto de la piel. Se trabaja de forma localizada por zonas, adaptando cada sesión a las necesidades y objetivos de cada persona. Antes de comenzar, realizamos siempre una asesoría corporal personalizada.",
    },
    {
      title: "Cavitación",
      price: "45 €",
      duration: "30 min",
      areas: ["abdomen", "gluteos", "piernas", "flancos"],
      img: "/images/services/cavitacion.jpg",
      benefits:
        "Ultrasonidos focalizados para reducir grasa localizada y moldear la silueta.",
      desc: "Tratamiento corporal localizado que utiliza ultrasonidos para actuar sobre la grasa acumulada en zonas específicas, favoreciendo su movilización y posterior eliminación por el organismo. Está especialmente indicado para mejorar la adiposidad localizada y remodelar el contorno corporal.",
    },
    {
      title: "Vacumterapia",
      price: "45 € / 65 €",
      duration: "30 min / 45 min",
      areas: ["abdomen", "gluteos", "piernas"],
      img: "/images/services/vacumterapia.jpg",
      benefits:
        "Drenaje linfático profundo, eliminación de líquidos y moldeado de abdomen/glúteos.",
      desc: "Tratamiento corporal que utiliza un masaje mediante succión controlada para movilizar los tejidos, favorecer el drenaje y trabajar de forma localizada el contorno corporal. Especialmente indicado para mejorar la celulitis y la retención de líquidos.",
    },
    {
      title: "Maderoterapia",
      price: "50 €",
      duration: "60 min",
      areas: ["abdomen", "gluteos", "piernas", "brazos"],
      img: "/images/services/maderoterapia.jpg",
      benefits:
        "Remodelación corporal manual con madera, activa la circulación y libera tensión.",
      desc: "Tratamiento corporal manual realizado con diferentes elementos de madera que ayuda a movilizar tejidos, mejorar la circulación y favorecer la remodelación corporal. Sus maniobras también ayudan a liberar tensión y relajar la musculatura.",
    },
  ],
  masajes: [
    {
      title: "Masaje Relajante Cuerpo Entero",
      price: "49 €",
      duration: "60 min",
      img: "/images/services/masaje-cuerpo.jpg",
      benefits:
        "Libera tensiones acumuladas y favorece un estado de relajación física y mental profunda.",
      desc: "Un masaje pensado para regalarte una pausa y recuperar el equilibrio entre cuerpo y mente. Mediante maniobras relajantes y el uso de aceites esenciales, trabajamos todo el cuerpo para aliviar la tensión acumulada y favorecer un estado de relajación profunda.",
    },
    {
      title: "Masaje Relajante de Espalda",
      price: "35 €",
      duration: "30 min",
      img: "/images/services/masaje-espalda.jpg",
      benefits:
        "Alivia la sobrecarga muscular en espalda, cuello y hombros generada por el estrés.",
      desc: "Masaje localizado pensado para liberar las tensiones acumuladas en espalda, cuello y hombros como consecuencia del estrés y el ritmo diario. Mediante maniobras relajantes, ayudamos a disminuir la sensación de sobrecarga muscular y recuperar el bienestar.",
    },
    {
      title: "Masaje Circulatorio de Piernas",
      price: "35 €",
      duration: "30 min",
      img: "/images/services/masaje-piernas.jpg",
      benefits:
        "Favorece la circulación, reduce la pesadez y moviliza líquidos retenidos.",
      desc: "Masaje específico de piernas realizado mediante maniobras que favorecen la circulación y ayudan a movilizar los líquidos retenidos. Ideal para aliviar la sensación de pesadez y tensión, proporcionando unas piernas más ligeras y descansadas.",
    },
  ],
};

export default function Treatments() {
  const [activeTab, setActiveTab] = useState("faciales");
  const [selectedBodyArea, setSelectedBodyArea] = useState("todos");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedBodyArea("todos");
  };

  // Filtrado de servicios
  const displayedServices = SERVICES[activeTab].filter((service) => {
    if (
      activeTab === "corporales" &&
      selectedBodyArea &&
      selectedBodyArea !== "todos"
    ) {
      return service.areas && service.areas.includes(selectedBodyArea);
    }
    return true;
  });

  return (
    <section id="tratamientos" className="treatmentsSection">
      <div className="treatmentsContainer">
        {/* Cabecera */}
        <div className="treatmentsHeader">
          <span className="treatmentsSubtitle">NUESTROS SERVICIOS</span>
          <h2 className="treatmentsTitle">Tratamientos y Bienestar</h2>
        </div>

        {/* Categorías */}
        <div className="treatmentsTabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleTabChange(cat.id)}
              className={`tabBtn ${activeTab === cat.id ? "active" : ""}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* INTEGRACIÓN DE BODY AREAS: SOLO EN CORPORALES */}
        {activeTab === "corporales" && (
          <div className="corporalAreasWrapper">
            <BodyZones
              selectedArea={selectedBodyArea}
              onSelectArea={(areaId) => setSelectedBodyArea(areaId)}
            />
          </div>
        )}

        {/* Grid de Tarjetas 3D */}
        <div className="treatmentsGrid">
          {displayedServices.length > 0 ? (
            displayedServices.map((service, idx) => (
              <div
                key={`${activeTab}-${idx}`}
                className={`flipCardContainer ${service.isGold ? "goldCard" : ""}`}
              >
                <div className="flipCardInner">
                  {/* ── CARA DELANTERA ── */}
                  <div className="cardFront">
                    {service.isGold && (
                      <div className="goldBadge">★ Tratamiento Estrella</div>
                    )}

                    {/*<div className="cardImgWrapper">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="cardImg"
                        loading="lazy"
                      />
                    </div> */}

                    <div className="cardFrontBody">
                      <div className="frontHeader">
                        <h3 className="cardTitle">{service.title}</h3>
                        <span className="cardPrice">{service.price}</span>
                      </div>

                      {service.duration && (
                        <span className="cardMeta">
                          ⏱ Duración: {service.duration}
                        </span>
                      )}

                      <div className="benefitsBox">
                        <span className="benefitsLabel">Beneficios:</span>
                        <p className="benefitsText">{service.benefits}</p>
                      </div>

                      <div className="flipHint">
                        <span>Pasa el ratón o toca para ver descripción</span>
                        <span className="rotateIcon">🔄</span>
                      </div>
                    </div>
                  </div>

                  {/* ── CARA TRASERA ── */}
                  <div className="cardBack">
                    <h4 className="backTitle">{service.title}</h4>

                    <div className="scrollDesc">
                      <p className="fullDesc">{service.desc}</p>

                      {service.hasBonoLink && (
                        <div className="bonoNoticeBox">
                          <span className="bonoNoticeTitle">
                            Opción en Bono:
                          </span>
                          <span className="bonoNoticeDetails">
                            {service.bonoInfo}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="cardBackActions">
                      <a
                        href={getWhatsAppLink(service.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bookBtn"
                      >
                        Reservar Cita
                      </a>
                      <a href="#contacto" className="infoBtn">
                        + Info
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="noResultsMsg">
              No hay tratamientos disponibles para esta zona.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
