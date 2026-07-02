'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import '../css/About.css' // Conectamos tu CSS Puro desde tu nueva carpeta

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
    <section id="nosotros" className="section-content aboutSection">
      <div className="container">

        {/* ── BLOQUE DE TEXTO */}
        <div ref={textRef}>
          <span className="subtitle">
            Nuestro espacio
          </span>
          <h2 className="title">
            ¿QUIÉN SOY?
          </h2>
          <p className="description">
            Soy Dayana, esteticista apasionada y perfeccionista, formada en Arte-Miss en Zaragoza. Con varios años de experiencia en el sector de la estética, me he especializado en técnicas avanzadas como la maderoterapia y el dermapen, buscando siempre ofrecer tratamientos con resultados visibles y bienestar garantizado.
            Creo firmemente que todos merecemos dedicar tiempo a nuestro bienestar y embellecer nuestra piel de manera natural. Mi enfoque es completamente personalizado, siempre escuchando a cada cliente y adaptando los tratamientos a sus necesidades específicas. Mi misión es que cada persona que pase por Mimarte Estética no solo vea mejoras estéticas, sino que también se sienta cuidada, relajada y renovada.
            Mi compromiso es ofrecer lo mejor de mí, brindando un servicio profesional, cercano y de alta calidad, donde tu satisfacción y bienestar sean siempre mi prioridad.
          </p>

          {/* Estadísticas */}
          <div ref={statsRef} className="statsGrid">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="statValue">{value}</p>
                <p className="statLabel">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BLOQUE DE IMAGEN */}
        <div ref={imageRef} className="imageWrapper">
          <div className="imageFrame">
            <div 
              className="imageSrc"
              style={{ backgroundImage: 'url(/images/Dayana.png)' }}
            />
          </div>
          {/* Decoraciones en capas inferiores */}
          <div className="decoLine" />
          <div className="decoBox" />
        </div>

      </div>
    </section>
  )
}