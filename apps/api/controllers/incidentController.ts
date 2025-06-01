import type { Request, Response } from "express";
import { incidentService } from "../services/incidentService";

/**
 * Retrieves all incidents for the authenticated user, optionally filtered by organization.
 *
 * Responds with a JSON object containing the list of incidents. If the `orgid` header is provided, only incidents for that organization are returned.
 */
export async function getAllIncidents(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const orgId = req.headers["orgid"] as string | undefined;
        const incidents = await incidentService.getAllIncidents(userId, orgId);
        return res.json({ incidents });
    } catch (error) {
        console.error("Error getting incidents:", error);
        return res.status(500).json({ error: "Failed to get incidents" });
    }
}

/**
 * Retrieves details for a specific incident by its ID.
 *
 * Responds with the incident data if found, a 400 error if the incident ID is missing, or a 404 error if the incident does not exist.
 */
export async function getIncidentDetails(req: Request, res: Response) {
    try {
        const { incidentId } = req.params;
        if (!incidentId) {
            return res.status(400).json({ error: "Incident ID is required" });
        }
        const incident = await incidentService.getIncidentDetails(incidentId);
        if (!incident) {
            return res.status(404).json({ error: "Incident not found" });
        }
        return res.json(incident);
    } catch (error) {
        console.error("Error getting incident details:", error);
        return res
            .status(500)
            .json({ error: "Failed to get incident details" });
    }
}

/**
 * Updates the status of a specific incident.
 *
 * Expects the incident ID in the route parameters and the new status in the request body. Responds with the updated incident data on success.
 *
 * @remark
 * Returns a 400 error if either the incident ID or status is missing from the request.
 */
export async function updateIncident(req: Request, res: Response) {
    try {
        const { incidentId } = req.params;
        const { status } = req.body;
        if (!incidentId || !status) {
            return res
                .status(400)
                .json({ error: "Incident ID and status are required" });
        }
        const updatedIncident = await incidentService.updateIncident(
            incidentId,
            status,
        );
        return res.json(updatedIncident);
    } catch (error) {
        console.error("Error updating incident:", error);
        return res.status(500).json({ error: "Failed to update incident" });
    }
}

/**
 * Deletes an incident identified by the provided incident ID.
 *
 * Responds with a success message if the incident is deleted, or an error message if the incident ID is missing or deletion fails.
 */
export async function deleteIncident(req: Request, res: Response) {
    try {
        const { incidentId } = req.params;
        if (!incidentId) {
            return res.status(400).json({ error: "Incident ID is required" });
        }
        await incidentService.deleteIncident(incidentId);
        return res.json({ message: "Incident deleted successfully" });
    } catch (error) {
        console.error("Error deleting incident:", error);
        return res.status(500).json({ error: "Failed to delete incident" });
    }
}

/**
 * Adds a comment to an incident for the authenticated user.
 *
 * Responds with HTTP 400 if the incident ID or comment is missing. On success, returns the newly created comment with HTTP 201 status.
 */
export async function addIncidentComment(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { incidentId } = req.params;
        const { comment } = req.body;

        if (!incidentId || !comment) {
            return res
                .status(400)
                .json({ error: "Incident ID and comment are required" });
        }

        const newComment = await incidentService.addCommentToIncident(
            incidentId,
            userId,
            comment,
        );

        return res.status(201).json(newComment);
    } catch (error) {
        console.error("Error adding incident comment:", error);
        return res
            .status(500)
            .json({ error: "Failed to add incident comment" });
    }
}

/**
 * Creates a new incident for the authenticated user.
 *
 * Requires `title` and `errorText` in the request body. Optionally accepts `websiteId` in the body and `orgId` from headers. Responds with the created incident in JSON format and HTTP 201 status on success.
 *
 * @remark
 * Returns HTTP 400 if `title` or `errorText` is missing from the request body.
 */
export async function createIncident(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { title, errorText, websiteId } = req.body;

        const orgId = req.headers["orgid"] as string | undefined;

        if (!title || !errorText) {
            return res
                .status(400)
                .json({ error: "Title and errorText are required" });
        }

        const newIncident = await incidentService.createIncident(
            userId,
            title,
            errorText,
            websiteId,
            orgId,
        );

        return res.status(201).json(newIncident);
    } catch (error) {
        console.error("Error creating incident:", error);
        return res.status(500).json({ error: "Failed to create incident" });
    }
}

export async function sendTestAlert(req: Request, res: Response) {
    try {
        const userId = req.userId!;
        const { heartbeatId } = req.params;
        if (!heartbeatId) {
            return res.status(400).json({ error: "Heartbeat ID is required" });
        }
        await incidentService.sendTestAlert(userId, heartbeatId);
        return res.json({ message: "Test alert sent successfully" });
    } catch (error) {
        console.error("Error sending test alert:", error);
        return res.status(500).json({ error: "Failed to send test alert" });
    }
}
