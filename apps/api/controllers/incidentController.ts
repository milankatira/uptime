import type { Request, Response } from "express";
import { incidentService } from "../services/incidentService";

/**
 * Retrieves all incidents associated with the authenticated user, optionally filtered by organization.
 *
 * @remark
 * If an `orgId` is provided in the request headers, only incidents for that organization are returned; otherwise, all incidents for the user are retrieved.
 */
export async function getAllIncidents(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const orgId = req.headers["orgid"] as string | undefined;
    const incidents = await incidentService.getAllIncidents(userId,orgId);
    return res.json({ incidents });
  } catch (error) {
    console.error("Error getting incidents:", error);
    return res.status(500).json({ error: "Failed to get incidents" });
  }
}

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
    return res.status(500).json({ error: "Failed to get incident details" });
  }
}

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

export async function addIncidentComment(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { incidentId } = req.params;
    const { comment } = req.body;

    if (!incidentId || !comment) {
      return res.status(400).json({ error: "Incident ID and comment are required" });
    }

    const newComment = await incidentService.addCommentToIncident(
      incidentId,
      userId,
      comment,
    );

    return res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding incident comment:", error);
    return res.status(500).json({ error: "Failed to add incident comment" });
  }
}

/**
 * Creates a new incident with the provided details and associates it with the requesting user.
 *
 * Responds with HTTP 201 and the created incident on success. Returns HTTP 400 if required fields are missing.
 */
export async function createIncident(req: Request, res: Response) {
  try {
    const userId = req.userId!;
    const { title, errorText, websiteId } = req.body;

    const orgId = req.headers["orgid"] as string | undefined;

    if (!title || !errorText) {
      return res.status(400).json({ error: "Title and errorText are required" });
    }

    const newIncident = await incidentService.createIncident(
      userId,
      title,
      errorText,
      websiteId,
      orgId
    );

    return res.status(201).json(newIncident);
  } catch (error) {
    console.error("Error creating incident:", error);
    return res.status(500).json({ error: "Failed to create incident" });
  }
}
