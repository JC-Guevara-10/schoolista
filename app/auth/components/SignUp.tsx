"use client";
import React, { useState } from "react";
import { authAction } from "../authAction";

type Gender = "male" | "female" | "other" | "";

export default function SignUp({ onSwitch }: { onSwitch: () => void }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
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

    const res = await authAction({
      mode: "signup",
      name,
      email,
      password,
      gender,
      birthDate,
      address,
      contactNumber,
      studentNumber,
    });

    if (!res.success) {
      setError(res.error || "Signup failed");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-6 rounded-xl shadow-md"
      >
        <h3 className="text-xl font-semibold">Create account</h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Full name
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Gender</label>
            <select
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Birthday
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">Address</label>
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Contact number
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 mb-1">
              Student number
            </label>
            <input
              className="w-full px-3 py-2 rounded-md border border-slate-200"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
            />
          </div>

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
            <label className="block text-xs text-slate-600 mb-1">
              Password
            </label>
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
            {submitting ? "Creating..." : "Create account"}
          </button>
        </div>

        <div className="mt-3 text-sm text-center">
          <button
            type="button"
            className="text-slate-600 underline"
            onClick={onSwitch}
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  );
}
