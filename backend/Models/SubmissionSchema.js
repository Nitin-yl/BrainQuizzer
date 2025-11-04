import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  answers: [{ 
    questionIndex: Number, 
    selectedAnswer: String, 
    isCorrect: Boolean 
  }],
  score: { type: Number, required: true }, 
  correctCount: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timeTaken: { type: Number }, 
  completed: { type: Boolean, default: true },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Submission", SubmissionSchema);
