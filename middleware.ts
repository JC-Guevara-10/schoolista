import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./lib/rbac";
import { getUserFromToken } from "./lib/supabase";

// Centralized route -> roles mapping. Keep this declarative and extensible.
const ROLE_ROUTES: { pattern: string; roles: Role[] }[] = [
  { pattern: "/admin", roles: [Role.ADMIN] },
  { pattern: "/teacher", roles: [Role.TEACHER] },
  { pattern: "/student", roles: [Role.STUDENT] },
];

// Public routes that do not require authentication
const PUBLIC_ROUTES = new Set(["/login", "/signup", "/api/public", "/"]);

// Helper: find required roles for a pathname
function getRequiredRoles(pathname: string) {
  for (const r of ROLE_ROUTES) {
    if (pathname === r.pattern || pathname.startsWith(r.pattern + "/"))
      return r.roles;
  }
  return null;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip next internals and static files early
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // Allow public routes
  if (
    PUBLIC_ROUTES.has(pathname) ||
    Array.from(PUBLIC_ROUTES).some((p) => pathname.startsWith(p + "/"))
  ) {
    return NextResponse.next();
  }

  // Extract token from Authorization header or Supabase cookie `sb-access-token`
  const authHeader = req.headers.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : undefined;
  const cookieToken =
    req.cookies.get("sb-access-token")?.value ||
    req.cookies.get("access_token")?.value;
  const token = bearer || cookieToken;

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Validate token with Supabase to fetch user and role
  const user = await getUserFromToken(token);
  if (!user) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("returnTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Determine required roles for the route
  const required = getRequiredRoles(pathname);
  if (required) {
    const userRole =
      user.user_metadata?.role || user.app_metadata?.role || (user as any).role;
    if (!userRole || !required.includes(userRole as Role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  // If everything checks out, continue
  return NextResponse.next();
}

// Run middleware for all non-static routes. This matcher can be tuned per-app.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export default middleware;
