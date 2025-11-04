import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Award } from "lucide-react";
import Confetti from "react-confetti";
import { leaderboardApi } from "../api/api";
import toast from "react-hot-toast";

const LeaderBoard = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await leaderboardApi.get(getToken, 50);
        setLeaderboardData(data.leaderboard);
        setCurrentUser(data.currentUser);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
        setError("Failed to load leaderboard. Please try again.");
        toast.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [getToken]);

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
      {leaderboardData[0] && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={150}
        />
      )}

      <h1 className="text-5xl text-center mt-6 font-bold text-white">
        LeaderBoard
      </h1>

      {loading && (
        <div className="text-center text-white text-xl mt-10">
          Loading leaderboard...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-xl mt-10">{error}</div>
      )}

      {!loading && !error && leaderboardData.length === 0 && (
        <div className="text-center text-gray-400 text-xl mt-10">
          No leaderboard data available.
        </div>
      )}

      {!loading && !error && leaderboardData.length > 0 && (
        <>
          <div className="flex justify-center items-end mt-10 space-x-3 md:space-x-4">
            {leaderboardData.slice(0, 3).map((player, index) => (
              <div
                key={player.rank}
                className={`flex flex-col items-center justify-end w-24 md:w-28 rounded-t-xl transition-transform transform hover:scale-105 ${
                  player.rank === 1
                    ? "h-52 md:h-56 bg-yellow-600 ring-2 ring-yellow-400 shadow-lg"
                    : player.rank === 2
                    ? "h-44 md:h-48 bg-gray-500 ring-2 ring-gray-300"
                    : "h-40 md:h-44 bg-orange-600 ring-2 ring-orange-400"
                }`}
              >
                <Award
                  className="w-7 h-7 md:w-8 md:h-8 mb-1"
                  style={{ color: getMedalColor(player.rank) }}
                />
                <span className="font-bold text-white text-sm md:text-base">
                  {player.name}
                </span>
                <span className="font-semibold text-white text-sm md:text-base">
                  {player.score} pts
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center mt-10 space-y-4 w-full">
            {leaderboardData.slice(3).map((player) => (
              <div
                key={player.rank}
                className={`flex flex-col md:flex-row items-center justify-between w-[90%] md:w-[70%] border-2 p-4 rounded-xl transition-transform transform hover:scale-105 ${
                  player.isCurrentUser
                    ? "bg-cyan-800 ring-2 ring-cyan-400 text-white"
                    : "bg-[#161b22] text-white"
                }`}
              >
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <span className="text-xl md:text-2xl font-bold">
                    {player.rank}.
                  </span>
                  <span className="text-xl md:text-2xl font-semibold">
                    {player.name}
                  </span>
                </div>

                <div className="flex flex-col items-end w-full md:w-auto">
                  <span className="text-xl md:text-2xl font-bold">
                    {player.score} pts
                  </span>
                  <span className="text-xs md:text-sm">
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
        </>
      )}

      <Footer />
    </div>
  );
};

export default LeaderBoard;
