// lib/rbac.ts
// Reusable RBAC utilities for server and client

export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export type MaybeRole = Role | string | undefined | null;

// Check if a user role is allowed
export function canAccess(
  userRole: MaybeRole,
  allowed: (Role | string)[] = [],
) {
  if (!userRole) return false;
  return allowed.includes(userRole as Role | string);
}

// Convenience helper for common checks
export function hasRole(userRole: MaybeRole, allowed: (Role | string)[]) {
  return canAccess(userRole, allowed);
}

// Server-side assertion: throws an Error when not allowed.
// Caller can catch and redirect as needed (server component or API route).
export function assertRole(userRole: MaybeRole, allowed: (Role | string)[]) {
  if (!canAccess(userRole, allowed)) {
    const err = new Error("FORBIDDEN: insufficient role");
    // attach a code to make distinguishing easier in handlers
    (err as any).code = "FORBIDDEN_ROLE";
    throw err;
  }
}

// Permission helpers placeholder: for future fine-grained permission checks
export type Permission = string;

export function hasPermission(
  userPermissions: Permission[] = [],
  required: Permission[] = [],
) {
  if (!required.length) return true;
  return required.every((p) => userPermissions.includes(p));
}

export default { Role, canAccess, hasRole, assertRole, hasPermission };
