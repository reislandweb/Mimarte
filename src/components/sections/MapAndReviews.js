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
  );
}
