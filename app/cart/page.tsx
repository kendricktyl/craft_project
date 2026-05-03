'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  async function handleCheckout() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed')
      window.location.href = data.url
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Checkout failed')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <p className="text-sm text-rose-400 uppercase tracking-widest font-sans font-bold mb-4">Your cart</p>
        <h1 className="font-display text-5xl text-cocoa mb-4">Nothing here yet</h1>
        <p className="text-lg text-cocoa/70 font-sans mb-10">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/products"
          className="inline-block bg-rose-300 hover:bg-rose-400 text-white text-base font-sans font-bold px-10 py-4 rounded-full shadow-cute transition-colors duration-300"
        >
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-sm text-rose-400 uppercase tracking-widest font-sans font-bold mb-3">Review your selection</p>
        <h1 className="font-display text-6xl text-cocoa">Your Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 p-5 bg-white rounded-2xl shadow-soft"
            >
              <div className="relative w-24 h-28 flex-shrink-0 bg-rose-50 rounded-xl overflow-hidden">
                <Image src={item.image_url} alt={item.name} fill className="object-cover" sizes="96px" unoptimized />
              </div>

              <div className="flex flex-col flex-1 min-w-0 py-1">
                <h2 className="font-display text-xl text-cocoa truncate">{item.name}</h2>
                <p className="text-base text-cocoa/70 font-sans font-semibold mt-1">${item.price}</p>

                <div className="flex items-center gap-3 mt-auto">
                  <label className="text-sm text-cocoa/70 font-sans font-semibold">Qty</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    className="text-base bg-rose-50 border border-rose/20 rounded-full px-4 py-1.5 text-cocoa font-sans font-semibold focus:outline-none focus:border-rose-400 transition-colors cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between py-1 shrink-0">
                <p className="font-display text-xl text-cocoa">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 rounded-full text-cocoa/40 hover:text-rose-400 hover:bg-rose-50 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-rose-50 p-8 rounded-2xl shadow-soft h-fit">
          <h2 className="font-display text-3xl text-cocoa mb-6">Order Summary</h2>
          <div className="space-y-4 text-base font-sans text-cocoa mb-8">
            <div className="flex justify-between">
              <span className="text-cocoa/70">Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-cocoa/70">Shipping</span>
              <span className="text-cocoa/50 text-sm">At checkout</span>
            </div>
            <div className="border-t border-rose/20 pt-4 flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-display text-2xl">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          {error && (
            <p className="text-sm text-rose-400 font-sans font-semibold mb-4 text-center">
              {error}
            </p>
          )}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-rose-300 hover:bg-rose-400 text-white text-base font-sans font-bold py-5 rounded-full shadow-cute transition-colors duration-300 disabled:opacity-60"
          >
            {loading ? 'Redirecting…' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  )
}
