'use client'

import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'

export default function Navbar() {
  const itemCount = useCartStore((s) => s.items.reduce((acc, i) => acc + i.quantity, 0))

  return (
    <header className="border-b border-stone-200/60 bg-cream-50/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">

          {/* Left nav */}
          <nav className="flex items-center gap-7">
            <Link
              href="/"
              className="text-[10px] text-stone-500 hover:text-stone-800 tracking-[0.25em] uppercase font-sans transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-[10px] text-stone-500 hover:text-stone-800 tracking-[0.25em] uppercase font-sans transition-colors duration-200"
            >
              Shop
            </Link>
          </nav>

          {/* Center logo */}
          <div className="flex justify-center">
            <Link
              href="/"
              className="font-display text-[1.6rem] text-stone-800 tracking-[0.18em] hover:text-terracotta transition-colors duration-300 select-none"
            >
              Craft
            </Link>
          </div>

          {/* Right: cart */}
          <div className="flex items-center justify-end">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors duration-200 group"
              aria-label="Cart"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.25em] uppercase hidden sm:block group-hover:text-stone-800 transition-colors">
                Cart
              </span>
              {itemCount > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-terracotta text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-sans font-medium tabular-nums leading-none">
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
