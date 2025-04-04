import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      const signUpUrl = new URL("/signup", req.url);
      return NextResponse.redirect(signUpUrl);
    }
  }
});

export const config = {
  matcher: [
    // Protects all routes except static assets and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
