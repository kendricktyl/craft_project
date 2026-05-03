'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'

export default function OrderConfirmationPage() {
  const clearCart = useCartStore((s) => s.clearCart)

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16 }}
        className="w-24 h-24 mx-auto mb-8 rounded-full bg-sage-300 flex items-center justify-center shadow-cute"
      >
        <Check size={44} strokeWidth={3} className="text-white" />
      </motion.div>

      <p className="text-sm text-rose-400 uppercase tracking-widest font-sans font-bold mb-4">
        Order placed
      </p>
      <h1 className="font-display text-6xl text-cocoa mb-5">Thank you!</h1>
      <p className="text-lg text-cocoa/70 font-sans leading-relaxed mb-10 max-w-md mx-auto">
        Your order is in the basket. We&apos;ll start stitching it up and send you a confirmation
        email with the details soon.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/products"
          className="inline-block bg-rose-300 hover:bg-rose-400 text-white text-base font-sans font-bold px-10 py-4 rounded-full shadow-cute transition-colors duration-300"
        >
          Keep Shopping
        </Link>
        <Link
          href="/"
          className="inline-block bg-white hover:bg-rose-50 text-cocoa text-base font-sans font-bold px-10 py-4 rounded-full shadow-soft transition-colors duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
