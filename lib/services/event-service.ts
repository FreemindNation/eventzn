

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

export async function getPaginatedEvents(page: number, perPage: number): Promise<PaginatedEvents> {
  const skip = (page - 1) * perPage;

  try {
    

    const events = await prisma.event.findMany({
      skip,
      take: perPage,
      include: {
        createdByUser: {
          select: { name: true },
        },
      },
    });

    

    if (!events || events.length === 0) {
      console.warn("No events found for the given page and perPage.");
      
      return { events: [], totalEvents: 0 };
    }

    const totalEvents = await prisma.event.count();
    

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
      imageUrl: event.imageUrl ?? '',
      organiser: event.createdByUser?.name ?? "Unknown",
    }));

    

    return { events: formattedEvents, totalEvents };
  } catch (error) {
    console.error("Error in getPaginatedEvents service:", error);
    
    throw new Error("Failed to fetch events");
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