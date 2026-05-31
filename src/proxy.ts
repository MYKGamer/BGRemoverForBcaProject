/**
 * PROXY FILE — Next.js 16+ Convention
 * 
 * This is the correct and only file for intercepting requests in Next.js 16.
 * 
 * History:
 *   - Next.js v12-v15: Used "middleware.ts" with export function `middleware()`
 *   - Next.js v16+:    RENAMED to "proxy.ts" with export function `proxy()`
 *     (middleware.ts is DEPRECATED in v16)
 *
 * What it does:
 *   - Runs on EVERY request before rendering
 *   - Refreshes the Supabase auth session so it doesn't expire mid-use
 *   - Redirects unauthenticated users away from protected routes (e.g. /dashboard)
 *   - Allows public routes: /, /auth, /pricing (no login required)
 *
 * DO NOT rename this file to middleware.ts — that will break session refresh in Next.js 16.
 */
import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run proxy on all paths EXCEPT:
     * - _next/static  (Next.js static assets)
     * - _next/image   (Next.js image optimization)
     * - favicon.ico   (browser favicon)
     * - image files   (.svg, .png, .jpg, .jpeg, .gif, .webp)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
