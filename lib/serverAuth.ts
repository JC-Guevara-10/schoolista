import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserFromToken, SupabaseUser } from "./supabase";

// Server-side helper to get user from cookies (Supabase token stored in cookie)
export async function getServerUserFromCookies(): Promise<SupabaseUser | null> {
  const token =
    cookies().get("sb-access-token")?.value ||
    cookies().get("access_token")?.value;
  if (!token) return null;
  const user = await getUserFromToken(token);
  return user;
}

// Require role on server side; redirects to /login or /unauthorized as needed.
export async function requireRoleOrRedirect(allowedRoles: string[]) {
  const user = await getServerUserFromCookies();
  if (!user) {
    redirect("/login");
  }

  const role =
    user?.user_metadata?.role || user?.app_metadata?.role || (user as any).role;
  if (!role || !allowedRoles.includes(role)) {
    redirect("/unauthorized");
  }

  return user;
}

export default { getServerUserFromCookies, requireRoleOrRedirect };
