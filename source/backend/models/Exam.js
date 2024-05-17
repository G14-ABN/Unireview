import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
  professore: {
    type: String,
    required: true,
  },
  esame: {
    type: String,
    required: true,
  },
});

const Exam = mongoose.model("Exam", examSchema);

export default Exam;
