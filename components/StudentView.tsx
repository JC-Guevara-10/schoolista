"use client";

import React from "react";
import { Role } from "../lib/rbac";
import RoleGuard from "./shared/RoleGuard";

type Props = { children: React.ReactNode; fallback?: React.ReactNode };

export function StudentView({ children, fallback }: Props) {
  return (
    <RoleGuard allowed={[Role.STUDENT]} fallback={fallback}>
      {children}
    </RoleGuard>
  );
}

export default StudentView;
