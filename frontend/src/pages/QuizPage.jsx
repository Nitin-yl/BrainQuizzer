import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Local fallback questions
const fallbackQuestions = [
  {
    question: "Which hook is used for state in React?",
    options: ["useEffect", "useState", "useRef", "useReducer"],
    answer: "useState",
  },
  {
    question: "What does JS === operator check?",
    options: ["Type only", "Value only", "Value and Type", "None"],
    answer: "Value and Type",
  },
  {
    question: "Which method adds an element at the end of array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
];

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // seconds per quiz
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch questions from API or fallback
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
        if (!response.ok) throw new Error("API Error");
        const data = await response.json();

        // Map Open Trivia DB format to our format
        const formatted = data.results.map((q) => ({
          question: q.question,
          options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
          answer: q.correct_answer,
        }));

        setQuestions(formatted);
      } catch (err) {
        console.warn("Failed to fetch API, using fallback questions.", err);
        setQuestions(fallbackQuestions);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [id]);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0 || loading) return;
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, loading]);

  const handleAnswer = (option) => {
    if (option === questions[currentIndex].answer) setScore(score + 1);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert(`Quiz Finished! Your score: ${score + 1}/${questions.length}`);
      navigate("/quizzes");
    }
  };

  if (loading) return <div className="text-white text-center mt-12">Loading questions...</div>;
  if (!questions.length) return <div className="text-white text-center mt-12">No questions available.</div>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="bg-[#0d1117] min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto mt-12 px-6">
        <h1 className="text-3xl font-bold mb-4">Quiz ID: {id}</h1>
        <p className="text-gray-400 mb-4">Time Left: {timeLeft}s</p>

        <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Q{currentIndex + 1}: {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="w-full p-3 bg-cyan-700 hover:bg-cyan-600 rounded-lg transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-red-500 mt-4 text-sm">
            Failed to fetch online questions. Using fallback questions.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default QuizPage;
