

import { EventSchema } from "../validation";

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

interface EventData {
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location: string;
  category: string;
  imageUrl?: string;
  isFree: boolean;
  ticketPrice?: number;
  createdBy: string;
}

export async function createEvent(eventData: any) {
  try {

    if (!eventData) {
      throw new Error("Event data is missing or invalid.");
    }
    
    const formattedEvent = {
      ...eventData,
      startTime: new Date(eventData.startTime), 
      endTime: new Date(eventData.endTime),
    };
    
    const newEvent = await prisma.event.create({
      data: formattedEvent,
    });

    return newEvent;
  } catch (error) {
    console.error("Error in createEvent service:", error);
    throw new Error("Failed to create event.");
  }
}
