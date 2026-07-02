'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../css/Hero.css' // Conectamos tu hoja de estilos pura

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
      tl.from(tagRef.current,  { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from(h1Ref.current,   { y: 80, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=0.5')
        .from(paraRef.current, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' }, '-=0.7')
        .from(ctaRef.current,  { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
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
    <section id="inicio" ref={sectionRef} className="section-content heroSection">
      {/* ── IMAGEN DE FONDO con parallax */}
      <div 
        ref={bgRef} 
        className="heroBg"
        style={{ backgroundImage: 'url(/images/hero-bg.jpg)' }}
      />

      {/* Overlay degradado elegante */}
      <div className="heroOverlay" />

      {/* ── CONTENIDO PRINCIPAL */}
      <div className="heroContent">

        {/* Subtítulo superior */}
        <span ref={tagRef} className="heroTagline">
          Centro de Belleza y Salud · Zaragoza
        </span>

        {/* Título principal */}
        <h1 ref={h1Ref} className="heroTitle">
          Cuídate.<br />
          <em>Merécetelo.</em>
        </h1>

        {/* Descripción corta */}
        <p ref={paraRef} className="heroDescription">
          Tratamientos de belleza y bienestar con la mejor tecnología
          y un cuidado completamente personalizado.
        </p>

        {/* Botones CTA */}
        <div ref={ctaRef} className="heroCtaWrapper">
          <a href="#tratamientos" className="btnHeroPrimary">
            Ver tratamientos
          </a>
          <a href="#contacto" className="btnHeroSecondary">
            Reservar cita
          </a>
        </div>
      </div>

      {/* ── SCROLL HINT animado */}
      <div ref={scrollRef} className="scrollHint">
        <div className="scrollLine" />
      </div>
    </section>
  )
}