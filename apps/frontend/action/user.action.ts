"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prismaClient } from "db/client";

export async function syncUserInDb() {
  try {
    const auth = await currentUser();
    if (!auth?.id) return;
    const user = await prismaClient.user.findFirst({
      where: { externalId: auth.id },
    });

    if (!user) {
      return await prismaClient.user.create({
        data: {
          externalId: auth?.id,
          imageUrl: auth.imageUrl!,
          email: auth.emailAddresses[0].emailAddress!,
        },
      });
    }

    return user;
  } catch (error) {
    console.error("Error syncing user:", error);
    throw error;
  }
}
