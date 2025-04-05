import express from "express";
import passport from "passport";
import { getEmailsByLabel, sendEmail } from "../controllers/emailController.js";

const router = express.Router();

// Fetch emails by label (protected route)
router.get("/emails", passport.authenticate("jwt", { session: false }), getEmailsByLabel);

// Send an email (also protected)
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { to, subject, message } = req.body;
    const user = req.user;

    if (!to || !to.includes("@")) {
      return res.status(400).json({ message: "Invalid 'to' email address" });
    }

    try {
      await sendEmail({ to, subject, message, user });
      res.json({ message: "Email sent successfully" });
    } catch (err) {
      console.error("Error sending email:", err.message);
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;