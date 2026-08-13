"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const logoRef = useRef(null);
  const tagRef = useRef(null);
  const h1Ref = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada en cascada con el logo grande
      const tl = gsap.timeline({ delay: 0.8 });
      tl.from(logoRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          tagRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(
          h1Ref.current,
          { y: 80, opacity: 0, duration: 1.2, ease: "power4.out" },
          "-=0.5",
        )
        .from(
          paraRef.current,
          { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7",
        )
        .from(
          ctaRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        )
        .from(scrollRef.current, { opacity: 0, duration: 0.6 }, "-=0.3");

      // Parallax de la imagen de fondo
      gsap.to(bgRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="section-content heroSection"
    >
      {/* ── IMAGEN DE FONDO con parallax */}
      <div
        ref={bgRef}
        className="heroBg"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />

      <div className="heroOverlay" />

      {/* ── CONTENIDO PRINCIPAL CENTRADO ── */}
      <div className="heroContentSingle">
        {/* Subtítulo superior */}
        <span ref={tagRef} className="heroTagline">
          CENTRO DE BELLEZA Y BIENESTAR
        </span>

        {/* Logotipo en sustitución del h1 "Cuídate. Merécetelo" */}
        <div ref={h1Ref} className="heroBrandWrapper">
          <img
            src="/images/logo.png"
            alt="Mimarte Estética Logo"
            className="heroBrandLogo"
          />
        </div>

        {/* Descripción corta */}
        <p ref={paraRef} className="heroDescription">
          TU MOMENTO PARA MIMARTE
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
    </section>
  );
}
