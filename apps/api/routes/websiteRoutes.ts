import { Router } from 'express';
import {
    createWebsite,
    deleteWebsite,
    getAllWebsites,
    getWebsiteStatus,
} from '../controllers/websiteController';
import { authMiddleware } from '../middleware';

const router = Router();

// @ts-expect-error - TODO: fix this type error
router.post('/website', authMiddleware, createWebsite);

router.get(
    '/website/status',
    // @ts-expect-error - TODO: fix this type error
    authMiddleware,
    getWebsiteStatus
);

// @ts-expect-error - TODO: fix this type error
router.get('/websites', authMiddleware, getAllWebsites);

// @ts-expect-error - TODO: fix this type error
router.delete('/website', authMiddleware, deleteWebsite);

export default router;
