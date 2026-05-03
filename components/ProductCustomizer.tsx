'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ShoppingBag, Check } from 'lucide-react'
import type { Product, ProductVariant } from '@/types/database'
import { useCartStore } from '@/lib/cartStore'

type Props = { product: Product }

export default function ProductCustomizer({ product }: Props) {
  const variants = product.product_variants
  const [active, setActive] = useState<ProductVariant>(variants[0])
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const currentPrice = product.base_price + active.price_modifier

  function handleAddToCart() {
    addItem({
      id: `${product.id}-${active.id}`,
      name: `${product.name} — ${active.color_name}`,
      price: currentPrice,
      image_url: product.image_url ?? '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      {/* ── Left: Product image + colour swatch panel ── */}
      <div className="flex flex-col gap-3">

        {/* Product photo */}
        <div className="relative aspect-square overflow-hidden bg-cream-200">
          {product.image_url && (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          )}
          {/* Category badge */}
          <div className="absolute top-4 left-4 bg-cream-50/90 backdrop-blur-sm text-[10px] font-sans tracking-[0.2em] uppercase text-stone-600 px-3 py-1.5">
            {product.category}
          </div>
        </div>

        {/* Colour preview chip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative h-14 overflow-hidden flex items-center px-5 gap-4"
            style={{ backgroundColor: active.hex_code }}
          >
            {/* Fabric texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 6px), repeating-linear-gradient(-45deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 6px)',
              }}
            />
            <div className="relative z-10 flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-white/30 border border-white/50" />
              <div>
                <p className="text-white text-xs font-sans font-medium leading-none">{active.color_name}</p>
                <p className="text-white/70 text-[10px] font-sans mt-0.5">{active.hex_code.toUpperCase()}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Right: Info + controls ── */}
      <div className="flex flex-col py-2">

        {product.material && (
          <p className="text-[10px] text-terracotta uppercase tracking-[0.3em] font-sans font-medium mb-4">
            {product.material}
          </p>
        )}

        <h1 className="font-display text-5xl text-stone-800 leading-tight mb-4">
          {product.name}
        </h1>

        <motion.p
          key={currentPrice}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl text-stone-700 mb-5"
        >
          ${currentPrice.toFixed(2)}
        </motion.p>

        <p className="text-stone-500 text-sm font-sans leading-relaxed mb-8">
          {product.description}
        </p>

        {/* Divider */}
        <div className="border-t border-stone-100 mb-6" />

        {/* Colour picker */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-stone-500">Colour</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active.color_name}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className="text-xs text-stone-400 font-sans"
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
                className={`relative w-8 h-8 rounded-full transition-transform focus:outline-none
                  ${active.id === variant.id ? 'scale-110' : 'hover:scale-105'}
                  disabled:opacity-30 disabled:cursor-not-allowed`}
                style={{ backgroundColor: variant.hex_code }}
              >
                {active.id === variant.id && (
                  <motion.span
                    layoutId="swatch-ring"
                    className="absolute inset-0 rounded-full ring-2 ring-offset-2 ring-stone-800"
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
          className={`text-xs font-sans font-medium mb-8 tracking-wide ${
            active.stock_status === 'in_stock'  ? 'text-emerald-600' :
            active.stock_status === 'low_stock' ? 'text-amber-500'   : 'text-red-400'
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
            className="flex-1 flex items-center justify-center gap-2.5 bg-stone-800 text-cream-50 py-4 text-[10px] font-sans tracking-[0.2em] uppercase hover:bg-terracotta transition-colors duration-300 disabled:opacity-50"
          >
            <motion.span
              key={added ? 'check' : 'bag'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2.5"
            >
              {added ? <Check size={14} strokeWidth={1.5} /> : <ShoppingBag size={14} strokeWidth={1.5} />}
              {added ? 'Added to bag' : 'Add to Bag'}
            </motion.span>
          </button>

          <button
            onClick={() => setWishlisted((w) => !w)}
            aria-label="Wishlist"
            className={`p-4 border transition-all duration-200 ${
              wishlisted
                ? 'bg-rose-50 border-rose-200 text-rose-500'
                : 'border-stone-200 text-stone-400 hover:border-terracotta hover:text-terracotta'
            }`}
          >
            <Heart size={16} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}
