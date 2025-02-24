"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyPoundIcon,
} from "@heroicons/react/24/outline";

import { FormattedEvent } from "@/types";
import PaginationControls from "@/components/pagination";
import { fetchFilteredEvents } from "@/lib/data";
import EventSearchFilter from "@/components/event-search-filter";
import { formatDate, formatPrice, truncateDescription, capitaliseFirstWord } from "@/lib/utils";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams?.get("page") || "1", 10);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "All";

  const [events, setEvents] = useState<FormattedEvent[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { events, totalEvents } = await fetchFilteredEvents(
          query,
          category,
          currentPage
        );

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
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading events...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <Card
                key={event.id}
                className="shadow-lg rounded-lg bg-white dark:bg-gray-900 transition-all duration-300 border border-transparent hover:border-purple-500 hover:shadow-purple-500/50"
              >
                <CardHeader className="p-0">
                  <Image
                    alt={event.title}
                    className="object-cover w-full h-60 rounded-t-lg"
                    height={200}
                    src={event.imageUrl || "/placeholder.jpg"}
                    width={350}
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <h2 className="text-lg font-semibold mt-2 text-gray-900 dark:text-white">
                    {capitaliseFirstWord(event.title)}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 dark:text-white">
                    {truncateDescription(event.description)}
                  </p>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-4 dark:text-white">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{formatDate(event.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-3  dark:text-white">
                    <MapPinIcon className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-3 dark:text-white">
                    <CurrencyPoundIcon className="w-5 h-5" />
                    {event.isFree ? (
                      <span className="font-bold text-green-600 bg-green-100 dark:bg-green-600 dark:text-green-100 px-2 py-1 rounded-md shadow-sm">
                        Free
                      </span>
                    ) : (
                      <span className="font-bold">{formatPrice(event.ticketPrice)}</span>
                    )}
                  </div>
                </CardBody>
                <CardFooter className="p-4">
                  <Link
                    className="text-secondary font-semibold hover:underline"
                    href={`/events/${event.id}`}
                  >
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
