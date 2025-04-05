import express from "express";
import passport from "passport";
import { getEmailById, getEmailsByLabel, sendEmail } from "../controllers/emailController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Fetch emails by label (protected route)
router.get("/emails", passport.authenticate("jwt", { session: false }), getEmailsByLabel);

// Send an email (also protected)
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { to, subject, body } = req.body;
    const user = req.user;

    // ✅ Console logs to verify incoming data
    console.log("Received send email request:");
    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Body:", body);
    console.log("User:", user?.email || user); // print user email or whole object

    if (!to || !to.includes("@")) {
      return res.status(400).json({ message: "Invalid 'to' email address" });
    }

    try {
      await sendEmail({ to, subject, body, user });

      console.log("✅ Email sent successfully.");

      res.json({ message: "Email sent successfully" });
    } catch (err) {
      console.error("❌ Error sending email:", err.message);
      res.status(500).json({ message: err.message });
    }
  }
);


router.get("/emails/:id", protect, getEmailById);

export default router;