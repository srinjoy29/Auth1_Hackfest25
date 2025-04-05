import express from "express";
import { generateEmail } from "../controllers/openaiController.js";

const router = express.Router();

// ✨ Route for generating an email
router.post("/generate-email", generateEmail);

export default router;
