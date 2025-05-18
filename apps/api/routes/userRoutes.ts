import { Router } from "express";
import {
  addEmailConnection,
  findConnectionByUserId,
  removeEmailConnection,
  updateFcmToken,
  updateUserPreferences,
  findOrCreateUser, // Import the new controller function
} from "../controllers/userController";
import { authMiddleware } from "../middleware";

const router = Router();

// @ts-expect-error - TODO: fix this type error
router.put("/preferences", authMiddleware, updateUserPreferences);
// @ts-expect-error - TODO: fix this type error
router.put("/user/fcm-token", authMiddleware, updateFcmToken);
// @ts-expect-error - TODO: fix this type error
router.post("/connections", authMiddleware, addEmailConnection);
// @ts-expect-error - TODO: fix this type error
router.delete("/connections", authMiddleware, removeEmailConnection);
// @ts-expect-error - TODO: fix this type error
router.get("/connections", authMiddleware, findConnectionByUserId);
// @ts-expect-error - TODO: fix this type error
router.post("/user", authMiddleware, findOrCreateUser);

export default router;
