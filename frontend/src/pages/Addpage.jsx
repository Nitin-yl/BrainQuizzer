import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

const AddPage = () => {
  const { getToken } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [estimatedTime, setEstimatedTime] = useState(10);
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      explanation: "",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        explanation: "",
      },
    ]);
  };

  const removeQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = await getToken();

      if (!token) {
        alert("Please sign in to add a quiz.");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/quizzes",
        { title, category, difficulty, estimatedTime, questions },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Quiz added successfully!");
      setTitle("");
      setCategory("");
      setDifficulty("Easy");
      setEstimatedTime(10);
      setQuestions([
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          explanation: "",
        },
      ]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add quiz. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0d1117] min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-start mt-12 px-4">
        <div className="bg-[#161b22] w-full max-w-3xl p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">
            ➕ Add Full Quiz
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Quiz Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
              required
            />

            <input
              type="text"
              placeholder="Category (e.g. React, JS, Python)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
              required
            />

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:border-cyan-500 outline-none text-white"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="number"
              placeholder="Estimated Time (minutes)"
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
              required
            />

            {questions.map((q, qIndex) => (
              <div
                key={qIndex}
                className="p-5 rounded-xl border border-gray-700 bg-[#0d1117] relative"
              >
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">
                  Question {qIndex + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="absolute top-3 right-3 bg-red-600 hover:bg-red-500 text-white text-sm px-2 py-1 rounded-lg"
                >
                  ✖ Remove
                </button>

                <input
                  type="text"
                  placeholder="Enter Question"
                  value={q.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  className="w-full p-3 mb-3 rounded-lg bg-[#161b22] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
                  required
                />

                {q.options.map((opt, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    className="w-full p-3 mb-2 rounded-lg bg-[#161b22] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
                    required
                  />
                ))}

                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  className="w-full p-3 rounded-lg bg-[#161b22] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
                  required
                />

                <input
                  type="text"
                  placeholder="Explanation (optional)"
                  value={q.explanation}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "explanation", e.target.value)
                  }
                  className="w-full p-3 mt-2 rounded-lg bg-[#161b22] border border-gray-700 focus:border-cyan-500 outline-none text-white placeholder-gray-400"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addNewQuestion}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg"
            >
              ➕ Add Another Question
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Submit Quiz"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddPage;
