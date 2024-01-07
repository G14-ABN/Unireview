import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  moderatore: {
    type: Boolean,
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
    default: new Date(0), // Data di default (0/0/0)
  },
  linguaUi: {
    type: String, // Puoi utilizzare String o Boolean in base alle tue esigenze
  },
  temaUi: {
    type: String, // Puoi utilizzare String o Boolean in base alle tue esigenze
  },
});

const User = mongoose.model("User", userSchema);

export default User;
