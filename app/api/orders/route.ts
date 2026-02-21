import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return Response.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabase = await createClient()

    const { data: newOrder, error } = await supabase
      .from('orders')
      .insert([
        {
          name: data.name ?? data.customerName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          product: data.product,
          quantity: data.quantity,
          deliveryAddress: data.deliveryAddress,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (error) throw error

    return Response.json(newOrder, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return Response.json(
      { error: 'Failed to create order' },
      { status: 400 }
    )
  }
}
