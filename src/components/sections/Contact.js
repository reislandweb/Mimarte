"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useState } from "react";
import "../css/Contact.css";

const WHATSAPP_PHONE = "34641882041";

// 🎯 MENSAJES PREDEFINIDOS SEGÚN LA OPCIÓN
const DEFAULT_MESSAGES = {
  "Tratamientos faciales":
    "Hola, me gustaría recibir más información sobre vuestros tratamientos faciales, precios y disponibilidad para una valoración.",
  "Tratamientos corporales":
    "Hola, estoy interesada/o en vuestros tratamientos corporales. ¿Podríais darme detalles sobre las sesiones y recomendaciones?",
  Radiofrecuencia:
    "Hola, quisiera pedir información sobre las sesiones de Radiofrecuencia (duración, precios y zonas a tratar).",
  "Informacion de bonos":
    "¡Hola! Me gustaría conocer las opciones de bonos que tenéis disponibles y sus condiciones.",
};

const CONTACT_INFO = {
  phone: "+34 641 882 041",
  email: "info@mimarteestetica.es",
  address: "Av. Fco. de Goya, 72, Loc 11",
  city: "50005 Zaragoza",
  hours: [
    { days: "Lunes a Viernes", time: "09:00 – 14:00" },
    { time: "16:00 - 20:30" },
    { days: "Sábados", time: "Cerrado" },
    { days: "Domingos", time: "Cerrado" },
  ],
};

export default function Contact() {
  const titleRef = useScrollReveal({ direction: "up" });
  const formRef = useScrollReveal({ direction: "right", duration: 1 });
  const infoRef = useScrollReveal({
    direction: "left",
    duration: 1,
    delay: 0.2,
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ⚡ CONTROLADOR ESPECIAL PARA EL SELECTOR DE SERVICIOS
  const handleServiceChange = (e) => {
    const selectedService = e.target.value;

    // Asignamos el mensaje automático correspondiente a la opción elegida
    const autoMessage = DEFAULT_MESSAGES[selectedService] || "";

    setForm((prevForm) => ({
      ...prevForm,
      service: selectedService,
      // Solo sobreescribimos el mensaje si el usuario no ha escrito nada propio todavía o si cambió de servicio
      message: autoMessage,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    const messageText = `¡Hola! Quisiera solicitar información desde la web.

📌 *DATOS DE LA SOLICITUD:*
• *Nombre:* ${form.name}
• *Teléfono:* ${form.phone}
• *Email:* ${form.email || "No facilitado"}
• *Interés en:* ${form.service}

💬 *Mensaje:*
${form.message || "Sin mensaje adicional"}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(messageText)}`;

    await new Promise((r) => setTimeout(r, 600));

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSending(false);
    setSent(true);
  };

  return (
    <section id="contacto" className="section-content contactSection">
      <div className="contactContainer">
        <div ref={titleRef} className="contactHeader">
          <span className="contactSubtitle">Resolvemos todas tus dudas</span>
          <h2 className="contactTitle">
            Solicita <em>información</em>
          </h2>
        </div>

        <div className="contactGrid">
          <div ref={formRef}>
            {sent ? (
              <div className="successWrapper">
                <div className="successIcon">✓</div>
                <h3 className="successTitle">¡Solicitud enviada!</h3>
                <p className="successDesc">
                  Se ha abierto WhatsApp con tu mensaje. Nos pondremos en
                  contacto contigo lo antes posible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contactForm">
                {/* Nombre */}
                <div className="inputGroup">
                  <label className="formLabel">Nombre completo *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="formInput"
                    placeholder="Escribe tu nombre"
                  />
                </div>

                {/* Teléfono + Email */}
                <div className="doubleGroup">
                  <div className="inputGroup">
                    <label className="formLabel">Teléfono *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="formInput"
                      placeholder="600 000 000"
                    />
                  </div>
                  <div className="inputGroup">
                    <label className="formLabel">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="formInput"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Tratamiento o Bono de interés */}
                <div className="inputGroup">
                  <label className="formLabel">
                    ¿Sobre qué deseas información? *
                  </label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleServiceChange} // <-- Usamos el nuevo controlador
                    className="formSelect"
                  >
                    <option value="">Selecciona un tratamiento o bono</option>
                    <option value="Tratamientos faciales">
                      Tratamientos faciales
                    </option>
                    <option value="Tratamientos corporales">
                      Tratamientos corporales
                    </option>
                    <option value="Radiofrecuencia">Radiofrecuencia</option>
                    <option value="Informacion de bonos">
                      Informacion de bonos
                    </option>
                  </select>
                </div>

                {/* Mensaje con autocompletado */}
                <div className="inputGroup">
                  <label className="formLabel">¿En qué podemos ayudarte?</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className="formTextarea"
                    placeholder="El mensaje se completará automáticamente al seleccionar una opción arriba..."
                  />
                </div>

                <button type="submit" disabled={sending} className="btnSubmit">
                  {sending
                    ? "Redirigiendo a WhatsApp..."
                    : "Enviar solicitud por WhatsApp"}
                </button>

                <p className="privacyNotice">
                  Al enviar, aceptas nuestra{" "}
                  <a href="/privacidad">política de privacidad</a>.
                </p>
              </form>
            )}
          </div>

          {/* Info de contacto */}
          <div ref={infoRef} className="infoColumn">
            <div>
              <h3 className="infoBlockTitle">Ubicación y Contacto</h3>
              <div className="infoDataWrapper">
                <p className="infoText">
                  <span className="infoLabel">Dirección</span>
                  {CONTACT_INFO.address}
                  <br />
                  {CONTACT_INFO.city}
                </p>
                <p className="infoText">
                  <span className="infoLabel">Teléfono / WhatsApp</span>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}>
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <p className="infoText">
                  <span className="infoLabel">Email</span>
                  <a href={`mailto:${CONTACT_INFO.email}`}>
                    {CONTACT_INFO.email}
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h3 className="infoBlockTitle">Horario de atención</h3>
              <div>
                {CONTACT_INFO.hours.map(({ days, time }, idx) => (
                  <div key={idx} className="hoursRow">
                    <span className="hoursDays">{days}</span>
                    <span className="hoursTime">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="infoBlockTitle">Síguenos</h3>
              <div className="socialsRow">
                {[
                  {
                    name: "Whatsapp",
                    href: "https://wa.me/34641882041",
                    icon: "/icons/whatsapp.png",
                  },
                  {
                    name: "Instagram",
                    href: "https://www.instagram.com/mimarteestetica.zgz",
                    icon: "/icons/instagram.png",
                  },
                  {
                    name: "Facebook",
                    href: "https://facebook.com/mimarteestetica.zgz",
                    icon: "/icons/facebook.png",
                  },
                ].map(({ name, href, icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="socialBtn"
                  >
                    {icon ? (
                      <img src={icon} alt={name} className="socialIcon" />
                    ) : (
                      name
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
