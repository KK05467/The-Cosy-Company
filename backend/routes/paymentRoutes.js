import express from "express";

import {
  createOrder,
  verifyPayment,
  walletPayment
} from "../controllers/paymentController.js";

import { protectRoute }
from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-order",
  createOrder
);

router.post(
  "/verify",
  verifyPayment
);
router.post(
    "/wallet",
    protectRoute,
    walletPayment
);
export default router;