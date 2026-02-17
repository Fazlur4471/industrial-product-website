import { createClient } from '@/lib/supabase/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', params.slug)
      .single()

    if (error || !data) {
      return Response.json({ error: 'Product not found' }, { status: 404 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Error fetching product:', error)
    return Response.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}
