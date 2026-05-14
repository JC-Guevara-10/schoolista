
type Metric = {
  label: string;
  value: string;
  detail: string;
};

type WorkItem = {
  title: string;
  status: string;
  owner: string;
};

type RolePageProps = {
  role: string;
  subtitle: string;
  metrics: Metric[];
  workItems: WorkItem[];
  accent: string;
};

const cardClass =
  "rounded-lg border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.12)]";

export function RolePage({
  role,
  subtitle,
  metrics,
  workItems,
  accent,
}: RolePageProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="bg-[#0f5b78] px-6 py-5 text-white shadow-sm">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-lg font-bold leading-tight">
              {role} Dashboard
            </h1>
            <p className="mt-1 text-xs text-cyan-50">{subtitle}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-6 py-6">
        <section className="grid gap-5 md:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className={`${cardClass} p-6`}>
              <p className="text-xs font-medium text-slate-500">
                {metric.label}
              </p>
              <p className="mt-2 text-3xl font-bold leading-none text-slate-950">
                {metric.value}
              </p>
              <p className={`mt-3 text-xs font-semibold ${accent}`}>
                {metric.detail}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className={cardClass}>
            <div className="border-b border-slate-100 px-5 py-4">
              <h2 className="text-sm font-bold text-slate-950">Current Work</h2>
            </div>
            <div className="divide-y divide-slate-100">
              {workItems.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1fr)_160px_160px] md:items-center"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Assigned to {item.owner}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-700">
                    {item.status}
                  </span>
                  <button className="h-9 rounded-md border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    Open
                  </button>
                </div>
              ))}
            </div>
          </div>

          <aside className={`${cardClass} p-5`}>
            <h2 className="text-sm font-bold text-slate-950">Quick Actions</h2>
            <div className="mt-4 grid gap-3">
              <button className="h-10 rounded-md bg-amber-400 px-4 text-xs font-bold text-white transition hover:bg-amber-500">
                Create Record
              </button>
              <button className="h-10 rounded-md border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                Export Report
              </button>
              <button className="h-10 rounded-md border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                View Requests
              </button>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
