import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// POST /api/reviews - Creazione di una nuova recensione
router.post("/reviews", async (req, res) => {
  try {
    // Ottieni i dettagli della recensione dalla richiesta del cliente
    const {
      professore,
      corso,
      valutazioneProfessore,
      valutazioneFattibilita,
      valutazioneMateriale,
      testo,
      voto,
      frequenza,
      anonima,
    } = req.body;

    // Crea una nuova recensione
    const nuovaRecensione = new Review({
      autore: req.utenteAutenticato._id, // _id dell'utente autenticato
      professore,
      corso,
      valutazioneProfessore,
      valutazioneFattibilita,
      valutazioneMateriale,
      testo,
      voto,
      frequenza,
      anonima,
    });

    // Salva la recensione nel database
    const recensioneSalvata = await nuovaRecensione.save();

    res.status(201).json(recensioneSalvata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
