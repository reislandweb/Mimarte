'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

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
      className={`transition-all duration-500 ${scrolled ? 'bg-nude-50/95 backdrop-blur-md shadow-sm py-3' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── LOGO — cambia el texto por el nombre de tu clienta */}
        <a href="#inicio" className="font-display text-2xl font-light tracking-widest uppercase text-dark">
          MIMARTE ESTETICA {/* MODIFICA: nombre del centro */}
        </a>

        {/* ── MENÚ DESKTOP */}
        <nav className="hidden lg:flex items-center gap-7">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href}
              className="font-body text-xs tracking-widest uppercase text-dark/70 hover:text-primary-500 transition-colors duration-300"
            >
              {label}
            </a>
          ))}
          {/* Botón CTA — cambia el texto y color con la clase bg-primary-500 en tailwind.config */}
          <a href="#contacto"
            className="font-body text-xs tracking-widest uppercase bg-primary-500 text-white px-5 py-2.5 hover:bg-primary-600 transition-colors duration-300"
          >
            Reservar cita
          </a>
        </nav>

        {/* ── HAMBURGER MOBILE */}
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menú">
          <span className={`block w-6 h-px bg-dark mb-1.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2.5' : ''}`} />
          <span className={`block w-6 h-px bg-dark mb-1.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-dark transition-all duration-300 ${open ? '-rotate-45 -translate-y-2.5' : ''}`} />
        </button>
      </div>

      {/* ── MENÚ MOBILE */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="bg-nude-50/98 backdrop-blur-md px-6 py-6 flex flex-col gap-5 border-t border-nude-200">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setOpen(false)}
              className="font-body text-sm tracking-widest uppercase text-dark/70"
            >
              {label}
            </a>
          ))}
          <a href="#contacto" onClick={() => setOpen(false)}
            className="font-body text-sm tracking-widest uppercase bg-primary-500 text-white px-5 py-3 text-center"
          >
            Reservar cita
          </a>
        </nav>
      </div>
    </header>
  )
}
