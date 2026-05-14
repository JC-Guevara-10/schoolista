"use client";
import React, { useState } from "react";
import { authAction } from "../authAction";

export default function SignIn({ onSwitch }: { onSwitch: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function validateEmailDomain(e: string) {
    return e.trim().toLowerCase().endsWith("@olopsc.edu.ph");
  }

  async function handleSubmit(ev?: React.FormEvent) {
    ev?.preventDefault();
    setError(null);
    setSubmitting(true);

    if (!validateEmailDomain(email)) {
      setError("Email must be an @olopsc.edu.ph address.");
      setSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSubmitting(false);
      return;
    }

    const res = await authAction({ mode: "signin", email, password });
    if (!res.success) {
      setError(res.error || "Sign in failed");
      setSubmitting(false);
      return;
    } else {
      // redirect to home page
      window.location.href = "/dashboard"; // You can change this to the desired page after sign-in
    }

    setSubmitting(false);
  }

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-xl font-semibold">Sign in</h3>
        <p className="text-sm text-slate-500">
          Sign in with your OTAS account credentials.
        </p>

        <div>
          <label className="block text-xs text-slate-600 mb-1">Email</label>
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-600 mb-1">Password</label>
          <input
            className="w-full px-3 py-2 rounded-md border border-slate-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <button
          className="w-full mt-2 bg-[#0f3b82] text-white py-2 rounded-full"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <div className="mt-3 text-sm text-center">
          <button
            type="button"
            className="text-slate-600 underline"
            onClick={onSwitch}
          >
            Don&apos;t have an account? Sign up
          </button>
        </div>
      </form>
    </div>
  );
}
