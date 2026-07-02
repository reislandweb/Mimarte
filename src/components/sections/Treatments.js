'use client'

import { useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import '../css/Treatments.css' // Importación de tus estilos puros

const CATEGORIES = [
  { id: 'facial',   label: 'Faciales' },
  { id: 'corporal', label: 'Corporales' },
  { id: 'estetica', label: 'Estética Completa' }
]

const SERVICES = {
  facial: [
    { title: 'Higiene Facial Profunda', price: '45€', desc: 'Limpieza con exfoliación, extracción y mascarilla personalizada para devolver el equilibrio a tu piel.', img: '/images/services/facial-1.jpg' },
    { title: 'Tratamiento Vitamina C', price: '60€', desc: 'Aporte de luminosidad instantánea y antioxidantes para combatir el tono apagado y los signos de fatiga.', img: '/images/services/facial-2.jpg' },
    { title: 'Cuidado Antiaging Pro', price: '75€', desc: 'Protocolo reafirmante avanzado para atenuar arrugas y redefinir los contornos del rostro.', img: '/images/services/facial-3.jpg' }
  ],
  corporal: [
    { title: 'Masaje Relajante Completo', price: '50€', desc: 'Terapia manual envolvente con aceites esenciales para aliviar tensiones corporales y calmar la mente.', img: '/images/services/corp-1.jpg' },
    { title: 'Tratamiento Reductor', price: '65€', desc: 'Combinación de técnicas activas orientadas a moldear la silueta y mejorar visiblemente la firmeza.', img: '/images/services/corp-2.jpg' },
    { title: 'Exfoliación + Hidratación', price: '40€', desc: 'Renovación celular profunda seguida de una envoltura ultra-nutritiva para una piel de seda.', img: '/images/services/corp-3.jpg' }
  ],
  estetica: [
    { title: 'Manicura Completa Mimarte', price: '25€', desc: 'Cuidado meticuloso de uñas y cutículas con esmaltado de alta duración e hidratación final.', img: '/images/services/est-1.jpg' },
    { title: 'Pedicura Spa Rejuvenecedora', price: '35€', desc: 'Tratamiento completo de pies con baño relajante, exfoliación y masaje regenerador.', img: '/images/services/est-2.jpg' },
    { title: 'Diseño de Mirada', price: '20€', desc: 'Estudio de visagismo con depilación de cejas y tinte o lifting de pestañas para realzar tu expresión.', img: '/images/services/est-3.jpg' }
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

        {/* ── REJILLA DE TARJETAS */}
        <div ref={gridRef} className="treatmentsGrid">
          {SERVICES[activeTab].map((service, idx) => (
            <div key={`${activeTab}-${idx}`} className="treatmentCard">
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
                <a href="#contacto" className="treatmentFooterLink">
                  Reservar cita →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}