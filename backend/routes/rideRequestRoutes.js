import express from "express";

import { protectRoute }
from "../middleware/authMiddleware.js";

import {
    createRideRequest
}
from "../controllers/rideRequestController.js";

const router = express.Router();

router.post(
    "/",
    protectRoute,
    createRideRequest
);

export default router;