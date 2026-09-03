"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("mimarte_cookies_accepted");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  // Evitamos cualquier desajuste de hidratación esperando al montaje en cliente
  if (!mounted) return null;

  // Si no hay que mostrarlo O la URL es la política de cookies, NO se renderiza
  if (!showBanner || pathname?.includes("politica-de-cookies")) return null;

  return (
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
        cursor: "auto",
      }}
    >
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
          cursor: "auto",
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "20px",
            color: "#1a1a1a",
            fontFamily: "serif",
            cursor: "auto",
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
            cursor: "auto",
          }}
        >
          Utilizamos cookies propias y de terceros para analizar el tráfico y
          mejorar tu experiencia. Puedes revisar nuestra{" "}
          <a
            href="/politica-de-cookies"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#8a714a",
              textDecoration: "underline",
              fontWeight: "600",
              cursor: "auto",
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
            cursor: "auto",
          }}
        >
          <button
            onClick={() => {
              localStorage.setItem("mimarte_cookies_accepted", "false");
              setShowBanner(false);
            }}
            style={{
              flex: "1",
              minWidth: "130px",
              padding: "12px 20px",
              fontSize: "14px",
              borderRadius: "8px",
              border: "1px solid #dcdcdc",
              backgroundColor: "#f8f8f8",
              color: "#555555",
              cursor: "auto",
            }}
          >
            Rechazar
          </button>

          <button
            onClick={() => {
              localStorage.setItem("mimarte_cookies_accepted", "true");
              setShowBanner(false);
            }}
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
              cursor: "auto",
            }}
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  );
}
