import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching enquiries:', error)
    return Response.json(
      { error: 'Failed to fetch enquiries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const supabase = await createClient()

    const { data: newEnquiry, error } = await supabase
      .from('enquiries')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company,
          productInterest: data.productInterest,
          message: data.message,
          status: 'new',
        },
      ])
      .select()
      .single()

    if (error) throw error

    return Response.json(newEnquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating enquiry:', error)
    return Response.json(
      { error: 'Failed to create enquiry' },
      { status: 400 }
    )
  }
}
