import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <section className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-6 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-semibold text-slate-900">
          Academic Analytics System
        </h1>
        <p className="max-w-2xl text-center text-lg text-slate-600">
          Welcome to Schoolista. Open the Dean&apos;s Lister dashboard to view
          academic analytics and reports.
        </p>
        <Link
          href="/deanslister"
          className="inline-flex rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Open Dean&apos;s Lister Dashboard
        </Link>
      </section>
    </main>
  );
}
