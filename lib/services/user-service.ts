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



export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        _count: {
          select: { registrations: true },
        },
      },
      orderBy: { createdAt: "desc" }, 
    });
     
    
    return users.map(user => ({
      id: user.id,
      name: user.name || "Unnamed",
      email: user.email,
      image: user.image || "",
      registeredEvents: user._count.registrations,
      createdAt: user.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

