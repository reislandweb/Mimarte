'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import '../css/Treatments.css' // Importación de tus estilos puros

const CATEGORIES = [
  { id: 'facial',   label: 'Faciales' },
  { id: 'corporal', label: 'Corporales' },
  { id: 'estetica', label: 'Masajes' }
]

// ──────────────────────────────────────────────────────────────────────────────────────
// 🛠️ GUÍA PARA MODIFICAR LOS TRATAMIENTOS:
// - Para MODIFICAR: Cambia los textos entre comillas de 'title', 'price', 'desc', 'img'.
// - Para AÑADIR la lista trasera: Modifica los textos dentro del array de 'includes'.
// - Para AGREGAR uno nuevo: Copia un bloque entero entre llaves { ... }, pon una coma al final del anterior y pégalo.
// - Para QUITAR uno: Borra el bloque entre llaves { ... } que ya no quieras.
// ──────────────────────────────────────────────────────────────────────────────────────
const SERVICES = {
  facial: [
    { 
      title: 'Higiene Facial Profunda', 
      price: '45€', 
      desc: 'Tratamiento facial completo que limpia, renueva y equilibra la piel en profundidad. Combina exfoliación con punta de diamante, extracción de impurezas y técnicas relajantes para dejar el rostro limpio, luminoso y con sensación de bienestar desde la primera sesión.', 
      img: '/images/services/facial-1.jpg',
      includes: ['Doble limpieza', 'Exfoliación con punta de diamante', 'Extracción manual de impurezas y puntos negros', 'Mascarilla específica según necesidades', 'Masaje de estimulación o relajación del óvalo facial', 'Aplicación de crema y protección solar adaptados a la piel'] // <-- Edita lo que incluye aquí
    },
    { 
      title: 'Dermapen Antimanchas', 
      price: '80€', 
      desc: 'El Dermapen antimanchas es un tratamiento facial progresivo y seguro diseñado para tratar hiperpigmentaciones, melasma, manchas solares y cicatrices post acné, ayudando a unificar el tono de la piel y devolverle luminosidad. Mediante microneedling, se potencia la penetración de viales específicos de Skinderma, seleccionados según las necesidades de la piel, con activos despigmentantes que estimulan la renovación cutánea y ayudan a aclarar las zonas oscuras de forma gradual y natural.', 
      img: '/images/services/facial-2.jpg',
      includes: ['Diagnostico facial', 'Limpieza y preparacion de la piel', 'Aplicación de viales despigmentantes Skinderma según el tipo de mancha', 'Trabajo con Dermapen para favorecer la renovación', 'Mascarilla calmante y reparadora', 'Cierre del tratamiento con masaje facial y protección solar'] 
    },
    { 
      title: 'Dermapen Regenerador', 
      price: '75€', 
      desc: 'El Dermapen restaurador es un tratamiento facial que estimula la regeneración natural de la piel, ayudando a mejorar la firmeza, suavizar líneas de expresión y afinar la textura. Mediante microneedling, se favorece la penetración de activos concentrados de Skinderma, seleccionados según las necesidades específicas de la piel (hidratación, regeneración, antiaging, luminosidad). Esto potencia la renovación cutánea, mejora poros y marcas, y deja la piel más lisa, uniforme y radiante.', 
      img: '/images/services/facial-2.jpg',
      includes: ['Diagnóstico facial personalizado', 'Limpieza y preparación de la piel', 'Aplicación de viales Skinderma según las necesidades cutáneas', 'Trabajo con Dermapen para estimular la regeneración', 'Mascarilla regeneradora', 'Cierre del tratamiento con masaje facial y protección solar'] 
    },
    { 
      title: 'Dermolimpieza Avanzada', 
      price: '50,00€', 
      desc: 'Disfruta de una limpieza facial profunda y personalizada diseñada para eliminar impurezas, desobstruir los poros y revitalizar la piel.', 
      img: '/images/services/facial-3.jpg',
      includes: ['Este tratamiento combina diferentes técnicas profesionales como peeling enzimático, vapor, desincrustación, extracción manual y paleta ultrasónica, permitiendo una limpieza eficaz y respetuosa con la piel. Finaliza con presoterapia ocular para aportar descanso y bienestar al rostro.La dermolimpieza avanzada ayuda a mejorar la textura de la piel, aportar luminosidad y mantener el cutis saludable, dejando el rostro visiblemente más limpio, fresco y equilibrado'] 
    },
    { 
      title: 'Hyaluronic Hidratación Profunda', 
      price: '70,00€', 
      desc: '', 
      img: '/images/services/facial-4.jpg',
      includes: [' Hidratación profunda e inmediata', 'Ayuda a prevenir la pérdida de agua cutánea', 'Mejora la elasticidad y suavidad de la piel', 'Atenúa las arrugas por deshidratación', 'Aporta efecto piel más rellena y jugosa',''] 
    },
    { 
      title: 'Lumina C – Tratamiento Iluminador', 
      price: '70,00€', 
      desc: 'Un tratamiento facial energizante e iluminador que combina vitamina C de nueva generación con potentes antioxidantes como granada y açaí, diseñado para revitalizar la piel apagada y devolverle su luminosidad natural. Actúa ayudando a proteger la piel frente al estrés oxidativo, mejorar el tono y aportar un efecto buena cara inmediato, dejando el rostro visiblemente más fresco, uniforme y rejuvenecido.', 
      img: '/images/services/facial-5.jpg',
      includes: ['Aporta luminosidad inmediata al rostro', 'Ayuda a unificar el tono de la piel', 'Protege frente al envejecimiento prematuro', 'Revitaliza las pieles cansadas o apagadas', 'Mejora la apariencia general de la piel, dejándola más fresca y radiante',] 
    },
    { 
      title: 'OxyBalance Facial', 
      price: '75,00€', 
      desc: 'Un tratamiento facial detox y oxigenante diseñado para revitalizar y equilibrar la piel expuesta al estrés, la contaminación y el ritmo urbano. Su combinación de activos antioxidantes y prebióticos ayuda a proteger la piel frente a la polución ambiental, favorecer su oxigenación natural y restaurar su equilibrio, dejando el rostro más fresco, luminoso y saludable.', 
      img: '/images/services/facial-6.jpg',
      includes: ['Ayuda a purificar la piel y eliminar toxinas acumuladas', 'Protege frente a los efectos de la contaminación ambiental', 'Favorece la oxigenación y revitalización de la piel', 'Equilibra la microbiota cutánea gracias a su acción prebiótica', 'Deja el rostro más limpio, luminoso y con aspecto saludable',] 
    },
    { 
      title: 'Retinol Repair Facial', 
      price: '70,00€', 
      desc: 'Un tratamiento facial intensivo diseñado para reparar y renovar la piel en profundidad, ayudando a mejorar los signos visibles del envejecimiento. Su potente complejo con retinol favorece la renovación celular, mejora la textura de la piel y suaviza líneas de expresión, dejando el rostro más firme, uniforme y rejuvenecido', 
      img: '/images/services/facial-7.jpg',
      includes: ['Estimula la renovación celular', 'Mejora la textura y uniformidad de la piel', 'Ayuda a suavizar líneas de expresión y arrugas', 'Favorece una piel más firme y rejuvenecida',] 
    },
    { 
      title: 'RF Facial', 
      price: '75€', 
      desc: 'Tratamiento facial  no invasivo que estimula la producción natural de colágeno y elastina, ayudando a mejorar la firmeza, la textura y la luminosidad de la piel. Ideal para suavizar líneas finas y mantener un rostro más terso y rejuvenecido, sin agujas ni tiempo de recuperación.', 
      img: '/images/services/facial-9.jpg',
      includes: ['Diagnóstico facial', 'Doble limpieza', 'Radiofrecuencia Facial', 'Serum de colageno', 'Mascarilla nutritiva','Presoterapia ocular', 'Masaje de estimulación facial', 'Finalización con protección solar',] 
    }
  ],
  corporal: [
    { 
      title: 'Cavitación Pro', 
      price: '45,00€', 
      desc: 'Reduce volumen y modela tu figura sin cirugía', 
      img: '/images/services/corp-1.jpg',
      includes: ['Diagnóstico corporal', 'Apertura de canales linfáticos', 'Aplicación de cavitación', 'Masaje manual de cierre para favorecer el drenaje',] 
    },
    { 
      title: 'Exfoliación Corporal Renovadora', 
      price: '75,00€', 
      desc: '', 
      img: '/images/services/corp-2.jpg',
      includes: ['Piel más suave y lisa', 'Textura mejorada y uniforme', 'Renovación celular', 'Eliminación de impurezas', 'Aumento de luminosidad', 'Mejora la circulación', 'Hidratación profunda', 'Ideal para conseguir un bronceado uniforme'] 
    },
    { 
      title: 'Maderoterapia Corporal', 
      price: '50,00€', 
      desc: 'Tratamiento natural y remodelante que ayuda a reducir la celulitis, activar la circulación y reafirmar la piel. Se realiza con instrumentos de madera especialmente diseñados para trabajar el tejido en profundidad, favoreciendo el drenaje de líquidos, el moldeado corporal y la mejora de la textura de la piel. Ideal si buscas definir la silueta, sentirte más ligera y notar el cuerpo más firme, liso y uniforme desde las primeras sesiones.', 
      img: '/images/services/corp-3.jpg',
      includes: ['', '', '', '', ''] 
    },
    { 
      title: 'Presoterapia', 
      price: '40€', 
      desc: 'Reduce la hinchazón y siéntete más liviana desde la primera sesión', 
      img: '/images/services/corp-4.jpg',
      includes: ['Tratamiento corporal no invasivo que utiliza cámaras de aire con compresión secuencial programada para favorecer el drenaje linfático y mejorar la circulación. Ayuda a reducir la retención de líquidos, aliviar la sensación de pesadez y mejorar el bienestar general. Ideal para piernas cansadas, hinchazón o como complemento de tratamientos corporales. Tras la sesión, el cuerpo se siente más ligero y desinflamado.'] 
    },
    { 
      title: ' ', 
      price: '40€', 
      desc: '', 
      img: '/images/services/corp-5.jpg',
      includes: ['', '', '', '', ''] 
    },
    { 
      title: ' ', 
      price: '40€', 
      desc: '', 
      img: '/images/services/corp-6.jpg',
      includes: ['', '', '', '', ''] 
    },
    { 
      title: ' ', 
      price: '40€', 
      desc: '', 
      img: '/images/services/corp-7.jpg',
      includes: ['', '', '', '', ''] 
    },
  ],
  estetica: [
    { 
      title: 'Manicura Completa Mimarte', 
      price: '25€', 
      desc: 'Cuidado meticuloso de uñas y cutículas con esmaltado de alta duración e hidratación final.', 
      img: '/images/services/est-1.jpg',
      includes: ['Limado y forma de uña', 'Retirada de cutículas', 'Exfoliación de manos', 'Esmaltado semipermanente', 'Aceite nutritivo final'] 
    },
    { 
      title: 'Pedicura Spa Rejuvenecedora', 
      price: '35€', 
      desc: 'Tratamiento completo de pies con baño relajante, exfoliación y masaje regenerador.', 
      img: '/images/services/est-2.jpg',
      includes: ['Baño con sales relajantes', 'Eliminación de durezas', 'Exfoliación profunda', 'Masaje podal hidratante', 'Esmaltado a color de larga duración'] 
    },
    { 
      title: 'Diseño de Mirada', 
      price: '20€', 
      desc: 'Estudio de visagismo con depilación de cejas y tinte o lifting de pestañas para realzar tu expresión.', 
      img: '/images/services/est-3.jpg',
      includes: ['Estudio de la forma del rostro', 'Depilación con pinza/cera baja fusión', 'Tinte definidor de cejas', 'Nutrición de vello final', 'Péinado y fijación'] 
    }
  ]
}

