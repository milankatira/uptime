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