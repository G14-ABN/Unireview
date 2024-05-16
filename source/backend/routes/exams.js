import express from 'express';
import Exam from '../models/Exam.js';

const router = express.Router();

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
