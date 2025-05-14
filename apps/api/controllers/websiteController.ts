import type { Request, Response } from "express";
import { websiteService } from "../services/websiteService";

/**
 * Create a new website
 */
export async function createWebsite(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const result = await websiteService.createWebsite(userId, url);
    return res.json(result);
  } catch (error) {
    console.error("Error creating website:", error);
    return res.status(500).json({ error: "Failed to create website" });
  }
}

/**
 * Get website status by ID
 */
export async function getWebsiteStatus(req: Request, res: Response) {
  try {
    const websiteId = req.query.websiteId as string;

    if (!websiteId) {
      return res.status(400).json({ error: "Website ID is required" });
    }

    const data = await websiteService.getWebsiteStatus(websiteId);

    if (!data) {
      return res.status(404).json({ error: "Website not found" });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error getting website status:", error);
    return res.status(500).json({ error: "Failed to get website status" });
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
    console.error("Error getting websites:", error);
    return res.status(500).json({ error: "Failed to get websites" });
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
      return res.status(400).json({ error: "Website ID is required" });
    }

    const result = await websiteService.deleteWebsite(websiteId, userId);
    return res.json(result);
  } catch (error) {
    console.error("Error deleting website:", error);
    return res.status(500).json({ error: "Failed to delete website" });
  }
}

/**
 * Create a new heartbeat
 */
export async function createHeartbeat(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { name, interval, gracePeriod, escalation, maintenance, metadata } =
      req.body;
    if (!name || !interval || !gracePeriod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await websiteService.createHeartbeat(
      userId,
      name,
      interval,
      gracePeriod,
      escalation,
      maintenance,
      metadata,
    );
    return res.json(result);
  } catch (error) {
    console.error("Error creating heartbeat:", error);
    return res.status(500).json({ error: "Failed to create heartbeat" });
  }
}

/**
 * Create a new maintenance window
 */
export async function createMaintenanceWindow(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { date, timeSlot, repeat } = req.body;
    if (!date || !timeSlot) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await websiteService.createMaintenanceWindow(
      userId,
      new Date(date),
      timeSlot,
      repeat ?? null,
    );
    return res.json(result);
  } catch (error) {
    console.error("Error creating maintenance window:", error);
    return res
      .status(500)
      .json({ error: "Failed to create maintenance window" });
  }
}

/**
 * Get all maintenance windows for a user
 */
export async function getAllMaintenanceWindows(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const result = await websiteService.getAllMaintenanceWindows(userId);
    return res.json(result);
  } catch (error) {
    console.error("Error getting maintenance windows:", error);
    return res.status(500).json({ error: "Failed to get maintenance windows" });
  }
}

/**
 * Get heartbeat by ID
 */
export async function getHeartbeat(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const data = await websiteService.getHeartbeat(userId);

    if (!data) {
      return res.status(404).json({ error: "Heartbeat not found" });
    }

    return res.json(data);
  } catch (error) {
    console.error("Error getting heartbeat:", error);
    return res.status(500).json({ error: "Failed to get heartbeat" });
  }
}

export async function updateHeartbeatStatus(req: Request, res: Response) {
  try {
    const { heartbeatId, status } = req.params;
    const result = await websiteService.updateHeartbeatStatus(heartbeatId, status);
    return res.json(result);
  } catch (error) {
    console.error("Error updating heartbeat status:", error);
    return res.status(500).json({ error: "Failed to update heartbeat status" });
  }
}
