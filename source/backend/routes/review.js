import express from "express";
import Review from "../models/Review.js";
import accessProtectionMiddleware from "../services/accessProtectionMiddleware.js";

const router = express.Router();

// Componi una nuova recensione
router.post("/", accessProtectionMiddleware, async (req, res) => {
  try {
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

    const nuovaRecensione = new Review({
      autore: { _id: req.user.id },
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

    const recensioneSalvata = await nuovaRecensione.save();

    res.status(201).json(recensioneSalvata);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const errorParams = Object.keys(error.errors).map((key) => ({
        param: key,
        message: error.errors[key].message,
      }));
      res
        .status(500)
        .json({ error: "Errore nell'inserimento dei dati", errorParams });
    } else {
      res.status(500).json({ error: "Errore nell'inserimento dei dati" });
    }
  }
});

// Restituisce tutte le recensioni
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Elimina una recensione per ID
router.delete("/:reviewId", accessProtectionMiddleware, async (req, res) => {
  try {
    const reviewId = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Recensione non trovata" });
    }

    if (req.user.moderatore || req.user.id === review.autore.toString()) {
      await Review.findByIdAndDelete(reviewId);
      res.status(200).json({ message: "Recensione eliminata con successo" });
    } else {
      res.status(403).json({
        error: "Non sei autorizzato a eliminare questa recensione",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Restituisce le recensioni dell'utente corrente
router.get("/current-user", accessProtectionMiddleware, async (req, res) => {
  try {
    const requestingUserId = req.user.id;

    const reviews = await Review.find({ autore: requestingUserId });
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Restituisce una recensione per ID
router.get("/:reviewId", async (req, res) => {
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

// Modifica una recensione per ID
router.patch("/:reviewId", accessProtectionMiddleware, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const updateData = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Recensione non trovata" });
    }

    if (req.user.moderatore || req.user.id === review.autore.toString()) {
      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        updateData,
        { new: true }
      );
      if (!updatedReview) {
        return res.status(404).json({ error: "Recensione non trovata" });
      }
      res.status(200).json(updatedReview);
    } else {
      res.status(403).json({
        error: "Non sei autorizzato a modificare questa recensione",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
