import express from "express";
import { ClerkExpressRequireAuth, clerkClient } from "@clerk/clerk-sdk-node";
import User from "../Models/UserSchemas.js";
import Submission from "../Models/SubmissionSchema.js";

const router = express.Router();

router.post("/sync", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;

    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(clerkUserId);
    } catch (e) {
      clerkUser = { id: clerkUserId, firstName: "", lastName: "", emailAddresses: [], imageUrl: "" };
    }

    let user = await User.findOne({ clerkId: clerkUserId });

    const name = `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User";
    const email = clerkUser.emailAddresses?.[0]?.emailAddress || "user@example.com";

    if (!user) {
      user = new User({
        clerkId: clerkUser.id,
        name,
        email,
        imageUrl: clerkUser.imageUrl || ""
      });
      await user.save();
    } else {
      user.name = name || user.name;
      user.email = email || user.email;
      user.imageUrl = clerkUser.imageUrl || user.imageUrl;
      user.lastActive = new Date();
      await user.save();
    }

    res.json({ message: "User synced successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/stats", ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;

    let clerkUser;
    try {
      clerkUser = await clerkClient.users.getUser(clerkUserId);
    } catch (e) {
      clerkUser = { id: clerkUserId, firstName: "", lastName: "", emailAddresses: [], imageUrl: "", createdAt: null, lastSignInAt: null };
    }

    const userData = {
      id: clerkUser.id,
      firstName: clerkUser.firstName || "",
      lastName: clerkUser.lastName || "",
      fullName: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
      email: clerkUser.emailAddresses?.[0]?.emailAddress || undefined,
      imageUrl: clerkUser.imageUrl || "",
      createdAt: clerkUser.createdAt || null,
      lastSignIn: clerkUser.lastSignInAt || null
    };

    let user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
      user = new User({
        clerkId: clerkUser.id,
        name: userData.fullName || "User",
        email: userData.email || "user@example.com",
        imageUrl: userData.imageUrl || ""
      });
      await user.save();
    }

    const submissions = await Submission.find({ userId: clerkUserId })
      .sort({ submittedAt: -1 })
      .limit(5)
      .populate("quizId", "title");

    const stats = {
      quizzesAttempted: user.quizzesAttempted,
      totalScore: user.totalScore,
      accuracy: user.totalQuestions > 0
        ? Math.round((user.totalCorrect / user.totalQuestions) * 100)
        : 0,
      rank: user.rank || 0
    };

    const recent = submissions.map((sub) => ({
      title: sub.quizId?.title || "Unknown Quiz",
      score: sub.score + "%",
      status: sub.completed ? "Completed" : "Ongoing"
    }));

    const badges = [
      { icon: "Trophy", label: `${stats.quizzesAttempted} Quizzes Completed` },
      { icon: "Star", label: stats.accuracy >= 80 ? "Accuracy ≥ 80%" : "Keep Practicing" },
      { icon: "Award", label: stats.rank <= 20 ? "Top 20 Leaderboard" : `Ranked #${stats.rank}` }
    ];

    res.json({ user: userData, stats, recent, badges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
