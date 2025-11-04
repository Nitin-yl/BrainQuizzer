import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import Quiz from "../Models/QuizSchema.js";
import Submission from "../Models/SubmissionSchema.js";
import User from "../Models/UserSchemas.js";

const router = express.Router();

router.get("/", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { category, difficulty, search } = req.query;
    const userId = req.auth.userId;

    let filter = { isActive: true };
    
    if (category && category !== "All") filter.category = category;
    if (difficulty && difficulty !== "All") filter.difficulty = difficulty;
    if (search) filter.title = { $regex: search, $options: "i" };

    const quizzes = await Quiz.find(filter).select("-questions.correctAnswer");

    const submissions = await Submission.find({ userId });
    
    const quizzesWithProgress = quizzes.map(quiz => {
      const userSubmissions = submissions.filter(s => s.quizId.toString() === quiz._id.toString());
      
      let status = "not-started";
      let progress = 0;
      
      if (userSubmissions.length > 0) {
        const lastSubmission = userSubmissions[userSubmissions.length - 1];
        status = lastSubmission.completed ? "completed" : "in-progress";
        progress = lastSubmission.completed ? 100 : 50;
      }

      return {
        id: quiz._id,
        name: quiz.title,
        category: quiz.category,
        questions: quiz.questions.length,
        difficulty: quiz.difficulty,
        time: quiz.estimatedTime,
        status,
        progress
      };
    });

    res.json(quizzesWithProgress);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:id", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const quizData = {
      id: quiz._id,
      title: quiz.title,
      category: quiz.category,
      difficulty: quiz.difficulty,
      estimatedTime: quiz.estimatedTime,
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options
      }))
    };

    res.json(quizData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/:id/submit", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const quizId = req.params.id;
    const { answers, timeTaken } = req.body; // answers: [{ questionIndex, selectedAnswer }]

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let correctCount = 0;
    const detailedAnswers = answers.map(ans => {
      const question = quiz.questions[ans.questionIndex];
      const isCorrect = question.correctAnswer === ans.selectedAnswer;
      if (isCorrect) correctCount++;

      return {
        questionIndex: ans.questionIndex,
        selectedAnswer: ans.selectedAnswer,
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      };
    });

    const totalQuestions = quiz.questions.length;
    const score = Math.round((correctCount / totalQuestions) * 100);

    const submission = new Submission({
      userId,
      quizId,
      answers: detailedAnswers,
      score,
      correctCount,
      totalQuestions,
      timeTaken,
      completed: true
    });
    await submission.save();

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      user = new User({
        clerkId: userId,
        name: "User",
        email: "user@example.com"
      });
    }

    user.totalScore += score;
    user.quizzesAttempted += 1;
    user.totalCorrect += correctCount;
    user.totalQuestions += totalQuestions;
    user.lastActive = new Date();
    await user.save();

    await updateRankings();

    res.json({
      message: "Quiz submitted successfully",
      score,
      correctCount,
      totalQuestions,
      answers: detailedAnswers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { title, category, difficulty, questions, estimatedTime } = req.body;

    const quiz = new Quiz({
      title,
      category,
      difficulty,
      questions,
      estimatedTime,
      createdBy: req.auth.userId,
    });

    await quiz.save();
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

async function updateRankings() {
  try {
    const users = await User.find().sort({ totalScore: -1 });
    
    for (let i = 0; i < users.length; i++) {
      users[i].rank = i + 1;
      await users[i].save();
    }
  } catch (err) {
    console.error("Error updating rankings:", err);
  }
}

export default router;
