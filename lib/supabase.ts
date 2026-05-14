// lib/supabase.ts
// Minimal helpers to validate Supabase access tokens server-side.

export type SupabaseUser = {
  id: string;
  email?: string | null;
  role?: string | null;
  user_metadata?: Record<string, unknown>;
  app_metadata?: Record<string, unknown>;
};

async function getUserFromToken(
  token?: string | null,
): Promise<SupabaseUser | null> {
  if (!token) return null;
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL) {
    console.error("Supabase URL env var missing");
    return null;
  }
  try {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    // If a service role key is available (server env), include it as apikey.
    if (SUPABASE_SERVICE_ROLE_KEY) headers.apikey = SUPABASE_SERVICE_ROLE_KEY;

    const resp = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers,
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

const supabaseHelpers = { getUserFromToken };

export default supabaseHelpers;
