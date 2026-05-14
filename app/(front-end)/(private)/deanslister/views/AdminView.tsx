import React from "react";
import { RolePage } from "../components/admin/RolePage";

export default function AdminView() {
  const metrics = [
    {
      label: "Total Dean's Listers",
      value: "248",
      detail: "+12% from last term",
    },
    { label: "Average GPA", value: "3.87", detail: "+0.05 from last term" },
    { label: "Highest GPA", value: "4.00", detail: "" },
  ];

  const workItems = [
    {
      title: "Review scholarship applications",
      status: "In Progress",
      owner: "Admissions",
    },
    { title: "Publish dean's list report", status: "Open", owner: "Registry" },
  ];

  return (
    <RolePage
      role="Admin"
      subtitle="Learning Management System - Academic Excellence Tracking"
      metrics={metrics}
      workItems={workItems}
      accent="text-emerald-600"
    />
  );
}
