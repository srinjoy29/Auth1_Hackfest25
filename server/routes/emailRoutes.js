import express from "express";
import passport from "passport";
import { sendEmail } from "../utils/sendEmails.js";
import { getEmailsByLabel } from "../lib/gmail/getEmailsByLabel.js"; // adjust path
import { getUserFromDBOrSession } from "../utils/user.js"; // assume user info

const router = express.Router();

// Protect route with JWT
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { to, subject, message } = req.body;
    const user = req.user; // comes from JWT

    try {
      await sendEmail({ to, subject, message, user });
      res.json({ message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);



// GET /emails?labelId=INBOX
router.get("/emails", async (req, res) => {
  const { labelId } = req.query;

  try {
    // You might get user info from session, DB or accessToken middleware
    const user = await getUserFromDBOrSession(req);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const emails = await getEmailsByLabel(user, labelId);
    return res.status(200).json({ emails });
  } catch (error) {
    console.error("Failed to fetch emails:", error.message);
    return res.status(500).json({ message: "Failed to fetch emails" });
  }
});

export default router;

