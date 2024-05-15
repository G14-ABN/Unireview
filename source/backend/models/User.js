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
    required: false,
    default: new Date(0), // Data di default 1970-01-01T00:00:00.000Z
  },
  linguaUi: {
    type: Boolean,
    required: false,
    default: false,
  },
  temaUi: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
