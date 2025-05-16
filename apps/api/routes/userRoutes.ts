import { Router } from "express";
import {
  updateFcmToken,
  updateUserPreferences,
} from "../controllers/userController";
import { authMiddleware } from "../middleware";

const router = Router();
// @ts-expect-error - TODO: fix this type error
router.put("/user/preferences", authMiddleware, updateUserPreferences);
// @ts-expect-error - TODO: fix this type error
router.put("/user/fcm-token", authMiddleware, updateFcmToken);

export default router;
