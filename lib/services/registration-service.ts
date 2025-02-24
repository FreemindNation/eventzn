import prisma from "@/lib/prisma";

export async function registerUserForEvent(userId: string, eventId: string) {
  const existingRegistration = await prisma.registration.findUnique({
    where: { userId_eventId: { userId, eventId } },
  });

  if (existingRegistration) {
    throw new Error("You are already registered for this event.");
  }

  const registration = await prisma.registration.create({
    data: { userId, eventId },
  });

  return { success: true, registration };
}
