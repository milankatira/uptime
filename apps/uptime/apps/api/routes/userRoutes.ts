import { Router } from "express";
import {
  addEmailConnection,
  findConnectionByUserId,
  removeEmailConnection,
  updateFcmToken,
  updateUserPreferences,
} from "../controllers/userController";
import { authMiddleware } from "../middleware";

const router = Router();

// @ts-expect-error - TODO: fix this type error
router.put("/preferences", authMiddleware, updateUserPreferences);
// @ts-expect-error - TODO: fix this type error
router.put("/fcm-token", authMiddleware, updateFcmToken);
// @ts-expect-error - TODO: fix this type error
router.post("/connections", authMiddleware, addEmailConnection);
// @ts-expect-error - TODO: fix this type error
router.delete("/connections", authMiddleware, removeEmailConnection);
// @ts-expect-error - TODO: fix this type error
router.get("/connections", authMiddleware, findConnectionByUserId);

export default router;
