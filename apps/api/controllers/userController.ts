import type { Request, Response } from "express";
import { userService } from "../services/userService";

/**
 * Updates the authenticated user's preferences and returns the updated preferences as JSON.
 *
 * Expects preference data in the request body.
 *
 * @remark Requires {@link req.userId} to be set by authentication middleware.
 */
export async function updateUserPreferences(req: Request, res: Response) {
    try {
        const userId = req.userId!; // ← set by authMiddleware
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

/**
 * Updates the authenticated user's Firebase Cloud Messaging (FCM) token.
 *
 * Responds with the update result as JSON. Returns HTTP 400 if the token is missing from the request body.
 */
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

/**
 * Adds an email connection to the authenticated user's account.
 *
 * Responds with HTTP 400 if the email is missing from the request body.
 * Returns the result of the email connection addition as JSON.
 */
export async function addEmailConnection(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: "Email is required" });

        const result = await userService.addEmailConnection(userId, email);
        return res.json(result);
    } catch (error) {
        console.error("Error adding email connection:", error);
        return res
            .status(500)
            .json({ error: "Failed to add email connection" });
    }
}

/**
 * Removes an email connection from the authenticated user's account.
 *
 * Responds with the result of the removal operation as JSON. Returns HTTP 400 if the connection ID is missing from the request body.
 */
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
        return res
            .status(500)
            .json({ error: "Failed to remove email connection" });
    }
}

/**
 * Retrieves all connections associated with the authenticated user and returns them as JSON.
 *
 * Responds with HTTP 500 and an error message if retrieval fails.
 */
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

/**
 * Finds an existing user by external ID or creates a new user with the specified email and optional image URL, then returns the user as JSON.
 *
 * @param req - Express request object containing the authenticated user's ID and user details in the body.
 * @param res - Express response object used to send the user data or error messages.
 *
 * @returns The user object as a JSON response.
 *
 * @remark Responds with HTTP 400 if the email is missing from the request body.
 */
export async function findOrCreateUser(req: Request, res: Response) {
    try {
        const externalId = req?.userId!;
        const { email, imageUrl } = req?.body;

        if (!email) {
            return res
                .status(400)
                .json({ error: "Email is required in the request body" });
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

/**
 * Retrieves the authenticated user's preferences and returns them as JSON.
 *
 * @remark Assumes {@link req.userId} is set by authentication middleware.
 */
export async function getUserPreferences(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const preferences = await userService.getUserPreferences(userId);
        return res.json(preferences);
    } catch (error) {
        console.error("Error fetching preferences:", error);
        return res.status(500).json({ error: "Failed to fetch preferences" });
    }
}

/**
 * Creates and stores a Slack connection for the authenticated user.
 *
 * Associates a new Slack connection, using data from the request body, with the current user and returns the stored connection data as JSON.
 */
export async function storeSlackConnection(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const data = await userService.createSlackConnection(req.body, userId);
        res.status(200).json(data);
    } catch (err) {
        console.error("Slack Connection Error:", err);
        res.status(500).json({ message: "Failed to store Slack connection" });
    }
}

/**
 * Creates and stores a Discord connection for the authenticated user.
 *
 * Associates a new Discord connection, using data from the request body, with the current user.
 *
 * @remark Requires {@link req.userId} to be set by authentication middleware.
 */
export async function storeDiscordConnection(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const data = await userService.createDiscordConnection(
            req.body,
            userId,
        );
        res.status(200).json(data);
    } catch (err) {
        console.error("Discord Connection Error:", err);
        res.status(500).json({ message: "Failed to store Discord connection" });
    }
}
