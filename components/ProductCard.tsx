'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Product, ProductVariant } from '@/types/database'

function variantImage(product: Product, variant: ProductVariant) {
  return variant.image_url
    ?? product.image_url
    ?? `https://picsum.photos/seed/craft-${variant.id}/900/900`
}

export default function ProductCard({ product }: { product: Product }) {
  const variants = product.product_variants ?? []
  const [active, setActive] = useState<ProductVariant | undefined>(variants[0])
  const image = active ? variantImage(product, active) : product.image_url

  return (
    <div className="group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] bg-rose-50 overflow-hidden rounded-2xl mb-4 shadow-soft">
          <AnimatePresence mode="wait">
            <motion.div
              key={active?.id ?? 'base'}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0"
            >
              {image && (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Link>

      <div className="px-1">
        {product.category && (
          <p className="text-xs text-rose-400 uppercase tracking-widest font-sans font-bold mb-1">
            {product.category}
          </p>
        )}
        <Link href={`/products/${product.id}`}>
          <h2 className="font-display text-2xl text-cocoa group-hover:text-rose-400 transition-colors duration-200 leading-tight">
            {product.name}
          </h2>
        </Link>
        <p className="text-base text-cocoa/70 font-sans font-semibold mt-1">${product.base_price}</p>

        {variants.length > 0 && (
          <div className="flex gap-2 mt-4 flex-wrap">
            {variants.slice(0, 6).map((v) => (
              <button
                key={v.id}
                onClick={(e) => {
                  e.preventDefault()
                  setActive(v)
                }}
                title={v.color_name}
                aria-label={v.color_name}
                className={`relative w-7 h-7 rounded-full transition-transform shadow-soft
                  ${active?.id === v.id ? 'scale-110 ring-2 ring-rose-400 ring-offset-2 ring-offset-cream' : 'hover:scale-110'}`}
                style={{ backgroundColor: v.hex_code }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
