"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
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
import { RoleSwitcher } from "../components/RoleSwitcher";

type Student = {
  id: number;
  name: string;
  program: string;
  yearLevel: string;
  gpa: number;
  term: string;
  awardDate: string;
  email: string;
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
  { program: "Others", count: 58 },
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
    email: "maria.santos@university.edu",
  },
  {
    id: 2,
    name: "Juan Dela Cruz",
    program: "BS Information Technology",
    yearLevel: "2nd Year",
    gpa: 3.95,
    term: "2025-1",
    awardDate: "2/15/2026",
    email: "juan.delacruz@university.edu",
  },
  {
    id: 3,
    name: "Anna Reyes",
    program: "BS Business Administration",
    yearLevel: "4th Year",
    gpa: 3.92,
    term: "2025-1",
    awardDate: "2/15/2026",
    email: "anna.reyes@university.edu",
  },
  {
    id: 4,
    name: "Carlos Garcia",
    program: "BS Nursing",
    yearLevel: "1st Year",
    gpa: 3.88,
    term: "2025-1",
    awardDate: "2/15/2026",
    email: "carlos.garcia@university.edu",
  },
  {
    id: 5,
    name: "Sofia Martinez",
    program: "BS Psychology",
    yearLevel: "3rd Year",
    gpa: 3.85,
    term: "2025-1",
    awardDate: "2/15/2026",
    email: "sofia.martinez@university.edu",
  },
  {
    id: 6,
    name: "Miguel Ramos",
    program: "BS Computer Science",
    yearLevel: "2nd Year",
    gpa: 3.82,
    term: "2024-2",
    awardDate: "11/20/2025",
    email: "miguel.ramos@university.edu",
  },
  {
    id: 7,
    name: "Elena Cruz",
    program: "BS Engineering",
    yearLevel: "4th Year",
    gpa: 3.79,
    term: "2024-2",
    awardDate: "11/20/2025",
    email: "elena.cruz@university.edu",
  },
  {
    id: 8,
    name: "Rafael Torres",
    program: "BS Information Technology",
    yearLevel: "1st Year",
    gpa: 3.75,
    term: "2024-2",
    awardDate: "11/20/2025",
    email: "rafael.torres@university.edu",
  },
];

const gpaTrend = [
  { term: "2024-2025 1st", gpa: 3.82 },
  { term: "2024-2025 2nd", gpa: 3.85 },
  { term: "2025-2026 1st", gpa: 3.89 },
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

function TrophyIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4h8v4a4 4 0 0 1-8 0V4ZM8 7H5a3 3 0 0 0 3 3M16 7h3a3 3 0 0 1-3 3M12 12v4M9 20h6M10 16h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function EyeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 12s3.2-5 9-5 9 5 9 5-3.2 5-9 5-9-5-9-5Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="2.2" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 7h16v10H4V7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m5 8 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 7V5h8v2M4 8h16v11H4V8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M4 12h16" stroke="currentColor" strokeWidth="1.8" />
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
  icon: ReactNode;
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
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-white">
        {icon}
      </div>
    </section>
  );
}

function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
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

  const radius = outerRadius + 30;
  const radians = (-midAngle * Math.PI) / 180;
  const x = cx + radius * Math.cos(radians);
  const y = cy + radius * Math.sin(radians);

  return (
    <text
      x={x}
      y={y}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="fill-slate-600 text-[10px]"
    >
      {name} ({value}%)
    </text>
  );
}

function InfoTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-md border border-slate-200 p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${tone}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold text-slate-500">{label}</p>
        <p className="truncate text-sm font-bold text-slate-950">{value}</p>
      </div>
    </div>
  );
}

