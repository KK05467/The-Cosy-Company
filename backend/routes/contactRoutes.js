import express from "express";
import { sendMessage, getMessages } from "../controllers/contactController.js";

const router = express.Router();

// public contact form
router.post("/send", sendMessage);

// admin (optional)
router.get("/", getMessages);

export default router;