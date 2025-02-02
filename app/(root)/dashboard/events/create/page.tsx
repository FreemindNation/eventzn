"use client";

import CreateEventForm from "@/components/event-form";

export default function CreateEventPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      <CreateEventForm />
    </div>
  );
}
