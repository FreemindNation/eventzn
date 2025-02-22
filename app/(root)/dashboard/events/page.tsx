"use client";

import { Suspense } from "react";

import EventsPage from "@/components/events-page";

export default function EventsPageWrapper() {
  return (
    <Suspense fallback={<p>Loading Events...</p>}>
      <EventsPage />
    </Suspense>
  );
}
