import jwt from "jsonwebtoken";
import passport from "passport";

/**
 * @desc Trigger Google Login (used as middleware)
 */
export const googleLogin = passport.authenticate("google", {
  scope: [
    "profile",
    "email",
    "https://mail.google.com/",
  ],
  accessType: "offline",
  prompt: "consent",
  session: false,
});

/**
 * @desc Google OAuth Callback (middleware runs before this)
 */
export const googleCallback = (req, res) => {
  const user = req.user;

  if (!user) {
    return res.redirect(`${process.env.CLIENT_URL}/login-failure`);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

/**
 * @desc Logout - clear token cookie
 */
export const signout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
};

/**
 * @desc Get current logged-in user (JWT protected)
 */
export const me = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    res.json({ user: { id: user._id, email: user.email } });
  })(req, res, next);
};