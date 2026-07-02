'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import '../css/Indiba.css' // Importación de tus estilos puros

export default function Indiba() {
  // Mantenemos las animaciones nativas que tiran de GSAP por debajo
  const imageRef   = useScrollReveal({ direction: 'left', duration: 1.2 })
  const contentRef = useScrollReveal({ direction: 'right', duration: 1.2, delay: 0.1 })

  return (
    <section id="indiba" className="section-content indibaSection">
      <div className="indibaContainer">
        <div className="indibaGrid">
          
          {/* ── COLUMNA IZQUIERDA: IMAGEN */}
          <div ref={imageRef} className="indibaVisual">
            <img 
              src="/images/indiba-treatment.jpg" // Imagen por defecto lista para cuando se use
              alt="Tratamiento Indiba Deep Beauty" 
              className="indibaImage"
              loading="lazy"
            />
          </div>

          {/* ── COLUMNA DERECHA: TEXTO */}
          <div ref={contentRef} className="indibaContent">
            <span className="indibaSubtitle">
              Tecnología Avanzada
            </span>
            <h2 className="indibaTitle">
              Método Indiba <em>Deep Beauty</em>
            </h2>
            <p className="indibaDesc">
              El secreto de una belleza duradera desde el interior. Gracias a su tecnología de radiofrecuencia patentada a 448 kHz, revitaliza las células de forma natural, devolviendo la firmeza y luminosidad a tu rostro y cuerpo desde la primera sesión.
            </p>

            {/* Listado de Beneficios */}
            <div className="indibaBenefits">
              <div className="indibaBenefitItem">
                <span className="indibaCheck">✓</span>
                <p className="indibaBenefitText">
                  <strong>Efecto Lifting Inmediato:</strong> Suaviza arrugas y líneas de expresión reafirmando el óvalo facial.
                </p>
              </div>
              <div className="indibaBenefitItem">
                <span className="indibaCheck">✓</span>
                <p className="indibaBenefitText">
                  <strong>Remodelación Corporal:</strong> Ayuda a reducir volumen, difuminar la celulitis y reafirmar tejidos.
                </p>
              </div>
              <div className="indibaBenefitItem">
                <span className="indibaCheck">✓</span>
                <p className="indibaBenefitText">
                  <strong>Bienestar Celular:</strong> Estimula la producción natural de colágeno y elastina sin dañar la piel.
                </p>
              </div>
            </div>

            {/* Botón */}
            <a href="#contacto" className="btnIndiba">
              Solicitar información
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}