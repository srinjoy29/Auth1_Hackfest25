import express from "express";
import dotenv from "dotenv";
dotenv.config();
<<<<<<< HEAD
=======

>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
import {
  googleLogin,
  googleCallback,
  signout,
  me,
} from "../controllers/authController.js";
<<<<<<< HEAD
=======

>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
import passport from "passport";

const router = express.Router();

// ✅ Start Google OAuth
router.get("/google", googleLogin);

// ✅ Handle Google OAuth Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
    session: false,
  }),
  googleCallback
);

// ✅ Logout
router.get("/logout", signout);

// ✅ Get current user
router.get("/me", me);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> 1b51400998625cf421719544f51b1b8fbe46e6b9
