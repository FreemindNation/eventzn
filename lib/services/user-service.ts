import { formatDate } from "../utils";

import prisma from "@/lib/prisma";


export async function getUserRegistrations(userId: string) {
  try {
    const registrations = await prisma.registration.findMany({
      where: { userId },
      include: { event: true }, 
    });

    return registrations.map((registration) => ({
      id: registration.event.id,
      title: registration.event.title,
      startTime: formatDate(registration.event.startTime),
      endTime: formatDate(registration.event.endTime),
      location: registration.event.location,
      category: registration.event.category,
      imageUrl: registration.event.imageUrl,
    }));
  } catch (error) {
    console.error("Error fetching user registrations:", error);
    throw new Error("Failed to fetch user events.");
  }
}
