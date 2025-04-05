import express from "express";
import passport from "passport";
<<<<<<< HEAD
import { getEmailsByLabel,sendEmail } from "../controllers/emailController.js";

const router = express.Router();

// ✅ POST /api/emails/send (requires JWT)
=======
import { sendEmail } from "../utils/sendEmails.js";
import { getEmailsByLabel } from "../lib/gmail/getEmailsByLabel.js"; // adjust path
import { getUserFromDBOrSession } from "../utils/user.js"; // assume user info

const router = express.Router();

// Protect route with JWT
>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
router.post(
  "/send",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { to, subject, message } = req.body;
<<<<<<< HEAD
    const user = req.user;
=======
    const user = req.user; // comes from JWT
>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9

    try {
      await sendEmail({ to, subject, message, user });
      res.json({ message: "Email sent successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

<<<<<<< HEAD
// GET /api/emails?labelId=INBOX
router.get("/emails", passport.authenticate("jwt", { session: false }), getEmailsByLabel);




export default router;
=======


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

>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
