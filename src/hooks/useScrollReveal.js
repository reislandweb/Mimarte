'use client'

/**
 * useScrollReveal — hook reutilizable para animar elementos al hacer scroll
 *
 * Uso:
 *   const ref = useScrollReveal({ direction: 'up' })
 *   <div ref={ref}>...</div>
 *
 * Opciones:
 *   direction: 'up' | 'left' | 'right' | 'scale'
 *   delay: segundos de espera antes de animar (0 por defecto)
 *   duration: duración en segundos (0.9 por defecto)
 *   stagger: si > 0, anima los hijos uno por uno con ese delay entre ellos
 */

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const { direction = 'up', delay = 0, duration = 0.9, stagger = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const from = { opacity: 0, duration, delay, ease: 'power3.out' }

    if (direction === 'up')    from.y     =  50
    if (direction === 'left')  from.x     = -60
    if (direction === 'right') from.x     =  60
    if (direction === 'scale') from.scale = 0.88

    const targets = stagger > 0 ? Array.from(el.children) : el

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        ...from,
        stagger: stagger || 0,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, el)

    return () => ctx.revert()
  }, [direction, delay, duration, stagger])

  return ref
}
