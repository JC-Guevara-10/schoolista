"use client";

import React from "react";
import RoleGuard from "./RoleGuard";
import { Role } from "../lib/rbac";

type Props = { children: React.ReactNode; fallback?: React.ReactNode };

export function StudentView({ children, fallback = null }: Props) {
  return (
    <RoleGuard allowed={[Role.STUDENT]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export default StudentView;
