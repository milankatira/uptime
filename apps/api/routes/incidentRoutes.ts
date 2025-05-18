import { Router } from "express";
import {
  deleteIncident,
  getAllIncidents,
  getIncidentDetails,
  updateIncident,
  addIncidentComment,
} from "../controllers/incidentController";
import { authMiddleware } from "../middleware";

const router = Router();

// @ts-expect-error - TODO: fix this type error
router.get("/incidents", authMiddleware, getAllIncidents);

// @ts-expect-error - TODO: fix this type error
router.get("/incident/:incidentId", authMiddleware, getIncidentDetails);

// @ts-expect-error - TODO: fix this type error
router.put("/incident/:incidentId", authMiddleware, updateIncident);

// @ts-expect-error - TODO: fix this type error
router.delete("/incident/:incidentId", authMiddleware, deleteIncident);

// @ts-expect-error - TODO: fix this type error
router.post("/incident/:incidentId/comment", authMiddleware, addIncidentComment);
export default router;
