import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get('access_token');

  const isAuthPage = pathname === '/login' || pathname === '/';
  const isDashboard = pathname.startsWith('/dashboard');
  const isAdmin = pathname.startsWith('/admin');

  // 1️⃣ Not logged in → block protected routes
  if (!token && (isDashboard || isAdmin)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 2️⃣ Logged in → prevent access to login or home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 3️⃣ Allow everything else
  return NextResponse.next();
}
