import { prismaClient } from '@repo/db/client';
import { IncidentStatus } from '../types/index';
import { listBotChannels, postMessageToSlack } from '../lib/slack';
import { postMessageToDiscord } from '../lib/discord';
import { sendEmail } from '@dub/email/send-via-nodemailer';
import { IncidentNotification } from '@dub/email/emails/IncidentNotification'; // Import the email template

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

        // Assuming 'email' is a field directly on the Connection model or a nested relation
        // Adjust the find logic based on your actual schema
        const emailConnection = user.Connections.find(
            (data) => data.email
        )?.email;

        if (emailConnection) {
            // Assuming the Email model has an 'address' field
            const recipientEmail = (emailConnection as any)

            if (recipientEmail) {
                // Prepare data for the email template
                const emailProps = {
                    userName: user.email || 'User', // Use user's name if available
                    acknowledgeLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}/acknowledge`, // Example link
                    viewIncidentLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}`, // Example link
                    unavailableLink: `${process.env.FRONTEND_URL}/incidents/${newIncident.id}/unavailable`, // Example link
                    heartbeatName: websiteId
                        ? (
                              await prismaClient.website.findUnique({
                                  where: { id: websiteId },
                                  select: { url: true },
                              })
                          )?.url || `Website ID: ${websiteId}`
                        : 'Manual Incident', // Use website name or ID
                    incidentCause: errorText,
                    startedAt: newIncident.date.toLocaleString(), // Format date
                    companyName: process.env.COMPANY_NAME || 'Your Company', // Get from env or config
                    logoUrl:
                        process.env.COMPANY_LOGO_URL ||
                        'https://your-logo-url.com/default-logo.png', // Get from env or config
                    supportUrl: process.env.SUPPORT_URL || '#', // Get from env or config
                    signInUrl: process.env.SIGN_IN_URL || '#', // Get from env or config
                };

                let emailSubject = `🚨 Incident Alert: ${emailProps.heartbeatName}`;

                // Call the sendEmail function
                try {
                    await sendEmail(
                        recipientEmail,
                        emailSubject,
                        IncidentNotification, // Pass the React email component
                        emailProps // Pass the props for the component
                    );
                    console.log(
                        `Incident notification email sent to ${recipientEmail}`
                    );
                } catch (emailError) {
                    console.error(
                        `Failed to send incident notification email to ${recipientEmail}:`,
                        emailError
                    );
                }
            } else {
                console.warn(
                    'Email connection found, but no recipient email address available.'
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
