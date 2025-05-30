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
    async getWebsiteStatus(websiteId: string, duration: string) {
        const website = await prismaClient.website.findFirst({
            where: { id: websiteId, disabled: false },
            include: {
                _count: {
                    select: { ticks: true },
                },
            },
        });

        if (!website) return null;

        // Determine time range and bin size based on duration
        let binSize: string;
        let timeRange: string;
        let startTime: Date;

        const now = new Date();
        switch (duration) {
            case "1w":
                binSize = "1 day";
                timeRange = "7 days";
                startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case "1m":
                binSize = "1 day";
                timeRange = "30 days";
                startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            default: // "30m"
                binSize = "3 minutes";
                timeRange = "30 minutes";
                startTime = new Date(now.getTime() - 30 * 60 * 1000);
        }

        const aggregatedTicks = await prismaClient.$queryRaw`
            WITH binned_data AS (
                SELECT
                    date_bin(${binSize}::interval,
                             "createdAt" AT TIME ZONE 'UTC',
                             TIMESTAMP '1970-01-01') AS bin_start,
                    AVG(latency) AS avg_latency,
                    COUNT(*) FILTER (WHERE status = 'Good')::float / COUNT(*) AS good_ratio
                FROM "WebsiteTick"
                WHERE "websiteId" = ${websiteId}
                    AND "createdAt" >= ${startTime}
                GROUP BY bin_start
            )
            SELECT
                bin_start AS "windowStart",
                avg_latency AS "avgLatency",
                CASE
                    WHEN good_ratio >= 0.5 THEN 'Good'::"WebsiteStatus"
                    ELSE 'Bad'::"WebsiteStatus"
                END AS status
            FROM binned_data
            ORDER BY bin_start DESC
        `;

        // Calculate uptime percentage for the selected duration
        let uptimePercentage = 0;
        if (Array.isArray(aggregatedTicks) && aggregatedTicks.length > 0) {
            const goodWindows = aggregatedTicks.filter(
                (tick) => tick.status === "Good",
            ).length;
            uptimePercentage = (goodWindows / aggregatedTicks.length) * 100;
        }

        return {
            ...website,
            totalTicks: website._count.ticks,
            averagedTicks: Array.isArray(aggregatedTicks)
                ? aggregatedTicks.map((tick) => ({
                      ...tick,
                      windowStart: new Date(tick.windowStart).toISOString(),
                  }))
                : [],
            uptimePercentage,
        };
    }

    async getLast30Errors(websiteId: string) {
        const errorData = await prismaClient.websiteTick.findMany({
            where: {
                websiteId,
                status: "Bad",
            },
            orderBy: {
                createdAt: "desc",
            },
            take: 30,
        });

        return errorData.map((item) => ({
            timestamp: item.createdAt.toISOString(),
            status: item.status,
        }));
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
        } else {
            whereClause.orgId = "";
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
     * Update an existing website
     */
    async updateWebsite(
        userId: string,
        websiteId: string,
        url: string,
        interval: number,
    ) {
        const user = await prismaClient.user.findUnique({
            where: { externalId: userId },
        });
        if (!user) {
            throw new Error("User does not exist");
        }

        // Find the website and ensure it belongs to the user
        const website = await prismaClient.website.findFirst({
            where: {
                id: websiteId,
                userId: user.id,
                disabled: false, // Ensure it's not already soft-deleted
            },
        });

        if (!website) {
            throw new Error("Website not found or does not belong to user");
        }

        // Update the website
        return prismaClient.website.update({
            where: {
                id: websiteId,
            },
            data: {
                url,
                interval,
            },
        });
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
        } else {
            whereClause.orgId = "";
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
        } else {
            whereClause.orgId = "";
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
            data: {
                status: status.toUpperCase() as "UP" | "DOWN" | "ACHNOWLEDGED",
            },
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
                    status: "Ongoing",
                    orgId: currentHeartbeat.orgId,
                    heartbeatId: heartbeatId,
                    errorCode: "HEARTBEAT_DOWN",
                    errorText: `Heartbeat ${updatedHeartbeat.name} is down`,
                    date: new Date(),
                    duration: 0, // Duration can be calculated later when resolved
                    userId: updatedHeartbeat.userId,
                    Timeline: {
                        create: {
                            type: "STATUS_CHANGE",
                            message: "Heartbeat status changed to DOWN",
                        },
                    },
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
                    (new Date().getTime() -
                        new Date(openIncident.date).getTime()) /
                        1000,
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
