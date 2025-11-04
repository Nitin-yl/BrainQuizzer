import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { quizApi } from "../api/api";
import toast from "react-hot-toast";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [startTime] = useState(Date.now());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const data = await quizApi.getById(getToken, id);
        setQuiz(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch quiz:", err);
        setError("Failed to load quiz. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, getToken]);

  const handleAnswer = async (option) => {
    const updatedAnswers = [
      ...answers,
      { questionIndex: currentIndex, selectedAnswer: option },
    ];
    setAnswers(updatedAnswers);

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await submitQuiz(updatedAnswers);
    }
  };

  const submitQuiz = async (finalAnswers) => {
    try {
      setSubmitting(true);
      const timeTaken = Math.floor((Date.now() - startTime) / 1000);

      const result = await quizApi.submit(getToken, id, {
        answers: finalAnswers,
        timeTaken,
      });

      toast.success(
        `Quiz Completed! Score: ${result.score}% (${result.correctCount}/${result.totalQuestions})`
      );
      navigate("/quizzes");
    } catch (err) {
      console.error("Failed to submit quiz:", err);
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="bg-[#0d1117] min-h-screen text-white flex flex-col">
        <Navbar />
        <div className="text-center text-xl mt-12">Loading quiz...</div>
        <Footer />
      </div>
    );

  if (error)
    return (
      <div className="bg-[#0d1117] min-h-screen text-white flex flex-col">
        <Navbar />
        <div className="text-center text-red-500 text-xl mt-12">{error}</div>
        <Footer />
      </div>
    );

  if (!quiz) return null;

  const currentQuestion = quiz.questions[currentIndex];

  return (
    <div className="bg-[#0d1117] min-h-screen text-white flex flex-col">
      <Navbar />

      <div className="flex-1 max-w-3xl mx-auto mt-12 px-6">
        <h1 className="text-3xl font-bold mb-4">{quiz.title}</h1>
        <p className="text-gray-400 mb-4">
          Question {currentIndex + 1} of {quiz.questions.length} |{" "}
          {quiz.difficulty}
        </p>

        <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Q{currentIndex + 1}: {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={submitting}
                className="w-full p-3 bg-cyan-700 hover:bg-cyan-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default QuizPage;
