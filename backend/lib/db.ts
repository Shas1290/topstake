import { PrismaClient } from "@prisma/client";

// Prevent multiple Prisma Client instances in development
// due to Next.js hot-reloading.
// See: https://www.prisma.io/docs/guides/nextjs

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
