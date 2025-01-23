"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import PaginationControls from "@/components/pagination";
import { fetchEvents } from "@/lib/data";

interface Event {
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  ticketPrice: string | null;
  createdAt: string;
  imageUrl: string | null;
  organiser: string;
}


export default function EventsPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);

  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { events, totalEvents } = await fetchEvents(currentPage, 6);

      setEvents(events);
      setTotalPages(Math.ceil(totalEvents / 6));
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Upcoming Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.title}
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
                <span className="font-medium">Ticket Price:</span> {event.ticketPrice}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <span className="font-medium">Organiser:</span> {event.organiser}
              </p>
            </CardBody>
            <CardFooter className="p-4">
              <Link className="text-secondary font-semibold hover:underline" href="/">
                Learn More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <PaginationControls totalPages={totalPages} />
      </div>
    </div>
  );
}
