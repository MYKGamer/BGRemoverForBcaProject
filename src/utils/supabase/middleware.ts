import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl
  const code = searchParams.get('code')

  // 1. Direct Server-Side OAuth Code Exchange in Middleware
  // This bypasses any Next.js Route Handler cookie-dropping bugs by writing cookies
  // directly onto the redirect response object returned by the middleware.
  if (code) {
    const next = searchParams.get('next') ?? '/dashboard'
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = next
    redirectUrl.searchParams.delete('code')
    redirectUrl.searchParams.delete('next')

    const response = NextResponse.redirect(redirectUrl)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return response
    }

    // Fallback: If exchange fails, redirect to /auth with an error, clearing parameters to prevent infinite loops
    const authUrl = request.nextUrl.clone()
    authUrl.pathname = '/auth'
    authUrl.searchParams.delete('code')
    authUrl.searchParams.delete('next')
    authUrl.searchParams.set('error', 'Could not authenticate user')
    return NextResponse.redirect(authUrl)
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // getUser(). A simple mistake can make it very hard to debug
  // issues with sessions being lost.

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 2. Redirect Authenticated Users Away From Auth Page
  if (user && pathname.startsWith('/auth')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // 3. Protect Dashboard Routes
  if (
    !user &&
    !pathname.startsWith('/auth') &&   // /auth, /auth/callback
    !pathname.startsWith('/api') &&    // /api/* routes (never redirect API)
    !pathname.startsWith('/pricing') && // public pricing page
    pathname !== '/'                   // public landing page
  ) {
    // No user session found — redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
