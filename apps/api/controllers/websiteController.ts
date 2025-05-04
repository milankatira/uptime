import type { Request, Response } from 'express';
import { websiteService } from '../services/websiteService';

/**
 * Create a new website
 */
export async function createWebsite(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const result = await websiteService.createWebsite(userId, url);
        return res.json(result);
    } catch (error) {
        console.error('Error creating website:', error);
        return res.status(500).json({ error: 'Failed to create website' });
    }
}

/**
 * Get website status by ID
 */
export async function getWebsiteStatus(req: Request, res: Response) {
    try {
        const websiteId = req.query.websiteId as string;
        const userId = req.userId!;

        if (!websiteId) {
            return res.status(400).json({ error: 'Website ID is required' });
        }

        const data = await websiteService.getWebsiteStatus(websiteId, userId);

        if (!data) {
            return res.status(404).json({ error: 'Website not found' });
        }

        return res.json(data);
    } catch (error) {
        console.error('Error getting website status:', error);
        return res.status(500).json({ error: 'Failed to get website status' });
    }
}

/**
 * Get all websites for a user
 */
export async function getAllWebsites(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const result = await websiteService.getAllWebsites(userId);
        return res.json(result);
    } catch (error) {
        console.error('Error getting websites:', error);
        return res.status(500).json({ error: 'Failed to get websites' });
    }
}

/**
 * Soft delete a website
 */
export async function deleteWebsite(req: Request, res: Response) {
    try {
        const websiteId = req.body.websiteId;
        const userId = req.userId!;

        if (!websiteId) {
            return res.status(400).json({ error: 'Website ID is required' });
        }

        const result = await websiteService.deleteWebsite(websiteId, userId);
        return res.json(result);
    } catch (error) {
        console.error('Error deleting website:', error);
        return res.status(500).json({ error: 'Failed to delete website' });
    }
}
