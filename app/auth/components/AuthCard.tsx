"use client";
import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthCard({
  onModeChange,
}: {
  onModeChange?: (mode: "signin" | "signup") => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="w-full ">
      {mode === "signin" ? (
        <SignIn
          onSwitch={() => {
            setMode("signup");
            onModeChange?.("signup");
          }}
        />
      ) : (
        <SignUp
          onSwitch={() => {
            setMode("signin");
            onModeChange?.("signin");
          }}
        />
      )}
    </div>
  );
}
