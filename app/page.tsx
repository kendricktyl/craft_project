import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

const CATEGORIES = [
  { key: 'Crochet Toy',    label: 'Crochet Toys',    tagline: 'Amigurumi & plushies' },
  { key: 'Crochet Flower', label: 'Crochet Flowers',  tagline: 'Wearable & decorative blooms' },
  { key: 'Sewing',         label: 'Sewn Clothes',     tagline: 'Handstitched garments & separates' },
]

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false })

  const byCategory = (cat: string) =>
    (products ?? []).filter((p) => p.category === cat)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-cream-100 overflow-hidden grain">
        {/* Decorative background letter */}
        <span
          aria-hidden="true"
          className="absolute right-[-2rem] top-1/2 -translate-y-1/2 font-display font-light text-[22rem] leading-none text-cream-200 select-none pointer-events-none hidden lg:block"
        >
          C
        </span>

        {/* Vertical rule accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-terracotta/30 hidden lg:block" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-36 z-10">
          {/* Overline */}
          <p className="text-[10px] text-terracotta uppercase tracking-[0.35em] font-sans font-medium mb-10">
            Handmade · One of a kind
          </p>

          {/* Headline */}
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-stone-800 leading-[0.92] mb-12 max-w-2xl">
            <span className="block">Crafted</span>
            <span className="block italic font-light text-terracotta">with care,</span>
            <span className="block">made to</span>
            <span className="block">cherish.</span>
          </h1>

          {/* Sub-copy + CTA */}
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <Link
              href="/products"
              className="inline-block bg-stone-800 text-cream-50 text-[10px] font-sans tracking-[0.2em] uppercase px-10 py-4 hover:bg-terracotta transition-colors duration-300 shrink-0"
            >
              Shop All
            </Link>
            <p className="text-sm text-stone-500 font-sans leading-relaxed max-w-xs pt-1">
              Crochet toys, delicate flowers, and handstitched clothes — every piece made slowly and with intention.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider strip ── */}
      <div className="bg-terracotta py-3 flex items-center justify-center gap-8 overflow-hidden">
        {['Handmade', '·', 'One of a kind', '·', 'Made to cherish', '·', 'Fiber arts', '·', 'Handmade', '·', 'One of a kind', '·', 'Made to cherish', '·', 'Fiber arts'].map((word, i) => (
          <span key={i} className="text-cream-50 text-[9px] tracking-[0.3em] uppercase font-sans whitespace-nowrap shrink-0">
            {word}
          </span>
        ))}
      </div>

      {/* ── Category sections ── */}
      {CATEGORIES.map((cat, catIdx) => {
        const items = byCategory(cat.key).slice(0, 3)
        if (items.length === 0) return null

        return (
          <section
            key={cat.key}
            className={`py-20 ${catIdx % 2 === 1 ? 'bg-cream-100/50' : ''}`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Section header */}
              <div className="flex items-end justify-between mb-10 pb-5 border-b border-stone-200/60">
                <div>
                  <p className="text-[10px] text-terracotta uppercase tracking-[0.3em] font-sans font-medium mb-2">
                    {cat.tagline}
                  </p>
                  <h2 className="font-display text-4xl text-stone-800">{cat.label}</h2>
                </div>
                <Link
                  href="/products"
                  className="text-[10px] text-stone-400 hover:text-terracotta tracking-[0.2em] uppercase font-sans transition-colors hidden sm:block"
                >
                  View all →
                </Link>
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((product) => {
                  const firstVariant = product.product_variants?.[0]
                  return (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group block"
                    >
                      {/* Image container */}
                      <div className="relative aspect-[4/5] bg-cream-200 overflow-hidden mb-4">
                        {product.image_url && (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-500 pointer-events-none" />

                        {/* Color swatches */}
                        {product.product_variants?.length > 0 && (
                          <div className="absolute bottom-3 left-3 flex gap-1.5">
                            {product.product_variants.slice(0, 4).map((v: { id: string; hex_code: string; color_name: string }) => (
                              <span
                                key={v.id}
                                title={v.color_name}
                                className="w-3.5 h-3.5 rounded-full border border-white/80 shadow-sm"
                                style={{ backgroundColor: v.hex_code }}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-sans font-medium text-stone-800 group-hover:text-terracotta transition-colors duration-200">
                            {product.name}
                          </h3>
                          <p className="text-xs text-stone-400 font-sans mt-0.5">${product.base_price}</p>
                        </div>
                        {firstVariant && (
                          <span
                            className="w-4 h-4 rounded-full border border-stone-200 shrink-0 mt-0.5"
                            style={{ backgroundColor: firstVariant.hex_code }}
                          />
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      {/* ── Bottom CTA ── */}
      <section className="bg-stone-800 py-24 grain">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] text-terracotta uppercase tracking-[0.35em] font-sans mb-6">Browse the full collection</p>
          <h2 className="font-display text-5xl text-cream-50 italic font-light mb-10">
            Every piece, one of a kind.
          </h2>
          <Link
            href="/products"
            className="inline-block border border-cream-200/40 text-cream-100 text-[10px] font-sans tracking-[0.2em] uppercase px-10 py-4 hover:bg-terracotta hover:border-terracotta transition-all duration-300"
          >
            Shop All Products
          </Link>
        </div>
      </section>
    </>
  )
}
