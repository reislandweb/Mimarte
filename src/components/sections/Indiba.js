'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// ─────────────────────────────────────────────────────────────
// BENEFICIOS INDIBA — modifica este array
// ─────────────────────────────────────────────────────────────
const BENEFITS = [
  { num: '01', title: 'Regeneración celular',    text: 'Estimula la producción de colágeno y elastina de forma natural, rejuveneciendo los tejidos desde dentro.' },
  { num: '02', title: 'Reducción de volumen',    text: 'Activa el metabolismo de las grasas para reducir medidas de forma efectiva y duradera.' },
  { num: '03', title: 'Efecto anti-edad',        text: 'Mejora visiblemente la flacidez y las arrugas, con resultados desde la primera sesión.' },
  { num: '04', title: 'Recuperación deportiva',  text: 'Reduce la inflamación y acelera la recuperación muscular tras el ejercicio o lesiones.' },
]

export default function Indiba() {
  const titleRef    = useScrollReveal({ direction: 'up' })
  const imageRef    = useScrollReveal({ direction: 'left', duration: 1.1, delay: 0.2 })
  const contentRef  = useScrollReveal({ direction: 'right', duration: 1.1 })

  return (
    <section id="indiba" className="section-content py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── CABECERA */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-500 mb-4 block">
            Tecnología exclusiva
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-dark">
            Tratamiento <em className="italic">Indiba</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── IMAGEN
              Reemplaza /images/indiba.jpg
              Ideal: foto del equipo Indiba o de una sesión en el centro */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="aspect-square overflow-hidden bg-nude-200">
              <div className="w-full h-full hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: 'url(/images/indiba.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            {/* Badge flotante — modifica el texto */}
            <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white p-6 text-center">
              <p className="font-display text-3xl font-light">1ª</p>
              <p className="font-body text-xs tracking-widest uppercase mt-1">Sesión</p>
              <p className="font-display text-xl">Resultados visibles</p> {/* MODIFICA */}
            </div>
          </div>

          {/* ── CONTENIDO */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <p className="font-body text-dark/70 leading-relaxed mb-10 text-base">
              {/* MODIFICA: descripción del tratamiento Indiba */}
              Indiba es la tecnología de radiofrecuencia más avanzada del mundo, capaz de
              regenerar los tejidos desde el interior mediante ondas de energía capacitiva y
              resistiva. Utilizado en más de 120 países y avalado por miles de estudios clínicos.
            </p>

            {/* Lista de beneficios */}
            <div className="space-y-6">
              {BENEFITS.map(({ num, title, text }) => (
                <div key={num} className="flex gap-5 group">
                  <span className="font-display text-3xl font-light text-primary-300 flex-shrink-0 group-hover:text-primary-500 transition-colors duration-300">
                    {num}
                  </span>
                  <div>
                    <h4 className="font-body text-sm tracking-widest uppercase text-dark mb-1">{title}</h4>
                    <p className="font-body text-dark/60 text-sm leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contacto"
              className="inline-block mt-10 font-body text-xs tracking-widest uppercase bg-primary-500 text-white px-8 py-4 hover:bg-primary-600 transition-colors duration-300"
            >
              Pedir información
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
