"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("mimarte_cookies_accepted");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("mimarte_cookies_accepted", "true");
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem("mimarte_cookies_accepted", "false");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    // Overlay semitransparente que cubre toda la pantalla y bloquea la interacción
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(4px)",
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* CPT / Ventana modal centrada */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "32px 28px",
          maxWidth: "520px",
          width: "100%",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          position: "relative",
          zIndex: 1000000,
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "20px",
            color: "#1a1a1a",
            fontFamily: "serif",
            letterSpacing: "0.03em",
          }}
        >
          Aviso de Cookies
        </h3>

        <p
          style={{
            fontSize: "14px",
            lineHeight: "1.6",
            color: "#555555",
            marginBottom: "24px",
          }}
        >
          Utilizamos cookies propias y de terceros para analizar el tráfico y
          mejorar tu experiencia en nuestra web. Puedes revisar nuestra{" "}
          <a
            href="/politica-de-cookies"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#8a714a",
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "pointer",
              position: "relative",
              zIndex: 1000001,
            }}
          >
            Política de Cookies
          </a>{" "}
          para más información.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleDecline}
            style={{
              flex: "1",
              minWidth: "130px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "500",
              borderRadius: "8px",
              border: "1px solid #dcdcdc",
              backgroundColor: "#f8f8f8",
              color: "#555555",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Rechazar
          </button>

          <button
            onClick={handleAccept}
            style={{
              flex: "1",
              minWidth: "130px",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#c5a880",
              color: "#ffffff",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
