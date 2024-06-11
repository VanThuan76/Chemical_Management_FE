import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_SAVE_KEY } from '@/shared/constant';

export default async function middleware(request: NextRequest) {
  try {
    console.log('Middleware request URL:', request.url);
    const token = request.cookies.get(APP_SAVE_KEY.TOKEN_KEY);
    console.log('Token:', token);
    if (token) {
      return NextResponse.next();
    } else {
      console.log('Redirecting to login due to missing token.');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (e) {
    console.error('Error in middleware:', e);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
