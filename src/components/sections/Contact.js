'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'
import '../css/Contact.css' // Enlace a tu CSS Puro tradicional

const CONTACT_INFO = {
  phone:    '976 000 000',
  email:    'info@tucentro.es',
  address:  'C/ Ejemplo 00, Miralbueno',
  city:     'Zaragoza, 50011',
  hours: [
    { days: 'Lunes a Viernes', time: '09:00 – 20:00' },
    { days: 'Sábados',          time: '09:00 – 14:00' },
    { days: 'Domingos',        time: 'Cerrado' },
  ],
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...',
}

export default function Contact() {
  const titleRef   = useScrollReveal({ direction: 'up' })
  const formRef    = useScrollReveal({ direction: 'right', duration: 1 })
  const infoRef    = useScrollReveal({ direction: 'left',  duration: 1, delay: 0.2 })

  const [form,    setForm]    = useState({ name: '', phone: '', email: '', treatment: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
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
            Estamos aquí para ti
          </span>
          <h2 className="contactTitle">
            Reserva tu <em>cita</em>
          </h2>
        </div>

        <div className="contactGrid">

          {/* ── FORMULARIO */}
          <div ref={formRef}>
            {sent ? (
              <div className="successWrapper">
                <div className="successIcon">✓</div>
                <h3 className="successTitle">¡Mensaje enviado!</h3>
                <p className="successDesc">Nos pondremos en contacto contigo en menos de 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contactForm">
                {/* Nombre */}
                <div className="inputGroup">
                  <label className="formLabel">Nombre *</label>
                  <input
                    type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    className="formInput"
                    placeholder="Tu nombre completo"
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

                {/* Tratamiento de interés */}
                <div className="inputGroup">
                  <label className="formLabel">Tratamiento de interés</label>
                  <select 
                    name="treatment"
                    value={form.treatment} onChange={handleChange}
                    className="formSelect"
                  >
                    <option value="">Selecciona un tratamiento</option>
                    <option value="facial">Tratamiento Facial</option>
                    <option value="corporal">Tratamiento Corporal</option>
                    <option value="indiba">Indiba</option>
                    <option value="laser">Depilación Láser</option>
                    <option value="estetica">Estética Avanzada</option>
                    <option value="bono">Información sobre Bonos</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div className="inputGroup">
                  <label className="formLabel">Mensaje</label>
                  <textarea 
                    name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    className="formTextarea"
                    placeholder="¿Tienes alguna pregunta o preferencia de horario?"
                  />
                </div>

                <button type="submit" disabled={sending} className="btnSubmit">
                  {sending ? 'Enviando...' : 'Enviar solicitud de cita'}
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
              <h3 className="infoBlockTitle">Encuéntranos</h3>
              <div className="infoDataWrapper">
                <p className="infoText">
                  <span className="infoLabel">Dirección</span>
                  {CONTACT_INFO.address}<br />{CONTACT_INFO.city}
                </p>
                <p className="infoText">
                  <span className="infoLabel">Teléfono</span>
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
              <h3 className="infoBlockTitle">Horarios</h3>
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
                  { name: 'Instagram', href: 'https://instagram.com/tucentro' },
                  { name: 'Facebook',  href: 'https://facebook.com/tucentro' },
                ].map(({ name, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="socialBtn">
                    {name}
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