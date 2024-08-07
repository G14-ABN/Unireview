import express from "express";
import Review from "../models/Review.js";
import User from "../models/User.js";
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
      autore: { _id: req.user.email },
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

    console.log(recensioneSalvata);
    res.status(201).json(recensioneSalvata);
  } catch (error) {
    /* istanbul ignore else */
    if (error.name === "ValidationError") {
      const errorParams = Object.keys(error.errors).map((key) => ({
        param: key,
        message: error.errors[key].message,
      }));
      res
        .status(400)
        .json({ error: "Errore nell'inserimento dei dati", errorParams });
    } else {
      res.status(500).json({ error: "Errore del server" });
    }
  }
});

// Restituisce tutte le recensioni
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: "Nessuna recensione trovata" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Restituisce tutte le recensioni dell'utente specificato
router.get("/:email", async (req, res) => {
  try {
    const reviews = await Review.find({ autore: req.params.email });
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ error: "Nessuna recensione trovata per questo utente" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Restituisce tutte le recensioni relative a un professore specificato
router.get("/professore/:professore", async (req, res) => {
  try {
    const reviews = await Review.find({ professore: req.params.professore });
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ error: "Nessuna recensione trovata per questo professore" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Restituisce tutte le recensioni relative a un esame specificato
router.get("/esame/:esame", async (req, res) => {
  try {
    const reviews = await Review.find({ esame: req.params.esame });
    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ error: "Nessuna recensione trovata per questo esame" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Elimina una recensione per ID
router.delete("/:reviewId", accessProtectionMiddleware, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);
    const requester = await User.findOne({ email: req.user.email });

    if (!review) {
      return res.status(404).json({ error: "Recensione non trovata" });
    }

    if (requester.moderatore || requester.email === review.autore.toString()) {
      await Review.findByIdAndDelete(reviewId);
      console.log(review + "\nRecensione eliminata con successo");
      res.status(200).json({ message: "Recensione eliminata con successo" });
    } else {
      res.status(403).json({
        error: "Non sei autorizzato a eliminare questa recensione",
      });
    }
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica una recensione per ID
router.patch("/:reviewId", accessProtectionMiddleware, async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updateData = req.body;
    const requester = await User.findOne({ email: req.user.email });

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ error: "Recensione non trovata" });
    }

    if (requester.moderatore || requester.email === review.autore.toString()) {
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
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
