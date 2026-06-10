import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";

import {
  getNotifications,
  acceptNotification,
  rejectNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);

router.put(
  "/:id/accept",
  protectRoute,
  acceptNotification
);

router.put(
  "/:id/reject",
  protectRoute,
  rejectNotification
);

export default router;