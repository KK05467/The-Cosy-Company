import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createBooking, getMyBookings,getBookingById, } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protectRoute, createBooking);
router.get("/my", protectRoute, getMyBookings);
router.get("/:id", protectRoute, getBookingById);

export default router;