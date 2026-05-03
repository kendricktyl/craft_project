import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Craft — Handmade with care',
  description: 'Handmade crochet toys, delicate flowers, and sewn clothes — every piece made slowly and with intention.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${dmSans.variable} bg-cream-50 text-stone-800 antialiased font-sans`}>
        <Navbar />
        <main>{children}</main>
        <footer className="border-t border-stone-200/60 mt-24 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-display text-3xl text-stone-700 tracking-[0.12em] mb-3">Craft</p>
            <p className="text-[10px] text-stone-400 tracking-[0.3em] uppercase font-sans">
              Handmade with care · Every piece one of a kind
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
