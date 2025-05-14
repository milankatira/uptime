import { prismaClient } from "db/client";

export class WebsiteService {
  /**
   * Create a new website
   */
  async createWebsite(userId: string, url: string) {
    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const data = await prismaClient.website.create({
      data: {
        userId: user.id,
        url,
      },
    });

    return { id: data.id };
  }

  /**
   * Get website status by ID
   */
  async getWebsiteStatus(websiteId: string) {
    return prismaClient.website.findFirst({
      where: {
        id: websiteId,
        disabled: false,
      },
      include: {
        ticks: true,
      },
    });
  }

  /**
   * Get all websites for a user
   */
  async getAllWebsites(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const websites = await prismaClient.website.findMany({
      where: {
        userId: user.id,
        disabled: false,
      },
      include: {
        ticks: true,
      },
    });

    return { websites };
  }

  /**
   * Soft delete a website
   */
  async deleteWebsite(websiteId: string, userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    await prismaClient.website.update({
      where: {
        id: websiteId,
        userId: user.id,
      },
      data: {
        disabled: true,
      },
    });

    return { message: "Deleted website successfully" };
  }

  /**
   * Create a new heartbeat
   */
  async createHeartbeat(
    userId: string,
    name: string,
    interval: number,
    gracePeriod: number,
    escalation?: any,
    maintenance?: any,
    metadata?: any,
  ) {
    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const data = await prismaClient.heartbeat.create({
      data: {
        userId: user.id,
        name,
        interval,
        gracePeriod,
        escalation,
        maintenance,
        metadata,
      },
    });
    return { id: data.id };
  }

  /**
   * Create a new maintenance window
   */
  async createMaintenanceWindow(
    userId: string,
    date: Date,
    timeSlot: string,
    repeat: string | null,
  ) {
    // Check if user exists
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const data = await prismaClient.maintenanceWindow.create({
      data: {
        userId: user.id,
        date,
        timeSlot,
        repeat,
      },
    });
    return { id: data.id };
  }

  /**
   * Get all maintenance windows for a user
   */
  async getAllMaintenanceWindows(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const windows = await prismaClient.maintenanceWindow.findMany({
      where: { userId: user.id },
      orderBy: { date: "asc" },
    });
    return { windows };
  }

  /**
   * Get heartbeat by ID
   */
  async getHeartbeat(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    return prismaClient.heartbeat.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  async updateHeartbeatStatus(heartbeatId: string, status: string) {
    const validStatuses = ["UP", "DOWN", "ACHNOWLEDGED"];

    if (!validStatuses.includes(status.toUpperCase())) {
      throw new Error("Invalid status");
    }

    const updatedHeartbeat = await prismaClient.heartbeat.update({
      where: { id: heartbeatId },
      data: { status: status.toUpperCase() as 'UP' | 'DOWN' | 'ACHNOWLEDGED' },
    });

    await prismaClient.heartbeatRecord.create({
      data: {
        heartbeatId: heartbeatId,
        status: status.toUpperCase() as 'UP' | 'DOWN' | 'ACHNOWLEDGED',
        timestamp: new Date(),
      },
    });

    return updatedHeartbeat;
  }

  async getHeartbeatRecords(heartbeatId: string) {
    return prismaClient.heartbeatRecord.findMany({
      where: { heartbeatId },
      orderBy: { timestamp: 'desc' },
    });
  }
}

export const websiteService = new WebsiteService();
