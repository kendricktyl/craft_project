'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'

export default function Navbar() {
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-rose/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-20">
          <nav className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-base text-cocoa hover:text-rose-400 font-sans font-semibold transition-colors duration-200"
            >
              Shop
            </Link>
          </nav>

          <div className="flex justify-center">
            <Link
              href="/products"
              className="font-display text-3xl text-cocoa hover:text-rose-400 transition-colors duration-300 select-none"
            >
              Craft
            </Link>
          </div>

          <div className="flex items-center justify-end">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-100 text-cocoa hover:bg-rose-200 font-sans font-semibold transition-colors duration-200"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={2.2} />
              <span className="hidden sm:block">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-xs rounded-full min-w-5 h-5 px-1.5 flex items-center justify-center font-sans font-bold tabular-nums leading-none shadow-soft">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
