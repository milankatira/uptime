import { Router } from 'express';
import {
    createWebsite,
    deleteWebsite,
    getAllWebsites,
    getWebsiteStatus,
    createHeartbeat,
    createMaintenanceWindow,
    getAllMaintenanceWindows
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

// @ts-expect-error - TODO: fix this type error
router.post('/heartbeat', authMiddleware, createHeartbeat);

// @ts-expect-error - TODO: fix this type error
router.post('/maintenance-window', authMiddleware, createMaintenanceWindow);

// @ts-expect-error - TODO: fix this type error
router.get('/maintenance-windows', authMiddleware, getAllMaintenanceWindows);

export default router;
