import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post(
  "/",
  protectRoute,
  createBooking
);

export default router;