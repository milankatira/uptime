import { prismaClient } from 'db/client';

export class WebsiteService {
    /**
     * Create a new website
     */
    async createWebsite(userId: string, url: string) {
        // Check if user exists
        const user = await prismaClient.user.findUnique({ where: { externalId: userId } });
        if (!user) {
            throw new Error('User does not exist');
        }
        const data = await prismaClient.website.create({
            data: {
                userId:user.id,
                url,
            },
        });

        return { id: data.id };
    }

    /**
     * Get website status by ID
     */
    async getWebsiteStatus(websiteId: string, userId: string) {
        const user = await prismaClient.user.findUnique({ where: { externalId: userId } });
        if (!user) {
            throw new Error('User does not exist');
        }
        return prismaClient.website.findFirst({
            where: {
                id: websiteId,
                userId: user.id,
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
        const user = await prismaClient.user.findUnique({ where: { externalId: userId } });
        if (!user) {
            throw new Error('User does not exist');
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
        await prismaClient.website.update({
            where: {
                id: websiteId,
                userId,
            },
            data: {
                disabled: true,
            },
        });

        return { message: 'Deleted website successfully' };
    }

    /**
     * Create a new heartbeat
     */
    async createHeartbeat(userId: string, name: string, interval: number, gracePeriod: number) {
        // Check if user exists
        const user = await prismaClient.user.findUnique({ where: { externalId: userId } });
        if (!user) {
            throw new Error('User does not exist');
        }
        const data = await prismaClient.heartbeat.create({
            data: {
                userId: user.id,
                name,
                interval,
                gracePeriod
            },
        });
        return { id: data.id };
    }
}

export const websiteService = new WebsiteService();
