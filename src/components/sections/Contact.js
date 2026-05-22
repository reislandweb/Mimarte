'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useState } from 'react'

// ─────────────────────────────────────────────────────────────
// DATOS DE CONTACTO — modifica estos valores
// ─────────────────────────────────────────────────────────────
const CONTACT_INFO = {
  phone:    '976 000 000',               // MODIFICA: teléfono real
  email:    'info@tucentro.es',          // MODIFICA: email real
  address:  'C/ Ejemplo 00, Miralbueno', // MODIFICA: dirección real
  city:     'Zaragoza, 50011',           // MODIFICA: ciudad y CP
  hours: [
    { days: 'Lunes a Viernes', time: '09:00 – 20:00' },
    { days: 'Sábados',         time: '09:00 – 14:00' },
    { days: 'Domingos',        time: 'Cerrado' },
  ],
  // URL de Google Maps embed — consíguela en Google Maps → Compartir → Incorporar mapa
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d...',  // MODIFICA
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
    // ─────────────────────────────────────────────────────────
    // FORMULARIO — aquí conectas tu servicio de email
    // Opciones recomendadas:
    //   - Formspree (gratis): cambia el action por tu endpoint de Formspree
    //   - EmailJS: envía desde el frontend sin backend
    //   - API Route de Next.js + Nodemailer: más control
    //
    // Ejemplo con Formspree:
    //   const res = await fetch('https://formspree.io/f/TUCODIGO', {
    //     method: 'POST',
    //     body: JSON.stringify(form),
    //     headers: { 'Content-Type': 'application/json' }
    //   })
    // ─────────────────────────────────────────────────────────
    await new Promise(r => setTimeout(r, 1200)) // simulación — quita esto en producción
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contacto" className="section-content py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── CABECERA */}
        <div ref={titleRef} className="text-center mb-20">
          <span className="font-body text-xs tracking-[0.3em] uppercase text-primary-500 mb-4 block">
            Estamos aquí para ti
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-light text-dark">
            Reserva tu <em className="italic">cita</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── FORMULARIO */}
          <div ref={formRef}>
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-20">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-primary-500 text-2xl">✓</span>
                </div>
                <h3 className="font-display text-3xl font-light text-dark mb-3">¡Mensaje enviado!</h3>
                <p className="font-body text-dark/60 text-sm">Nos pondremos en contacto contigo en menos de 24h.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nombre */}
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-dark/60 block mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text" name="name" required
                    value={form.name} onChange={handleChange}
                    className="w-full border border-nude-300 bg-transparent px-4 py-3 font-body text-sm text-dark placeholder-dark/30 focus:outline-none focus:border-primary-500 transition-colors"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Teléfono + Email */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-dark/60 block mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel" name="phone" required
                      value={form.phone} onChange={handleChange}
                      className="w-full border border-nude-300 bg-transparent px-4 py-3 font-body text-sm text-dark placeholder-dark/30 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="600 000 000"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs tracking-widest uppercase text-dark/60 block mb-2">
                      Email
                    </label>
                    <input
                      type="email" name="email"
                      value={form.email} onChange={handleChange}
                      className="w-full border border-nude-300 bg-transparent px-4 py-3 font-body text-sm text-dark placeholder-dark/30 focus:outline-none focus:border-primary-500 transition-colors"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                {/* Tratamiento de interés */}
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-dark/60 block mb-2">
                    Tratamiento de interés
                  </label>
                  <select name="treatment"
                    value={form.treatment} onChange={handleChange}
                    className="w-full border border-nude-300 bg-nude-50 px-4 py-3 font-body text-sm text-dark focus:outline-none focus:border-primary-500 transition-colors"
                  >
                    <option value="">Selecciona un tratamiento</option>
                    {/* MODIFICA: añade o quita opciones */}
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
                <div>
                  <label className="font-body text-xs tracking-widest uppercase text-dark/60 block mb-2">
                    Mensaje
                  </label>
                  <textarea name="message" rows={4}
                    value={form.message} onChange={handleChange}
                    className="w-full border border-nude-300 bg-transparent px-4 py-3 font-body text-sm text-dark placeholder-dark/30 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                    placeholder="¿Tienes alguna pregunta o preferencia de horario?"
                  />
                </div>

                <button type="submit" disabled={sending}
                  className="w-full font-body text-xs tracking-widest uppercase bg-primary-500 text-white py-4 hover:bg-primary-600 transition-colors duration-300 disabled:opacity-60"
                >
                  {sending ? 'Enviando...' : 'Enviar solicitud de cita'}
                </button>

                <p className="font-body text-xs text-dark/40 text-center">
                  Al enviar, aceptas nuestra{' '}
                  <a href="/privacidad" className="underline hover:text-primary-500">política de privacidad</a>. {/* MODIFICA: enlace real */}
                </p>
              </form>
            )}
          </div>

          {/* ── INFO DE CONTACTO */}
          <div ref={infoRef} className="space-y-10">

            {/* Datos */}
            <div>
              <h3 className="font-display text-2xl font-light text-dark mb-6">Encuéntranos</h3>
              <div className="space-y-4">
                <p className="font-body text-sm text-dark/70">
                  <span className="font-body text-xs tracking-widest uppercase text-dark block mb-0.5">Dirección</span>
                  {CONTACT_INFO.address}<br />{CONTACT_INFO.city}
                </p>
                <p className="font-body text-sm text-dark/70">
                  <span className="font-body text-xs tracking-widest uppercase text-dark block mb-0.5">Teléfono</span>
                  <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g,'')}`} className="hover:text-primary-500 transition-colors">
                    {CONTACT_INFO.phone}
                  </a>
                </p>
                <p className="font-body text-sm text-dark/70">
                  <span className="font-body text-xs tracking-widest uppercase text-dark block mb-0.5">Email</span>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary-500 transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Horarios */}
            <div>
              <h3 className="font-display text-2xl font-light text-dark mb-4">Horarios</h3>
              <div className="space-y-2">
                {CONTACT_INFO.hours.map(({ days, time }) => (
                  <div key={days} className="flex justify-between items-center py-2 border-b border-nude-200">
                    <span className="font-body text-xs tracking-wider uppercase text-dark/60">{days}</span>
                    <span className="font-body text-sm text-dark">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales — modifica los href con tus links reales */}
            <div>
              <h3 className="font-display text-2xl font-light text-dark mb-4">Síguenos</h3>
              <div className="flex gap-4">
                {[
                  { name: 'Instagram', href: 'https://instagram.com/tucentro' },  // MODIFICA
                  { name: 'Facebook',  href: 'https://facebook.com/tucentro' },   // MODIFICA
                ].map(({ name, href }) => (
                  <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                    className="font-body text-xs tracking-widest uppercase border border-nude-300 px-4 py-2 text-dark/70 hover:border-primary-500 hover:text-primary-500 transition-colors duration-300"
                  >
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
