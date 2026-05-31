import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  // OAuth code interceptor: If a code parameter is present but we are not on the callback route,
  // automatically redirect to the correct auth callback route so the session is securely exchanged.
  const { searchParams, pathname } = request.nextUrl
  const code = searchParams.get('code')
  if (code && pathname !== '/auth/callback') {
    const next = searchParams.get('next') ?? '/dashboard'
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/callback'
    redirectUrl.searchParams.set('code', code)
    redirectUrl.searchParams.set('next', next)
    return NextResponse.redirect(redirectUrl)
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

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/auth') &&   // /auth, /auth/callback
    !request.nextUrl.pathname.startsWith('/api') &&    // /api/* routes (never redirect API)
    !request.nextUrl.pathname.startsWith('/pricing') && // public pricing page
    request.nextUrl.pathname !== '/'                   // public landing page
  ) {
    // No user session found — redirect to login
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid mutating
  //    the supabaseResponse object directly else you may potentially create
  //    issues with session refreshing.

  return supabaseResponse
}
