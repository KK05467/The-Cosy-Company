import express from "express"
import { protectRoute } from "../middleware/authMiddleware.js"
import { createRide, getMyRides,searchRides, getRideById,updateLocation,getCurrentLocation,startRide,
  completeRide} from "../controllers/rideController.js"

const router = express.Router();

router.post("/", protectRoute, createRide)
router.get(
  "/my-rides",
  protectRoute,
  getMyRides
)
router.put(
"/update-location",
protectRoute,
updateLocation
);
router.get("/search", searchRides)
router.get("/:id", getRideById)
router.get(
"/:id/location",
getCurrentLocation
);
router.patch(
  "/start/:id",
  protectRoute,
  startRide
);

router.patch(
  "/complete/:id",
  protectRoute,
  completeRide
);

export default router