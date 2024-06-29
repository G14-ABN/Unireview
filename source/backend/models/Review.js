import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  autore: {
    type: String,
    required: true,
  },
  professore: {
    type: String,
    required: true,
  },
  esame: {
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
  tentativo: {
    type: Number,
    min: 0,
    default: 0,
  },
  voto: {
    type: Number,
    min: 17,
    max: 31,
    default: 17,
  },
  frequenza: {
    type: String,
    enum: ["0%", "<50%", ">50%"],
    default: "0%",
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
