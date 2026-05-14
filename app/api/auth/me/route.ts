import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../../lib/supabase";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization") || "";
    const bearer = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : undefined;
    // In Vercel/Next, cookies are accessible via req.headers cookie string; fallback to parsing
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/sb-access-token=([^;]+)/);
    const cookieToken = match ? decodeURIComponent(match[1]) : undefined;
    const token = bearer || cookieToken;

    if (!token) return NextResponse.json({ user: null }, { status: 200 });

    const user = await getUserFromToken(token);
    if (!user) return NextResponse.json({ user: null }, { status: 200 });

    // Normalize role location
    const role =
      user.user_metadata?.role ||
      user.app_metadata?.role ||
      user.role ||
      null;

    return NextResponse.json({
      user: { id: user.id, email: user.email, role },
    });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
