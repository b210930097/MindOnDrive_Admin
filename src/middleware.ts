// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Routes } from '@/config/routes';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ API хүсэлт, static файлуудыг алгасна
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // ✅ Cookie-с Session token уншина
  const token =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  // ✅ Public зөвшөөрөх зөвхөн '/auth'
  const publicPaths = [Routes.Auth.Index.route]; // '/auth'
  const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));

  if (!token && !isPublicPage) {
    // 🛑 Хэрвээ нэвтрээгүй бол -> /auth руу явуулна
    const url = request.nextUrl.clone();
    url.pathname = Routes.Auth.Index.route;
    return NextResponse.redirect(url);
  }

  if (token && isPublicPage) {
    // 🛑 Хэрвээ аль хэдийн login хийсэн хүн /auth руу орох гэж байвал -> / (home) руу буцаана
    const url = request.nextUrl.clone();
    url.pathname = Routes.Home.Index.route;
    return NextResponse.redirect(url);
  }

  // ✅ Otherwise зөвшөөр
  return NextResponse.next();
}

// ✅ Matcher зөв тохируулна
export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
};
