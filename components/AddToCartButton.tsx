'use client'

import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/lib/cartStore'
import type { Product } from '@/lib/placeholder'

type Props = {
  product: Product
  size?: 'sm' | 'lg'
}

export default function AddToCartButton({ product, size = 'sm' }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <button
      onClick={() =>
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
        })
      }
      className={`flex items-center justify-center gap-2 w-full bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors ${
        size === 'lg' ? 'py-3 px-6 text-sm' : 'py-2 px-4 text-xs'
      }`}
    >
      <ShoppingCart size={size === 'lg' ? 18 : 14} />
      Add to Cart
    </button>
  )
}
