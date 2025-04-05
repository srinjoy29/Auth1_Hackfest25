import express from "express";
import passport from "passport";
import { getEmailsByLabel,sendEmail } from "../controllers/emailController.js";

const router = express.Router();

// ✅ POST /api/emails/send (requires JWT)
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { to, subject, message } = req.body;
    const user = req.user;

    try {
      await sendEmail({ to, subject, message, user });
      res.json({ message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// GET /api/emails?labelId=INBOX
router.get("/emails", passport.authenticate("jwt", { session: false }), getEmailsByLabel);




export default router;