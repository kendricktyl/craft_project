import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'

export const revalidate = 60

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <p className="text-sm text-rose-400 uppercase tracking-widest font-sans font-bold mb-4">
          Handmade fiber arts
        </p>
        <h1 className="font-display text-6xl md:text-7xl text-cocoa mb-4">
          Our Collection
        </h1>
        <p className="text-lg text-cocoa/70 font-sans max-w-xl mx-auto">
          Soft, sweet, and stitched with love. Pick a colour you love and we&apos;ll make it for you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {(products ?? []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {(products ?? []).length === 0 && (
        <div className="py-24 text-center">
          <p className="font-display text-3xl text-cocoa/60 italic">No products yet.</p>
          <p className="text-base text-cocoa/50 font-sans mt-2">
            Check back soon — new pieces are always in progress.
          </p>
        </div>
      )}
    </div>
  )
}
