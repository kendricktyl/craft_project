import type { Metadata } from 'next'
import { Nunito, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Craft — Handmade with love',
  description: 'Handmade crochet toys, delicate flowers, and sewn clothes — every piece made slowly and with intention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${playfair.variable} bg-cream text-cocoa antialiased font-sans text-base`}>
        <Navbar />
        <main>{children}</main>
        <footer className="mt-24 py-16 border-t border-rose/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-4xl text-cocoa mb-3">Craft</p>
            <p className="text-sm text-cocoa/60 font-sans">
              Handmade with love · Every piece one of a kind
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
