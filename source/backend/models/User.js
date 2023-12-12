import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  moderatore: {
    type: Boolean,
    required: true,
    default: false,
  },
  nomeUtente: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bannedUntil: {
    type: Date,
    required: true,
    default: new Date(0), // Data di default (0/0/0)
  },
  linguaUi: {
    type: Boolean,
    required: true,
    default: false,
  },
  temaUi: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
