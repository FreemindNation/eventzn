

import prisma from "@/lib/prisma";
import { formatDate, truncateDescription, formatPrice } from "@/lib/utils";

interface FormattedEvent {
  id: string,
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  isFree: boolean,
  ticketPrice: string | null;
  createdAt: string;
  imageUrl?: string;
  organiser: string;
}

interface PaginatedEvents {
  events: FormattedEvent[];
  totalEvents: number;
}

export async function getFilteredEvents(
  page: number,
  perPage: number,
  query: string = "",
  category: string = ""
): Promise<PaginatedEvents> {
  const skip = (page - 1) * perPage;

  try {
    const where: any = {};

    if (query) {
      where.title = { contains: query, mode: "insensitive" }; 
    }
    if (category && category !== "All") {
      where.category = category;
    }

    const events = await prisma.event.findMany({
      where,
      skip,
      take: perPage,
      include: {
        createdByUser: {
          select: { name: true },
        },
        _count: { select: { registrations: true } },
      },
    });

    const totalEvents = await prisma.event.count({ where });

    const formattedEvents: FormattedEvent[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: truncateDescription(event.description ?? "", 100),
      startTime: formatDate(event.startTime),
      endTime: formatDate(event.endTime),
      location: event.location,
      category: event.category,
      isFree: event.isFree,
      ticketPrice: formatPrice(event.ticketPrice ?? 0),
      createdAt: formatDate(event.createdAt),
      imageUrl: event.imageUrl ?? "",
      organiser: event.createdByUser?.name ?? "Unknown",
      registrations: event._count.registrations,
    }));

    return { events: formattedEvents, totalEvents };
  } catch (error) {
    console.error("Error in getFilteredEvents service:", error);
    
    return { events: [], totalEvents: 0 };
  }
}


export async function getEvent(id: string): Promise<FormattedEvent | null> {
  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      createdByUser: {
        select: { name: true },
      },
    },
  });

  if (!event) {
    return null; 
  }
  
  return {
    id: event.id,
    title: event.title,
    description: event.description ?? "",
    startTime: formatDate(event.startTime),
    endTime: formatDate(event.endTime),
    location: event.location,
    category: event.category,
    isFree: event.isFree,
    ticketPrice: formatPrice(event.ticketPrice ?? 0),
    createdAt: formatDate(event.createdAt),
    imageUrl: event.imageUrl || "",
    organiser: event.createdByUser?.name ?? "Unknown",
  };
}