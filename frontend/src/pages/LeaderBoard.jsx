import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award } from "lucide-react";
import Confetti from "react-confetti";

const leaderboardData = [
  { rank: 1, name: "Nitin Goyal", score: 2536, quizzes: 12, accuracy: 95 },
  { rank: 2, name: "Amit Sharma", score: 2400, quizzes: 10, accuracy: 92 },
  { rank: 3, name: "Priya Singh", score: 2300, quizzes: 11, accuracy: 90 },
  { rank: 4, name: "Rahul Verma", score: 2200, quizzes: 9, accuracy: 88 },
  { rank: 5, name: "Sonal Patel", score: 2100, quizzes: 8, accuracy: 85 },
];

const currentUser = "Rahul Verma";

const LeaderBoard = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMedalColor = (rank) => {
    if (rank === 1) return "#ffb800";
    if (rank === 2) return "#c0c0c0";
    if (rank === 3) return "#cd7f32";
    return "#ffffff";
  };

  const maxScore = Math.max(...leaderboardData.map((p) => p.score));

  return (
    <div className="bg-[#0d1117] min-h-screen">
      <Navbar />
      {leaderboardData[0] && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={150} />}
      
      <h1 className="text-5xl text-center mt-6 font-bold text-white">
        LeaderBoard
      </h1>

      <div className="flex justify-center items-end mt-10 space-x-4">
        {leaderboardData.slice(0, 3).map((player, index) => (
          <div
            key={player.rank}
            className={`flex flex-col items-center justify-end w-28 rounded-t-xl transition-transform transform hover:scale-105 ${
              player.rank === 1
                ? "h-56 bg-yellow-600 ring-2 ring-yellow-400 shadow-lg"
                : player.rank === 2
                ? "h-48 bg-gray-500 ring-2 ring-gray-300"
                : "h-44 bg-orange-600 ring-2 ring-orange-400"
            }`}
          >
            <Award className="w-8 h-8 mb-1" style={{ color: getMedalColor(player.rank) }} />
            <span className="font-bold text-white">{player.name}</span>
            <span className="font-semibold text-white">{player.score} pts</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-10 space-y-4 w-full">
        {leaderboardData.slice(3).map((player) => (
          <div
            key={player.rank}
            className={`flex flex-col md:flex-row items-center justify-between w-[90%] md:w-[70%] border-2 p-4 rounded-xl transition-transform transform hover:scale-105 ${
              player.name === currentUser
                ? "bg-cyan-800 ring-2 ring-cyan-400 text-white"
                : "bg-[#161b22] text-white"
            }`}
          >
            <div className="flex items-center space-x-3 mb-2 md:mb-0">
              <span className="text-2xl font-bold">{player.rank}.</span>
              <span className="text-2xl font-semibold">{player.name}</span>
            </div>

            <div className="flex flex-col items-end w-full md:w-auto">
              <span className="text-2xl font-bold">{player.score} pts</span>
              <span className="text-sm">
                Quizzes: {player.quizzes} | Accuracy: {player.accuracy}%
              </span>
              <div className="w-full md:w-40 h-2 bg-gray-600 rounded-full mt-1">
                <div
                  className="h-2 rounded-full bg-cyan-500"
                  style={{ width: `${(player.score / maxScore) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default LeaderBoard;
