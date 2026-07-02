'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import '../css/Products.css' // Conexión a tu CSS Puro

const BRANDS = [
  { name: 'Natura Bissé', desc: 'Cosmética de lujo e innovación celular.', logo: '/images/brands/natura-bisse.png' },
  { name: 'Massada', desc: 'Cosmética natural y terapias eco-biológicas.', logo: '/images/brands/massada.png' },
  { name: 'Mesoestetic', desc: 'Especialistas en tratamientos médico-estéticos.', logo: '/images/brands/mesoestetic.png' },
]

export default function Products() {
  const titleRef = useScrollReveal({ direction: 'up' })
  const gridRef  = useScrollReveal({ direction: 'up', delay: 0.2, duration: 1 })

  return (
    <section id="productos" className="section-content productsSection">
      <div className="productsContainer">
        
        {/* ── CABECERA */}
        <div ref={titleRef} className="productsHeader">
          <span className="productsSubtitle">Alta Cosmética</span>
          <h2 className="productsTitle">
            Nuestras <em>marcas</em>
          </h2>
        </div>

        {/* ── GRID DE MARCAS */}
        <div ref={gridRef} className="productsGrid">
          {BRANDS.map((brand) => (
            <div key={brand.name} className="productCard">
              <div className="productImageWrapper">
                <img 
                  src={brand.logo} 
                  alt={`Logo de ${brand.name}`} 
                  className="productImage"
                  loading="lazy"
                />
              </div>
              <h3 className="productName">{brand.name}</h3>
              <p className="productDesc">{brand.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}