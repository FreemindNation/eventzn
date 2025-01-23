

import prisma from "@/lib/prisma";
import { formatDate, truncateDescription, formatPrice } from "@/lib/utils";

interface FormattedEvent {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  ticketPrice: string;
  createdAt: string;
  imageUrl?: string;
  organiser: string;
}

interface PaginatedEvents {
  events: FormattedEvent[];
  totalEvents: number;
}

export async function getPaginatedEvents(page: number, perPage: number): Promise<PaginatedEvents> {
  const skip = (page - 1) * perPage;

  try {
    console.log("Pagination Debug:", { page, perPage, skip });

    const events = await prisma.event.findMany({
      skip,
      take: perPage,
      include: {
        createdByUser: {
          select: { name: true },
        },
      },
    });

    console.log("Fetched Events:", events);

    if (!events || events.length === 0) {
      console.warn("No events found for the given page and perPage.");
      return { events: [], totalEvents: 0 };
    }

    const totalEvents = await prisma.event.count();
    console.log("Total Events Count:", totalEvents);

    const formattedEvents: FormattedEvent[] = events.map((event) => ({
      title: event.title,
      description: truncateDescription(event.description ?? "", 100),
      startTime: formatDate(event.startTime),
      endTime: formatDate(event.endTime),
      location: event.location,
      category: event.category,
      ticketPrice: event.isFree ? "Free" : formatPrice(event.ticketPrice ?? 0),
      createdAt: formatDate(event.createdAt),
      imageUrl: event.imageUrl ?? '',
      organiser: event.createdByUser?.name ?? "Unknown",
    }));

    console.log("Formatted Events:", formattedEvents);

    return { events: formattedEvents, totalEvents };
  } catch (error) {
    console.error("Error in getPaginatedEvents service:", error);
    // Return a consistent error structure
    throw new Error("Failed to fetch events");
  }
}