export type ProductVariant = {
  id: string
  product_id: string
  color_name: string
  hex_code: string
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock'
  stock_count: number
  price_modifier: number
  image_url: string | null
  created_at: string
}

export type Product = {
  id: string
  name: string
  description: string | null
  base_price: number
  image_url: string | null
  category: string | null
  material: string | null
  created_at: string
  product_variants: ProductVariant[]
}
