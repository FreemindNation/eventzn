import { PrismaClient, Prisma } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const createPrismaClient = () => {
  const client = new PrismaClient();

  //Auto-Reconnect on Prisma Connection Issues
  client.$on(
    "error" as never,
    async (
      error:
        | Prisma.PrismaClientKnownRequestError
        | Prisma.PrismaClientUnknownRequestError
    ) => {
      console.error("Prisma Error:", error);

      if (
        error.message.includes("prepared statement") ||
        error.message.includes("does not exist") ||
        error.message.includes("already exists") ||
        error.message.includes("incorrect binary data format")
      ) {
        await client.$disconnect();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await client.$connect();
      }

      if ("code" in error && (error.code === "P1001" || error.code === "P1002")) {
        await client.$disconnect();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await client.$connect();
      }
    }
  );

  return client;
};

const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
