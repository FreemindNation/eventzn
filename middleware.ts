// middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ 
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = new URL(req.url);

  // Define protected paths
  const protectedPaths = ["/dashboard", "/profile"];
  const isProtected = 
    protectedPaths.some((path) => pathname.startsWith(path)) || 
    pathname.match(/^\/events\/[^/]+\/signup$/);

  // Check if user is signed in for protected routes
  if (isProtected && !token) {
    const signInUrl = new URL("/sign-in", req.url);

    signInUrl.searchParams.set("callbackUrl", pathname);
    
    return NextResponse.redirect(signInUrl);
  }

  // Restrict `/dashboard` to Admins Only
  if (pathname.startsWith("/dashboard")) {
    if (!token || token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins home
    }
  }

  // Public paths that signed-in users shouldn't access
  const authPaths = ["/sign-in", "/sign-up"];
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // Redirect authenticated users away from auth pages
  if (isAuthPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*", 
    "/profile/:path*",
    "/events/:path*/signup",
    // Auth routes
    "/sign-in",
    "/sign-up",
  ],
};