function StudentModal({
  student,
  chartsReady,
  onClose,
}: {
  student: Student;
  chartsReady: boolean;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-24">
      <section className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <header className="flex items-start justify-between bg-[#0f5b78] px-6 py-5 text-white">
          <div>
            <h2 className="text-lg font-bold leading-tight">{student.name}</h2>
            <p className="mt-1 text-xs text-cyan-50">{student.program}</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-white transition hover:bg-white/15"
            aria-label="Close student details"
          >
            x
          </button>
        </header>

        <div className="grid gap-4 p-5">
          <div className="grid gap-3 md:grid-cols-4">
            <InfoTile
              icon={<MedalIcon />}
              label="GPA"
              value={student.gpa.toFixed(2)}
              tone="bg-amber-400 text-white"
            />
            <InfoTile
              icon={<GraduationIcon />}
              label="Year Level"
              value={student.yearLevel.replace(" Year", "")}
              tone="bg-blue-500 text-white"
            />
            <InfoTile
              icon={<BriefcaseIcon />}
              label="Term"
              value={student.term}
              tone="bg-violet-500 text-white"
            />
            <InfoTile
              icon={<MailIcon />}
              label="Email"
              value={student.email}
              tone="bg-emerald-500 text-white"
            />
          </div>

          <section className="rounded-md border border-slate-200 p-5">
            <h3 className="text-sm font-bold text-slate-950">GPA Trend</h3>
            <div className="mt-4 h-52">
              {chartsReady && (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={gpaTrend} margin={{ left: 0, right: 16, top: 8 }}>
                    <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                    <XAxis dataKey="term" tick={{ fontSize: 10 }} tickLine={false} />
                    <YAxis
                      domain={[3.7, 4]}
                      ticks={[3.7, 3.8, 3.9, 4]}
                      tick={{ fontSize: 10 }}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="gpa"
                      stroke="#0f5b78"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#0f5b78" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export function AnalyticsAccessDashboard({
  accessLabel = "Registrar",
}: {
  accessLabel?: string;
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
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

  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
  const visibleStudents = filteredStudents.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  const firstShown = filteredStudents.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const lastShown = Math.min(page * pageSize, filteredStudents.length);

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
            icon={<TrophyIcon />}
          />
          <KpiCard title="Highest GPA" value="4.00" icon={<TrendIcon />} />
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

            <button className="mt-6 h-9 w-full rounded-md bg-cyan-50 text-xs font-semibold text-cyan-700 transition hover:bg-cyan-100">
              Clear Filters
            </button>
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
                  {item.icon === "up" && <TrendIcon />}
                  {item.icon === "medal" && <MedalIcon />}
                  {item.icon === "group" && <GraduationIcon />}
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
            <div>
              <h2 className="text-sm font-bold text-slate-950">
                Top Performing Students
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Read-only view ({accessLabel} access)
              </p>
            </div>
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
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search students or programs..."
                  className="h-9 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs outline-none transition focus:border-cyan-700 focus:ring-2 focus:ring-cyan-100 sm:w-80"
                />
              </label>
              <button className="h-9 rounded-md border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                Export CSV
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
                {visibleStudents.map((student) => (
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
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md text-cyan-700 transition hover:bg-slate-100"
                        aria-label={`View ${student.name}`}
                      >
                        <EyeIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Showing {firstShown} to {lastShown} of {filteredStudents.length} records
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={page === 1}
                className="h-8 w-8 rounded-md border border-slate-200 text-slate-400 disabled:opacity-50"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`h-8 w-8 rounded-md border text-xs font-semibold ${
                      page === pageNumber
                        ? "border-[#0f5b78] bg-[#0f5b78] text-white"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setPage((current) => Math.min(totalPages, current + 1))
                }
                disabled={page === totalPages}
                className="h-8 w-8 rounded-md border border-slate-200 text-slate-600 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>
      </div>

      {selectedStudent && (
        <StudentModal
          student={selectedStudent}
          chartsReady={chartsReady}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </main>
  );
}

export default function RegistrarDashboardPage() {
  return <AnalyticsAccessDashboard accessLabel="Registrar" />;
}
