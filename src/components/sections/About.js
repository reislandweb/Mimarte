'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

// ─────────────────────────────────────────────────────────────
// DATOS DE LA SECCIÓN — modifica aquí sin tocar el HTML
// ─────────────────────────────────────────────────────────────
const STATS = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '800+', label: 'Clientas satisfechas' },
  { value: '20+', label: 'Tratamientos' },
]

export default function About() {
  const textRef  = useScrollReveal({ direction: 'left',  duration: 1 })
  const imageRef = useScrollReveal({ direction: 'right', duration: 1, delay: 0.2 })
  const statsRef = useScrollReveal({ direction: 'up',    stagger: 0.15, delay: 0.3 })

  return (
    <section id="nosotros" className="section-content py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

        {/* ── TEXTO */}
        <div ref={textRef}>
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-500 mb-4 block">
            Nuestro espacio {/* MODIFICA: subtítulo de sección */}
          </span>
          <h2 className="font-display text-5xl md:text-3xl font-light leading-tight mb-8 text-dark">
            ¿QUIEN SOY?<br />
            
          </h2>
          <p className="font-body text-dark/70 leading-relaxed mb-5 text-base">
            {/* MODIFICA: primer párrafo descriptivo */}
            Soy Dayana, esteticista apasionada y perfeccionista, formada en Arte-Miss en Zaragoza. Con varios años de experiencia en el sector de la estética, me he especializado en técnicas avanzadas como la maderoterapia y el dermapen, buscando siempre ofrecer tratamientos con resultados visibles y bienestar garantizado.
Creo firmemente que todos merecemos dedicar tiempo a nuestro bienestar y embellecer nuestra piel de manera natural. Mi enfoque es completamente personalizado, siempre escuchando a cada cliente y adaptando los tratamientos a sus necesidades específicas. Mi misión es que cada persona que pase por Mimarte Estética no solo vea mejoras estéticas, sino que también se sienta cuidada, relajada y renovada.
Mi compromiso es ofrecer lo mejor de mí, brindando un servicio profesional, cercano y de alta calidad, donde tu satisfacción y bienestar sean siempre mi prioridad.
          </p>

          {/* Stats — modifica el array STATS arriba */}
          <div ref={statsRef} className="grid grid-cols-3 gap-6 border-t border-nude-200 pt-8">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-4xl font-light text-primary-500">{value}</p>
                <p className="font-body text-xs tracking-wider uppercase text-dark/50 mt-1 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── IMAGEN
            Reemplaza /images/about.jpg con la foto real
            Recomendado: ratio 3:4, mínimo 800x1066px */}
        <div ref={imageRef} className="relative">
          <div className="aspect-[3/4] overflow-hidden bg-nude-200">
            <div className="w-full h-full transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: 'url(/images/Dayana.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </div>
          {/* Decoraciones geométricas — puedes quitarlas si no te gustan */}
          <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-nude-300 -z-10" />
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-100 -z-10" />
        </div>

      </div>
    </section>
  )
}
