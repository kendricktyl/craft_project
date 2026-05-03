-- ============================================================
-- Craft Marketplace v2 — Fiber Arts Schema
-- Paste this into Supabase SQL Editor and click Run.
-- This replaces your previous schema — safe to run fresh.
-- ============================================================

-- Drop old tables if re-running
drop table if exists order_items cascade;
drop table if exists orders cascade;
drop table if exists wishlists cascade;
drop table if exists product_variants cascade;
drop table if exists products cascade;

-- Products
create table products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  base_price  numeric(10, 2) not null,
  image_url   text,
  category    text,
  material    text,
  created_at  timestamptz default now()
);

-- Color / size variants per product
create table product_variants (
  id             uuid primary key default gen_random_uuid(),
  product_id     uuid references products(id) on delete cascade,
  color_name     text not null,
  hex_code       text not null,
  stock_status   text not null default 'in_stock'
                   check (stock_status in ('in_stock', 'low_stock', 'out_of_stock')),
  stock_count    integer default 10,
  price_modifier numeric(10, 2) default 0,
  created_at     timestamptz default now()
);

-- Orders
create table orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete set null,
  total      numeric(10, 2) not null,
  status     text not null default 'pending',
  created_at timestamptz default now()
);

-- Order line items
create table order_items (
  id                uuid primary key default gen_random_uuid(),
  order_id          uuid references orders(id) on delete cascade,
  product_id        uuid references products(id) on delete set null,
  variant_id        uuid references product_variants(id) on delete set null,
  quantity          integer not null check (quantity > 0),
  price_at_purchase numeric(10, 2) not null
);

-- Wishlist (requires Supabase Auth)
create table wishlists (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users(id) on delete cascade,
  product_id uuid references products(id) on delete cascade,
  created_at timestamptz default now(),
  unique (user_id, product_id)
);

-- ============================================================
-- Row Level Security
-- ============================================================
alter table products         enable row level security;
alter table product_variants enable row level security;
alter table orders           enable row level security;
alter table order_items      enable row level security;
alter table wishlists        enable row level security;

create policy "Products are public"
  on products for select using (true);

create policy "Variants are public"
  on product_variants for select using (true);

create policy "Users see own orders"
  on orders for select using (auth.uid() = user_id);

create policy "Users insert own orders"
  on orders for insert with check (auth.uid() = user_id);

create policy "Users see own order items"
  on order_items for select
  using (exists (
    select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()
  ));

create policy "Users insert own order items"
  on order_items for insert
  with check (exists (
    select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()
  ));

create policy "Users manage own wishlist"
  on wishlists for all using (auth.uid() = user_id);

-- ============================================================
-- Seed data — Crochet Toys, Crochet Flowers, Sewing Clothes
-- ============================================================
do $$
declare
  t1 uuid; t2 uuid;   -- Crochet Toys
  f1 uuid; f2 uuid;   -- Crochet Flowers
  s1 uuid; s2 uuid;   -- Sewing
