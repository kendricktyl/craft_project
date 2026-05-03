-- ============================================================
-- Migration 001 — add per-variant image_url + seed picsum URLs
-- Run this in the Supabase SQL Editor.
-- ============================================================

alter table product_variants
  add column if not exists image_url text;

-- Seed every existing variant with a stable picsum image keyed off
-- the variant id. Each variant gets a deterministically different photo.
update product_variants
   set image_url = 'https://picsum.photos/seed/craft-' || id::text || '/900/900'
 where image_url is null;
