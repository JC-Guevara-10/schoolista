"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import NAV_ITEMS from "../config/navigation";
import Link from "next/link";

type User = {
  id?: string;
  email?: string | null;
  role?: string | null;
};

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setUser(data.user || null);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const role = user?.role;

  const items = useMemo(() => {
    if (!role) return [];
    return NAV_ITEMS.filter((i) => i.roles.includes(role as any));
  }, [role]);

  return (
    <aside className="w-64 bg-white border-r hidden md:block">
      <div className="p-4 flex items-center justify-between">
        <div className="text-lg font-semibold">LMS</div>
        <button
          aria-label="Toggle sidebar"
          onClick={() => setCollapsed((s) => !s)}
          className="p-1 rounded hover:bg-gray-100"
        >
          <Icons.ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <nav className="px-2 py-4">
        {items.map((item) => {
          const Icon = (Icons as any)[item.icon ?? "File"];
          const active =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href as any}
              className={`flex items-center gap-3 rounded px-3 py-2 my-1 text-sm ${active ? "bg-slate-100 font-medium" : "text-slate-700 hover:bg-slate-50"}`}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              <span className={`${collapsed ? "hidden" : ""}`}>
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
