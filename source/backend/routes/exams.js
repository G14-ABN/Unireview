import express from 'express';
import Exam from '../models/Exam.js';

const router = express.Router();

router.post("/exams", async (req, res) => {
  try {
    // Ottieni i dettagli della recensione dalla richiesta del cliente
    const {
      professore,
      esame,
    } = req.body;

    // Crea una nuova recensione
    const nuovaRecensione = new Review({
      // autore: req.utenteAutenticato._id, // _id dell'utente autenticato
      professore,
      esame,
    });

    // Salva la recensione nel database
    const recensioneSalvata = await nuovaRecensione.save();

    res.status(201).json(recensioneSalvata);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});


// GET exams by professore
router.get('/exams/professore/:professore', async (req, res) => {
  try {
    const { professore } = req.params;
    const exams = await Exam.find({ professore });
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams by professore:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/exams', async (req, res) => {
    try {
      const exams = await Exam.find();
      res.status(200).json(exams);
    } catch (error) {
      console.error('Error fetching exams:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// GET exams by esame
router.get('/exams/esame/:esame', async (req, res) => {
  try {
    const { esame } = req.params;
    const exams = await Exam.find({ esame });
    res.status(200).json(exams);
  } catch (error) {
    console.error('Error fetching exams by esame:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
