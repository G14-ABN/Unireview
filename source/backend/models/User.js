import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  moderatore: {
    type: Boolean,
    required: false,
    default: false,
  },
  nomeUtente: {
    type: String,
    required: true,
  },
  bannedUntil: {
    type: Date,
    required: false,
    default: new Date(0), // Data di default 1970-01-01T00:00:00.000Z
  },
  linguaUI: {
    type: Boolean,
    required: false,
    default: false,
  },
  temaUI: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
