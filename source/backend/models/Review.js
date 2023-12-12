import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  autore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Fa riferimento al modello User
    required: true,
  },
  professore: {
    type: String,
    required: true,
  },
  corso: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    required: true,
    default: Date.now,
  },
  valutazioneProfessore: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  valutazioneFattibilita: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  valutazioneMateriale: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  testo: {
    type: String,
    default: null,
  },
  voto: {
    type: Number,
    default: null,
  },
  frequenza: {
    type: String,
    enum: ["Nessuna", "Minore50", "Maggiore50"],
    default: "Nessuna",
    required: true,
  },
  anonima: {
    type: Boolean,
    default: false,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
