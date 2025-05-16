import type { Request, Response } from "express";
import { userService } from "../services/userService";

export async function updateUserPreferences(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const preferences = req.body;

    const result = await userService.updateUserPreferences(userId, preferences);
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
