"use client";

import { Suspense } from "react";

import DashboardPage from "@/components/dashboard-page"; 

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <DashboardPage />
    </Suspense>
  );
}
