import type { Request, Response } from "express";
import { userService } from "../services/userService";

export async function updateUserPreferences(req: Request, res: Response) {
  try {
    const userId = req.userId!;             // ← set by authMiddleware
    const preferences = req.body;

    const result = await userService.updateUserPreferences(
      userId,
      preferences,
    );
    return res.json(result);
  } catch (error) {
    console.error("Error updating preferences:", error);
    return res.status(500).json({ error: "Failed to update preferences" });
  }
}

export async function updateFcmToken(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const result = await userService.updateFcmToken(userId, token);
    return res.json(result);
  } catch (error) {
    console.error("Error updating FCM token:", error);
    return res.status(500).json({ error: "Failed to update FCM token" });
  }
}

export async function addEmailConnection(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const result = await userService.addEmailConnection(userId, email);
    return res.json(result);
  } catch (error) {
    console.error("Error adding email connection:", error);
    return res.status(500).json({ error: "Failed to add email connection" });
  }
}

export async function removeEmailConnection(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { id } = req.body;
    if (!id)
      return res.status(400).json({ error: "Connection ID is required" });

    const result = await userService.removeEmailConnection(userId, id);
    return res.json(result);
  } catch (error) {
    console.error("Error removing email connection:", error);
    return res.status(500).json({ error: "Failed to remove email connection" });
  }
}

export async function findConnectionByUserId(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const result = await userService.findConnectionByUserId(userId);
    return res.json(result);
  } catch (error) {
    console.error("Error finding connections:", error);
    return res.status(500).json({ error: "Failed to find connections" });
  }
}

export async function findOrCreateUser(req: Request, res: Response) {
  try {
    const externalId = req?.userId!;
    const { email, imageUrl } = req?.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required in the request body" });
    }

    const user = await userService.findOrCreateUserByExternalId(
      externalId,
      email, // Pass email
      imageUrl, // Pass imageUrl
    );
    return res.json(user);
  } catch (error) {
    console.error("Error finding or creating user:", error);
    return res.status(500).json({ error: "Failed to find or create user" });
  }
}
