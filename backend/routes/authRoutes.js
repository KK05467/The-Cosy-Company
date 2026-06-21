import express from "express";

import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

import { protectRoute } from "../middleware/authMiddleware.js";

import upload from "../middleware/upload.js";
import {
  uploadProfilePicture
}
from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/profile", protectRoute, getProfile);

router.put("/profile", protectRoute, updateProfile);
router.put(
  "/upload-profile-picture",
  protectRoute,
  upload.single("image"),
  uploadProfilePicture
);

export default router;