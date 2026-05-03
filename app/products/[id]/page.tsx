import { notFound } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ProductCustomizer from '@/components/ProductCustomizer'

export const revalidate = 60

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: product, error } = await supabase
    .from('products')
    .select('*, product_variants(*)')
    .eq('id', id)
    .single()

  if (error || !product || product.product_variants.length === 0) notFound()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-2 mb-10 text-sm font-sans font-semibold text-cocoa/60">
        <Link href="/products" className="hover:text-rose-400 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-cocoa">{product.name}</span>
      </div>
      <ProductCustomizer product={product} />
    </div>
  )
}
