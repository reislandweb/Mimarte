"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import "../css/Products.css";

export default function Products() {
  const titleRef = useScrollReveal({ direction: "up" });
  const contentRef = useScrollReveal({
    direction: "up",
    delay: 0.2,
    duration: 0.8,
  });

  return (
    <section id="productos" className="section-content productsSection">
      <div className="productsContainer">
        {/* ── CABECERA */}
        <div ref={titleRef} className="productsHeader">
          <span className="productsSubtitle">Garantía de calidad</span>
          <h2 className="productsTitle">
            Nuestras <em>marcas</em>
          </h2>
        </div>

        {/* ── CONTENIDO PRINCIPAL */}
        <div ref={contentRef} className="productsCard">
          <div className="productsTextContent">
            <p className="productsMainText">
              Somos <strong>centro autorizado Skeyndor</strong> y trabajamos con
              su cosmética profesional tanto en cabina como para el cuidado
              diario en casa. Además, en <strong>Mimarte Estética</strong>{" "}
              puedes adquirir una selección de productos Skeyndor de venta al
              público, con asesoramiento personalizado según las necesidades de
              tu piel.
            </p>
            <p className="productsSecondaryText">
              En tratamientos específicos también trabajamos con{" "}
              <strong>Utsukusy</strong>.
            </p>
          </div>

          <div className="productsLogos">
            <span className="brandBadge">SKEYNDOR</span>
            <span className="brandDivider">•</span>
            <span className="brandBadge">UTSUKUSY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
