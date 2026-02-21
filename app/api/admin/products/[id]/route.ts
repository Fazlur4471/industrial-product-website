import { createClient } from '@/lib/supabase/server'
import { getAdminUser } from '@/lib/admin-auth'
import type { ProductCategory } from '@/lib/types'

type ProductPatchPayload = {
  slug?: string
  name?: string
  category?: ProductCategory
  price?: number
  description?: string
  longDescription?: string
  images?: string[]
  specs?: Record<string, string | number>
  inStock?: boolean
  featured?: boolean
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function parsePatchPayload(raw: unknown): ProductPatchPayload | null {
  if (!raw || typeof raw !== 'object') return null
  const payload = raw as Record<string, unknown>
  const update: ProductPatchPayload = {}

  if ('name' in payload) {
    if (typeof payload.name !== 'string' || !payload.name.trim()) return null
    update.name = payload.name.trim()
  }

  if ('slug' in payload) {
    if (typeof payload.slug !== 'string') return null
    update.slug = slugify(payload.slug)
  }

  if ('category' in payload) {
    if (payload.category !== 'trading' && payload.category !== 'manufacturing') return null
    update.category = payload.category
  }

  if ('price' in payload) {
    const parsedPrice =
      typeof payload.price === 'number'
        ? payload.price
        : typeof payload.price === 'string'
          ? Number(payload.price)
          : Number.NaN

    if (Number.isNaN(parsedPrice)) return null
    update.price = parsedPrice
  }

  if ('description' in payload) {
    if (typeof payload.description !== 'string' || !payload.description.trim()) return null
    update.description = payload.description.trim()
  }

  if ('longDescription' in payload) {
    if (typeof payload.longDescription !== 'string') return null
    update.longDescription = payload.longDescription.trim()
  }

  if ('images' in payload) {
    if (!Array.isArray(payload.images) || payload.images.some((item) => typeof item !== 'string')) return null
    update.images = payload.images.map((image) => image.trim()).filter(Boolean)
  }

  if ('specs' in payload) {
    if (!payload.specs || typeof payload.specs !== 'object' || Array.isArray(payload.specs)) return null
    update.specs = payload.specs as Record<string, string | number>
  }

  if ('inStock' in payload) {
    if (typeof payload.inStock !== 'boolean') return null
    update.inStock = payload.inStock
  }

  if ('featured' in payload) {
    if (typeof payload.featured !== 'boolean') return null
    update.featured = payload.featured
  }

  return update
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { user, isAdmin } = await getAdminUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isAdmin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createClient()

  const payload = parsePatchPayload(await request.json())

  if (!payload || Object.keys(payload).length === 0) {
    return Response.json({ error: 'Invalid update payload' }, { status: 400 })
  }

  let { data, error } = await supabase
    .from('products')
    .update(payload)
    .eq('id', id)
    .select()
    .single()

  if (error?.code === '42703' && error.message.includes('featured')) {
    const { featured: _featured, ...withoutFeatured } = payload
    const retry = await supabase
      .from('products')
      .update(withoutFeatured)
      .eq('id', id)
      .select()
      .single()
    data = retry.data
    error = retry.error
  }

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return Response.json(data)
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { user, isAdmin } = await getAdminUser()

  if (!user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!isAdmin) {
    return Response.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = await createClient()

  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return new Response(null, { status: 204 })
}
