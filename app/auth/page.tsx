"use client"
import AuthCard from "@/app/auth/components/AuthCard";
import { useState } from "react";


export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  const gridClass =
    mode === "signin"
      ? "lg:grid-cols-[1.2fr_0.8fr]"
      : "grid-cols-1 items-start justify-center";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 p-4">
      <div className="otas-shape otas-shape-top" />
      <div className="otas-shape otas-shape-bottom" />

      <div
        className={`grid w-full max-w-5xl gap-8 rounded-2xl border border-border bg-white p-8 shadow-xl ${gridClass}`}
      >
        <section className="space-y-5">
          <p className="text-sm font-semibold tracking-[0.2em] text-[#0B2E6D] uppercase">
            BS Computer Science
          </p>
          <h1 className="text-4xl leading-tight font-bold text-[#0B2E6D] lg:text-5xl">
            Olopsc Learning Management System
          </h1>
          <p className="max-w-lg text-base text-slate-600">
            Secure school management system for BSCS, providing efficient tools
            for students, teachers, and administrators to manage academic
            activities and communication effectively.
          </p>
          <div className="inline-flex items-center rounded-full border border-[#0B2E6D]/15 bg-[#0B2E6D]/5 px-3 py-1.5 text-xs font-medium text-[#0B2E6D]">
            Better learning experience with Olopsc LMS
          </div>
        </section>

        <section className="flex items-center justify-center">
          <AuthCard onModeChange={(m) => setMode(m)} />
        </section>
      </div>
    </div>
  );
}
