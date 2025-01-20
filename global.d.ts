import { PrismaClient } from '@prisma/client';

declare global {
  // Allow global `prisma` to be typed
  var prisma: PrismaClient | undefined;
}
