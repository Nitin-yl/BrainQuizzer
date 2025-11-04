import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String },
  totalScore: { type: Number, default: 0 },
  quizzesAttempted: { type: Number, default: 0 },
  totalCorrect: { type: Number, default: 0 },
  totalQuestions: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.virtual('accuracy').get(function() {
  if (this.totalQuestions === 0) return 0;
  return Math.round((this.totalCorrect / this.totalQuestions) * 100);
});

export default mongoose.model("User", UserSchema);
