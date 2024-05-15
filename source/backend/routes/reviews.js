import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// POST /api/reviews - Creazione di una nuova recensione
router.post("/reviews", async (req, res) => {
  try {
    // Ottieni i dettagli della recensione dalla richiesta del cliente
    const {
      professore,
      esame,
      valutazioneProfessore,
      valutazioneFattibilita,
      valutazioneMateriale,
      testo,
      tentativo,
      voto,
      frequenza,
      anonima,
    } = req.body;

    // Crea una nuova recensione
    const nuovaRecensione = new Review({
      // autore: req.utenteAutenticato._id, // _id dell'utente autenticato
      autore: '65fe050c5aeb05d86b6f89e4', // SOLO PER TESTING
      data: Date.now(),
      professore,
      esame,
      valutazioneProfessore,
      valutazioneFattibilita,
      valutazioneMateriale,
      testo,
      tentativo,
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

// Restituisce tutte le recensioni
router.get("/reviews", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Rimuovi recensione per ID
router.delete("/reviews/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Recensione rimossa con successo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Restituisce una recensione per ID
router.get("/reviews/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: "Recensione non trovata" });
    }
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica recensione esistente per ID
router.patch("/reviews/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updateData = req.body;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });
    if (!updatedReview) {
      return res.status(404).json({ error: "Recensione non trovata" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});


export default router;
