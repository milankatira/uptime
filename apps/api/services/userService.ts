import { prismaClient } from "db/client";

export class UserService {
  async updateUserPreferences(
    userId: string,
    preferences: { emailNotifications?: boolean },
  ) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) throw new Error("User not found");

    return prismaClient.user.update({
      where: { id: user.id },
      data: {
        emailNotifications: preferences.emailNotifications,
      },
    });
  }

  async updateFcmToken(userId: string, token: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) throw new Error("User not found");

    return prismaClient.user.update({
      where: { id: user.id },
      data: {
        FCMTOKEN: token,
      },
    });
  }
}

export const userService = new UserService();
