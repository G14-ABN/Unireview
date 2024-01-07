import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/users - Ottenere tutti gli utenti
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// GET /api/users/:id - Ottenere dettagli utente per un ID specifico
router.get("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const utente = await User.findById(userId);

    if (!utente) {
      return res.status(404).json({ error: "Utente non trovato" }); // FIX Non viene eseguito
    }

    res.json(utente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// POST /api/users - Creazione di un nuovo utente
router.post("/users", async (req, res) => {
  try {
    const { moderatore, nomeUtente, email, bannedUntil, linguaUI, temaUI } =
      req.body;

    // Assicurati che l'indirizzo email sia univoco
    const utenteEsistente = await User.findOne({ email });

    if (utenteEsistente) {
      return res.status(400).json({ error: "L'indirizzo email è già in uso" });
    }

    // Crea un nuovo utente
    const nuovoUtente = new User({
      moderatore,
      nomeUtente,
      email,
      bannedUntil,
      linguaUI,
      temaUI,
    });

    // Salva il nuovo utente nel database
    const utenteSalvato = await nuovoUtente.save();

    res.status(201).json(utenteSalvato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
