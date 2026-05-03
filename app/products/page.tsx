import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export const revalidate = 60

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <div className="pb-8 border-b border-stone-200/60 mb-12">
        <p className="text-[10px] text-terracotta uppercase tracking-[0.3em] font-sans mb-3">
          Handmade fiber arts
        </p>
        <h1 className="font-display text-5xl text-stone-800">Collection</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
        {(products ?? []).map((product) => {
          const firstVariant = product.product_variants?.[0]

          return (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group block"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] bg-cream-200 overflow-hidden mb-4">
                {product.image_url && (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                {/* Color hint on hover */}
                {firstVariant && (
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundColor: firstVariant.hex_code,
                      mixBlendMode: 'multiply',
                    }}
                  />
                )}
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
                  <p className="text-[10px] text-terracotta uppercase tracking-[0.2em] font-sans mb-1">
                    {product.category}
                  </p>
                  <h2 className="text-sm font-sans font-medium text-stone-800 group-hover:text-terracotta transition-colors duration-200">
                    {product.name}
                  </h2>
                  <p className="text-xs text-stone-400 font-sans mt-1">${product.base_price}</p>
                </div>
                {firstVariant && (
                  <span
                    className="w-4 h-4 rounded-full border border-stone-200 shrink-0 mt-1"
                    style={{ backgroundColor: firstVariant.hex_code }}
                  />
                )}
              </div>
            </Link>
          )
        })}
      </div>

      {(products ?? []).length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-stone-400 italic">No products yet.</p>
          <p className="text-sm text-stone-400 font-sans mt-2">Check back soon — new pieces are always in progress.</p>
        </div>
      )}
    </div>
  )
}
