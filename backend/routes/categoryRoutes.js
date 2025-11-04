import express from "express";
import Quiz from "../Models/QuizSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await Quiz.distinct("category", { isActive: true });
    res.json(categories.sort());
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;