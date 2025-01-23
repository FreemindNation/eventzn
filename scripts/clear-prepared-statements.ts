import prisma from "@/lib/prisma";

async function clearPreparedStatements() {
  try {
    await prisma.$executeRawUnsafe("DEALLOCATE ALL;");
    console.log("Prepared statements cleared successfully!");
  } catch (error) {
    console.error("Error clearing prepared statements:", error);
  } finally {
    await prisma.$disconnect();
  }
}

clearPreparedStatements();
