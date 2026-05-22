'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const bgRef      = useRef(null)
  const tagRef     = useRef(null)
  const h1Ref      = useRef(null)
  const paraRef    = useRef(null)
  const ctaRef     = useRef(null)
  const scrollRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada en cascada al cargar la página
      const tl = gsap.timeline({ delay: 0.8 })
      tl.from(tagRef.current,  { y: 30, opacity: 1, duration: 0.8, ease: 'power3.out' })
        .from(h1Ref.current,   { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.5')
        .from(paraRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .from(ctaRef.current,  { y: 30, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from(scrollRef.current, { opacity: 0, duration: 0.6 }, '-=0.3')

      // Parallax de la imagen de fondo al hacer scroll
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="inicio" ref={sectionRef}
      className="section-content relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── IMAGEN DE FONDO con parallax
          Reemplaza /images/hero-bg.jpg con la foto real de tu clienta
          Tamaño recomendado: 1920x1080px mínimo, formato .webp para rendimiento */}
      <div ref={bgRef} className="absolute inset-0 scale-110"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay degradado — ajusta los colores del gradiente aquí */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(214, 105, 50, 0.5) 0%, rgba(26,22,20,0.2) 50%, rgba(253, 253, 253, 0) 100%)' }}
      />

      {/* ── CONTENIDO PRINCIPAL */}
      <div className="relative section-content text-center px-6 max-w-5xl mx-auto pt-24">

        {/* Subtítulo superior — modifica el texto */}
        <p ref={tagRef} className="subtitle">
          Centro de Belleza y Salud · Zaragoza {/* MODIFICA: ciudad o tagline */}
        </p>

        {/* Título principal — modifica el copy */}
        <h1 ref={h1Ref}
          className="font-display text-6xl md:text-8xl lg:text-[7rem] font-light text-white leading-[0.9] mb-8"
        >
          Cuídate.<br />
          <em className="italic text-primary-500">Merécetelo.</em> {/* MODIFICA: claim principal */}
        </h1>

        {/* Descripción corta */}
        <p ref={paraRef} className="font-body text-lg md:text-xl text-blue max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Tratamientos de belleza y bienestar con la mejor tecnología
          y un cuidado completamente personalizado. {/* MODIFICA: descripción */}
        </p>

        {/* Botones CTA */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#tratamientos"
            className="font-body text-xs tracking-widest uppercase bg-primary-500 text-white px-8 py-4 hover:bg-primary-600 transition-colors duration-300"
          >
            Ver tratamientos
          </a>
          <a href="#contacto"
            className="font-body text-xs tracking-widest uppercase border border-black text-black px-8 py-4 hover:bg-white hover:text-dark transition-colors duration-300"
          >
            Reservar cita
          </a>
        </div>
      </div>

      {/* ── SCROLL HINT animado */}
      <div ref={scrollRef} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>
    </section>
  )
}
