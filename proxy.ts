import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const DEFAULT_ADMIN_EMAILS = ['slmfazlur@gmail.com', 'slmmaharaja@gmail.com']

function getAdminEmailAllowlist() {
  const fromEnv = (process.env.ADMIN_ALLOWED_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

  const merged = fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_EMAILS
  return new Set(merged)
}

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set() {},
        remove() {},
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (user && req.nextUrl.pathname.startsWith('/admin')) {
    const email = user.email?.toLowerCase() ?? ''
    const isAdmin = getAdminEmailAllowlist().has(email)
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/admin/:path*'],
}

export default proxy
