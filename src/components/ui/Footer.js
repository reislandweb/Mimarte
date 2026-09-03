"use client";

import { useEffect, useState } from "react";
import "../css/Footer.css"; // Enlazamos tus estilos puros libres de Tailwind

// Textos legales predeterminados para la ventana emergente
const LEGAL_CONTENT = {
  privacidad: {
    title: "Política de Privacidad",
    text: (
      <>
        <p>
          En <strong>Mimarte Estética</strong> nos tomamos muy en serio la
          protección de sus datos personales. De conformidad con el Reglamento
          General de Protección de Datos (RGPD) y la Ley Orgánica 3/2018
          (LOPDGDD), le informamos que los datos facilitados a través de nuestro
          sitio web o formularios de contacto serán tratados bajo la
          responsabilidad de Mimarte Estética.
        </p>
        <h4>1. Finalidad del tratamiento</h4>
        <p>
          Gestionar las solicitudes de cita previa, responder a consultas sobre
          nuestros tratamientos (Faciales, Maderoterapia, Radiofrecuencia,
          Láser) y envío de información comercial en caso de haber sido
          autorizada explícitamente.
        </p>
        <h4>2. Legitimación</h4>
        <p>
          El consentimiento del usuario al ponerse en contacto con nosotros o
          solicitar la reserva de bonos y tratamientos.
        </p>
        <h4>3. Derechos del usuario</h4>
        <p>
          Tiene derecho a acceder, rectificar, suprimir y limitar el tratamiento
          de sus datos enviando un correo electrónico a{" "}
          <strong>info@mimarteestetica.es</strong> junto con una copia de su
          DNI.
        </p>
      </>
    ),
  },
  avisoLegal: {
    title: "Aviso Legal",
    text: (
      <>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
          Servicios de la Sociedad de la Información y Comercio Electrónico
          (LSSI-CE), se exponen los datos identificativos del titular del sitio
          web:
        </p>
        <ul>
          <li>
            <strong>Denominación comercial:</strong> Mimarte Estética
          </li>
          <li>
            <strong>Ubicación:</strong> Zaragoza, España
          </li>
          <li>
            <strong>Contacto:</strong> 641 88 20 41 | info@mimarteestetica.es
          </li>
        </ul>
        <h4>Propiedad Intelectual</h4>
        <p>
          Todos los contenidos del sitio web (textos, logotipos, imágenes,
          estructura de navegación, marcas) son propiedad exclusiva de Mimarte
          Estética o de sus licenciantes. Queda prohibida su reproducción o
          distribución sin autorización previa.
        </p>
      </>
    ),
  },
  cookies: {
    title: "Política de Cookies",
    text: (
      <>
        <p>
          Este sitio web utiliza cookies técnicas y analíticas necesarias para
          garantizar el correcto funcionamiento de la página y analizar las
          interacciones de nuestros usuarios.
        </p>
        <h4>Tipos de cookies utilizadas:</h4>
        <ul>
          <li>
            <strong>Cookies Técnicas:</strong> Esenciales para el correcto
            funcionamiento de la web y la navegación.
          </li>
          <li>
            <strong>Cookies de Personalización/Asistente:</strong> Utilizadas
            para la integración del asistente virtual de consultas (Chatbase).
          </li>
        </ul>
        <p>
          Puede configurar o deshabilitar las cookies en cualquier momento desde
          los ajustes de su navegador (Chrome, Safari, Firefox, Edge).
        </p>
      </>
    ),
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState(null);

  // Inyección de Chatbase adaptada a React
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

          {/* FIRMA CON ANIMACIÓN CARROUSEL / TICKER DESPLAZABLE */}
          <div className="footerSignatureWrapper">
            <span className="signatureLabel">Desarrollado por</span>
            <div className="marqueeContainer">
              <a
                href="https://www.instagram.com/reislandweb?igsi=N2txMGQycHp5Ymll"
                target="_blank"
                rel="noopener noreferrer"
                className="raiselandAnimatedLink"
              >
                RaiselandWeb ✨
              </a>
            </div>
          </div>

          {/* ENLACES LEGALES (ABREN MODAL) */}
          <div className="footerLegalLinks">
            <button
              type="button"
              onClick={() => setActiveModal("privacidad")}
              className="footerLegalBtn"
            >
              Privacidad
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("avisoLegal")}
              className="footerLegalBtn"
            >
              Aviso Legal
            </button>
            <button
              type="button"
              onClick={() => setActiveModal("cookies")}
              className="footerLegalBtn"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>

      {/* ── VENTANA MODAL DE TEXTOS LEGALES */}
      {activeModal && (
        <div className="legalModalOverlay" onClick={() => setActiveModal(null)}>
          <div className="legalModalCard" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="legalModalCloseBtn"
              onClick={() => setActiveModal(null)}
            >
              ✕
            </button>
            <h3 className="legalModalTitle">
              {LEGAL_CONTENT[activeModal].title}
            </h3>
            <div className="legalModalBody">
              {LEGAL_CONTENT[activeModal].text}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
