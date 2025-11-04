import express from "express";
import Quiz from "../Models/QuizSchema";

const router = express.Router();

router.post("/addingQuiz", async (req, res) => {
  try {
    const { title, category, difficulty, estimatedTime, createdBy, questions } = req.body;

    if (!title || !category || !difficulty || !estimatedTime || !questions?.length) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newQuiz = new Quiz({
      title,
      category,
      difficulty,
      estimatedTime,
      createdBy,
      questions,
    });

    await newQuiz.save();
    res.status(201).json({ message: "Quiz added successfully!", quiz: newQuiz });
  } catch (error) {
    console.error("Error adding quiz:", error);
    res.status(500).json({ message: "Server error while adding quiz." });
  }
});

export default router;
