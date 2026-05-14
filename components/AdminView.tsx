"use client";

import React from "react";
import RoleGuard from "./RoleGuard";
import { Role } from "../lib/rbac";

type Props = { children: React.ReactNode; fallback?: React.ReactNode };

export function AdminView({ children, fallback = null }: Props) {
  return (
    <RoleGuard allowed={[Role.ADMIN]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export default AdminView;
