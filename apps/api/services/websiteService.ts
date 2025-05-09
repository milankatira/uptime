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
        return prismaClient.website.findFirst({
            where: {
                id: websiteId,
                userId,
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
        const websites = await prismaClient.website.findMany({
            where: {
                userId,
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
}

export const websiteService = new WebsiteService();
