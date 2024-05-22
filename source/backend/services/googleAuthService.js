import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "../loadEnvironment.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URI,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    (req, accessToken, refreshToken, profile, done) => {
      console.log("Authenticated user:", profile);
      return done(null, profile);
    }
  )
);

export default passport;
