import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quizzesData = [
  { id: 1, name: "React Basics", category: "React", questions: 10, difficulty: "Easy", time: 15, status: "not-started", progress: 0 },
  { id: 2, name: "JavaScript Advanced", category: "JS", questions: 15, difficulty: "Medium", time: 25, status: "in-progress", progress: 40 },
  { id: 3, name: "Python Data Structures", category: "Python", questions: 20, difficulty: "Hard", time: 35, status: "completed", progress: 100 },
  { id: 4, name: "HTML & CSS", category: "Web", questions: 12, difficulty: "Easy", time: 20, status: "completed", progress: 100 },
  { id: 5, name: "Node.js Basics", category: "JS", questions: 18, difficulty: "Medium", time: 30, status: "in-progress", progress: 50 },
  { id: 6, name: "TypeScript Intro", category: "JS", questions: 14, difficulty: "Easy", time: 25, status: "not-started", progress: 0 },
  { id: 7, name: "React Hooks", category: "React", questions: 16, difficulty: "Medium", time: 28, status: "completed", progress: 100 },
  { id: 8, name: "Data Structures in JS", category: "JS", questions: 22, difficulty: "Hard", time: 40, status: "in-progress", progress: 70 },
];

const QuizzesPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const navigate = useNavigate();

  const filteredQuizzes = quizzesData.filter(
    (quiz) =>
      quiz.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || quiz.category === category) &&
      (difficulty === "All" || quiz.difficulty === difficulty)
  );

  const getStatusColor = (status) => {
    if (status === "completed") return "bg-green-500";
    if (status === "in-progress") return "bg-yellow-500";
    return "bg-gray-600";
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "Easy") return "bg-green-500";
    if (difficulty === "Medium") return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Navbar />

      <div className="text-center mt-6 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white">Quizzes</h1>
        <p className="text-gray-300 mt-2">Choose a quiz to test your skills</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center mt-6 space-y-2 sm:space-y-0 sm:space-x-4 px-4">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 rounded-lg w-full sm:w-64 bg-[#161b22] text-white focus:outline-cyan-500 placeholder-gray-400"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 rounded-lg bg-[#161b22] text-white focus:outline-cyan-500"
        >
          <option value="All">All Categories</option>
          <option value="React">React</option>
          <option value="JS">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Web">Web</option>
        </select>

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-3 rounded-lg bg-[#161b22] text-white focus:outline-cyan-500"
        >
          <option value="All">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-2 justify-center">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-[#161b22] rounded-xl p-6 min-h-[240px] flex flex-col justify-between transform transition-all hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{quiz.name}</h2>
              <span
                className={`px-2 py-1 text-xs rounded-full text-white ${getStatusColor(
                  quiz.status
                )}`}
              >
                {quiz.status === "not-started"
                  ? "Not Started"
                  : quiz.status === "in-progress"
                  ? "In Progress"
                  : "Completed"}
              </span>
            </div>

            <div className="flex items-center space-x-2 mb-3">
              <span className="px-2 py-1 text-xs rounded-full bg-blue-500 text-white">{quiz.category}</span>
              <span className={`px-2 py-1 text-xs rounded-full text-white ${getDifficultyColor(quiz.difficulty)}`}>
                {quiz.difficulty}
              </span>
            </div>

            <div className="text-gray-300 mb-4 space-y-1 text-sm sm:text-base">
              <p>Questions: {quiz.questions}</p>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Estimated Time: {quiz.time} min</span>
              </div>
            </div>

            {quiz.status !== "not-started" && (
              <div className="w-full h-2 bg-gray-600 rounded-full mb-4 overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 animate-pulse transition-all duration-700 ease-in-out"
                  style={{ width: `${quiz.progress}%` }}
                ></div>
              </div>
            )}

            {/* Show Start Quiz button only if status is not-started */}
            {quiz.status === "not-started" && (
              <button
                onClick={() => navigate(`/quiz/${quiz.id}`)}
                className="mt-auto bg-cyan-700 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors text-base sm:text-lg"
              >
                Start Quiz
              </button>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default QuizzesPage;
