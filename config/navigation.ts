import type { Route } from "next";
import { Role } from "../lib/rbac";

export type NavItem = {
  title: string;
  href: Route;
  icon?: string; // lucide-react name (string) — resolved in component
  roles: Role[]; // roles that can see this item
  children?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "Layout",
    roles: [Role.ADMIN, Role.TEACHER, Role.STUDENT],
  },
  {
    title: "Faculty Evaluation",
    href: "/faculty-evaluation",
    icon: "Star",
    roles: [Role.ADMIN, Role.TEACHER, Role.STUDENT],
  },
  {
    title: "Dean's Lister",
    href: "/deanslister",
    icon: "Medal",
    roles: [Role.ADMIN, Role.REGISTRAR, Role.STUDENT],
  },
];

export default NAV_ITEMS;
