import Link from "next/link";
import "./politica-de-cookies.css"; // Ajusta la ruta a tu archivo CSS

export default function PoliticaDeCookies() {
  return (
    <main className="cookiesPageContainer">
      <article className="cookiesContentCard">
        {/* CABECERA */}
        <header className="cookiesHeader">
          <span className="cookiesBadge">Información Legal</span>
          <h1 className="cookiesTitle">Política de Cookies</h1>
          <p className="cookiesUpdated">
            Última actualización: Septiembre 2026
          </p>
        </header>

        {/* CONTENIDO */}
        <section className="cookiesSection">
          <h2>¿Qué son las cookies?</h2>
          <p>
            En <strong>Mimarte Estética</strong> utilizamos cookies y
            tecnologías similares para garantizar el correcto funcionamiento de
            nuestra web, personalizar tu experiencia y analizar el tráfico de
            navegación.
          </p>
          <p>
            Una cookie es un pequeño archivo de texto que se descarga en tu
            dispositivo (ordenador, tablet o smartphone) al acceder a
            determinadas páginas web. Permiten recordar tus preferencias de
            navegación y ofrecerte un servicio más ágil e interactivo.
          </p>
        </section>

        <section className="cookiesSection">
          <h2>Tipos de cookies que utilizamos</h2>
          <div className="cookiesGrid">
            <div className="cookieTypeCard">
              <h3>Técnicas y Necesarias</h3>
              <p>
                Esenciales para que la web funcione correctamente (navegar por
                las secciones, recordar tu consentimiento de cookies y
                garantizar la seguridad).
              </p>
            </div>

            <div className="cookieTypeCard">
              <h3>Analíticas y Medición</h3>
              <p>
                Nos permiten cuantificar el número de visitas y analizar el
                comportamiento de las usuarias de forma anónima para mejorar
                nuestros tratamientos y servicios.
              </p>
            </div>
          </div>
        </section>

        <section className="cookiesSection">
          <h2>Gestión y desactivación de cookies</h2>
          <p>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu
            equipo mediante la configuración de las opciones del navegador que
            utilices en tu dispositivo:
          </p>
          <p>
            Ten en cuenta que, si deshabilitas las cookies técnicas necesarias,
            es posible que algunas funciones o secciones de la web no funcionen
            correctamente.
          </p>
        </section>

        {/* PIE Y BOTÓN DE REGRESO */}
        <footer className="cookiesFooterAction">
          <Link href="/" className="backHomeBtn">
            ← Volver a Mimarte Estética
          </Link>
        </footer>
      </article>
    </main>
  );
}
