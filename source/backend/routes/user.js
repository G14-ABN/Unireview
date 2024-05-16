import express from "express";
import User from "../models/User.js";
import accessProtectionMiddleware from "../services/accessProtectionMiddleware.js";

const router = express.Router();

// Ottiene tutti gli utenti (richiede autenticazione)
router.get("/", accessProtectionMiddleware, async (req, res) => {
  try {
    // Verifica se l'utente che effettua la richiesta è moderatore
    const user = await User.findById({ _id: req.user.id });
    if (user.moderatore) {
      // Se è moderatore, restituisci tutti gli utenti
      const users = await User.find();
      res.status(200).json(users);
    } else {
      // Se non è moderatore, restituisci solo il profilo dell'utente autenticato
      res.status(200).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Ottiene dettagli utente per un ID specifico (richiede autenticazione)
router.get("/:userId", accessProtectionMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const requester = await User.findById({ _id: req.user.id });

    // Verifica se l'utente richiedente è lo stesso di cui si vuole ricevere il profilo o è moderatore
    if (req.user && (req.user.id === userId || requester.moderatore)) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      res.status(200).json(user);
    } else {
      // Se l'utente richiedente non è lo stesso di cui si vuole ricevere il profilo o non è moderatore, restituisci un errore di autorizzazione
      res.status(403).json({ error: "Accesso non autorizzato" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica i dettagli di un utente per un ID specifico (richiede moderatore)
router.patch("/:userId", accessProtectionMiddleware, async (req, res) => {
  try {
    // Verifica se l'utente autenticato è un moderatore
    const requester = await User.findById({ _id: req.user.id });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    const userId = req.params.userId;
    const updateData = req.body;

    // Aggiorna il profilo dell'utente nel database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData);
    if (!updatedUser) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica Lingua UI utente attuale (richiede autenticazione)
router.put("/language", accessProtectionMiddleware, async (req, res) => {
  try {
    const { linguaUI } = req.body;
    const userId = req.user.id;

    // Aggiorna linguaUI dell'utente nel database
    await User.findByIdAndUpdate(userId, { linguaUI });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica Tema UI utente attuale (richiede autenticazione)
router.put("/theme", accessProtectionMiddleware, async (req, res) => {
  try {
    const { temaUI } = req.body;
    const userId = req.user.id;

    // Aggiorna temaUI dell'utente nel database
    await User.findByIdAndUpdate(userId, { temaUI });

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Elimina un utente per ID (richiede autenticazione e autorizzazione)
router.delete("/:userId", accessProtectionMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifica se l'utente che fa la richiesta è amministratore o il proprietario del profilo
    const requester = await User.findById({ _id: req.user.id });
    // const user = await User.findById(requestingUserId);
    if (requester.moderatore || requester.id === userId) {
      // Rimuovi l'utente dal database
      await User.findByIdAndDelete(userId);
      res.sendStatus(200);
    } else {
      // Se l'utente non è autorizzato, restituisci un codice di stato 403 (Non autorizzato)
      res
        .status(403)
        .json({ error: "Non autorizzato a eliminare questo utente" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Impossibile rimuovere utente" });
  }
});

// Rimuove i privilegi di moderatore da un utente (richiede autenticazione e autorizzazione da parte di un moderatore)
router.patch(
  "/:userId/revoke-moderator",
  accessProtectionMiddleware,
  async (req, res) => {
    try {
      // Verifica se l'utente autenticato è un moderatore
      const requester = await User.findById({ _id: req.user.id });
      if (!requester.moderatore) {
        return res.status(403).json({
          error:
            "Accesso negato. Solo i moderatori possono eseguire questa azione.",
        });
      }

      const userId = req.params.userId;

      // Rimuovi i privilegi di moderatore dall'utente nel database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      user.moderatore = false;
      await user.save();

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore del server" });
    }
  }
);

// Promuove un utente a moderatore (richiede autenticazione e autorizzazione da parte di un moderatore)
router.patch(
  "/:userId/promote-moderator",
  accessProtectionMiddleware,
  async (req, res) => {
    try {
      // Verifica se l'utente autenticato è un moderatore
      const requester = await User.findById({ _id: req.user.id });
      if (!requester.moderatore) {
        return res.status(403).json({
          error:
            "Accesso negato. Solo i moderatori possono eseguire questa azione.",
        });
      }

      const userId = req.params.userId;

      // Aggiorna il campo moderatore dell'utente nel database per promuoverlo a moderatore
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      user.moderatore = true;
      await user.save();

      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Errore del server" });
    }
  }
);

// Banna un utente per un numero specifico di giorni (richiede autenticazione e autorizzazione)
router.patch("/:userId/ban", accessProtectionMiddleware, async (req, res) => {
  try {
    const { days } = req.body;
    const userId = req.params.userId;

    // Verifica se l'utente autenticato è un moderatore
    const requester = await User.findById({ _id: req.user.id });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    // Verifica se il numero di giorni è valido
    if (typeof days !== "number" || days <= 0) {
      return res
        .status(400)
        .json({ error: "Il numero di giorni deve essere un numero positivo." });
    }

    // Imposta la data di bannedUntil al numero specificato di giorni dal giorno corrente
    const bannedUntilDate = new Date();
    bannedUntilDate.setDate(bannedUntilDate.getDate() + days);

    // Aggiorna il campo bannedUntil dell'utente nel database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    user.bannedUntil = bannedUntilDate;
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

// Rimuove il ban di un utente (richiede autenticazione e autorizzazione)
router.patch("/:userId/unban", accessProtectionMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;

    // Verifica se l'utente autenticato è un moderatore
    const requester = await User.findById({ _id: req.user.id });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    // Imposta la data di bannedUntil a new Date(0) per rimuovere il ban
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    user.bannedUntil = new Date(0);
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
