export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category: string
}

export const PLACEHOLDER_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ceramic Mug',
    description: 'Handcrafted ceramic mug with a smooth matte glaze. Holds 12oz and is dishwasher safe. Each piece is unique with slight natural variations.',
    price: 28,
    image_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80',
    category: 'Kitchen',
  },
  {
    id: '2',
    name: 'Linen Tote Bag',
    description: 'Sturdy natural linen tote with reinforced handles. Perfect for groceries, the beach, or everyday errands. Folds flat for easy storage.',
    price: 42,
    image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&q=80',
    category: 'Accessories',
  },
  {
    id: '3',
    name: 'Beeswax Candle',
    description: 'Pure beeswax pillar candle with a clean honey scent. Burns for 40+ hours with minimal soot. Hand-poured in small batches.',
    price: 18,
    image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&q=80',
    category: 'Home',
  },
  {
    id: '4',
    name: 'Walnut Cutting Board',
    description: 'End-grain walnut cutting board that is gentle on knife edges. Oiled with food-safe mineral oil. Measures 12" × 9" × 1.5".',
    price: 85,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80',
    category: 'Kitchen',
  },
  {
    id: '5',
    name: 'Merino Wool Scarf',
    description: 'Lightweight merino wool scarf in a natural undyed colorway. Soft enough to wear against bare skin. 70" × 12".',
    price: 64,
    image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&q=80',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Pressed Flower Print',
    description: 'Archival giclée print of a botanically arranged pressed flower composition. Printed on 100% cotton rag paper. 8" × 10", unframed.',
    price: 36,
    image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=600&q=80',
    category: 'Art',
  },
]
