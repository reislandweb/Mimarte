// ─────────────────────────────────────────────────────────────
// FOOTER — modifica los datos de tu clienta aquí
// ─────────────────────────────────────────────────────────────

const FOOTER_DATA = {
  name:    'MIMARTE & ESTETICA',                // MODIFICA: nombre del centro
  tagline: 'Tu bienestar, nuestra misión',   // MODIFICA: tagline
  address: 'C/ Ejemplo 00, Zaragoza', // MODIFICA
  phone:   '976 000 000',                    // MODIFICA
  email:   'info@tucentro.es',               // MODIFICA
  year:    new Date().getFullYear(),
  links: [
    { label: 'Política de privacidad', href: '/privacidad' },
    { label: 'Aviso legal',            href: '/aviso-legal' },
    { label: 'Cookies',                href: '/cookies' },
  ],
  socials: [
    { name: 'IG', href: 'https://www.instagram.com/mimarteestetica.zgz?igsh=d215b2hpOHBvNDJq' },  // MODIFICA
    { name: 'FB', href: 'https://facebook.com/tucentro' },   // MODIFICA
  ],
}

export default function Footer() {
  return (
    <footer className="section-content bg-dark text-white/60 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Marca */}
          <div>
            <p className="font-display text-3xl font-light text-white tracking-widest uppercase mb-3">
              {FOOTER_DATA.name}
            </p>
            <p className="font-body text-sm text-white/50 leading-relaxed">
              {FOOTER_DATA.tagline}
            </p>
          </div>

          {/* Contacto rápido */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-white mb-4">Contacto</p>
            <div className="space-y-2 font-body text-sm">
              <p>{FOOTER_DATA.address}</p>
              <a href={`tel:${FOOTER_DATA.phone.replace(/\s/g,'')}`}
                className="block hover:text-primary-400 transition-colors">
                {FOOTER_DATA.phone}
              </a>
              <a href={`mailto:${FOOTER_DATA.email}`}
                className="block hover:text-primary-400 transition-colors">
                {FOOTER_DATA.email}
              </a>
            </div>
          </div>

          {/* Navegación rápida */}
          <div>
            <p className="font-body text-xs tracking-widest uppercase text-white mb-4">Navegación</p>
            <div className="space-y-2">
              {['#inicio','#nosotros','#tratamientos','#indiba','#bonos','#productos','#contacto'].map(href => (
                <a key={href} href={href}
                  className="font-body text-sm block hover:text-primary-400 transition-colors capitalize">
                  {href.replace('#', '')}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-white/30">
            © {FOOTER_DATA.year} {FOOTER_DATA.name}. Todos los derechos reservados.
          </p>

          {/* Links legales */}
          <div className="flex gap-6">
            {FOOTER_DATA.links.map(({ label, href }) => (
              <a key={href} href={href}
                className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">
                {label}
              </a>
            ))}
          </div>

          {/* Redes */}
          <div className="flex gap-4">
            {FOOTER_DATA.socials.map(({ name, href }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                className="font-body text-xs tracking-widest border border-white/20 px-3 py-1.5 text-white/50 hover:border-primary-500 hover:text-primary-400 transition-colors">
                {name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
