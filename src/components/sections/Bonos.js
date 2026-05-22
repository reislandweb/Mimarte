'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// BONOS — modifica este array para cambiar precios y contenido
// featured: true → destaca esa card (fondo oscuro)
// ─────────────────────────────────────────────────────────────
const BONOS = [
  {
    name: 'Bono Básico',
    sessions: 3,
    treatment: 'Tratamiento Facial',
    price: 129,
    features: ['3 sesiones de 60 min', 'Diagnóstico de piel gratis', 'Productos incluidos'],
    featured: false,
    cta: 'Reservar',
  },
  {
    name: 'Bono Premium',
    sessions: 6,
    treatment: 'Facial + Corporal',
    price: 229,
    features: ['6 sesiones de 90 min', 'Diagnóstico completo', 'Productos premium', 'Consulta nutricional'],
    featured: true,   // <- ESTA CARD SE DESTACA
    cta: 'El más popular',
  },
  {
    name: 'Bono Indiba',
    sessions: 5,
    treatment: 'Tratamiento Indiba',
    price: 349,
    features: ['5 sesiones de 60 min', 'Protocolo personalizado', 'Seguimiento mensual', 'Resultados garantizados'],
    featured: false,
    cta: 'Reservar',
  },
  {
    name: 'Bono Láser',
    sessions: 6,
    treatment: 'Depilación Láser',
    price: 199,
    features: ['6 sesiones por zona', 'Todas las fototipos', 'Revisión gratuita', 'Sin dolor'],
    featured: false,
    cta: 'Reservar',
  },
]

export default function Bonos() {
  const titleRef = useScrollReveal({ direction: 'up' })
  const cardsRef = useRef(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.bono-card')
    if (!cards) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
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
    <section id="bonos" className="section-content py-32 px-6 bg-nude-900/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* ── CABECERA */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-300 mb-4 block">
            Ahorra con nuestros bonos
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-white">
            Bonos <em className="italic text-primary-400">especiales</em>
          </h2>
          <p className="font-body text-white/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {/* MODIFICA: descripción de bonos */}
            Consigue el mejor precio comprometiéndote con tu bienestar. Todos los bonos son nominales e intransferibles.
          </p>
        </div>

        {/* ── GRID DE BONOS */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {BONOS.map((bono) => (
            <div key={bono.name}
              className={`bono-card flex flex-col p-8 transition-transform duration-300 hover:-translate-y-2 ${
                bono.featured
                  ? 'bg-primary-500 text-white'   /* Card destacada */
                  : 'bg-white text-dark'           /* Cards normales */
              }`}
            >
              {bono.featured && (
                <span className="font-body text-xs tracking-widest uppercase bg-white/20 text-white px-3 py-1 self-start mb-4">
                  Más popular
                </span>
              )}

              <p className={`font-body text-xs tracking-widest uppercase mb-1 ${bono.featured ? 'text-white/70' : 'text-primary-500'}`}>
                {bono.sessions} sesiones
              </p>
              <h3 className={`font-display text-2xl font-light mb-1 ${bono.featured ? 'text-white' : 'text-dark'}`}>
                {bono.name}
              </h3>
              <p className={`font-body text-xs mb-6 ${bono.featured ? 'text-white/70' : 'text-dark/50'}`}>
                {bono.treatment}
              </p>

              {/* Precio */}
              <div className="mb-6">
                <span className={`font-display text-5xl font-light ${bono.featured ? 'text-white' : 'text-primary-500'}`}>
                  {bono.price}€
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8 flex-grow">
                {bono.features.map(f => (
                  <li key={f} className={`font-body text-xs flex items-start gap-2 ${bono.featured ? 'text-white/80' : 'text-dark/60'}`}>
                    <span className={`mt-0.5 flex-shrink-0 ${bono.featured ? 'text-white' : 'text-primary-500'}`}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a href="#contacto"
                className={`font-body text-xs tracking-widest uppercase text-center py-3 transition-colors duration-300 ${
                  bono.featured
                    ? 'bg-white text-primary-500 hover:bg-nude-100'
                    : 'bg-primary-500 text-white hover:bg-primary-600'
                }`}
              >
                {bono.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Nota legal */}
        <p className="font-body text-xs text-white/40 text-center mt-8">
          * Los precios no incluyen IVA. Bonos válidos 12 meses desde la fecha de compra. {/* MODIFICA */}
        </p>

      </div>
    </section>
  )
}
