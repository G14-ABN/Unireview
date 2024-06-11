import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "../services/googleAuthService.js";
import accessProtectionMiddleware from "../services/accessProtectionMiddleware.js";
import User from "../models/User.js";

const router = Router();
const secretKey = process.env.JWT_SECRET;

router.get("/google", passport.authenticate("google", { session: false }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  async (req, res) => {
    // console.log("id:", req.user?.id);
    // console.log("displayName", req.user?.displayName);
    // console.log("name:", req.user?.name?.givenName);
    // console.log("familyName:", req.user?.name?.familyName);
    // console.log("email:", req.user?.emails?.[0]?.value);

    try {
      // Check if the user exists in the database
      let user = await User.findOne({ email: req.user?.emails?.[0]?.value });

      // If the user does not exist, create a new user record
      if (!user) {
        user = await User.create({
          // googleId: req.user.id,
          email: req.user.emails[0].value,
          nomeUtente: req.user.displayName,
        });
        console.log("Nuovo utente creato:", user.nomeUtente);
      } else {
        console.log("Utente esistente trovato:", user.nomeUtente);
      }

      console.log(
        "Utente autenticato:",
        // user.googleId,
        // user.id,
        user.email,
        user.nomeUtente
      );
      // Generate a JWT token
      const token = jwt.sign(
        {
          // googleId: user.googleId,
          // id: user.id,
          email: user.email,
          nomeUtente: user.nomeUtente,
        },
        secretKey,
        {
          expiresIn: 86400,
        }
      );

      // Redirect the user to the homepage with the token as a query parameter
      res.redirect(`http://localhost:3000/?token=${token}`);
      /*res.json({
        message: `Token: ${token}`, 
      });*/
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore del server" });
    }
  }
);

// Route to test access protection
router.get("/test", accessProtectionMiddleware, (req, res) => {
  res.json({
    message: "You have access to the protected route!",
    user: req.user,
  });
});

export default router;
