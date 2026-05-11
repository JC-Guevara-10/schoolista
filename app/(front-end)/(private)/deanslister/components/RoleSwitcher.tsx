"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";

const roles = [
  { label: "Admin", href: "/deanslister" },
  { label: "Registrar", href: "/deanslister/registrar" },
  { label: "Faculty", href: "/deanslister/faculty" },
  { label: "Student", href: "/deanslister/student" },
];

export function RoleSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      className="flex flex-wrap gap-2 rounded-lg bg-white/10 p-1"
      aria-label="Role pages"
    >
      {roles.map((role) => {
        const isActive = pathname === role.href;

        return (
          <Link
            key={role.href}
            href={role.href as Route}
            className={`rounded-md px-3 py-2 text-xs font-bold transition ${
              isActive
                ? "bg-white text-[#0f5b78] shadow-sm"
                : "text-white hover:bg-white/15"
            }`}
          >
            {role.label}
          </Link>
        );
      })}
    </nav>
  );
}
