import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { MasjidProvider } from '@/contexts/MasjidContext'
import { SiteShell } from '@/components/layout/SiteShell'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta-next',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: 'variable',
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-serif-next',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono-next',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Suffolk Muslim Society — Serving Ipswich & Suffolk',
  description: 'Salah times, weekly classes, events and funeral support across the four Ipswich masaajid.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${sourceSerif.variable} ${jetbrains.variable}`}>
      <body>
        <MasjidProvider>
          <SiteShell>{children}</SiteShell>
        </MasjidProvider>
      </body>
    </html>
  )
}
