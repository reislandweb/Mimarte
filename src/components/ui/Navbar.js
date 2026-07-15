'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import '../css/Navbar.css' // Conectamos directamente tu CSS Puro

// ─────────────────────────────────────────────────────────────
// LINKS DEL MENÚ — modifica aquí para añadir/quitar páginas
// ─────────────────────────────────────────────────────────────
const LINKS = [
  { label: 'Inicio',       href: '#inicio' },
  { label: 'Nosotros',     href: '#nosotros' },
  { label: 'Tratamientos', href: '#tratamientos' },
  { label: 'Bonos',        href: '#bonos' },
  { label: 'Productos',    href: '#productos' },
  { label: 'Contacto',     href: '#contacto' },
]

export default function Navbar() {
  const navRef   = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)

  useEffect(() => {
    // Animación de entrada al cargar la página
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 1 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power3.out' }
    )

    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header ref={navRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}
      className={`navbarHeader ${scrolled ? 'isScrolled' : 'notScrolled'}`}
    >
      <div className="navbarContainer">

        {/* ── LOGO */}
      <a href="#inicio" className="navbarLogo">
        <img 
          src="/images/logo.png" 
          alt="Logo Mimarte Estética" 
          className="navbarLogoImg"
        />
      </a>

        {/* ── MENÚ DESKTOP */}
        <nav className="navbarMenuDesktop">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} className="navLink">
              {label}
            </a>
          ))}
          {/* Botón CTA */}
          <a href="#contacto" className="navCtaButton">
            Reservar cita
          </a>
        </nav>

        {/* ── HAMBURGER MOBILE */}
        <button className="hamburgerBtn" onClick={() => setOpen(!open)} aria-label="Menú">
          <span className={`hamburgerLine top ${open ? 'open' : ''}`} />
          <span className={`hamburgerLine mid ${open ? 'open' : ''}`} />
          <span className={`hamburgerLine bot ${open ? 'open' : ''}`} />
        </button>
      </div>

      {/* ── MENÚ MOBILE */}
      <div className={`navbarMenuMobileCollapse ${open ? 'open' : 'closed'}`}>
        <nav className="navbarMenuMobileBody">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="navLinkMobile">
              {label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)} className="navCtaButtonMobile">
            Reservar cita
          </a>
        </nav>
      </div>
    </header>
  )
}