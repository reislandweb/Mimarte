/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // ─────────────────────────────────────────────
        // COLORES PRINCIPALES — modifica aquí para cambiar toda la paleta
        // primary: color de acento (botones, detalles, hover)
        // nude: tonos cálidos de fondo y texto suave
        // dark: color del texto principal
        // ─────────────────────────────────────────────
        primary: {
          100: '#faeadc',
          200: '#f3d0b5',
          300: '#e8ad80',
          400: '#dc8449',
          500: '#d4693a', // <-- COLOR PRINCIPAL, cámbialo aquí
          600: '#c5572e',
          700: '#a44227',
        },
        nude: {
          50:  '#faf7f4',
          100: '#f3ede6',
          200: '#e6d9cc',
          300: '#d4bfac',
          400: '#bc9e87',
          500: '#a98470',
          600: '#9b7362',
          900: '#2a201c',
        },
        // Color del texto principal
        dark: '#1a1614',
      },
      fontFamily: {
        // Fuentes cargadas en layout.js con next/font
        display: ['var(--font-display)', 'serif'],
        body:    ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
