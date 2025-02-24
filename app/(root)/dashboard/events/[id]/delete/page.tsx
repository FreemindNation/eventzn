import { notFound } from "next/navigation";
import { Button } from "@heroui/button";
import Link from "next/link";
import { Metadata } from "next";

import { getEvent } from "@/lib/services/event-service";
import { deleteEventAction } from "@/lib/actions/delete-event";


export const metadata: Metadata = {
  title: 'Dashboard | Events | Delete Event',
};


export default async function DeleteEventPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) return notFound(); 

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Delete Event</h1>
      <p className="mb-4">Are you sure you want to delete this event?</p>

      <div className="p-4 border rounded bg-gray-100 dark:bg-gray-800">
        <h2 className="text-lg font-semibold">{event.title}</h2>
        <p className="text-gray-500">{event.location}</p>
        <p className="text-gray-500">{new Date(event.startTime).toLocaleString()}</p>
      </div>

      <div className="flex gap-4 mt-6">
        <form action={deleteEventAction.bind(null, id)}>
          <Button color="danger" type="submit">
            Yes, Delete
          </Button>
        </form>
        <Button as={Link} color="secondary" href="/dashboard">
          Cancel
        </Button>
      </div>
    </div>
  );
}
