import { NextResponse } from "next/server";
import { Role } from "../../../../lib/rbac";
import { getUserFromToken } from "../../../../lib/supabase";

// Protect this API by validating Supabase access token (from Authorization header or cookie)

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : undefined;
  const cookieHeader = (req as any).cookies?.get("sb-access-token")?.value;
  const token = bearer || cookieHeader;

  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await getUserFromToken(token);
  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const role =
    user.user_metadata?.role || user.app_metadata?.role || (user as any).role;
  if (role !== Role.ADMIN)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Example: return a minimal users payload. Replace with DB call in real app.
  const users = [
    { id: "1", name: "Alice Admin", email: "alice@example.com", role: "ADMIN" },
    { id: "2", name: "Bob Teacher", email: "bob@example.com", role: "TEACHER" },
  ];

  return NextResponse.json({ users });
}
