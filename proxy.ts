import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  const privateRoutes = ["/dashboard", "/deanslister", "/faculty-evaluation"];
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute) {
    const hasSession = request.cookies
      .getAll()
      .some(
        (cookie) =>
          cookie.name.includes("sb-") && cookie.name.includes("-auth-token")
      );

    if (
      !hasSession &&
      !request.cookies.has("sb-access-token") &&
      !request.cookies.has("access_token")
    ) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/deanslister/:path*",
    "/faculty-evaluation/:path*",
  ],
};

export default proxy;
