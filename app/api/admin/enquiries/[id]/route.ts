import { createClient } from '@/lib/supabase/server'
import { getAdminUser } from '@/lib/admin-auth'
import type { EnquiryStatus } from '@/lib/types'

function isEnquiryStatus(value: unknown): value is EnquiryStatus {
  return value === 'new' || value === 'contacted' || value === 'closed'
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

  const body = (await request.json()) as { status?: unknown }
  if (!isEnquiryStatus(body.status)) {
    return Response.json({ error: 'Invalid status value' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('enquiries')
    .update({ status: body.status })
    .eq('id', id)
    .select()
    .single()

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

  const { error } = await supabase.from('enquiries').delete().eq('id', id)

  if (error) {
    return Response.json({ error: error.message }, { status: 400 })
  }

  return new Response(null, { status: 204 })
}
