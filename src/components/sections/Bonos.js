'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../css/Bonos.css' // Conexión directa a tus estilos puros

gsap.registerPlugin(ScrollTrigger)

// ──────────────────────────────────────────────────────────────────────────────────────
// 🛠️ GUÍA PARA MODIFICAR LOS BONOS:
// - Para MODIFICAR: Cambia los campos de texto o precios de los bonos actuales.
// - Para MODIFICAR EL REVERSO: Cambia o añade strings dentro del array 'terms' de cada bono.
// ──────────────────────────────────────────────────────────────────────────────────────
const BONOS = [
  {
    name: 'Bono Básico',
    sessions: 4,
    treatment: 'Maderoterapia corporal',
    price: 189,
    features: ['4 sesiones de 60 min', 'Diagnóstico de piel gratis', 'Productos incluidos'],
    terms: ['Validez de 12 meses', 'Sujeto a cita previa', 'Cancelaciones con 24h de antelación', 'Uso exclusivo individual'], // <-- Edita las condiciones traseras aquí
    featured: false,
    cta: 'Reservar',
  },
  {
    name: 'Bono Premium',
    sessions: 6,
    treatment: 'Facial + Corporal',
    price: 229,
    features: ['6 sesiones de 90 min', 'Diagnóstico completo', 'Productos premium', 'Consulta nutricional'],
    terms: ['Validez de 12 meses', 'Incluye parking gratuito', 'Prioridad en reservas de fin de semana', 'No acumulable a otras ofertas'],
    featured: true,
    cta: 'Reservar',
  },
  {
    name: 'Bono Premium',
    sessions: 5,
    treatment: 'Tratamiento Indiba',
    price: 349,
    features: ['5 sesiones de 60 min', 'Protocolo personalizado', 'Seguimiento mensual', 'Resultados garantizados'],
    terms: ['Validez de 6 meses (recomendado)', 'Plan de sesiones continuadas', 'Seguimiento fotográfico de evolución', 'Financiación disponible en centro'],
    featured: false,
    cta: 'Reservar',
  },
  {
    name: 'Bono Láser',
    sessions: 6,
    treatment: 'Depilación Láser',
    price: 199,
    features: ['6 sesiones por zona', 'Todas las fototipos', 'Revisión gratuita', 'Sin dolor'],
    terms: ['Válido para zona a elegir', 'Rasurado previo obligatorio en casa', 'Intervalos de 6-8 semanas por sesión', 'Sujeto a valoración médica inicial'],
    featured: false,
    cta: 'Reservar',
  },
  {
    name: 'Bono Láser',
    sessions: 6,
    treatment: 'Depilación Láser',
    price: 199,
    features: ['6 sesiones por zona', 'Todas las fototipos', 'Revisión gratuita', 'Sin dolor'],
    terms: ['Válido para zona a elegir', 'Rasurado previo obligatorio en casa', 'Intervalos de 6-8 semanas por sesión', 'Sujeto a valoración médica inicial'],
    featured: false,
    cta: 'Reservar',
  },
  {
    name: 'Bono Láser',
    sessions: 6,
    treatment: 'Depilación Láser',
    price: 199,
    features: ['6 sesiones por zona', 'Todas las fototipos', 'Revisión gratuita', 'Sin dolor'],
    terms: ['Válido para zona a elegir', 'Rasurado previo obligatorio en casa', 'Intervalos de 6-8 semanas por sesión', 'Sujeto a valoración médica inicial'],
    featured: false,
    cta: 'Reservar',
  },
]

export default function Bonos() {
  const titleRef = useScrollReveal({ direction: 'up' })
  const cardsRef = useRef(null)

  useEffect(() => {
    const containers = cardsRef.current?.querySelectorAll('.bonoCardContainer')
    if (!containers) return

    const ctx = gsap.context(() => {
      gsap.from(containers, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.12,
        duration: 0.8,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="bonos" className="section-content bonosSection">
      <div className="bonosContainer">

        {/* ── CABECERA */}
        <div ref={titleRef} className="headerText">
          <span className="bonosSubtitle">
            Ahorra con nuestros bonos
          </span>
          <h2 className="bonosTitle">
            Bonos <em>especiales</em>
          </h2>
          <p className="bonosDesc">
            Consigue el mejor precio comprometiéndote con tu bienestar. Todos los bonos son nominales e intransferibles.
          </p>
        </div>

        {/* ── GRID DE BONOS 3D (FLIP CARDS) */}
        <div ref={cardsRef} className="bonosGrid">
          {BONOS.map((bono) => (
            <div key={bono.name} className="bonoCardContainer">
              <div className="flipCardInner">
                
                {/* ── CARA DELANTERA (FRONT) */}
                <div className={`cardFront bonoCard ${bono.featured ? 'cardFeatured' : 'cardNormal'}`}>
                  {bono.featured && (
                    <span className="tagPopular">
                      Más popular
                    </span>
                  )}

                  <p className={`sessionsTag ${bono.featured ? 'sessionsFeatured' : 'sessionsNormal'}`}>
                    {bono.sessions} sesiones
                  </p>
                  <h3 className="cardTitle">
                    {bono.name}
                  </h3>
                  <p className="cardTreatment">
                    {bono.treatment}
                  </p>

                  {/* Precio */}
                  <div className="priceWrapper">
                    <span className={`priceText ${bono.featured ? 'priceFeatured' : 'priceNormal'}`}>
                      {bono.price}€
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="featuresList">
                    {bono.features.map(f => (
                      <li key={f} className={`featureItem ${bono.featured ? 'featureFeatured' : 'featureNormal'}`}>
                        <span className={`checkIcon ${bono.featured ? 'checkFeatured' : 'checkNormal'}`}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <span className={`btnBono ${bono.featured ? 'btnFeatured' : 'btnNormal'}`}>
                    Ver condiciones →
                  </span>
                </div>

                {/* ── CARA TRASERA (BACK) */}
                <div className={`cardBack ${bono.featured ? 'cardFeatured' : 'cardNormal'}`}>
                  <div>
                    <h4 className="backTermsTitle">Condiciones</h4>
                    <ul className="termsList">
                      {bono.terms && bono.terms.map((term, index) => (
                        <li key={index}>{term}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <a 
                    href="#contacto"
                    className={`btnBono ${bono.featured ? 'btnFeatured' : 'btnNormal'}`}
                  >
                    {bono.featured ? 'Comprar Bono' : bono.cta}
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Nota legal */}
        <p className="bonosNotice">
          * Los precios no incluyen IVA. Bonos válidos 12 meses desde la fecha de compra.
        </p>

      </div>
    </section>
  )
}