import express from "express";
import User from "../models/User.js";
import accessProtectionMiddleware from "../services/accessProtectionMiddleware.js";

const router = express.Router();

// Ottiene tutti gli utenti (richiede autenticazione)
router.get("/", accessProtectionMiddleware, async (req, res) => {
  try {
    // Verifica se l'utente che effettua la richiesta è moderatore
    const user = await User.findOne({ email: req.user.email });
    if (user.moderatore) {
      // Se è moderatore, restituisci tutti gli utenti
      const users = await User.find();
      res.status(200).json(users);
    } else {
      // Se non è moderatore, restituisci solo il profilo dell'utente autenticato
      if (!user) {
        return res.status(404).json({ error: "Nessun utente non trovato" });
      }
      res.status(200).json(user);
    }
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Ottiene dettagli utente per un indirizzo email specifico (richiede autenticazione)
router.get("/:email", accessProtectionMiddleware, async (req, res) => {
  try {
    const email = req.params.email;
    const requester = await User.findOne({ email: req.user.email });

    // Verifica se l'utente richiedente è lo stesso di cui si vuole ricevere il profilo o è moderatore
    if (req.user && (requester.email === email || requester.moderatore)) {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      res.status(200).json(user);
    } else {
      // Se l'utente richiedente non è lo stesso di cui si vuole ricevere il profilo o non è moderatore, restituisci un errore di autorizzazione
      res.status(403).json({ error: "Accesso non autorizzato" });
    }
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica i dettagli di un utente per un indirizzo email specifico (richiede moderatore)
router.patch("/:email", accessProtectionMiddleware, async (req, res) => {
  try {
    // Verifica se l'utente autenticato è un moderatore
    const requester = await User.findOne({ email: req.user.email });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    const email = req.params.email;
    const updateData = req.body;

    // Aggiorna il profilo dell'utente nel database
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      updateData
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "Utente non trovato" });
    }

    res.sendStatus(200);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica Lingua UI utente attuale (richiede autenticazione)
router.put("/language", accessProtectionMiddleware, async (req, res) => {
  try {
    const { linguaUI } = req.body;
    const email = req.user.email;

    // Aggiorna linguaUI dell'utente nel database
    await User.findOneAndUpdate({ email: email }, { linguaUI });

    res.sendStatus(200);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Modifica Tema UI utente attuale (richiede autenticazione)
router.put("/theme", accessProtectionMiddleware, async (req, res) => {
  try {
    const { temaUI } = req.body;
    const email = req.user.email;

    // Aggiorna temaUI dell'utente nel database
    await User.findOneAndUpdate({ email: email }, { temaUI });

    res.sendStatus(200);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Elimina un utente per email (richiede autenticazione e autorizzazione)
router.delete("/:email", accessProtectionMiddleware, async (req, res) => {
  try {
    const email = req.params.email;

    // Verifica se l'utente che fa la richiesta è amministratore o il proprietario del profilo
    const requester = await User.findOne({ email: req.user.email });
    if (requester.moderatore || requester.email === email) {
      // Rimuovi l'utente dal database
      const deletedUser = await User.findOneAndDelete({ email: email });
      if (!deletedUser) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      res.sendStatus(200);
    } else {
      // Se l'utente non è autorizzato, restituisci un codice di stato 403 (Non autorizzato)
      res
        .status(403)
        .json({ error: "Non autorizzato a eliminare questo utente" });
    }
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Impossibile rimuovere utente" });
  }
});

// Rimuove i privilegi di moderatore da un utente (richiede autenticazione e autorizzazione da parte di un moderatore)
router.patch(
  "/revoke-moderator/:email",
  accessProtectionMiddleware,
  async (req, res) => {
    try {
      // Verifica se l'utente autenticato è un moderatore
      const requester = await User.findOne({ email: req.user.email });
      if (!requester.moderatore) {
        return res.status(403).json({
          error:
            "Accesso negato. Solo i moderatori possono eseguire questa azione.",
        });
      }

      const email = req.params.email;

      // Rimuovi i privilegi di moderatore dall'utente nel database
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      user.moderatore = false;
      await user.save();

      res.sendStatus(200);
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
      /* istanbul ignore next */
      res.status(500).json({ error: "Errore del server" });
    }
  }
);

// Promuove un utente a moderatore (richiede autenticazione e autorizzazione da parte di un moderatore)
router.patch(
  "/promote-moderator/:email",
  accessProtectionMiddleware,
  async (req, res) => {
    try {
      // Verifica se l'utente autenticato è un moderatore
      const requester = await User.findOne({ email: req.user.email });
      if (!requester.moderatore) {
        return res.status(403).json({
          error:
            "Accesso negato. Solo i moderatori possono eseguire questa azione.",
        });
      }

      const email = req.params.email;

      // Aggiorna il campo moderatore dell'utente nel database per promuoverlo a moderatore
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "Utente non trovato" });
      }
      user.moderatore = true;
      await user.save();

      res.sendStatus(200);
    } catch (error) {
      /* istanbul ignore next */
      console.error(error);
      /* istanbul ignore next */
      res.status(500).json({ error: "Errore del server" });
    }
  }
);

// Banna un utente per un numero specifico di giorni (richiede autenticazione e autorizzazione)
router.patch("/ban/:email", accessProtectionMiddleware, async (req, res) => {
  try {
    const { days } = req.body;
    const email = req.params.email;

    // Verifica se l'utente autenticato è un moderatore
    const requester = await User.findOne({ email: req.user.email });
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
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    user.bannedUntil = bannedUntilDate;
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

// Rimuove il ban di un utente (richiede autenticazione e autorizzazione)
router.patch("/unban/:email", accessProtectionMiddleware, async (req, res) => {
  try {
    const email = req.params.email;

    // Verifica se l'utente autenticato è un moderatore
    const requester = await User.findOne({ email: req.user.email });
    if (!requester.moderatore) {
      return res.status(403).json({
        error:
          "Accesso negato. Solo i moderatori possono eseguire questa azione.",
      });
    }

    // Imposta la data di bannedUntil a new Date(0) per rimuovere il ban
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    user.bannedUntil = new Date(0);
    await user.save();

    res.sendStatus(200);
  } catch (error) {
    /* istanbul ignore next */
    console.error(error);
    /* istanbul ignore next */
    res.status(500).json({ error: "Errore del server" });
  }
});

export default router;
