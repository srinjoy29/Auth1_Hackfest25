// config/passport.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import User from "../models/userModel.js"; // Adjust this if needed

dotenv.config();

// 🔐 Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // 👤 Create a new user if not exists
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            profilePic: profile.photos?.[0]?.value,
            accessToken,
            refreshToken,
          });
        } else {
          // 🔁 Update tokens if changed
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        return done(error, null);
      }
    }
  )
);

// ✅ JWT Strategy (reads JWT from cookies)
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => req?.cookies?.token || null, // ⬅️ Read JWT from cookie named 'token'
  ]),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;