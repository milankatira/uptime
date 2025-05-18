import { prismaClient } from '@repo/db/client';
import { IncidentStatus } from '../types/index';
import { listBotChannels, postMessageToSlack } from '../lib/slack';
import { postMessageToDiscord } from '../lib/discord';

export class IncidentService {
    async getAllIncidents(userId: string) {
        const user = await prismaClient.user.findUnique({
            where: { externalId: userId },
        });
        if (!user) {
            throw new Error('User does not exist');
        }
        return prismaClient.incident.findMany({
            where: { userId: user.id },
            orderBy: { date: 'desc' },
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
        comment: string
    ) {
        const user = await prismaClient.user.findUnique({
            where: { externalId: userId },
        });

        if (!user) {
            throw new Error('User does not exist');
        }

        return prismaClient.timeline.create({
            data: {
                time: new Date(),
                incidentId: incidentId,
                type: 'comment',
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
            throw new Error('User does not exist');
        }

        const newIncident = await prismaClient.incident.create({
            data: {
                userId: user.id,
                errorText: errorText,
                status: IncidentStatus.Ongoing,
                date: new Date(),
                cause: 'Manual',
                websiteId: websiteId || null,
                errorCode: 'MANUAL',
                duration: 0,
            },
        });

        const slackConnection = user.Connections.find(
            (data) => data.Slack
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
                    messageContent
                );
            }
        }

        const discordConnection = user.Connections.find(
            (data) => data.DiscordWebhook
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
                    messageContent
                );
            }
        }

        await prismaClient.timeline.create({
            data: {
                time: new Date(),
                incidentId: newIncident.id,
                type: 'start',
                message: `Incident created manually: ${title}`,
            },
        });

        return newIncident;
    }
}

export const incidentService = new IncidentService();
