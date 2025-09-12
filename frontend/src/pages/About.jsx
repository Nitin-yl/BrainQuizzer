import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pic1 from "../assets/pic1.png";
import pic2 from "../assets/pic2.png";
import pic3 from "../assets/pic3.png";
import { CheckCircle, Star, Clock, Trophy, User } from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#0d1117]">
      <Navbar />

      <div className="flex flex-col items-center mt-10 space-y-10 px-6 md:px-12">
        <div className="border border-white w-full max-w-6xl rounded-lg text-white flex flex-col md:flex-row h-auto md:h-96 overflow-hidden">
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-4">About BrainQuizzer</h1>
            <p className="text-lg leading-8">
              BrainQuizzer is an interactive online quiz platform designed to
              challenge your knowledge, sharpen your skills, and let you compete
              with others in a fun and engaging way. Our mission is to make
              learning exciting while helping you track your progress.
            </p>
          </div>

          <div className="flex-1">
            <img
              src={pic1}
              alt="BrainQuizzer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="border border-white w-full max-w-6xl rounded-lg text-white flex flex-col md:flex-row h-auto md:h-96 overflow-hidden">
          {/* Image */}
          <div className="flex-1">
            <img
              src={pic2}
              alt="Features"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 p-8 flex flex-col justify-center space-y-6">
            <h1 className="text-3xl font-bold mb-4">Features</h1>
            <ul className="space-y-4 flex flex-col">
              <li className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-cyan-500" />
                <span>Wide variety of quizzes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-cyan-500" />
                <span>Multiple difficulty levels</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-cyan-500" />
                <span>Real-time leaderboard</span>
              </li>
              <li className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-cyan-500" />
                <span>Track your scores</span>
              </li>
              <li className="flex items-center space-x-2">
                <User className="w-5 h-5 text-cyan-500" />
                <span>User-friendly interface</span>
              </li>
            </ul>
            <p className="text-lg leading-8 mt-4">
              At BrainQuizzer, we offer quizzes in multiple subjects with varying
              difficulty levels, from beginner to expert. Work on your skills,
              check the leaderboard, and challenge yourself daily!
            </p>
          </div>
        </div>

        <div className="border border-white w-full max-w-6xl rounded-lg text-white flex flex-col md:flex-row h-auto md:h-96 overflow-hidden">
          {/* Text */}
          <div className="flex-1 p-8 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Who It's For</h1>
            <p className="text-lg leading-8 mb-4">
              Whether you are a student looking to revise topics, a professional
              sharpening your skills, or just someone who loves brain
              challenges, BrainQuizzer is designed for everyone. Join
              BrainQuizzer today, challenge yourself, and become a quiz
              champion! Learning has never been this fun.
            </p>

            <button className="bg-cyan-700 hover:bg-cyan-800 transition-colors text-white font-semibold px-6 py-2 rounded-lg w-fit">
              Start Quizzing Now
            </button>
          </div>

          <div className="flex-1">
            <img
              src={pic3}
              alt="Audience"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
\
        <div className="border border-white w-full max-w-6xl rounded-lg text-white p-10 text-center mt-10 
          transition-transform transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 leading-8">
            To make learning engaging, competitive, and rewarding by turning
            knowledge into a game that anyone can play, anytime, anywhere.
          </p>
        </div>
\
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mt-10">
          {[
            {
              title: "Learning",
              icon: <CheckCircle className="text-cyan-500 w-8 h-8" />,
              desc: "We believe knowledge should be fun, accessible, and limitless.",
            },
            {
              title: "Competition",
              icon: <Trophy className="text-cyan-500 w-8 h-8" />,
              desc: "Friendly challenges bring out the best in every learner.",
            },
            {
              title: "Growth",
              icon: <Star className="text-cyan-500 w-8 h-8" />,
              desc: "Track your progress and grow with every quiz you take.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#161b22] p-6 rounded-lg text-center border border-gray-700 
              transition transform hover:-translate-y-2 hover:shadow-xl hover:border-cyan-500"
            >
              <div className="flex justify-center mb-3">{item.icon}</div>
              <h3 className="font-bold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-6xl mt-12 bg-gradient-to-r from-cyan-700 to-cyan-500 
          rounded-xl p-10 text-center text-white transition hover:shadow-2xl hover:shadow-cyan-400/40 hover:scale-105">
          <h2 className="text-3xl font-bold mb-3">
            Ready to Become a Quiz Champion?
          </h2>
          <p className="mb-5 text-lg">
            Join thousands of learners already challenging themselves daily!
          </p>
          <button className="bg-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
            Start Playing Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
