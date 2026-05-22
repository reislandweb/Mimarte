'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// TRATAMIENTOS — añade, quita o modifica los objetos de este array
// imagen: pon la ruta de tu foto en /public/images/
// ─────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'facial',
    title: 'Tratamientos Faciales',
    description: 'Hidratación profunda, lifting sin cirugía, tratamiento anti-edad, limpieza facial, peeling químico y más. Devolvemos la luminosidad a tu piel.',
    image: '/images/facial.jpg',       // MODIFICA: tu imagen
    items: ['Hidratación profunda', 'Lifting facial', 'Anti-edad', 'Peeling', 'Limpieza profunda'],
  },
  {
    id: 'corporal',
    title: 'Tratamientos Corporales',
    description: 'Reafirmación, drenaje linfático, tratamiento anticelulítico, vendas frías y calientes. Tu cuerpo merece el mejor cuidado.',
    image: '/images/corporal.jpg',
    items: ['Reafirmación', 'Anticelulítico', 'Drenaje linfático', 'Vendas', 'Masajes'],
  },
  {
    id: 'depilacion',
    title: 'Depilación Láser',
    description: 'Tecnología láser de última generación para una depilación definitiva, indolora y eficaz en todo tipo de pieles.',
    image: '/images/laser.jpg',
    items: ['Láser diodo', 'Piernas', 'Axilas', 'Bikini', 'Cara'],
  },
  {
    id: 'estetica',
    title: 'Estética Avanzada',
    description: 'Micropigmentación, extensiones de pestañas, manicura y pedicura profesional, diseño de cejas y mucho más.',
    image: '/images/estetica.jpg',
    items: ['Micropigmentación', 'Extensiones', 'Manicura', 'Pedicura', 'Cejas'],
  },
]

export default function Treatments() {
  const titleRef = useScrollReveal({ direction: 'up' })
  const cardsRef = useRef(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.treatment-card')
    if (!cards) return

    const ctx = gsap.context(() => {
      // Las cards aparecen en stagger con efecto 3D tilt
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        rotationX: 15,        // rotación 3D en X — da efecto de "caída"
        transformPerspective: 800,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
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
    <section id="tratamientos" className="section-content py-32 px-6 bg-nude-50/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* ── CABECERA */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-500 mb-4 block">
            Lo que ofrecemos {/* MODIFICA */}
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-dark">
            Nuestros <em className="italic">tratamientos</em>
          </h2>
        </div>

        {/* ── GRID DE TRATAMIENTOS */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="treatment-card group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-500">

              {/* Imagen */}
              <div className="aspect-[16/9] overflow-hidden bg-nude-200">
                <div className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              {/* Contenido */}
              <div className="p-8">
                <h3 className="font-display text-3xl font-light text-dark mb-3">{cat.title}</h3>
                <p className="font-body text-dark/60 text-sm leading-relaxed mb-5">{cat.description}</p>

                {/* Lista de servicios */}
                <ul className="flex flex-wrap gap-2 mb-6">
                  {cat.items.map(item => (
                    <li key={item}
                      className="font-body text-xs tracking-wider uppercase bg-nude-100 text-dark/70 px-3 py-1.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a href="#contacto"
                  className="font-body text-xs tracking-widest uppercase text-primary-500 border-b border-primary-500 pb-0.5 hover:text-primary-600 transition-colors"
                >
                  Reservar → {/* MODIFICA: texto del CTA */}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
