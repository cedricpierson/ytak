import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(admin, ...user) {
  return NextResponse.redirect(new URL('/signin', request.url));
}
if (user.isAdmin === false) {
  res.status(401).json({
    success: false,
    message: 'Unauthorized',
  });
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin',
};
