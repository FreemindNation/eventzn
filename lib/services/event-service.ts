

import prisma from "@/lib/prisma";
// import { formatDate, truncateDescription, formatPrice } from "@/lib/utils";
import { EventData, FormattedEvent } from "@/types";



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
          select: { name: true, id: true },
        },
        _count: { select: { registrations: true } },
      },
    });

    const totalEvents = await prisma.event.count({ where });

    const formattedEvents: FormattedEvent[] = events.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description ?? "", 
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      category: event.category,
      isFree: event.isFree,
      ticketPrice: event.ticketPrice ?? 0,
      createdAt: event.createdAt,
      imageUrl: event.imageUrl ?? "",
      createdBy: event.createdByUser?.name ?? 'Unknown',
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
        select: { name: true, id: true },
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
    startTime: event.startTime,
    endTime: event.endTime,
    location: event.location,
    category: event.category,
    isFree: event.isFree,
    ticketPrice: event.ticketPrice ?? 0,
    createdAt: event.createdAt,
    imageUrl: event.imageUrl || "",
    createdBy: event.createdByUser?.name ?? 'Unknown',
  };
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

export async function updateEvent(eventId: string, eventData: EventData) {
  try {
  
    
    
    const updatedEvent = await prisma.event.update({
      where: { id: eventId }, 
      data: {
        ...eventData,
        startTime: new Date(eventData.startTime), 
        endTime: new Date(eventData.endTime),
      },
    });

    return updatedEvent;
  } catch (error) {
    console.error("Error in updateEvent service:", error);
    throw new Error("Failed to update event.");
  }
}