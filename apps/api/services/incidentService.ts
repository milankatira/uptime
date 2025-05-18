import { prismaClient } from "@repo/db/client";
import type { IncidentStatus } from "../types/index";

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
      include: { user: true },
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
}

export const incidentService = new IncidentService();
