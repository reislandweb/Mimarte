import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/ui/SmoothScroll'

// ─────────────────────────────────────────────────────────────
// FUENTES — para cambiar las fuentes, modifica aquí
// Opciones elegantes para display: Playfair Display, Libre Baskerville, Lora
// Opciones para body: Inter, Outfit, Nunito
// ─────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
})

// ─────────────────────────────────────────────────────────────
// SEO METADATA — modifica aquí los textos que ve Google
// ─────────────────────────────────────────────────────────────
export const metadata = {
  title: 'Mimarte Estética | Bienestar facial y corporal Zaragoza',
  description: 'Centro de estética en Zaragoza. Tratamientos faciales, corporales, Indiba, depilación láser y más.',
  keywords: ['centro de belleza', 'estética Zaragoza', 'tratamientos faciales', 'Indiba', 'depilación láser'],
  openGraph: {
    title: 'Centro de Belleza y Salud | Zaragoza',
    description: 'Centro de estética en Zaragoza. Tratamientos faciales, corporales, Indiba y más.',
    locale: 'es_ES',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-nude-50 text-dark antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
