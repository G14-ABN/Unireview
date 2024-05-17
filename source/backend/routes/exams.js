import express from "express";
import Exam from "../models/Exam.js";

const router = express.Router();

router.post("/exams", async (req, res) => {
  try {
    // Ottieni i dettagli del nuovo esame
    const { professore, esame } = req.body;

    // Crea un nuovo esame
    const nuovaRecensione = new Exam({
      professore,
      esame,
    });

    // Salva esame nel database
    const recensioneSalvata = await nuovaRecensione.save();

    res.status(201).json(recensioneSalvata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// GET exams by professore
router.get("/exams/professore/:professore", async (req, res) => {
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

// GET all exams
router.get("/exams", async (req, res) => {
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

// GET exams by esame
router.get("/exams/esame/:esame", async (req, res) => {
  try {
    const { esame } = req.params;
    const exams = await Exam.find({ esame });
    if (exams.length === 0) {
      return res
        .status(404)
        .json({ error: "Nessun esame trovaro per l'esame selezionato" });
    }
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
