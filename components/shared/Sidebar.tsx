"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import NAV_ITEMS from "@/config/navigation";
import {
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/rbac";

const iconMap = Icons as unknown as Record<string, LucideIcon>;

type SidebarProps = {
  role?: Role | null;
};

const roleLabel: Record<Role, string> = {
  [Role.ADMIN]: "Administrator",
  [Role.TEACHER]: "Faculty",
  [Role.STUDENT]: "Student",
  [Role.REGISTRAR]: "Registrar",
};

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const items = useMemo(() => {
    if (!role) return [];
    return NAV_ITEMS.filter((item) => item.roles.includes(role));
  }, [role]);

  return (
    <ShadSidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-r-0 [&_[data-sidebar=sidebar]]:bg-[#0b2e6d] [&_[data-sidebar=sidebar]]:text-white"
    >
      <SidebarContent className="gap-0">
        <SidebarHeader className="border-b border-white/10 p-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex min-w-0 items-center gap-3">
              <span className="flex items-center shrink-0  group-data-[collapsible=icon]:hidden justify-center rounded-lg bg-[#f7bf26] text-[#0b2e6d] shadow-sm">
                <GraduationCap className="size-5" />
              </span>
              <span className="min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="block text-base font-semibold leading-tight">
                  Schoolista
                </span>
                <span className="block truncate text-xs text-blue-100/80">
                  Learning Management
                </span>
              </span>
            </Link>
            <SidebarTrigger className="shrink-0 text-blue-100 hover:bg-white/10 hover:text-white " />
          </div>
        </SidebarHeader>

        <div className="px-3 py-5">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-blue-100/60 group-data-[collapsible=icon]:hidden">
            Workspace
          </p>
          <SidebarMenu className="gap-1.5">
            {items.map((item) => {
              const Icon = iconMap[item.icon ?? "File"];
              const active =
                pathname === item.href ||
                pathname?.startsWith(item.href + "/");

              if (item.children && item.children.length > 0) {
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      isActive={active}
                      tooltip={item.title}
                      className={cn(
                        "h-10 rounded-lg text-blue-50/85 hover:bg-white/10 hover:text-white",
                        "data-active:bg-white data-active:text-[#0b2e6d] data-active:shadow-sm"
                      )}
                      render={
                        <Link href={item.href}>
                          {Icon ? <Icon className="size-4" /> : null}
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                    <SidebarMenuSub className="mt-1 border-blue-100/25">
                      {item.children.map((child) => (
                        <SidebarMenuSubButton
                          key={child.href}
                          className="text-blue-50/75 hover:bg-white/10 hover:text-white"
                          render={
                            <Link href={child.href}>{child.title}</Link>
                          }
                        />
                      ))}
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                );
              }

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    isActive={active}
                    tooltip={item.title}
                    className={cn(
                      "h-10 rounded-lg text-blue-50/85 hover:bg-white/10 hover:text-white",
                      "data-active:bg-white data-active:text-[#0b2e6d] data-active:shadow-sm"
                    )}
                    render={
                      <Link href={item.href}>
                        {Icon ? <Icon className="size-4" /> : null}
                        <span>{item.title}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </div>

        {items.length === 0 ? (
          <div className="mx-3 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-blue-50/75 group-data-[collapsible=icon]:hidden">
            No navigation is available for this account.
          </div>
        ) : null}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/10 p-4">
        <div className="rounded-lg bg-white/10 px-3 py-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
          <div className="size-2 rounded-full bg-[#f7bf26] group-data-[collapsible=icon]:size-2.5" />
          <div className="mt-2 group-data-[collapsible=icon]:hidden">
            <p className="text-xs text-blue-100/70">Signed in as</p>
            <p className="truncate text-sm font-medium text-white">
              {role ? roleLabel[role] ?? role : "Unknown role"}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </ShadSidebar>
  );
}
