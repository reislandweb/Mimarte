/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // La paleta elegante y orgánica de Mimarte Estética
        background: "#FDFBF7", // Crema/Lino suave de fondo
        foreground: "#2F2E2C", // Gris oscuro/Marrón suave para los textos principales
        
        primary: {
          DEFAULT: "#C39A83", // El rosa empolvado/terracota suave corporativo de los botones/detalles
          light: "#E6C5B3",   // Una variante más clarita para hovers o fondos suaves
          dark: "#A37861",    // Variante más oscura para textos sobre fondos claros
        },
        accent: {
          DEFAULT: "#D4A373", // Tono arena/dorado suave secundario
          light: "#FAEDCD",
        },
        cardBg: "#FFFFFF",    // Fondo blanco puro para que resalten las tarjetas sobre el crema del fondo
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};