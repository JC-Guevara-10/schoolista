"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Student = {
  id: number;
  name: string;
  program: string;
  yearLevel: string;
  gpa: number;
  term: string;
  awardDate: string;
};

const trendData = [
  { term: "2023-1", count: 198 },
  { term: "2023-2", count: 214 },
  { term: "2024-S", count: 188 },
  { term: "2024-1", count: 221 },
  { term: "2024-2", count: 234 },
  { term: "2025-1", count: 248 },
];

const programData = [
  { program: "BS CS", count: 45 },
  { program: "BS IT", count: 39 },
  { program: "BS BA", count: 32 },
  { program: "BS Psych", count: 28 },
  { program: "BS Eng", count: 24 },
  { program: "Others", count: 52 },
];

const yearData = [
  { name: "1st Year", value: 21, color: "#0f3b57" },
  { name: "2nd Year", value: 27, color: "#3b82f6" },
  { name: "3rd Year", value: 29, color: "#f59e0b" },
  { name: "4th Year", value: 23, color: "#0e7490" },
];

const students: Student[] = [
  {
    id: 1,
    name: "Maria Santos",
    program: "BS Computer Science",
    yearLevel: "3rd Year",
    gpa: 4.0,
    term: "2025-1",
    awardDate: "2/15/2026",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    program: "BS Information Technology",
    yearLevel: "2nd Year",
    gpa: 3.95,
    term: "2025-1",
    awardDate: "2/15/2026",
  },
  {
    id: 3,
    name: "Anna Reyes",
    program: "BS Business Administration",
    yearLevel: "4th Year",
    gpa: 3.92,
    term: "2025-1",
    awardDate: "2/15/2026",
  },
  {
    id: 4,
    name: "Carlos Garcia",
    program: "BS Nursing",
    yearLevel: "1st Year",
    gpa: 3.88,
    term: "2025-1",
    awardDate: "2/15/2026",
  },
  {
    id: 5,
    name: "Sofia Martinez",
    program: "BS Psychology",
    yearLevel: "3rd Year",
    gpa: 3.85,
    term: "2025-1",
    awardDate: "2/15/2026",
  },
];

const cardClass =
  "rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]";

function IconCircle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white">
      {children}
    </div>
  );
}

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

function UsersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M3.5 19c.7-3.2 2.7-5 5.5-5s4.8 1.8 5.5 5M14.5 15.2c2.7.1 4.6 1.4 5.4 3.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
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

function KpiCard({
  title,
  value,
  detail,
  icon,
}: {
  title: string;
  value: string;
  detail?: string;
  icon: React.ReactNode;
}) {
  return (
    <section className={`${cardClass} flex min-h-28 items-center justify-between p-6`}>
      <div>
        <p className="text-xs font-medium text-slate-500">{title}</p>
        <p className="mt-2 text-3xl font-bold leading-none text-slate-950">
          {value}
        </p>
        {detail && (
          <p className="mt-3 text-xs font-medium text-emerald-600">{detail}</p>
        )}
      </div>
      <IconCircle>{icon}</IconCircle>
    </section>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`${cardClass} ${className}`}>
      <div className="px-5 pt-5">
        <h2 className="text-sm font-bold text-slate-950">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Field({ label }: { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input className="mt-2 h-9 w-full rounded-md border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100" />
    </label>
  );
}

function PieLabel({
  cx,
  cy,
  midAngle,
  outerRadius,
  name,
  value,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  name?: string;
  value?: number;
}) {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    outerRadius === undefined
  ) {
    return null;
  }

  const radius = outerRadius + 28;
  const radians = (-midAngle * Math.PI) / 180;
  const x = cx + radius * Math.cos(radians);
  const y = cy + radius * Math.sin(radians);
  const anchor = x > cx ? "start" : "end";

  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      dominantBaseline="central"
      className="fill-slate-600 text-[10px]"
    >
      {name} ({value}%)
    </text>
  );
}

