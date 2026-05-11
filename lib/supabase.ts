// lib/supabase.ts
// Minimal helpers to validate Supabase access tokens server-side.

export type SupabaseUser = {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
};

async function getUserFromToken(
  token?: string | null,
): Promise<SupabaseUser | null> {
  if (!token) return null;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Supabase env vars missing");
    return null;
  }

  try {
    const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/json",
      },
      // avoid caching
      cache: "no-store",
    });

    if (!resp.ok) return null;

    const data = await resp.json();
    // data contains user object
    return data as SupabaseUser;
  } catch (err) {
    console.error("Error fetching supabase user", err);
    return null;
  }
}

export { getUserFromToken };

export default { getUserFromToken };