begin

  -- ── Crochet Toys ──────────────────────────────────────────
  insert into products (id, name, description, base_price, image_url, category, material)
  values (gen_random_uuid(),
    'Amigurumi Teddy Bear',
    'A chubby, huggable teddy bear crocheted stitch by stitch in soft cotton yarn. Stuffed with hypoallergenic fiberfill. Safe for all ages — no plastic parts.',
    38, 'https://images.unsplash.com/photo-1559181567-c3190b77a8b7?w=800&q=80',
    'Crochet Toy', 'Cotton Yarn')
  returning id into t1;

  insert into products (id, name, description, base_price, image_url, category, material)
  values (gen_random_uuid(),
    'Miniature Crochet Bunny',
    'A palm-sized floppy-eared bunny with a hand-embroidered face. Comes in a little drawstring bag — perfect as a gift or keepsake.',
    28, 'https://images.unsplash.com/photo-1555861496-0666c8981751?w=800&q=80',
    'Crochet Toy', 'Merino Wool')
  returning id into t2;

  -- ── Crochet Flowers ───────────────────────────────────────
  insert into products (id, name, description, base_price, image_url, category, material)
  values (gen_random_uuid(),
    'Crochet Sunflower Hair Clip',
    'A large statement sunflower clip crocheted with textured petals and a contrasting centre. Attaches to a sturdy alligator clip. Measures 9cm across.',
    18, 'https://images.unsplash.com/photo-1490750967868-88df5691cc5f?w=800&q=80',
    'Crochet Flower', 'Cotton & Acrylic')
  returning id into f1;

  insert into products (id, name, description, base_price, image_url, category, material)
  values (gen_random_uuid(),
    'Wildflower Bouquet Set',
    'A handmade bouquet of five mixed crochet flowers — daisies, poppies, and lavender sprigs — wired and wrapped in kraft paper. Lasts forever.',
    54, 'https://images.unsplash.com/photo-1487530811015-780780169900?w=800&q=80',
    'Crochet Flower', 'Cotton Yarn & Floral Wire')
  returning id into f2;

  -- ── Sewing Clothes ────────────────────────────────────────
  insert into products (id, name, description, base_price, image_url, category, material)
  values (gen_random_uuid(),
    'Linen Drop-Shoulder Dress',
    'A relaxed, midi-length dress cut from stonewashed linen. Drop shoulders, side pockets, and a flowy hem. Made to order — allow 5–7 days.',
    128, 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
    'Sewing', 'Stonewashed Linen')
  returning id into s1;

  insert into products (id, name, description, base_price, image_url, category, material)
  values (gen_random_uuid(),
    'Gathered Cotton Mini Skirt',
    'A high-waisted mini skirt with a soft gather at the waistband and a playful tiered hem. Fully lined. Elastic waist for easy fit.',
    72, 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80',
    'Sewing', 'Organic Cotton')
  returning id into s2;

  -- Variants — Crochet Toys (yarn colors)
  insert into product_variants (product_id, color_name, hex_code, stock_status, stock_count) values
    (t1, 'Honey Brown',  '#C49A6C', 'in_stock',   10),
    (t1, 'Warm Cream',   '#F5E6C8', 'in_stock',    8),
    (t1, 'Dusty Rose',   '#D4A5A5', 'low_stock',   3),
    (t1, 'Slate Blue',   '#6B8FA8', 'in_stock',    6);

  insert into product_variants (product_id, color_name, hex_code, stock_status, stock_count) values
    (t2, 'Warm Cream',   '#F5E6C8', 'in_stock',   12),
    (t2, 'Pattina Blue', '#5B8FA8', 'in_stock',    9),
    (t2, 'Blush',        '#E8B4B8', 'low_stock',   2),
    (t2, 'Sage',         '#9DAE8E', 'in_stock',    7);

  -- Variants — Crochet Flowers
  insert into product_variants (product_id, color_name, hex_code, stock_status, stock_count) values
    (f1, 'Sunflower Yellow', '#F5C842', 'in_stock',  14),
    (f1, 'Dusty Rose',       '#D4A5A5', 'in_stock',  10),
    (f1, 'Pattina Blue',     '#5B8FA8', 'low_stock',  4),
    (f1, 'Ivory',            '#FAF0DC', 'in_stock',   8);

  insert into product_variants (product_id, color_name, hex_code, stock_status, stock_count) values
    (f2, 'Garden Mix',   '#9DAE8E', 'in_stock',    6),
    (f2, 'Sunset Mix',   '#D4845A', 'in_stock',    5),
    (f2, 'Pastel Mix',   '#C5A8D8', 'low_stock',   2),
    (f2, 'Classic White','#FAF7F2', 'in_stock',    8);

  -- Variants — Sewing Clothes
  insert into product_variants (product_id, color_name, hex_code, stock_status, stock_count) values
    (s1, 'Natural Linen', '#D4C4A8', 'in_stock',   7),
    (s1, 'Sky Blue',      '#A8C5D8', 'in_stock',   5),
    (s1, 'Sage Green',    '#9DAE8E', 'low_stock',  2),
    (s1, 'Charcoal',      '#4B5563', 'in_stock',   4);

  insert into product_variants (product_id, color_name, hex_code, stock_status, stock_count) values
    (s2, 'Warm Cream',    '#F5E6C8', 'in_stock',   9),
    (s2, 'Pattina Blue',  '#5B8FA8', 'in_stock',   7),
    (s2, 'Dusty Rose',    '#D4A5A5', 'in_stock',   6),
    (s2, 'Charcoal',      '#4B5563', 'out_of_stock',0);

end;
$$;
