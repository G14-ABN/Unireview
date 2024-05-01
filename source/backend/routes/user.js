import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/user - Ottenere tutti gli utenti
router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Nessun utente trovato" });
  }
});

// GET /api/user/:userId - Ottenere dettagli utente per un ID specifico
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const utente = await User.findById(userId);

    if (!utente) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    res.json(utente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica Lingua UI utente attuale
router.put("/current-language", async (req, res) => {
  try {
    const { linguaUI } = req.body;
    // Ottieni l'ID dell'utente autenticato dal token JWT o da un'altra fonte di autenticazione
    const userId = req.utenteAutenticato._id;

    // Aggiorna linguaUI dell'utente nel database
    await User.findByIdAndUpdate(userId, { linguaUI });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica Tema UI utente attuale
router.put("/current-theme", async (req, res) => {
  try {
    const { temaUI } = req.body;
    // Ottieni l'ID dell'utente autenticato dal token JWT o da un'altra fonte di autenticazione
    const userId = req.utenteAutenticato._id;

    // Aggiorna temaUI dell'utente nel database
    await User.findByIdAndUpdate(userId, { temaUI });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Elimina un utente per ID
router.delete("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Rimuovi l'utente dal database
    await User.findByIdAndDelete(userId);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossibile rimuovere utente" });
  }
});

// Aggiorna un utente per ID
router.put("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const userData = req.body;

    // Aggiorna l'utente nel database con i nuovi dati
    await User.findByIdAndUpdate(userId, userData);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Ottieni recensioni di cui sono l’autore
router.get("/:userId/reviews", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Trova tutte le recensioni scritte dall'utente con l'ID specificato
    const reviews = await Review.find({ autore: userId });

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Torna utente standard da moderatore
router.patch("/:userId/revoke-moderator", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Rimuovi i privilegi di moderatore dall'utente nel database
    await User.findByIdAndUpdate(userId, { moderatore: false });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Promuovi utente standard a moderatore
router.patch("/:userId/promote-moderator", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Aggiorna il campo moderatore dell'utente nel database per promuoverlo a moderatore
    await User.findByIdAndUpdate(userId, { moderatore: true });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Banna un utente per 30 giorni
router.patch("/:userId/ban", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Imposta la data di bannedUntil a oggi + 30 giorni
    const bannedUntilDate = new Date();
    bannedUntilDate.setDate(bannedUntilDate.getDate() + 30);

    // Aggiorna il campo bannedUntil dell'utente nel database
    await User.findByIdAndUpdate(userId, { bannedUntil: bannedUntilDate });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Rimuove il ban di un utente
router.patch("/:userId/unban", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Imposta la data di bannedUntil a new Date(0) per rimuovere il ban
    await User.findByIdAndUpdate(userId, { bannedUntil: new Date(0) });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
