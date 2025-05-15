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

export async function getUserFromDb() {
  try {
    const auth = await currentUser();
    if (!auth?.id) return null;

    return await prismaClient.user.findFirst({
      where: { externalId: auth.id },
      select: {
        emailNotifications: true,
        email: true,
        imageUrl: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

export async function updateUserOrganizationIds(organizationIds: string[]) {
  try {
    const auth = await currentUser();
    if (!auth?.id) return null;

    const user = await prismaClient.user.findFirst({
      where: { externalId: auth.id },
    });

    if (!user) {
      throw new Error("User not found in database");
    }

    return await prismaClient.user.update({
      where: { id: user.id },
      data: {
        cleakOrganizationIds: organizationIds,
      },
    });
  } catch (error) {
    console.error("Error updating user organization IDs:", error);
    throw error;
  }
}
