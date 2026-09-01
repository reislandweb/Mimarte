"use client";

import { useEffect } from "react";
import "../css/Footer.css"; // Enlazamos tus estilos puros libres de Tailwind

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // 🤖 Inyección de Chatbase adaptada a React
  useEffect(() => {
    if (!window.chatbase || window.chatbase("getState") !== "initialized") {
      window.chatbase = (...args) => {
        if (!window.chatbase.q) {
          window.chatbase.q = [];
        }
        window.chatbase.q.push(args);
      };
      window.chatbase = new Proxy(window.chatbase, {
        get(target, prop) {
          if (prop === "q") {
            return target.q;
          }
          return (...args) => target(prop, ...args);
        },
      });
    }

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "loxP4LlsVBXSoPrIXu9XL";
    script.domain = "www.chatbase.co";
    document.body.appendChild(script);
  }, []);

  return (
    <footer className="footerSection">
      <div className="footerContainer">
        {/* ── SECCIÓN PRINCIPAL: COLUMNAS */}
        <div className="footerGrid">
          {/* Columna 1: Branding */}
          <div className="footerBrand">
            <h2 className="footerLogo">
              Mimarte<em>.</em>
            </h2>
            <p className="footerTagline">
              Tu centro de confianza en Zaragoza. Espacio dedicado a la alta
              estética, el bienestar y el cuidado personalizado de tu piel.
            </p>
          </div>

          {/* Columna 2: Navegación rápida */}
          <div>
            <h3 className="footerColTitle">Explorar</h3>
            <ul className="footerList">
              <li>
                <a href="#inicio" className="footerListLink">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#sobre-mi" className="footerListLink">
                  El Centro
                </a>
              </li>
              <li>
                <a href="#tratamientos" className="footerListLink">
                  Tratamientos
                </a>
              </li>
              <li>
                <a href="#contacto" className="footerListLink">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 3: Horario */}
          <div>
            <h3 className="footerColTitle">Horario</h3>
            <ul className="footerList">
              <li className="footerInfoText">Lunes a Viernes:</li>
              <li
                className="footerInfoText"
                style={{ fontWeight: "500", marginBottom: "8px" }}
              >
                09:00 - 14:00 <br /> 16:00 - 20:30
              </li>
              <li className="footerInfoText">Sábados y Domingos:</li>
              <li className="footerInfoText" style={{ fontWeight: "500" }}>
                Cerrado
              </li>
            </ul>
          </div>

          {/* Columna 4: Ubicación y Datos */}
          <div>
            <h3 className="footerColTitle">Contacto</h3>
            <ul className="footerList">
              <li className="footerInfoText">Zaragoza, España</li>
              <li>
                <a href="tel:+34641882041" className="footerListLink">
                  641 88 20 41
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@mimarteestetica.es"
                  className="footerListLink"
                >
                  info@mimarteestetica.es
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── BARRA INFERIOR: COPYRIGHT, RAISELANDWEB & LEGAL */}
        <div className="footerBottom">
          <p className="footerCopy">
            &copy; {currentYear} Mimarte Estética. Todos los derechos
            reservados.
          </p>

          <p className="footerCopy" style={{ margin: "4px 0" }}>
            Desarrollado por{" "}
            <a
              href="https://raiselandweb.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#c5a880",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              RaiselandWeb
            </a>
          </p>

          <div className="footerLegalLinks">
            <a href="/politica-de-privacidad" className="footerLegalLink">
              Privacidad
            </a>
            <a href="/aviso-legal" className="footerLegalLink">
              Aviso Legal
            </a>
            <a href="/politica-de-cookies" className="footerLegalLink">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
