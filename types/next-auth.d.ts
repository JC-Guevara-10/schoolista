import type { DefaultSession } from "next-auth";

export declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      role?: string | null; // ADMIN | TEACHER | STUDENT
    } & DefaultSession["user"];
  }
}
