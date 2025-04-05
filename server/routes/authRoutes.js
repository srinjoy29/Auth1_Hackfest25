import express from "express";
import dotenv from "dotenv";
dotenv.config();

import {
  googleLogin,
  googleCallback,
  signout,
  me,
} from "../controllers/authController.js";

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

export default router;