import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = new URL(req.url).pathname;

  const protectedPaths = ["/dashboard", "/profile"];
  const isProtected = 
    protectedPaths.some((path) => pathname.startsWith(path)) || 
    pathname.match(/^\/events\/[^/]+\/signup$/);

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url));
  }

  return NextResponse.next();
}
