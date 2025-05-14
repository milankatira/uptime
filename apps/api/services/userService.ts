import { prismaClient } from "db/client";

export class UserService {
  async updateUserPreferences(userId: string, preferences: { emailNotifications?: boolean }) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) throw new Error("User not found");

    return prismaClient.user.update({
      where: { id: user.id },
      data: {
        emailNotifications: preferences.emailNotifications
      }
    });
  }
}

export const userService = new UserService();