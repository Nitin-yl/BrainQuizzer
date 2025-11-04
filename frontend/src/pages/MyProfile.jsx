import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Trophy, Star, User, Award } from "lucide-react";
import { fetchUserStats } from "../api/userApi";
import toast from "react-hot-toast";

const ICONS = { Trophy, Star, User, Award };

const MyProfile = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    quizzesAttempted: 0,
    totalScore: 0,
    accuracy: 0,
    rank: 0,
  });
  const [recent, setRecent] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (!userLoaded) return;

    let slowTimer = setTimeout(() => setSlow(true), 5000);

    const getUserData = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchUserStats(getToken, { timeoutMs: 10000 });
        setStats(data.stats);
        setRecent(data.recent);
        setBadges(data.badges);
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load profile");
        toast.error(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
        clearTimeout(slowTimer);
        setSlow(false);
      }
    };

    getUserData();

    return () => clearTimeout(slowTimer);
  }, [getToken, userLoaded]);

  if (!userLoaded) {
    return (
      <div className="bg-[#0d1117] min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 text-white">
          <Loader label="Loading profile..." />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#0d1117] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 py-8 md:py-12 text-white">
        {loading && (
          <Loader
            label={
              slow ? "Still loading your profile..." : "Loading profile..."
            }
          />
        )}
        {error && !loading && (
          <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg p-4 mb-6">
            {error}
          </div>
        )}
        {!loading && !error && (
          <>
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
                <p className="text-base md:text-lg font-semibold">
                  {stats.quizzesAttempted}
                </p>
                <span className="text-xs md:text-sm text-gray-400">
                  Quizzes Attempted
                </span>
              </div>
              <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mb-2 md:mb-3" />
                <p className="text-base md:text-lg font-semibold">
                  {stats.totalScore}
                </p>
                <span className="text-xs md:text-sm text-gray-400">
                  Total Score
                </span>
              </div>
              <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
                {/* <ProgressCircle percentage={stats.accuracy} /> */}
                <span className="text-xs md:text-sm text-gray-400 mt-2">
                  Accuracy
                </span>
              </div>
              <div className="bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 flex flex-col items-center shadow-md hover:shadow-cyan-700/40 transition">
                <User className="w-6 h-6 md:w-8 md:h-8 text-purple-500 mb-2 md:mb-3" />
                <p className="text-base md:text-lg font-semibold">
                  #{stats.rank}
                </p>
                <span className="text-xs md:text-sm text-gray-400">
                  Leaderboard Rank
                </span>
              </div>
            </div>

            <div className="mt-8 md:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 md:mb-6">
                Recent Activity
              </h2>
              <div className="space-y-3 md:space-y-4">
                {recent.map((quiz, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-[#161b22] border border-gray-700 rounded-xl px-4 py-3 md:px-6 md:py-4 hover:bg-[#1f252d] transition"
                  >
                    <p className="text-sm sm:text-base font-medium">
                      {quiz.title}
                    </p>
                    <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 mt-1 sm:mt-0">
                      <span>Score: {quiz.score}</span>
                      <span>Status: {quiz.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-12">
              <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-4 md:mb-6">
                Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {badges.map((badge, i) => {
                  const Icon = ICONS[badge.icon] || Award;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-[#161b22] border border-gray-700 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-cyan-700/40 transition"
                    >
                      <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-500" />
                      <span className="text-sm sm:text-base md:text-lg">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default MyProfile;
