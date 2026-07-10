    'use client'

    import { useState, useEffect } from 'react'
    import '../css/MapAndReviews.css'

    // Pega aquí las opiniones de Google de la clienta
    const RESEÑAS = [
    {
        id: 1,
        author: 'María Fernández',
        stars: '⭐⭐⭐⭐⭐',
        text: 'El mejor centro de estética de Zaragoza. Me hice la higiene facial profunda y mi piel ha dado un cambio radical. La atención es impecable y súper personalizada.'
    },
    {
        id: 2,
        author: 'Laura Gómez',
        stars: '⭐⭐⭐⭐⭐',
        text: 'Los bonos de maderoterapia son una maravilla, los resultados se notan desde las primeras sesiones. Un espacio súper limpio que invita a relajarse y mimarse.'
    },
    {
        id: 3,
        author: 'Carlos Martínez',
        stars: '⭐⭐⭐⭐⭐',
        text: 'Súper profesionales. El tratamiento Indiba es espectacular y el trato recibido te hace sentir como en casa desde que entras por la puerta. Totalmente recomendable.'
    }
    ]

    export default function MapAndReviews() {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Temporizador para cambiar de reseña automáticamente cada 5 segundos (5000ms)
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % RESEÑAS.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="mapReviewsSection">
        <div className="mapReviewsContainer">
            
            {/* BLOQUE IZQUIERDO: CARRUSEL DE RESEÑAS */}
            <div className="reviewsBlock">
            <span className="reviewsSubtitle">Opiniones reales</span>
            <h2 className="reviewsTitle">Lo que dicen de Mimarte</h2>
            
            <div className="carouselWrapper">
                {RESEÑAS.map((resena, idx) => (
                <div 
                    key={resena.id} 
                    className={`reviewCard ${idx === currentIndex ? 'active' : ''}`}
                >
                    <div className="starsRow">{resena.stars}</div>
                    <p className="reviewText">"{resena.text}"</p>
                    <h4 className="reviewAuthor">{resena.author}</h4>
                </div>
                ))}
            </div>

            {/* Indicadores de bolitas inferiores */}
            <div className="carouselDots">
                {RESEÑAS.map((_, idx) => (
                <button 
                    key={idx} 
                    className={`dot ${idx === currentIndex ? 'dotActive' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                />
                ))}
            </div>
            </div>

            {/* BLOQUE DERECHO: MINIMAPA DE GOOGLE */}
            <div className="mapBlock">
            {/* Reemplaza el enlace del src cuando tengas el de tu clienta */}
            <iframe 
                src="https://maps.google.com/maps?q=Mimarte%20Est%C3%A9tica,%20Av.%20Fco.%20de%20Goya,%2072,%20Local%2011,%2050005%20Zaragoza&t=&z=16&ie=UTF8&iwloc=B&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="googleMapIframe"
    ></iframe>
            </div>

        </div>
        </section>
    )
    }