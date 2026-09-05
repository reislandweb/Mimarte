"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../css/Hero.css";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const h1Ref = useRef(null);
  const paraRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrada en cascada solo para los elementos activos
      const tl = gsap.timeline({ delay: 0.8 });

      tl.from(h1Ref.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
        .from(
          paraRef.current,
          { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7",
        )
        .from(
          ctaRef.current,
          { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="section-content heroSection"
    >
      <div className="heroOverlay" />

      {/* ── CONTENIDO PRINCIPAL CENTRADO ── */}
      <div className="heroContentSingle">
        {/* Logotipo */}
        <div ref={h1Ref} className="heroBrandWrapper">
          <img
            src="/images/logo.png"
            alt="Mimarte Estética Logo"
            className="heroBrandLogo"
          />
        </div>

        {/* Frase destacada */}
        <h2 ref={paraRef} className="heroHighlightPhrase">
          TU MOMENTO PARA <span>MIMARTE</span>
        </h2>

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
