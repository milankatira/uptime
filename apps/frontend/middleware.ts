import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
    "/",
    "/api(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    // Allow static files and images
    "/_next/static/(.*)",
    "/images/(.*)",
    "/favicon.ico",
    "/_next/static/(.*)",
    "/images/(.*)",
    "/api/webhook/(.*)",
    "/status-page(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (!publicRoutes(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip all paths that shouldn't run the middleware
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
