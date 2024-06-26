import express from "express";
import nodemailer from "nodemailer";
import accessProtectionMiddleware from "../services/accessProtectionMiddleware.js";

/* istanbul ignore next */
async function sendMail(subject, text) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "unireview.unitn@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: "UniReview <unireview.unitn@gmail.com>",
      to: "unireview.moderatori@gmail.com",
      subject: subject,
      text: text,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}

async function sendMaillog(subject, text) {
  console.log(`Segnalazione ricevuta\nOggetto: ${subject},\nTesto: ${text}`);
  // console.log("\x07");
}

const router = express.Router();

router.post("/", accessProtectionMiddleware, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ error: "Il testo dell'email è obbligatorio" });
    }

    const subject = `Richiesta di supporto da ${req.user.nomeUtente} <${req.user.email}>`;

    await sendMaillog(subject, text);

    res.status(200).json({ message: "Email inviata con successo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
