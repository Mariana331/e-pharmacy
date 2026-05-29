import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_API_PREFIXES = [
  '/api/user/login',
  '/api/user/register',
  '/api/user/refresh',
  '/api/user/logout',
  '/api/statistics',
];

function isProtectedApi(pathname: string): boolean {
  if (!pathname.startsWith('/api/')) return false;
  return !PUBLIC_API_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function isProtectedPage(pathname: string): boolean {
  if (pathname === '/shop/create' || pathname.startsWith('/shop/')) {
    return true;
  }
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  if (isProtectedApi(pathname) && !accessToken) {
    return NextResponse.json(
      { status: 401, message: 'Unauthorized' },
      { status: 401 },
    );
  }

  if (isProtectedPage(pathname) && !accessToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/shop/:path*', '/api/:path*'],
};
