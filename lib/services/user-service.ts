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



export async function getUsers(page = 1, limit = 10) {


    const skip = (page - 1) * limit;

    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          _count: { select: { registrations: true } },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.user.count(), 
    ]);
     
    
    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.name || "Unnamed",
        email: user.email,
        image: user.image || "",
        registeredEvents: user._count.registrations,
        createdAt: user.createdAt.toISOString(),
      })),
      totalUsers,
    };
  }


