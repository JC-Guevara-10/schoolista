"use client";

import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";

import Sidebar from "@/components/shared/Sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { Role } from "@/lib/rbac";

type PrivateShellProps = {
  children: ReactNode;
  role?: Role | null;
};

export default function PrivateShell({ children, role }: PrivateShellProps) {
  return (
    <SidebarProvider className="min-h-screen bg-[#f3f7fa]">
      <Sidebar role={role} />
      <SidebarInset className="min-w-0 bg-[#f3f7fa]">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-[#d8e3ef] bg-white/90 px-4 backdrop-blur md:hidden">
          <SidebarTrigger className="text-[#0b2e6d]" />
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-[#0b2e6d] text-white">
              <GraduationCap className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-[#0b2e6d]">Schoolista</p>
              <p className="text-xs text-slate-500">LMS Workspace</p>
            </div>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
