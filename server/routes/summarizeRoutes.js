import express from "express";
import { summarizeEmail } from "../controllers/summarizeController.js";

const router = express.Router();

router.post("/summarize", summarizeEmail);

export default router;
