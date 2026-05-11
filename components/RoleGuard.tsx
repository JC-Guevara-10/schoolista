"use client";

import React, { useEffect, useState } from "react";
import { Role, canAccess } from "../lib/rbac";

type Props = {
  allowed: (Role | string)[];
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

export function RoleGuard({ allowed, fallback = null, children }: Props) {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setRole(data.user?.role || null);
      })
      .catch(() => setRole(null))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return null;

  if (!canAccess(role, allowed)) return <>{fallback}</>;

  return <>{children}</>;
}

export default RoleGuard;
