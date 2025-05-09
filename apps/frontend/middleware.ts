import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = createRouteMatcher([
  '/',
  '/api(.*)',
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Allow static files and images
  '/_next/static/(.*)',
  '/images/(.*)',
  '/favicon.ico',
  '/api/webhook/(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!publicRoutes(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!_next|api|images|favicon\\.ico|webhook).*)',
  ],
};
