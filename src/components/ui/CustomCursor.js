'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // El punto sigue al ratón sin delay
    const onMove = (e) => {
      gsap.to(dot,  { x: e.clientX, y: e.clientY, duration: 0 })
      // El anillo sigue con un leve lag — eso da el efecto premium
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.18, ease: 'power2.out' })
    }

    // Efecto hover: el anillo crece sobre links y botones
    const onEnter = () => gsap.to(ring, { scale: 2.8, opacity: 0.4, duration: 0.3 })
    const onLeave = () => gsap.to(ring, { scale: 1,   opacity: 1,   duration: 0.3 })

    window.addEventListener('mousemove', onMove)

    // Aplicar hover a todos los elementos interactivos
    const interactives = document.querySelectorAll('a, button')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      {/* Punto central del cursor */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: 8, height: 8,
        background: '#fc4c00',  /* COLOR: mismo que primary-500 */
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        mixBlendMode: 'multiply',
      }} />

      {/* Anillo exterior */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998,
        width: 20, height: 20,
        border: '1px solid rgb(255, 77, 0)',  /* COLOR: primary-500 con opacidad */
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
      }} />
    </>
  )
}
