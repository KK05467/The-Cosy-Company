import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { createRide, getMyRides,searchRides, getRideById,} from "../controllers/rideController.js"

const router = express.Router();

router.post("/", protectRoute, createRide)
router.get(
  "/my-rides",
  protectRoute,
  getMyRides
)
router.get("/search", searchRides)
router.get("/:id", getRideById)

export default router