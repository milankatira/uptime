import { prismaClient } from "@repo/db/client";
import { IncidentStatus } from "../types/index";

export class IncidentService {
  async getAllIncidents(userId: string) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    return prismaClient.incident.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });
  }

  async getIncidentDetails(incidentId: string) {
    return prismaClient.incident.findUnique({
      where: { id: incidentId },
      include: { user: true, Timeline: true },
    });
  }

  async updateIncident(incidentId: string, status: string) {
    return prismaClient.incident.update({
      where: { id: incidentId },
      data: { status: status as IncidentStatus },
    });
  }

  async deleteIncident(incidentId: string) {
    return prismaClient.incident.delete({
      where: { id: incidentId },
    });
  }

  async addCommentToIncident(
    incidentId: string,
    userId: string,
    comment: string,
  ) {
    // Find the user to link the comment
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    // Create a new timeline entry for the comment
    return prismaClient.timeline.create({
      data: {
        time: new Date(),
        incidentId: incidentId,
        type: "comment",
        message: comment,


      },
    });
  }

  async createIncident(
    userId: string,
    title: string,
    errorText: string,
    websiteId?: string
  ) {
    const user = await prismaClient.user.findUnique({
      where: { externalId: userId },
    });

    if (!user) {
      throw new Error("User does not exist");
    }

    const newIncident = await prismaClient.incident.create({
      data: {
        userId: user.id,
        errorText: errorText,
        status: IncidentStatus.Ongoing,
        date: new Date(),
        cause: "Manual",
        websiteId: websiteId || null,
        errorCode: "MANUAL",
        duration: 0,
      },
    });


    await prismaClient.timeline.create({
      data: {
        time: new Date(),
        incidentId: newIncident.id,
        type: "start",
        message: `Incident created manually: ${title}`,
      },
    });

    return newIncident;
  }
}

export const incidentService = new IncidentService();
