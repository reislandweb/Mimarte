'use client'

import { useEffect, useRef } from 'react'
import '../css/CustomCursor.css' // Tu CSS Puro

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const moveCursor = (e) => {
      // Centramos el círculo con el puntero restando la mitad de su tamaño (16px / 2 = 8)
      cursor.style.left = `${e.clientX - 8}px`
      cursor.style.top = `${e.clientY - 8}px`
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return <div ref={cursorRef} className="customCursor" />
}