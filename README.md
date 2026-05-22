# Belleza Web — Boilerplate

Stack: **Next.js 14 + JavaScript + Tailwind CSS + GSAP + Three.js + Lenis**

---

## Arrancar el proyecto

```bash
npm install
npm run dev
# Abre http://localhost:3000
```

## Subir a Hostinger

```bash
npm run build
# Se genera la carpeta /out con HTML estático puro
# Sube el contenido de /out a public_html en Hostinger
```

---

## Dónde tocar cada cosa

### Colores y fuentes
→ `tailwind.config.js` — paleta completa (primary, nude, dark)
→ `src/app/globals.css` — variables CSS
→ `src/app/layout.js` — cambiar fuentes de Google Fonts

### Animaciones 3D (partículas)
→ `src/components/ui/ThreeBackground.js`
- `PARTICLE_COUNT` — número de partículas
- `PARTICLE_SIZE` — tamaño de cada punto
- `COLORS` — colores por sección
- Funciones `generate*Positions()` — forma de cada estado

### Textos y contenido
→ `src/components/sections/Hero.js` — título, claim, botones
→ `src/components/sections/About.js` — descripción y stats
→ `src/components/sections/Treatments.js` — array `CATEGORIES`
→ `src/components/sections/Indiba.js` — beneficios y textos
→ `src/components/sections/Bonos.js` — array `BONOS` con precios
→ `src/components/sections/Products.js` — array `PRODUCTS`
→ `src/components/sections/Contact.js` — objeto `CONTACT_INFO`
→ `src/components/ui/Footer.js` — objeto `FOOTER_DATA`

### Menú de navegación
→ `src/components/ui/Navbar.js` — array `LINKS`

### SEO
→ `src/app/layout.js` — objeto `metadata`

### Imágenes
Pon todas las fotos en `/public/images/`:
- `hero-bg.jpg` — fondo del Hero (1920x1080px mínimo)
- `about.jpg` — foto de nosotros (ratio 3:4)
- `facial.jpg`, `corporal.jpg`, `laser.jpg`, `estetica.jpg` — tratamientos
- `indiba.jpg` — sección Indiba
- `product-1.jpg` a `product-4.jpg` — productos

### Formulario de contacto
→ `src/components/sections/Contact.js` — función `handleSubmit`
Integra Formspree, EmailJS o una API Route de Next.js

---

## Estructura de carpetas

```
src/
├── app/
│   ├── layout.js        ← fuentes, SEO, SmoothScroll
│   ├── page.js          ← composición de todas las secciones
│   └── globals.css      ← estilos globales
├── components/
│   ├── ui/
│   │   ├── ThreeBackground.js  ← escena 3D (THREE.js + GSAP)
│   │   ├── SmoothScroll.js     ← Lenis scroll suave
│   │   ├── Navbar.js           ← menú de navegación
│   │   ├── CustomCursor.js     ← cursor personalizado
│   │   └── Footer.js           ← pie de página
│   └── sections/
│       ├── Hero.js
│       ├── About.js
│       ├── Treatments.js
│       ├── Indiba.js
│       ├── Bonos.js
│       ├── Products.js
│       └── Contact.js
└── hooks/
    └── useScrollReveal.js  ← hook reutilizable para animaciones de scroll
```
