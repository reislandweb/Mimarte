'use client'

/**
 * ThreeBackground.js — Versión 2.0
 * PARA PERSONALIZAR:
 *   PARTICLE_COUNT  → número de partículas (bajar a 1200 si va lento en móvil)
 *   PARTICLE_SIZE   → tamaño de cada punto
 *   COLOR_*         → color de cada fase
 *   SPHERE_RADIUS   → tamaño de la esfera principal
 *   EXPLOSION_FORCE → distancia de la explosión
 */

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// CONFIGURACIÓN — modifica estos valores
// ─────────────────────────────────────────────────────────────
const PARTICLE_COUNT  = 2200
const PARTICLE_SIZE   = 0.12
const SPHERE_RADIUS   = 1.8    // radio esfera principal
const SPHERE_RADIUS_2 = 1.8    // radio esfera final (más pequeña)
const EXPLOSION_FORCE = 10      // fuerza de la explosión

// Colores por fase (hex 0xRRGGBB) — ajusta a la paleta de tu clienta
const COLOR_CHAOS     = 0xA8120B  // nude cálido
const COLOR_FORMING   = 0xd4693a  // primary naranja
const COLOR_SPHERE    = 0xc5572e  // primary oscuro
const COLOR_EXPLOSION = 0xFADD00  // nude muy claro
const COLOR_FALLING   = 0xFADD90  // nude medio
const COLOR_REFORM    = 0xd4693a  // primary naranja (cierre)

// ─────────────────────────────────────────────────────────────
// GENERADORES DE POSICIONES
// ─────────────────────────────────────────────────────────────

function generateChaosPositions(count) {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi   = Math.acos(2 * Math.random() - 1)
    const r     = 3.5 + Math.random() * 4.5
    pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55
    pos[i * 3 + 2] = r * Math.cos(phi)
  }
  return pos
}

function generateSpherePositions(count, radius) {
  const pos = new Float32Array(count * 3)
  const gr  = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * i) / count)
    const phi   = (2 * Math.PI * i) / gr
    pos[i * 3]     = radius * Math.sin(theta) * Math.cos(phi)
    pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi)
    pos[i * 3 + 2] = radius * Math.cos(theta)
  }
  return pos
}

function generateExplosionPositions(count, force) {
  const pos = new Float32Array(count * 3)
  const gr  = (1 + Math.sqrt(5)) / 2
  for (let i = 0; i < count; i++) {
    const theta = Math.acos(1 - (2 * i) / count)
    const phi   = (2 * Math.PI * i) / gr
    const r     = force * (0.4 + Math.random() * 0.9)
    pos[i * 3]     = r * Math.sin(theta) * Math.cos(phi)
    pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi) + (Math.random() - 0.5) * 2
    pos[i * 3 + 2] = r * Math.cos(theta)
  }
  return pos
}

function generateFallingPositions(count) {
  const pos = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 14
    pos[i * 3 + 1] = Math.random() * 10 - 6
    pos[i * 3 + 2] = (Math.random() - 0.5) * 6
  }
  return pos
}

// ─────────────────────────────────────────────────────────────
// EASING helpers
// ─────────────────────────────────────────────────────────────
const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
const easeOut3  = (t) => 1 - Math.pow(1 - t, 3)
const easeOut2  = (t) => 1 - Math.pow(1 - t, 2)

// ─────────────────────────────────────────────────────────────
// COMPONENTE
// ─────────────────────────────────────────────────────────────

