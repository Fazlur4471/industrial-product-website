import { createClient } from '@/lib/supabase/server'
import { getAdminUser } from '@/lib/admin-auth'
import type { ProductCategory } from '@/lib/types'

type ProductPayload = {
  slug: string
  name: string
  category: ProductCategory
  price: number
  description: string
  longDescription: string
  images: string[]
  specs: Record<string, string | number>
  inStock: boolean
  featured: boolean
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function parseProductPayload(raw: unknown): ProductPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const payload = raw as Record<string, unknown>

  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const slugInput = typeof payload.slug === 'string' ? payload.slug.trim() : ''
  const category = payload.category
  const description = typeof payload.description === 'string' ? payload.description.trim() : ''
  const longDescription =
    typeof payload.longDescription === 'string' ? payload.longDescription.trim() : ''

  const priceValue =
    typeof payload.price === 'number'
      ? payload.price
      : typeof payload.price === 'string'
        ? Number(payload.price)
        : Number.NaN

  const images =
    Array.isArray(payload.images) && payload.images.every((item) => typeof item === 'string')
      ? payload.images.map((item) => item.trim()).filter(Boolean)
      : []

  const specs =
    payload.specs && typeof payload.specs === 'object' && !Array.isArray(payload.specs)
      ? (payload.specs as Record<string, string | number>)
      : {}

  if (!name || !description || Number.isNaN(priceValue)) return null
  if (category !== 'trading' && category !== 'manufacturing') return null

  return {
    slug: slugify(slugInput || name),
    name,
    category,
    price: priceValue,
    description,
    longDescription: longDescription || description,
    images,
    specs,
    inStock: payload.inStock === false ? false : true,
    featured: payload.featured === true,
  }
}

export async function POST(request: Request) {
  const { user, isAdmin } = await getAdminUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isAdmin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createClient()

  const body = await request.json()
  const payload = parseProductPayload(body)

  if (!payload) {
    return Response.json({ error: 'Invalid product payload' }, { status: 400 })
  }

  const { data, error } = await supabase.from('products').insert([payload]).select().single()

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data, { status: 201 })
}
