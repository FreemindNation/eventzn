import prisma from "@/lib/prisma";

export async function registerUserForEvent(userId: string, eventId: string) {
  try {
    // Check if user is already registered
    const existingRegistration = await prisma.registration.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existingRegistration) {
      throw new Error("You are already registered for this event.");
    }

    // Create new registration
    const registration = await prisma.registration.create({
      data: { userId, eventId },
    });

    return { success: true, registration };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Failed to register for the event.");
  }
}
