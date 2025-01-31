"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import PaginationControls from "@/components/pagination";
import { fetchFilteredEvents } from "@/lib/data";
import EventSearchFilter from "@/components/event-search-filter";

interface Event {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  isFree: boolean;
  ticketPrice: string | null;
  createdAt: string;
  imageUrl: string | null;
  organiser: string;
}

export default function EventsPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "All";

  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { events, totalEvents } = await fetchFilteredEvents(query, category, currentPage);
        
        setEvents(events);
        setTotalPages(Math.ceil(totalEvents / 6));
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, query, category]);

  

  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>

      {/* Search & Filter Bar */}
      <div className="mb-6">
        <EventSearchFilter />
      </div>

      {/* Events Grid */}
      {loading ? (
        <p className="text-center text-gray-600 dark:text-gray-400">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <Card
                key={event.id}
                className="shadow-lg border rounded-lg bg-white dark:bg-gray-800"
              >
                <CardHeader className="p-0">
                  <Image
                    alt={event.title}
                    className="object-cover w-full h-60 rounded-t-lg"
                    height={250}
                    src={event.imageUrl || "/placeholder.jpg"}
                    width={400}
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{event.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">Date:</span> {event.startTime}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">Location:</span> {event.location}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">Category:</span> {event.category}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">Ticket Price:</span> {""}
                    {event.isFree ? "Free" : `${event.ticketPrice ?? 0}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <span className="font-medium">Organiser:</span> {event.organiser}
                  </p>
                </CardBody>
                <CardFooter className="p-4">
                  <Link className="text-secondary font-semibold hover:underline" href={`/events/${event.id}`}>
                    Learn More
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 col-span-3">
              No events found.
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <PaginationControls totalPages={totalPages} />
      </div>
    </div>
  );
}