function ActionIcon({ type }: { type: "view" | "edit" | "delete" }) {
  const colors = {
    view: "text-cyan-700",
    edit: "text-blue-600",
    delete: "text-rose-500",
  };

  return (
    <button
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${colors[type]} hover:bg-slate-100`}
      aria-label={type}
    >
      {type === "view" && (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )}
      {type === "edit" && (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 19h4L19 9l-4-4L5 15v4Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === "delete" && (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 7h12M10 7V5h4v2m-6 3v9m4-9v9m4-9v9M8 7l1 14h6l1-14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function DeansListerPage() {
  const [search, setSearch] = useState("");
  const [chartsReady, setChartsReady] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setChartsReady(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return students;

    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(query) ||
        student.program.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="bg-[#0f5b78] px-6 py-5 text-white shadow-sm">
        <div className="mx-auto max-w-[1440px]">
          <h1 className="text-lg font-bold leading-tight">
            Dean&apos;s Lister Analytics Dashboard
          </h1>
          <p className="mt-1 text-xs text-cyan-50">
            Learning Management System - Academic Excellence Tracking
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-6 py-6">
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Dean's Listers"
            value="248"
            detail="+12% from last term"
            icon={<MedalIcon />}
          />
          <KpiCard
            title="Average GPA"
            value="3.87"
            detail="+0.05 from last term"
            icon={<UsersIcon />}
          />
          <KpiCard title="Highest GPA" value="4.00" icon={<MedalIcon />} />
          <KpiCard
            title="Programs Represented"
            value="15"
            icon={<GraduationIcon />}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
          <aside className={`${cardClass} p-5`}>
            <h2 className="text-sm font-bold text-slate-950">Filters</h2>

            <div className="mt-5 space-y-4">
              <Field label="Academic Year" />
              <Field label="Semester/Term" />
              <Field label="Program" />
              <Field label="Year Level" />
            </div>

            <div className="mt-7">
              <div className="mb-4 flex items-center gap-2 text-xs font-bold text-slate-700">
                <svg className="h-4 w-4 text-cyan-700" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 4v16M4 12h16M7 7l10 10M17 7 7 17"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
                GPA Standard
              </div>
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span>Minimum GPA</span>
                <span className="font-bold text-cyan-700">3.50</span>
              </div>
              <input
                type="range"
                min="3"
                max="4"
                step="0.1"
                defaultValue="3.5"
                className="mt-3 w-full accent-cyan-700"
              />
              <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                <span>3.0</span>
                <span>3.5</span>
                <span>4.0</span>
              </div>
              <p className="mt-4 rounded-md bg-cyan-50 p-3 text-[11px] leading-relaxed text-slate-600">
                Note: Students with GPA of 3.50 or higher qualify for Dean&apos;s
                Lister recognition.
              </p>
              <button className="mt-4 h-9 w-full rounded-md bg-cyan-50 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100">
                Clear Filters
              </button>
            </div>
          </aside>

          <div className="grid gap-5">
            <Panel title="Dean's Lister Trend Over Time">
              <div className="h-72">
                {chartsReady && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData} margin={{ left: 0, right: 16, top: 10 }}>
                      <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                      <XAxis dataKey="term" tick={{ fontSize: 11 }} tickLine={false} />
                      <YAxis
                        domain={[0, 260]}
                        ticks={[0, 65, 130, 195, 260]}
                        tick={{ fontSize: 11 }}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={24} />
                      <Line
                        type="monotone"
                        dataKey="count"
                        name="Dean's Listers"
                        stroke="#0f5b78"
                        strokeWidth={2.5}
                        dot={{ r: 5, fill: "#facc15", stroke: "#0f5b78", strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Panel>

            <div className="grid gap-5 lg:grid-cols-2">
              <Panel title="Dean's Listers by Program">
                <div className="h-72">
                  {chartsReady && (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={programData} margin={{ top: 12, right: 8, bottom: 6 }}>
                        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                        <XAxis dataKey="program" tick={{ fontSize: 10 }} tickLine={false} />
                        <YAxis tick={{ fontSize: 11 }} tickLine={false} />
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={24} />
                        <Bar
                          dataKey="count"
                          name="Number of Students"
                          fill="#0f5b78"
                          radius={[5, 5, 0, 0]}
                          maxBarSize={44}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Panel>

              <Panel title="Distribution by Year Level">
                <div className="h-72">
                  {chartsReady && (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={yearData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="52%"
                          outerRadius={78}
                          labelLine={false}
                          label={PieLabel}
                        >
                          {yearData.map((item) => (
                            <Cell key={item.name} fill={item.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </Panel>
            </div>
          </div>
        </section>

        <Panel title="Key Insights">
          <div className="space-y-4">
            {[
              {
                title: "Growing Excellence",
                text: "Student share achieved a 12% YoY GPA increase. 46% of Dean's Listers improved academic performance across disciplines.",
                color: "bg-emerald-50 text-emerald-600",
                icon: "up",
              },
              {
                title: "Top Program",
                text: "BS Computer Science leads with 45 students. More achievements are being logged among new batches of students.",
                color: "bg-amber-50 text-amber-600",
                icon: "medal",
              },
              {
                title: "Year Level Distribution",
                text: "Third year students comprise a third of all Dean's Listers, demonstrating strong retention and consistent academic performance.",
                color: "bg-blue-50 text-blue-600",
                icon: "group",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${item.color}`}>
                  {item.icon === "up" && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 15 4-4 3 3 6-7M15 7h3v3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {item.icon === "medal" && <MedalIcon />}
                  {item.icon === "group" && <UsersIcon />}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <section className={cardClass}>
          <div className="flex flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between">
            <h2 className="text-sm font-bold text-slate-950">
              Top Performing Students
            </h2>
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
                  <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search students or programs..."
                  className="h-9 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 sm:w-80"
                />
              </label>
              <button className="h-9 rounded-md border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                Export CSV
              </button>
              <button className="h-9 rounded-md bg-amber-400 px-4 text-xs font-bold text-white transition hover:bg-amber-500">
                + Add Record
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-xs">
              <thead className="border-y border-slate-200 bg-slate-50 text-[10px] uppercase text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Student Name</th>
                  <th className="px-5 py-3 font-semibold">Program</th>
                  <th className="px-5 py-3 font-semibold">Year Level</th>
                  <th className="px-5 py-3 font-semibold">GPA</th>
                  <th className="px-5 py-3 font-semibold">Term</th>
                  <th className="px-5 py-3 font-semibold">Award Date</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {student.name}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{student.program}</td>
                    <td className="px-5 py-4 text-slate-600">{student.yearLevel}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-white">
                        {student.gpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{student.term}</td>
                    <td className="px-5 py-4 text-slate-600">{student.awardDate}</td>
                    <td className="px-5 py-4 text-right">
                      <ActionIcon type="view" />
                      <ActionIcon type="edit" />
                      <ActionIcon type="delete" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing 1 to {filteredStudents.length} of {filteredStudents.length} records
            </span>
            <div className="flex items-center gap-2">
              <button className="h-8 w-8 rounded-md border border-slate-200 text-slate-400">
                &lt;
              </button>
              <button className="h-8 w-8 rounded-md bg-[#0f5b78] font-semibold text-white">
                1
              </button>
              <button className="h-8 w-8 rounded-md border border-slate-200 text-slate-600">
                2
              </button>
              <button className="h-8 w-8 rounded-md border border-slate-200 text-slate-600">
                &gt;
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
