import { PrismaClient } from "@prisma/client";

// Create a singleton Prisma client to be shared across the application
const prismaClient = new PrismaClient();

export default prismaClient;
