'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────────────────────
// PRODUCTOS — modifica este array con los productos reales
// ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    name: 'Sérum Vitamina C',
    brand: 'Medik8',                    // MODIFICA: marca
    description: 'Iluminador y antioxidante. Corrige manchas y aporta luminosidad inmediata.',
    price: '89€',
    image: '/images/product-1.jpg',    // MODIFICA: foto del producto
  },
  {
    name: 'Crema Anti-edad',
    brand: 'Environ',
    description: 'Reduce arrugas y líneas de expresión con retinol de liberación gradual.',
    price: '112€',
    image: '/images/product-2.jpg',
  },
  {
    name: 'Mascarilla Hidratante',
    brand: 'Mesoestetic',
    description: 'Hidratación de choque para pieles deshidratadas. Efecto inmediato.',
    price: '45€',
    image: '/images/product-3.jpg',
  },
  {
    name: 'Aceite Corporal',
    brand: 'Decléor',
    description: 'Nutritivo y reafirmante. Con extractos vegetales 100% naturales.',
    price: '58€',
    image: '/images/product-4.jpg',
  },
]

export default function Products() {
  const titleRef    = useScrollReveal({ direction: 'up' })
  const productsRef = useRef(null)

  useEffect(() => {
    const items = productsRef.current?.querySelectorAll('.product-item')
    if (!items) return

    const ctx = gsap.context(() => {
      // Efecto 3D: las cards "caen" desde arriba con rotación
      gsap.from(items, {
        y: 70,
        opacity: 0,
        rotationY: 10,             // rotación en Y para efecto 3D
        transformPerspective: 600,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: productsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="productos" className="section-content py-32 px-6 bg-nude-100/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">

        {/* ── CABECERA */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-500 mb-4 block">
            Tienda
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-dark">
            Productos <em className="italic">seleccionados</em>
          </h2>
          <p className="font-body text-dark/60 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            {/* MODIFICA */}
            Solo trabajamos con las mejores marcas cosméticas para garantizarte los mejores resultados.
          </p>
        </div>

        {/* ── GRID */}
        <div ref={productsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((product) => (
            <div key={product.name} className="product-item group bg-white hover:shadow-lg transition-shadow duration-500">

              {/* Imagen del producto */}
              <div className="aspect-square overflow-hidden bg-nude-200">
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <p className="font-body text-xs tracking-widest uppercase text-primary-500 mb-1">{product.brand}</p>
                <h3 className="font-display text-xl font-light text-dark mb-2">{product.name}</h3>
                <p className="font-body text-xs text-dark/60 leading-relaxed mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-light text-dark">{product.price}</span>
                  <a href="#contacto"
                    className="font-body text-xs tracking-widest uppercase text-primary-500 border-b border-primary-500 pb-0.5"
                  >
                    Pedir →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
