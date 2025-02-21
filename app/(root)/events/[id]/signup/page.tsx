"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Alert } from "@heroui/alert";
import dayjs from "dayjs"; 
import { Link } from "@heroui/link";

import { fetchEvent } from "@/lib/data";
import { capitaliseFirstWord, formatDate, formatPrice } from "@/lib/utils";

export default function SignUpEventPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (!params.id) return;

    const loadEvent = async () => {
      try {
        const eventData = await fetchEvent(params.id as string);
        
        setEvent(eventData);
      } catch (err) {
        setError("Failed to load event details.");
      }
    };

    loadEvent();
  }, [params.id]);

  const handleBookTicket = async () => {
    if (!session?.user) {
      router.push("/sign-in");

      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: session.user.id,
          eventId: params.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book ticket.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  
  const getGoogleCalendarLink = () => {
    if (!event) return "#";

    const startTime = dayjs(event.startTime).format("YYYYMMDDTHHmmss[Z]");
    const endTime = dayjs(event.endTime).format("YYYYMMDDTHHmmss[Z]");
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(event.description || "Join us for this exciting event!");
    const location = encodeURIComponent(event.location);

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md  mt-40 rounded-lg">
      {error && <p className="text-red-500">{error}</p>}

      {!event ? (
        <p>Loading event details...</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">{capitaliseFirstWord(event.title)}</h1>
          <p className="text-gray-500">{event.description}</p>
          <p className="mt-2 font-semibold">Date & Time: {formatDate(event.startTime)} - {formatDate(event.endTime)}</p>
          <p className="mt-1">Location: {event.location}</p>
          <p className="mt-1">Category: {event.category}</p>
          <p className="mt-1 font-semibold">
            {event.isFree ? "Free Event" : `Ticket Price: ${formatPrice(event.ticketPrice)}`}
          </p>

          {!success && (
            <Button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400" disabled={isLoading} onPress={handleBookTicket}>
              {isLoading ? "Booking..." : "Book Ticket"}
            </Button>
          )}

          {success && (
            <Modal isOpen={success} size="3xl" onClose={() => setSuccess(false)}>
              <ModalContent>
                <ModalHeader>Success!</ModalHeader>
                <ModalBody>
                  <Alert className="text-green-700 bg-green-100 border border-green-400 p-4 rounded-md" color="success" variant="solid">
                    <strong className="font-bold">🎉 You have successfully registered for this event!</strong>
                  </Alert>
                </ModalBody>
                <ModalFooter className="flex justify-between">
                  <Button as={Link} color="secondary" href="/" variant="light">
                    View more events
                  </Button>
                  <Button as={Link} color="secondary" href="/profile" variant="light">
                    My Events
                  </Button>
                  <Button
                    as={Link}
                    color="secondary"
                    href={getGoogleCalendarLink()}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="light"
                  >
                    Add to Calendar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}
