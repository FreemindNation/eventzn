"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation"; // ✅ Import `useParams`
import { fetchEvent } from "@/lib/data";

export default function SignUpEventPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams(); // ✅ Get params dynamically
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return; // ✅ Ensure `params.id` is ready before fetching

    const loadEvent = async () => {
      try {
        const eventData = await fetchEvent(params.id as string);
        setEvent(eventData);
      } catch (err) {
        setError("Failed to load event details.");
      }
    };

    loadEvent();
  }, [params.id]); // ✅ Only fetch when `params.id` is available

  const handleBookTicket = async () => {
    if (!session?.user) {
      router.push("/sign-in");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          eventId: params.id, // ✅ Now safe to access `params.id`
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book ticket.");
      }

      setSuccess("You have successfully registered for this event!");
      // (Next) Add Google Calendar integration here

    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {error && <p className="text-red-500">{error}</p>}
      {!event ? (
        <p>Loading event details...</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
          <p className="text-gray-700">{event.description}</p>
          <p className="mt-2 font-semibold">
            Date & Time: {event.startTime} - {event.endTime}
          </p>
          <p className="mt-1">Location: {event.location}</p>
          <p className="mt-1">Category: {event.category}</p>
          <p className="mt-1 font-semibold">
            {event.isFree ? "Free Event" : `Ticket Price: £${event.ticketPrice}`}
          </p>

          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            disabled={isLoading}
            onClick={handleBookTicket}
          >
            {isLoading ? "Booking..." : "Book Ticket"}
          </button>

          {success && <p className="text-green-500 mt-2">{success}</p>}
        </>
      )}
    </div>
  );
}
