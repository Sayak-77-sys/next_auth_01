import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  // Public routes (accessible without auth)
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/verify-email";

  // If no token and trying to access protected routes, redirect to login
  if (!token && !isPublicPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // If token exists, prevent access to login/signup only
  if (token && (path === "/login" || path === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/profile";
    return NextResponse.redirect(url);
  }
}

export const config = {
  // Apply to all paths except Next.js internals and public assets
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
