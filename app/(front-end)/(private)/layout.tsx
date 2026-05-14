import React from "react";
import PrivateShell from "@/components/shared/PrivateShell";
import { createClient } from "@/lib/supabase/server";
import { Role } from "@/lib/rbac";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role =
    user?.user_metadata?.role || user?.app_metadata?.role || user?.role;

  return <PrivateShell role={role as Role}>{children}</PrivateShell>;
}
