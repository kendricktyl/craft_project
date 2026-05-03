import { NextResponse } from 'next/server'
import Stripe from 'stripe'

type IncomingItem = {
  id: string
  name: string
  price: number
  image_url: string
  quantity: number
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY
  if (!secret) {
    return NextResponse.json(
      { error: 'STRIPE_SECRET_KEY missing — see .env.local instructions in README.' },
      { status: 500 },
    )
  }

  const stripe = new Stripe(secret)

  let body: { items?: IncomingItem[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const items = body.items ?? []
  if (items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
  }

  const origin =
    req.headers.get('origin') ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          images: item.image_url ? [item.image_url] : undefined,
        },
      },
    })),
    success_url: `${origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
  })

  if (!session.url) {
    return NextResponse.json({ error: 'Stripe did not return a session URL' }, { status: 500 })
  }

  return NextResponse.json({ url: session.url })
}
