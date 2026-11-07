import { NextResponse, type NextRequest } from "next/server";

/**
 * Rebuild serves the cinematic invitation at `/`.
 * Legacy `/en` and `/bn` paths rewrite to `/` so old cookies/bookmarks still work
 * without bouncing through the old locale shell.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/en" || pathname === "/bn") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
