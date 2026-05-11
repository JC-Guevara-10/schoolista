"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RoleSwitcher } from "../components/RoleSwitcher";

const gpaHistory = [
  { term: "2023-1", gpa: 3.78 },
  { term: "2023-2", gpa: 3.84 },
  { term: "2024-1", gpa: 3.95 },
  { term: "2024-2", gpa: 3.98 },
  { term: "2025-1", gpa: 4.0 },
];

const awards = [
  { term: "2025-1", gpa: 4.0, awardDate: "2/15/2026" },
  { term: "2024-2", gpa: 3.95, awardDate: "11/20/2025" },
  { term: "2024-1", gpa: 3.92, awardDate: "6/15/2025" },
];

const cardClass =
  "rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]";

function MedalIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="9" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M9.5 13 8 21l4-2.2L16 21l-1.5-8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m3 8.5 9-4 9 4-9 4-9-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 11v4c1.6 1.3 3.2 2 5 2s3.4-.7 5-2v-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m4 15 5-5 4 4 7-8M16 6h4v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 4v3M17 4v3M4 9h16M5 6h14v14H5V6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({
  label,
  value,
  icon,
  tone,
  valueClass = "text-slate-950",
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  tone: string;
  valueClass?: string;
}) {
  return (
    <section className={`${cardClass} flex items-center gap-4 p-5`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md ${tone}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className={`mt-1 text-lg font-bold leading-tight ${valueClass}`}>
          {value}
        </p>
      </div>
    </section>
  );
}

export default function StudentPage() {
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setChartsReady(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="bg-[#0f5b78] px-6 py-5 text-white shadow-sm">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">
              Dean&apos;s Lister Analytics Dashboard
            </h1>
            <p className="mt-1 text-xs text-cyan-50">
              Learning Management System - Academic Excellence Tracking
            </p>
          </div>
          <RoleSwitcher />
        </div>
      </header>

      <div className="mx-auto grid max-w-[1280px] gap-5 px-6 py-6">
        <section className="rounded-lg bg-gradient-to-r from-[#0f5b78] to-[#18799c] p-7 text-white shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold leading-tight">Maria Santos</h2>
              <p className="mt-2 text-sm text-cyan-50">
                2021-00123 - BS Computer Science
              </p>
              <p className="mt-1 text-sm text-cyan-50">
                maria.santos@university.edu.ph
              </p>
            </div>
            <div className="w-fit rounded-md bg-white/20 px-5 py-4 text-center">
              <p className="text-xs font-semibold text-cyan-50">Current GPA</p>
              <p className="mt-1 text-4xl font-bold text-amber-300">4.00</p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <StatCard
            label="Total Awards"
            value="3"
            icon={<MedalIcon />}
            tone="bg-amber-50 text-amber-500"
          />
          <StatCard
            label="Year Level"
            value="3rd Year"
            icon={<GraduationIcon />}
            tone="bg-cyan-50 text-cyan-700"
          />
          <StatCard
            label="GPA Trend"
            value="Improving"
            icon={<TrendIcon />}
            tone="bg-emerald-50 text-emerald-600"
            valueClass="text-emerald-600"
          />
        </section>

        <section className={cardClass}>
          <div className="px-5 pt-5">
            <h2 className="text-sm font-bold text-slate-950">
              GPA Performance History
            </h2>
          </div>
          <div className="h-80 p-5">
            {chartsReady && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gpaHistory} margin={{ left: 0, right: 18, top: 10 }}>
                  <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                  <XAxis dataKey="term" tick={{ fontSize: 11 }} tickLine={false} />
                  <YAxis
                    domain={[3, 4.1]}
                    ticks={[3, 3.25, 3.5, 3.75, 4, 4.1]}
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="#0f5b78"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#0f5b78" }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className={cardClass}>
          <div className="px-5 py-5">
            <h2 className="text-sm font-bold text-slate-950">
              Dean&apos;s Lister Award History
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your academic excellence achievements
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead className="border-y border-slate-200 bg-slate-50 text-[10px] uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Term</th>
                  <th className="px-5 py-3 font-semibold">GPA Achieved</th>
                  <th className="px-5 py-3 font-semibold">Award Date</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {awards.map((award) => (
                  <tr key={award.term} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {award.term}
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-white">
                        {award.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      <span className="inline-flex items-center gap-2">
                        <CalendarIcon />
                        {award.awardDate}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-600">
                        Awarded
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
