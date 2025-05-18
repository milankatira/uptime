import { IncidentNotification } from "@repo/email/emails/IncidentNotification";

import { sendEmail } from "@repo/email/send-via-nodemailer";
import { prismaClient } from "@repo/db/client";

export class WebsiteService {
  /**
   * Create a new website
   */
  async createWebsite(userId: string, url: string, orgId?: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }

    if (orgId && !user.cleakOrganizationIds.includes(orgId)) {
      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          cleakOrganizationIds: {
            push: orgId,
          },
        },
      });
    }

    return await prismaClient.website.create({
      data: {
        userId: user.id,
        url,
        orgId,
      },
    });
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
  async getAllWebsites(userId: string, orgId?: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }

    const whereClause: any = {
      userId: user.id,
      disabled: false,
    };

    if (orgId) {
      whereClause.orgId = orgId;
    }

    const websites = await prismaClient.website.findMany({
      where: whereClause,
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
    orgId?: string,
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
        orgId,
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
    orgId?: string,
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
        orgId,
      },
    });
    return { id: data.id };
  }

  /**
   * Get all maintenance windows for a user
   */
  async getAllMaintenanceWindows(userId: string, orgId?: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }

    const whereClause: any = {
      userId: user.id,
    };

    if (orgId) {
      whereClause.orgId = orgId;
    }
    const windows = await prismaClient.maintenanceWindow.findMany({
      where: whereClause,
      orderBy: { date: "asc" },
    });
    return { windows };
  }

  /**
   * Get heartbeat by ID
   */
  async getHeartbeat(userId: string, orgId?: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }

    const whereClause: any = {
      userId: user.id,
    };

    if (orgId) {
      whereClause.orgId = orgId;
    }
    return prismaClient.heartbeat.findMany({
      where: whereClause,
    });
  }

  async updateHeartbeatStatus(heartbeatId: string, status: string) {
    const validStatuses = ["UP", "DOWN", "ACHNOWLEDGED"];

    if (!validStatuses.includes(status.toUpperCase())) {
      throw new Error("Invalid status: " + status);
    }

    const currentHeartbeat = await prismaClient.heartbeat.findUnique({
      where: { id: heartbeatId },
      include: { user: true }, // Ensure user is included to get email and notification preferences
    });

    if (!currentHeartbeat) {
      throw new Error("Heartbeat not found");
    }
    if (!currentHeartbeat.user) {
      console.warn(
        `Heartbeat ${heartbeatId} does not have an associated user. Skipping email notification.`,
      );
    }

    const updatedHeartbeat = await prismaClient.heartbeat.update({
      where: { id: heartbeatId },
      data: { status: status.toUpperCase() as "UP" | "DOWN" | "ACHNOWLEDGED" },
      include: { user: true },
    });

    // Send email notification if status is DOWN and user has notifications enabled
    if (
      status.toUpperCase() === "DOWN" &&
      updatedHeartbeat?.user &&
      updatedHeartbeat?.user?.email
    ) {
      try {
        const incidentProps = {
          userName: updatedHeartbeat.user.email,
          heartbeatName: updatedHeartbeat.name,
          incidentCause: `Heartbeat "${updatedHeartbeat.name}" reported as DOWN.`,
          startedAt: new Date().toLocaleString(),
        };

        await sendEmail(
          "milankatira07@gmail.com",
          `🔴 Incident Alert: ${updatedHeartbeat.name} is DOWN`,
          IncidentNotification,
          incidentProps,
        );
        console.log(
          `Incident notification email sent to ${updatedHeartbeat.user.email}`,
        );
      } catch (emailError) {
        console.error(
          `Failed to send incident notification email:`,
          emailError,
        );
      }
    }

    await prismaClient.heartbeatRecord.create({
      data: {
        heartbeatId: heartbeatId,
        status: status.toUpperCase() as "UP" | "DOWN" | "ACHNOWLEDGED",
        timestamp: new Date(),
      },
    });

    if (status.toUpperCase() === "DOWN") {
      // Ensure incident is created after status update and email attempt
      await prismaClient.incident.create({
        data: {
          status: "Ongoing", // Or "Investigating"
          errorCode: "HEARTBEAT_DOWN",
          errorText: `Heartbeat ${updatedHeartbeat.name} is down`,
          date: new Date(),
          duration: 0, // Duration can be calculated later when resolved
          userId: updatedHeartbeat.userId,
        },
      });
    } else if (status.toUpperCase() === "UP") {
      // Optionally, find and resolve open incidents for this heartbeat
      const openIncident = await prismaClient.incident.findFirst({
        where: {
          status: "Ongoing", // Or other active statuses
        },
        orderBy: {
          date: "desc",
        },
      });
      if (openIncident) {
        const duration = Math.round(
          (new Date().getTime() - new Date(openIncident.date).getTime()) / 1000,
        ); // Duration in seconds
        await prismaClient.incident.update({
          where: { id: openIncident.id },
          data: {
            status: "Resolved",
            duration: duration,
          },
        });
        // Optionally send a "Resolved" notification email here
      }
    }

    return updatedHeartbeat;
  }

  async getHeartbeatRecords(heartbeatId: string) {
    return prismaClient.heartbeatRecord.findMany({
      where: { heartbeatId },
      orderBy: { timestamp: "desc" },
    });
  }

  async getHeartbeatDetails(heartbeatId: string) {
    const heartbeat = await prismaClient.heartbeat.findUnique({
      where: { id: heartbeatId },
      include: {
        HeartbeatRecord: {
          orderBy: { timestamp: "desc" },
        },
      },
    });

    if (!heartbeat) {
      throw new Error("Heartbeat not found");
    }

    return heartbeat;
  }
}

export const websiteService = new WebsiteService();
