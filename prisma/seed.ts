import bcrypt from "bcrypt";
import { fakerEN_GB as faker } from "@faker-js/faker";

import prisma from "@/lib/prisma";
import { users, events } from "@/lib/mock-data";



async function seedDatabase() {
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await prisma.registration.deleteMany({});
    await prisma.event.deleteMany({});
    await prisma.user.deleteMany({});
    console.log("Existing data cleared!");

    // Seed users
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );

    await prisma.user.createMany({ data: hashedUsers });
    console.log("Users seeded successfully!");

    // Seed events
    const adminUser = await prisma.user.findFirst({
      where: { role: "ADMIN" },
    });

    if (!adminUser || !adminUser.id) {
      throw new Error("Admin user not found or missing ID. Please seed users first.");
    }

    const eventsWithCreatedBy = events.map((event) => ({
      ...event,
      createdBy: adminUser.id,
    }));

    await prisma.event.createMany({ data: eventsWithCreatedBy });
    console.log("Events seeded successfully!");

    // Seed registrations
    const usersInDb = await prisma.user.findMany();
    const eventsInDb = await prisma.event.findMany();

    const registrations = Array.from({ length: 3 }).map(() => ({
      userId: faker.helpers.arrayElement<{ id: string }>(usersInDb).id,
      eventId: faker.helpers.arrayElement<{ id: string }>(eventsInDb).id,
    }));

    await prisma.registration.createMany({ data: registrations });
    console.log("Registrations seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
