"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Alert } from "@heroui/alert";
import { Link } from "@heroui/link";
import { CalendarIcon, MapPinIcon, TagIcon, TicketIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs"; 

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

    setIsLoading(true);

    const loadEvent = async () => {
      try {
        const eventData = await fetchEvent(params.id as string);

        if (!eventData) {
          throw new Error("Event data is null or undefined.");
        }
        setEvent(eventData);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setIsLoading(false);
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
        throw new Error(data.message || "Failed to book ticket.");
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
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-md mt-20 rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">🎟️ Confirm Your Ticket</h1>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
        Please review the event details below and click <strong>Book Ticket</strong> to confirm your ticket.
      </p>

      {error ? (
        <p className="text-red-500 text-center mb-4">{error}</p>
      ) : isLoading ? (
        <p className="text-gray-500 text-center">Loading event details...</p>
      ) : event ? (
        <>
          <h2 className="text-xl font-semibold text-center mb-4">{capitaliseFirstWord(event.title)}</h2>
          <p className="text-gray-500 text-center mb-4">{event.description}</p>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <CalendarIcon className="w-6 h-6 min-w-6 text-primary" />
              <span className="font-semibold">Date & Time:</span>
              <span>{formatDate(event.startTime)} - {formatDate(event.endTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <MapPinIcon className="w-6 h-6 text-primary" />
              <span className="font-semibold">Location:</span>
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <TagIcon className="w-6 h-6 text-primary" />
              <span className="font-semibold">Category:</span>
              <span>{event.category}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <TicketIcon className="w-6 h-6 text-primary" />
              <span className="font-semibold">Price:</span>
              <span>{event.isFree ? "Free Event" : formatPrice(event.ticketPrice)}</span>
            </div>
          </div>

          {!success && (
            <Button
              className="mt-6   text-white px-4 py-2 rounded hover:bg-blue-800 disabled:bg-gray-400"
              color="primary"
              disabled={isLoading}
              onPress={handleBookTicket}
            >
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
                <ModalFooter className="flex flex-wrap justify-center gap-2 mt-4 w-full">
                  <Button as={Link} className="w-full sm:w-auto" color="secondary" href="/" variant="light">
                    View more events
                  </Button>
                  <Button as={Link} className="w-full sm:w-auto" color="secondary" href="/profile" variant="light">
                    My Events
                  </Button>
                  <Button
                    as={Link}
                    className="w-full sm:w-auto"
                    color="secondary"
                    href={getGoogleCalendarLink()}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="light"
                  >
                    Add to Google Calendar
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <p className="text-gray-500 text-center">No event found.</p>
      )}
    </div>
  );
}
