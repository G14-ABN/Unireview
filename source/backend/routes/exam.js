import express from "express";
import Exam from "../models/Exam.js";
import User from "../models/User.js";
import accessProtectionMiddleware from "../services/accessProtectionMiddleware.js";

const router = express.Router();

// GET all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    if (exams.length === 0) {
      return res.status(404).json({ error: "Nessun esame trovaro" });
    }
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Errore del server" });
  }
});

// POST new exam (solo moderatori)
router.post("/", accessProtectionMiddleware, async (req, res) => {
  try {
    // Verifica se l'utente è un moderatore
    const requester = await User.findOne({ email: req.user.email });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    // Ottieni i dettagli del nuovo esame
    const { professore, esame } = req.body;

    // Crea un nuovo esame
    const nuovoEsame = new Exam({
      professore,
      esame,
    });

    // Salva esame nel database
    const esameSalvato = await nuovoEsame.save();

    res.status(201).json(esameSalvato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// DELETE exam by name (solo moderatori)
router.delete("/:esame", accessProtectionMiddleware, async (req, res) => {
  try {
    // Verifica se l'utente è un moderatore
    const requester = await User.findOne({ email: req.user.email });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    const esame = req.params.esame;

    // Trova l'esame nel database
    const esameTrovato = await Exam.findOne({ esame });

    if (!esameTrovato) {
      return res.status(404).json({ error: "Esame non trovato" });
    }

    await Exam.deleteOne({ esame });
    res.status(200).json({ message: "Esame eliminato con successo" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// GET exams by professore
router.get("/professore/:professore", async (req, res) => {
  try {
    const { professore } = req.params;
    const exams = await Exam.find({ professore });
    if (exams.length === 0) {
      return res
        .status(404)
        .json({ error: "Nessun esame trovaro per il professore selezionato" });
    }
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Errore del server" });
  }
});

// GET exams by name
router.get("/esame/:esame", async (req, res) => {
  try {
    const { esame } = req.params;
    const exams = await Exam.find({ esame });
    if (exams.length === 0) {
      return res
        .status(404)
        .json({ error: "Nessun esame trovaro per il nome selezionato" });
    }
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
