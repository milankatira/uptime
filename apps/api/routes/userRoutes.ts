import { Router } from "express";
import { updateUserPreferences } from "../controllers/userController";
import { authMiddleware } from "../middleware";

const router = Router();
 // @ts-expect-error - TODO: fix this type error
router.put("/user/preferences", authMiddleware, updateUserPreferences);

export default router;