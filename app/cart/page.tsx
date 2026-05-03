'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-[10px] text-terracotta uppercase tracking-[0.3em] font-sans mb-6">Your cart</p>
        <h1 className="font-display text-4xl text-stone-700 italic font-light mb-4">Nothing here yet.</h1>
        <p className="text-sm text-stone-400 font-sans mb-10">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-block bg-stone-800 text-cream-50 text-[10px] font-sans tracking-[0.2em] uppercase px-10 py-4 hover:bg-terracotta transition-colors duration-300"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="pb-8 border-b border-stone-200/60 mb-12">
        <p className="text-[10px] text-terracotta uppercase tracking-[0.3em] font-sans mb-3">Review your selection</p>
        <h1 className="font-display text-5xl text-stone-800">Your Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Line items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 pb-6 border-b border-stone-100 last:border-b-0"
            >
              {/* Image */}
              <div className="relative w-20 h-24 flex-shrink-0 bg-cream-200 overflow-hidden">
                <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="80px" />
              </div>

              {/* Details */}
              <div className="flex flex-col flex-1 min-w-0 py-0.5">
                <h2 className="text-sm font-sans font-medium text-stone-800 truncate">{item.name}</h2>
                <p className="text-xs text-stone-400 font-sans mt-1">${item.price}</p>

                <div className="flex items-center gap-3 mt-auto">
                  <label className="text-[10px] text-stone-400 font-sans uppercase tracking-widest">Qty</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="text-xs border border-stone-200 bg-cream-50 px-2 py-1 text-stone-700 font-sans focus:outline-none focus:border-terracotta transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price + remove */}
              <div className="flex flex-col items-end justify-between py-0.5 shrink-0">
                <p className="text-sm font-sans font-medium text-stone-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-stone-300 hover:text-terracotta transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-cream-100 p-8 h-fit">
          <h2 className="font-display text-2xl text-stone-800 mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm font-sans text-stone-600 mb-6">
            <div className="flex justify-between">
              <span className="text-stone-500">Subtotal</span>
              <span className="text-stone-800 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Shipping</span>
              <span className="text-stone-400 text-xs">Calculated at checkout</span>
            </div>
            <div className="border-t border-stone-200 pt-3 flex justify-between">
              <span className="font-medium text-stone-800">Total</span>
              <span className="font-medium text-stone-800">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-stone-800 text-cream-50 text-[10px] font-sans tracking-[0.2em] uppercase py-4 hover:bg-terracotta transition-colors duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