export default function ThreeBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // ── Setup Three.js ────────────────────────────────────────

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 6

    // ── Geometría de partículas ───────────────────────────────

    const geometry = new THREE.BufferGeometry()
    const chaosPos = generateChaosPositions(PARTICLE_COUNT)
    geometry.setAttribute('position', new THREE.BufferAttribute(chaosPos.slice(), 3))

    const material = new THREE.PointsMaterial({
      size:            PARTICLE_SIZE,
      color:           new THREE.Color(COLOR_CHAOS),
      transparent:     true,
      opacity:         0.75,
      sizeAttenuation: true,
      blending:        THREE.AdditiveBlending,
      depthWrite:      false,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // ── Pre-generar todos los estados ─────────────────────────

    const P = {
      chaos:     chaosPos,
      sphere1:   generateSpherePositions(PARTICLE_COUNT, SPHERE_RADIUS),
      explode:   generateExplosionPositions(PARTICLE_COUNT, EXPLOSION_FORCE),
      falling:   generateFallingPositions(PARTICLE_COUNT),
      sphere2:   generateSpherePositions(PARTICLE_COUNT, SPHERE_RADIUS_2),
    }

    // ── Helpers de interpolación ──────────────────────────────

    function lerpPos(a, b, t) {
      const cur = geometry.attributes.position.array
      for (let i = 0; i < cur.length; i++) {
        cur[i] = a[i] + (b[i] - a[i]) * t
      }
      geometry.attributes.position.needsUpdate = true
    }

    function lerpColor(cA, cB, t) {
      material.color.setRGB(
        (((cA >> 16) & 255) + ((((cB >> 16) & 255) - ((cA >> 16) & 255)) * t)) / 255,
        (((cA >> 8)  & 255) + ((((cB >> 8)  & 255) - ((cA >> 8)  & 255)) * t)) / 255,
        (( cA        & 255) + ((( cB        & 255) - ( cA        & 255)) * t)) / 255,
      )
    }

    // ── Estado del scroll y ratón ─────────────────────────────

    const state = { progress: 0, mouseX: 0, mouseY: 0 }

    // Este ScrollTrigger lee el scroll COMPLETO de la página (0 → 1)
    // scrub: 0.4 → la animación sigue al scroll con un pequeño lag suave
    // MODIFICA scrub: 0 para instantáneo, 1-2 para más inercia
    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => { state.progress = self.progress },
    })

    window.addEventListener('mousemove', (e) => {
      state.mouseX = e.clientX / window.innerWidth  - 0.5
      state.mouseY = e.clientY / window.innerHeight - 0.5
    })

    // ── Loop de render ────────────────────────────────────────

    let rafId
    const clock = new THREE.Clock()

    const animate = () => {
      rafId = requestAnimationFrame(animate)

      const p = state.progress
      const t = clock.getElapsedTime()

      // ─── FASES ────────────────────────────────────────────
      // Cambia los números (0.30, 0.45, etc.) para ajustar cuándo ocurre cada fase

      if (p <= 0.30) {
        // Fase 1: Caos → Esfera
        const lt = easeInOut(p / 0.30)
        lerpPos(P.chaos, P.sphere1, lt)
        lerpColor(COLOR_CHAOS, COLOR_FORMING, lt)
        material.opacity = 0.6 + lt * 0.25

      } else if (p <= 0.45) {
        // Fase 2: Esfera completamente formada — gira y se comprime
        const lt = (p - 0.30) / 0.15
        lerpPos(P.sphere1, P.sphere1, 0)  // quieta
        lerpColor(COLOR_FORMING, COLOR_SPHERE, lt)
        material.opacity = 0.85 + lt * 0.1
        // Rotación extra de tensión antes de explotar
        particles.rotation.y += 0.006 + lt * 0.018

      } else if (p <= 0.65) {
        // Fase 3: EXPLOSIÓN
        const lt = easeOut3((p - 0.45) / 0.20)
        lerpPos(P.sphere1, P.explode, lt)
        lerpColor(COLOR_SPHERE, COLOR_EXPLOSION, lt)
        material.opacity = 0.9 - lt * 0.25

      } else if (p <= 0.80) {
        // Fase 4: Cayendo
        const lt = easeInOut((p - 0.65) / 0.15)
        lerpPos(P.explode, P.falling, lt)
        lerpColor(COLOR_EXPLOSION, COLOR_FALLING, lt)
        material.opacity = 0.65 + lt * 0.1

      } else {
        // Fase 5: Reforma esfera pequeña
        const lt = easeOut2((p - 0.80) / 0.20)
        lerpPos(P.falling, P.sphere2, lt)
        lerpColor(COLOR_FALLING, COLOR_REFORM, lt)
        material.opacity = 0.75 + lt * 0.2
      }

      // ─── Rotación base + parallax ratón ───────────────────
      particles.rotation.y  += 0.0005
      particles.rotation.x  += 0.00018
      particles.rotation.y  += (state.mouseX * 0.35 - particles.rotation.y) * 0.012
      particles.rotation.x  += (state.mouseY * 0.22 - particles.rotation.x) * 0.012

      // Cámara flotante suave
      camera.position.y = Math.sin(t * 0.18) * 0.12
      camera.position.x = Math.cos(t * 0.14) * 0.08

      renderer.render(scene, camera)
    }

    animate()

    // ── Resize ────────────────────────────────────────────────

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach(st => st.kill())
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      zIndex: 0, pointerEvents: 'none',
    }} />
  )
}
