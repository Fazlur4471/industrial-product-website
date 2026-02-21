import { createClient } from '@/lib/supabase/server'

const DEFAULT_ADMIN_EMAILS = ['slmfazlur@gmail.com', 'slmmaharaja@gmail.com']

function getAdminEmailAllowlist() {
  const fromEnv = (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  const merged = fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_EMAILS
  return new Set(merged)
}

export async function getAdminUser() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { user: null, isAdmin: false as const }
  }

  const email = user.email?.toLowerCase() ?? ''
  const isAdmin = getAdminEmailAllowlist().has(email)

  return { user, isAdmin }
}
