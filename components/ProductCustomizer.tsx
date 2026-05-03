'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import type { Product, ProductVariant } from '@/types/database'
import { useCartStore } from '@/lib/cartStore'

type Props = { product: Product }

function variantImage(product: Product, variant: ProductVariant) {
  return variant.image_url
    ?? product.image_url
    ?? `https://picsum.photos/seed/craft-${variant.id}/900/900`
}

export default function ProductCustomizer({ product }: Props) {
  const variants = product.product_variants
  const [active, setActive] = useState<ProductVariant>(variants[0])
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const currentPrice = product.base_price + active.price_modifier
  const currentImage = variantImage(product, active)

  function handleAddToCart() {
    addItem({
      id: `${product.id}-${active.id}`,
      name: `${product.name} — ${active.color_name}`,
      price: currentPrice,
      image_url: currentImage,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      {/* ── Image with crossfade swap ── */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-rose-50 shadow-cute">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={`${product.name} — ${active.color_name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          </motion.div>
        </AnimatePresence>
        {product.category && (
          <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur-sm text-xs font-sans font-semibold tracking-wide uppercase text-cocoa px-4 py-2 rounded-full shadow-soft">
            {product.category}
          </div>
        )}
      </div>

      {/* ── Info + controls ── */}
      <div className="flex flex-col py-2">
        {product.material && (
          <p className="text-sm text-rose-400 uppercase tracking-widest font-sans font-bold mb-4">
            {product.material}
          </p>
        )}

        <h1 className="font-display text-5xl md:text-6xl text-cocoa leading-tight mb-5">
          {product.name}
        </h1>

        <motion.p
          key={currentPrice}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl text-rose-400 mb-6"
        >
          ${currentPrice.toFixed(2)}
        </motion.p>

        <p className="text-cocoa/70 text-base font-sans leading-relaxed mb-8">
          {product.description}
        </p>

        <div className="border-t border-rose/20 mb-6" />

        {/* Colour picker */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-sans font-bold uppercase tracking-wider text-cocoa">Colour</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.color_name}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="text-base text-cocoa/70 font-sans font-medium"
              >
                {active.color_name}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setActive(variant)}
                disabled={variant.stock_status === 'out_of_stock'}
                title={variant.color_name}
                aria-label={variant.color_name}
                className={`relative w-11 h-11 rounded-full transition-transform focus:outline-none
                  ${active.id === variant.id ? 'scale-110' : 'hover:scale-105'}
                  disabled:opacity-30 disabled:cursor-not-allowed shadow-soft`}
                style={{ backgroundColor: variant.hex_code }}
              >
                {active.id === variant.id && (
                  <motion.span
                    layoutId="swatch-ring"
                    className="absolute -inset-1.5 rounded-full ring-2 ring-rose-400"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Stock status */}
        <motion.p
          key={active.stock_status}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-base font-sans font-semibold mb-8 ${
            active.stock_status === 'in_stock'  ? 'text-sage-400' :
            active.stock_status === 'low_stock' ? 'text-amber-500' : 'text-rose-400'
          }`}
        >
          {active.stock_status === 'in_stock'     && '✓ In stock'}
          {active.stock_status === 'low_stock'    && `⚡ Only ${active.stock_count} left — order soon`}
          {active.stock_status === 'out_of_stock' && '✗ Out of stock'}
        </motion.p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            disabled={active.stock_status === 'out_of_stock' || added}
            className="flex-1 flex items-center justify-center gap-3 bg-rose-300 hover:bg-rose-400 text-white py-5 px-6 rounded-full text-base font-sans font-bold uppercase tracking-wider transition-colors duration-300 disabled:opacity-50 shadow-cute"
          >
            <motion.span
              key={added ? 'check' : 'bag'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-3"
            >
              {added ? <Check size={18} strokeWidth={2.5} /> : <ShoppingBag size={18} strokeWidth={2.5} />}
              {added ? 'Added to bag' : 'Add to Bag'}
            </motion.span>
          </button>

          <button
            onClick={() => setWishlisted((w) => !w)}
            aria-label="Wishlist"
            className={`p-5 rounded-full transition-all duration-200 shadow-soft ${
              wishlisted
                ? 'bg-rose-300 text-white'
                : 'bg-white text-rose-300 hover:bg-rose-50'
            }`}
          >
            <Heart size={20} strokeWidth={2} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}
