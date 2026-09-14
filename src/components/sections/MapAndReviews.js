"use client";

import { useEffect } from "react";
import "../css/MapAndReviews.css";

export default function MapAndReviews() {
  // Inyección del script de Elfsight al montar el componente
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="mapReviewsSection">
      <div className="mapReviewsContainer">
        {/* BLOQUE IZQUIERDO: WIDGET DE RESEÑAS REALES DE ELFSIGHT */}
        <div className="reviewsBlock">
          <span className="reviewsSubtitle">Opiniones reales</span>
          <h2 className="reviewsTitle">Lo que dicen de Mimarte</h2>

          <div className="elfsightContainer" style={{ marginTop: "20px" }}>
            <div
              className="elfsight-app-a9cbdea5-565f-4c00-9da5-d02f4154139b"
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>

        {/* BLOQUE DERECHO: MINIMAPA DE GOOGLE */}
        <div className="mapBlock">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.59563710461!2d-0.8956020234472846!3d41.64576227992824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd59153e271cf705%3A0xa48c8e85c96edfd2!2sMimarte%20Est%C3%A9tica!5e1!3m2!1ses!2ses!4v1789397355423!5m2!1ses!2ses"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </div>
    </section>
  );
}
