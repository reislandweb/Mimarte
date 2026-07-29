'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import '../css/Contact.css' // Enlace a tu CSS Puro tradicional

const CONTACT_INFO = {
  phone: '+34 641 882 041', // Poner el teléfono/WhatsApp real de Mimarte cuando lo tengas
  email: 'info@mimarteestetica.es', // Poner el correo real de Mimarte
  address: 'Av. Fco. de Goya, 72, Loc 11',
  city: '50005 Zaragoza',
  hours: [
    { days: 'Lunes a Viernes', time: '09:00 – 14:00'},{ time: '16:00 - 20:30'},
    { days: 'Sábados', time: 'Cerrado' },
    { days: 'Domingos', time: 'Cerrado' },
  ],
}

export default function Contact() {
  const titleRef = useScrollReveal({ direction: 'up' })
  const formRef = useScrollReveal({ direction: 'right', duration: 1 })
  const infoRef = useScrollReveal({ direction: 'left', duration: 1, delay: 0.2 })

  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // Simulación de envío del formulario
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contacto" className="section-content contactSection">
      <div className="contactContainer">

        {/* ── CABECERA */}
        <div ref={titleRef} className="contactHeader">
          <span className="contactSubtitle">
            Resolvemos todas tus dudas
          </span>
          <h2 className="contactTitle">
            Solicita <em>información</em>
          </h2>
        </div>

        <div className="contactGrid">

          {/* ── FORMULARIO */}
          <div ref={formRef}>
            {sent ? (
              <div className="successWrapper">
                <div className="successIcon">✓</div>
                <h3 className="successTitle">¡Solicitud enviada!</h3>
                <p className="successDesc">Nos pondremos en contacto contigo lo antes posible para facilitarte toda la información.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contactForm">
                {/* Nombre */}
                <div className="inputGroup">
                  <label className="formLabel">Nombre completo *</label>
                  <input
                    type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    className="formInput"
                    placeholder="Escribe tu nombre"
                  />
                </div>

                {/* Teléfono + Email */}
                <div className="doubleGroup">
                  <div className="inputGroup">
                    <label className="formLabel">Teléfono *</label>
                    <input
                      type="tel" name="phone" required
                      value={form.phone} onChange={handleChange}
                      className="formInput"
                      placeholder="600 000 000"
                    />
                  </div>
                  <div className="inputGroup">
                    <label className="formLabel">Email</label>
                    <input
                      type="email" name="email"
                      value={form.email} onChange={handleChange}
                      className="formInput"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Tratamiento o Bono de interés */}
                <div className="inputGroup">
                  <label className="formLabel">¿Sobre qué deseas información? *</label>
                  <select 
                    name="service" required
                    value={form.service} onChange={handleChange}
                    className="formSelect"
                  >
                    <option value="">Selecciona un tratamiento o bono</option>
                    <optgroup label="Tratamientos Especializados">
                      <option value="Tratamiento Facial">Tratamiento Facial</option>
                      <option value="Tratamiento Corporal">Tratamiento Corporal</option>
                      <option value="Depilación Láser">Depilación Láser</option>
                      <option value="Estética Avanzada">Estética Avanzada</option>
                    </optgroup>
                    <optgroup label="Bonos Ahorro">
                      <option value="Bono Facial">Bono Facial</option>
                      <option value="Bono Corporal">Bono Corporal</option>
                      <option value="Bono Láser">Bono Depilación Láser</option>
                      <option value="Otros Bonos">Consulta sobre otro bono</option>
                    </optgroup>
                    <option value="Consulta General">Otra consulta general</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div className="inputGroup">
                  <label className="formLabel">¿En qué podemos ayudarte?</label>
                  <textarea 
                    name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    className="formTextarea"
                    placeholder="Déjanos tus dudas sobre el tratamiento, precios o disponibilidad..."
                  />
                </div>

                <button type="submit" disabled={sending} className="btnSubmit">
                  {sending ? 'Enviando...' : 'Enviar solicitud de información'}
                </button>

                <p className="privacyNotice">
                  Al enviar, aceptas nuestra{' '}
                  <a href="/privacidad">política de privacidad</a>.
                </p>
              </form>
            )}
          </div>

          {/* ── INFO DE CONTACTO */}
          <div ref={infoRef} className="infoColumn">

            {/* Datos */}
            <div>
              <h3 className="infoBlockTitle">Ubicación y Contacto</h3>
              <div className="infoDataWrapper">
                <p className="infoText">
                  <span className="infoLabel">Dirección</span>
                  {CONTACT_INFO.address}<br />{CONTACT_INFO.city}
                </p>
                <p className="infoText">
                  <span className="infoLabel">Teléfono / WhatsApp</span>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g,'')}`}>
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

            {/* Horarios */}
            <div>
              <h3 className="infoBlockTitle">Horario de atención</h3>
              <div>
                {CONTACT_INFO.hours.map(({ days, time }) => (
                  <div key={days} className="hoursRow">
                    <span className="hoursDays">{days}</span>
                    <span className="hoursTime">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div>
              <h3 className="infoBlockTitle">Síguenos</h3>
              <div className="socialsRow">
                {[
                  { name: 'Whatsapp', href: 'https://wa.me/34641882041', icon: '/icons/whatsapp.png' },
                  { name: 'TikTok', href: 'https://TikTok.com/mimarteestetica.zgz', icon: '/icons/tik-tok.png' },
                  { name: 'Instagram', href: 'https://www.instagram.com/mimarteestetica.zgz', icon: '/icons/instagram.png' },
                  { name: 'Facebook', href: 'https://facebook.com/mimarteestetica.zgz', icon: '/icons/facebook.png' },
                ].map(({ name, href, icon }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="socialBtn">
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
  )
}