import { prismaClient } from "@repo/db/client";
import { IncidentStatus } from "../types/index";
import { listBotChannels, postMessageToSlack } from "../lib/slack";
import { postMessageToDiscord } from "../lib/discord";
import { sendEmail } from "@repo/email/send-via-nodemailer";
import { IncidentNotification } from "@repo/email/emails/IncidentNotification";

export class IncidentService {
    async getAllIncidents(userId: string, orgId?: string) {
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
            whereClause.orgId = null;
        }
        return prismaClient.incident.findMany({
            where: whereClause,
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
            data: {
                status: status as IncidentStatus,
                Timeline: {
                    create: {
                        type: "status_change",
                        message: `Status updated to ${status}`,
                    },
                },
            },
            include: {
                Timeline: true,
            },
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
        const user = await prismaClient.user.findUnique({
            where: { externalId: userId },
        });

        if (!user) {
            throw new Error("User does not exist");
        }

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
        websiteId?: string,
        orgId?: string,
    ) {
        const user = await prismaClient.user.findUnique({
            where: { externalId: userId },
            include: {
                Connections: {
                    include: {
                        Slack: true,
                        DiscordWebhook: true,
                    },
                },
            },
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
                orgId,
            },
        });

        const slackConnection = user.Connections.find(
            (data: { Slack: any }) => data.Slack,
        )?.Slack;

        if (slackConnection) {
            const slackAccessToken = slackConnection.slackAccessToken;
            const slackChannels = await listBotChannels(slackAccessToken);

            if (slackConnection?.slackAccessToken) {
                let messageContent = `🚨 Incident Alert: ${errorText}`;
                if (websiteId) {
                    const website = await prismaClient.website.findUnique({
                        where: { id: websiteId },
                        select: { url: true },
                    });
                    if (website) {
                        messageContent = `🚨 Incident Alert for ${website.url}: ${errorText}`;
                    } else {
                        messageContent = `🚨 Incident Alert for Website (ID: ${websiteId}): ${errorText}`;
                    }
                }

                await postMessageToSlack(
                    slackConnection.slackAccessToken,
                    slackChannels,
                    messageContent,
                );
            }
        }

        const discordConnection = user.Connections.find(
            (data: { DiscordWebhook: any }) => data.DiscordWebhook,
        )?.DiscordWebhook;
        if (discordConnection) {
            if (discordConnection?.url) {
                let messageContent = `🚨 Incident Alert: ${errorText}`;
                if (websiteId) {
                    const website = await prismaClient.website.findUnique({
                        where: { id: websiteId },
                        select: { url: true },
                    });
                    if (website) {
                        messageContent = `🚨 Incident Alert for ${website.url}: ${errorText}`;
                    } else {
                        messageContent = `🚨 Incident Alert for Website (ID: ${websiteId}): ${errorText}`;
                    }
                }

                await postMessageToDiscord(
                    discordConnection.url,
                    messageContent,
                );
            }
        }

        const emailConnection = user.Connections.find(
            (data: { email: any }) => data.email,
        )?.email;

        if (emailConnection) {
            const recipientEmail = emailConnection as any;

            if (recipientEmail) {
                const emailProps = {
                    userName: user.email || "User",
                    acknowledgeLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}/acknowledge`,
                    viewIncidentLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}`,
                    unavailableLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}/unavailable`,
                    heartbeatName: websiteId
                        ? (
                              await prismaClient.website.findUnique({
                                  where: { id: websiteId },
                                  select: { url: true },
                              })
                          )?.url || `Website ID: ${websiteId}`
                        : "Manual Incident",
                    incidentCause: errorText,
                    startedAt: newIncident.date.toLocaleString(),
                    companyName: process.env.COMPANY_NAME || "Your Company",
                    logoUrl:
                        process.env.COMPANY_LOGO_URL ||
                        "https://your-logo-url.com/default-logo.png",
                    supportUrl: process.env.SUPPORT_URL || "#",
                    signInUrl: process.env.SIGN_IN_URL || "#",
                };

                let emailSubject = `🚨 Incident Alert: ${emailProps.heartbeatName}`;

                try {
                    await sendEmail(
                        recipientEmail,
                        emailSubject,
                        IncidentNotification,
                        emailProps,
                    );
                    console.log(
                        `Incident notification email sent to ${recipientEmail}`,
                    );
                } catch (emailError) {
                    console.error(
                        `Failed to send incident notification email to ${recipientEmail}:`,
                        emailError,
                    );
                }
            } else {
                console.warn(
                    "Email connection found, but no recipient email address available.",
                );
            }
        }

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

    async sendTestAlert(userId: string, heartbeatId?: string) {
        const user = await prismaClient.user.findUnique({
            where: { externalId: userId },
            include: {
                Connections: {
                    include: {
                        Slack: true,
                        DiscordWebhook: true,
                    },
                },
            },
        });

        if (!user) {
            throw new Error("User does not exist");
        }

        let heartbeatDetails = null;

        if (heartbeatId) {
            heartbeatDetails = await prismaClient.heartbeat.findUnique({
                where: { id: heartbeatId },
                select: { name: true },
            });
        }

        let websiteId: string | undefined;
        let errorText = "This is a test alert";

        const newIncident = await prismaClient.incident.create({
            data: {
                userId: user.id,
                errorText: errorText,
                status: IncidentStatus.Ongoing,
                date: new Date(),
                cause: "Test Alert",
                websiteId: websiteId || null,
                errorCode: "TEST",
                duration: 0,
                orgId: null,
            },
        });

        await prismaClient.timeline.create({
            data: {
                time: new Date(),
                incidentId: newIncident.id,
                type: "start",
                message: `Test incident created${heartbeatDetails ? ` for ${heartbeatDetails.name}` : ""}`,
            },
        });

        const baseMessage = "🔔 This is a test alert from Uptime Monitoring";
        const customMessage = heartbeatDetails
            ? `${baseMessage} for ${heartbeatDetails.name}`
            : baseMessage;

        // Send to Slack
        const slackConnection = user.Connections.find(
            (data: { Slack: any }) => data.Slack,
        )?.Slack;
        if (slackConnection?.slackAccessToken) {
            await postMessageToSlack(
                slackConnection.slackAccessToken,
                await listBotChannels(slackConnection.slackAccessToken),
                customMessage,
            );
        }

        const discordConnection = user.Connections.find(
            (data: { DiscordWebhook: any }) => data.DiscordWebhook,
        )?.DiscordWebhook;
        if (discordConnection?.url) {
            await postMessageToDiscord(discordConnection.url, customMessage);
        }

        const emailConnection = user.Connections.find(
            (data: { email: any }) => data.email,
        )?.email;
        if (emailConnection) {
            const emailProps = {
                userName: user.email || "User",
                acknowledgeLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}`,
                viewIncidentLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}`,
                unavailableLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}`,
                heartbeatName: websiteId
                    ? (
                          await prismaClient.website.findUnique({
                              where: { id: websiteId },
                              select: { url: true },
                          })
                      )?.url || `Website ID: ${websiteId}`
                    : "Manual Incident",
                incidentCause: errorText,
                startedAt: newIncident.date.toLocaleString(),
                companyName: process.env.COMPANY_NAME || "Your Company",
                logoUrl:
                    process.env.COMPANY_LOGO_URL ||
                    "https://your-logo-url.com/default-logo.png",
                supportUrl: process.env.SUPPORT_URL || "#",
                signInUrl: process.env.SIGN_IN_URL || "#",
            };
            await sendEmail(
                emailConnection,
                heartbeatId
                    ? `Test Alert for ${emailProps.heartbeatName}`
                    : "Test Alert from Uptime Monitoring",
                IncidentNotification,
                emailProps,
            );
        }
    }
}

export const incidentService = new IncidentService();
