import express from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import User from "../Models/UserSchemas.js";
import Submission from "../Models/SubmissionSchema.js";

const router = express.Router();

router.get("/", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;
    const limit = parseInt(req.query.limit) || 50;

    const users = await User.find()
      .sort({ totalScore: -1 })
      .limit(limit);

    const currentUser = await User.findOne({ clerkId: userId });

    const leaderboard = users.map((user, index) => ({
      rank: index + 1,
      name: user.name,
      clerkId: user.clerkId,
      imageUrl: user.imageUrl,
      score: user.totalScore,
      quizzes: user.quizzesAttempted,
      accuracy: user.totalQuestions > 0 
        ? Math.round((user.totalCorrect / user.totalQuestions) * 100) 
        : 0,
      isCurrentUser: currentUser && user.clerkId === currentUser.clerkId
    }));

    res.json({
      leaderboard,
      currentUser: currentUser ? {
        rank: currentUser.rank,
        name: currentUser.name,
        score: currentUser.totalScore,
        quizzes: currentUser.quizzesAttempted,
        accuracy: currentUser.totalQuestions > 0 
          ? Math.round((currentUser.totalCorrect / currentUser.totalQuestions) * 100) 
          : 0
      } : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/user/:clerkId", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const { clerkId } = req.params;
    
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const submissions = await Submission.find({ userId: clerkId })
      .sort({ submittedAt: -1 })
      .limit(10)
      .populate("quizId", "title");

    const recentQuizzes = submissions.map(sub => ({
      title: sub.quizId?.title || "Unknown Quiz",
      score: sub.score,
      correctCount: sub.correctCount,
      totalQuestions: sub.totalQuestions,
      date: sub.submittedAt,
      timeTaken: sub.timeTaken
    }));

    const stats = {
      name: user.name,
      email: user.email,
      imageUrl: user.imageUrl,
      rank: user.rank,
      totalScore: user.totalScore,
      quizzesAttempted: user.quizzesAttempted,
      accuracy: user.totalQuestions > 0 
        ? Math.round((user.totalCorrect / user.totalQuestions) * 100) 
        : 0,
      recentQuizzes
    };

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
