import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProductCustomizer from '@/components/ProductCustomizer'

/*
  How this page works (the key pattern for your hackathon):

  1. This is a SERVER component — it runs on the server, not in the browser.
  2. It fetches data from Supabase (your database).
  3. It passes that data DOWN to ProductCustomizer, which is a CLIENT component.
  4. The client component handles all the interactivity (clicking swatches, etc.)

  This is the "server fetches → client interacts" pattern you'll use everywhere,
  including with AI: server calls Claude API → passes response to a client component.
*/

export const revalidate = 60 // re-fetch from Supabase at most every 60s

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', params.id)
    .single()

  if (error || !product || product.product_variants.length === 0) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-12 text-[10px] font-sans tracking-[0.2em] uppercase text-stone-400">
        <a href="/" className="hover:text-terracotta transition-colors">Home</a>
        <span>/</span>
        <a href="/products" className="hover:text-terracotta transition-colors">Shop</a>
        <span>/</span>
        <span className="text-stone-500">{product.name}</span>
      </div>
      <ProductCustomizer product={product} />
    </div>
  )
}
