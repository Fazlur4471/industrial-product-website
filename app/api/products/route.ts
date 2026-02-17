import { createClient } from '@/lib/supabase/server'
import { fallbackProducts } from '@/lib/fallback-products'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('featured', { ascending: false })

    if (error || !data || data.length === 0) {
      console.log('Using fallback products')
      return Response.json(fallbackProducts)
    }
    
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching products:', error)
    return Response.json(fallbackProducts)
  }
}
