import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { createBooking, getMyBookings,getBookingById, } from "../controllers/bookingController.js";
import { cancelBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protectRoute, createBooking);
router.get("/my", protectRoute, getMyBookings);
router.get("/:id", protectRoute, getBookingById);
router.patch("/cancel/:id", protectRoute, cancelBooking);

export default router;