export default function Treatments() {
  const [activeTab, setActiveTab] = useState('facial')
  
  const titleRef = useScrollReveal({ direction: 'up' })
  const tabsRef  = useScrollReveal({ direction: 'up', delay: 0.1 })
  const gridRef  = useScrollReveal({ direction: 'up', delay: 0.2, duration: 0.8 })

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

        {/* ── BOTONES DE FILTRO (TABS) */}
        <div ref={tabsRef} className="treatmentsTabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`tabBtn ${activeTab === cat.id ? 'active' : ''}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── REJILLA DE TARJETAS 3D (FLIP CARDS) */}
        <div ref={gridRef} className="treatmentsGrid">
          {SERVICES[activeTab].map((service, idx) => (
            <div key={`${activeTab}-${idx}`} className="treatmentCardContainer">
              <div className="flipCardInner">
                
                {/* ── CARA DELANTERA (FRONT) */}
                <div className="cardFront">
                  <div className="treatmentImageWrapper">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="treatmentImage"
                      loading="lazy"
                    />
                  </div>
                  <div className="treatmentBody">
                    <div className="treatmentCardHeader">
                      <h3 className="treatmentItemTitle">{service.title}</h3>
                      <span className="treatmentPrice">{service.price}</span>
                    </div>
                    <p className="treatmentCardDesc">{service.desc}</p>
                    <span className="treatmentFooterLink">Ver detalles →</span>
                  </div>
                </div>

                {/* ── CARA TRASERA (BACK) */}
                <div className="cardBack">
                  <div>
                    <h4 className="treatmentIncludesTitle">¿QUE INCLUYE LA SESION?</h4>
                    <ul className="treatmentIncludesList">
                      {service.includes && service.includes.map((inc, index) => (
                        <li key={index}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                  <a href="#contacto" className="treatmentBackBtn">
                    Reservar cita
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}