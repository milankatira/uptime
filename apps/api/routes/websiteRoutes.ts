import { Router } from "express";
import {
  createHeartbeat,
  createMaintenanceWindow,
  createWebsite,
  deleteWebsite,
  getAllMaintenanceWindows,
  getAllWebsites,
  getWebsiteStatus,
} from "../controllers/websiteController";
import { authMiddleware } from "../middleware";

const router = Router();

// @ts-expect-error - TODO: fix this type error
router.post("/website", authMiddleware, createWebsite);

router.get(
  "/website/status",
  // @ts-expect-error - TODO: fix this type error
  getWebsiteStatus,
);

// @ts-expect-error - TODO: fix this type error
router.get("/websites", authMiddleware, getAllWebsites);

// @ts-expect-error - TODO: fix this type error
router.delete("/website", authMiddleware, deleteWebsite);

// @ts-expect-error - TODO: fix this type error
router.post("/heartbeat", authMiddleware, createHeartbeat);

// @ts-expect-error - TODO: fix this type error
router.post("/maintenance-window", authMiddleware, createMaintenanceWindow);

// @ts-expect-error - TODO: fix this type error
router.get("/maintenance-windows", authMiddleware, getAllMaintenanceWindows);

export default router;
