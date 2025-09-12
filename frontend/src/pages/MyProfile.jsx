import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from "@clerk/clerk-react"; 
import {
  User,
  Trophy,
  Star,
  Award,
} from "lucide-react";


const ProgressCircle = ({ percentage }) => {
  const radius = 40; 
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-20 h-20 md:w-28 md:h-28">
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke="#2d3748"
        strokeWidth="6"
        fill="transparent"
      />
      <circle
        cx="50%"
        cy="50%"
        r={radius}
        stroke="#21c8d4"
        strokeWidth="6"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm md:text-lg font-bold fill-white"
      >
        {percentage}%
      </text>
    </svg>
  );
};

const MyProfile = () => {
  const { user } = useUser();
  const navigate = useNavigate();


  const stats = {
    quizzesAttempted: 24,
    totalScore: 1875,
    accuracy: 82,
    rank: 12,
  };

  const recent = [
    { title: "React Basics", score: "85%", status: "Completed" },
    { title: "JavaScript Advanced", score: "76%", status: "Completed" },
    { title: "Python Quiz", score: "In Progress", status: "Ongoing" },
  ];

  const badges = [
    { icon: Trophy, label: "10 Quizzes Completed" },
    { icon: Star, label: "Accuracy above 80%" },
    { icon: Award, label: "Top 20 Leaderboard" },
  ];

  return (
    <div className="bg-[#0d1117] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 text-white">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 border border-gray-700 rounded-2xl p-6 md:p-8 bg-[#161b22] shadow-lg relative">
          
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt={user.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full border-2 border-cyan-500"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-cyan-700 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold">
              {user?.firstName?.charAt(0) || "U"}
            </div>
          )}

    
          <div className="text-center md:text-left space-y-1 flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
              {user?.fullName || "Guest"}
            </h1>
            <p className="text-xs sm:text-sm md:text-gray-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

    
          <div className="w-full md:w-auto flex justify-end mt-4 md:mt-0">
            <button
              onClick={() => navigate("/quizzes")}
              className="bg-cyan-700 hover:bg-cyan-800 transition px-3 sm:px-4 py-2 rounded-lg flex items-center gap-2 text-sm sm:text-base"
            >
              <Trophy size={16} /> Take New Quiz
            </button>
          </div>
        </div>

  
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6 md:mt-12">
          <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
            <Trophy className="w-6 h-6 md:w-8 md:h-8 text-cyan-500 mb-2 md:mb-3" />
            <p className="text-base md:text-lg font-semibold">{stats.quizzesAttempted}</p>
            <span className="text-xs md:text-sm text-gray-400">Quizzes Attempted</span>
          </div>
          <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
            <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mb-2 md:mb-3" />
            <p className="text-base md:text-lg font-semibold">{stats.totalScore}</p>
            <span className="text-xs md:text-sm text-gray-400">Total Score</span>
          </div>
          <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
            <ProgressCircle percentage={stats.accuracy} />
            <span className="text-xs md:text-sm text-gray-400 mt-2">Accuracy</span>
          </div>
          <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
            <User className="w-6 h-6 md:w-8 md:h-8 text-purple-500 mb-2 md:mb-3" />
            <p className="text-base md:text-lg font-semibold">#{stats.rank}</p>
            <span className="text-xs md:text-sm text-gray-400">Leaderboard Rank</span>
          </div>
        </div>

 
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 md:mb-6">Recent Activity</h2>
          <div className="space-y-3 md:space-y-4">
            {recent.map((quiz, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#161b22] border border-gray-700 rounded-xl px-4 py-3 md:px-6 md:py-4 hover:bg-[#1f252d] transition"
              >
                <p className="text-sm sm:text-base font-medium">{quiz.title}</p>
                <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 mt-1 sm:mt-0">
                  <span>Score: {quiz.score}</span>
                  <span>Status: {quiz.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 md:mb-6">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-cyan-700/40 transition"
              >
                <badge.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-500" />
                <span className="text-sm sm:text-base md:text-lg">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyProfile;
