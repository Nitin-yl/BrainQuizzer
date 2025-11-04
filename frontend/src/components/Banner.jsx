import { NavLink } from "react-router-dom";
import heroImg from "../assets/hero.png";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="w-full bg-[#0d1117] pt-5 md:pt-7 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 lg:gap-16">
 
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={heroImg}
            alt="Hero Banner"
            className="h-[360px] md:h-[480px] lg:h-[600px] w-full object-cover rounded-xl opacity-75"
          />
        </div>

        <div className="flex-1 flex flex-col text-center md:text-left justify-start mt-6 md:mt-0 pl-0 md:pl-8">
          <h1 className="text-3xl font-extrabold text-slate-200 md:text-4xl lg:text-5xl">
            {"Test Your Knowledge with BrainQuizzer!"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.08,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-4 text-sm md:text-base text-neutral-200"
          >
            Challenge yourself with fun quizzes, track your scores, and see how
            you rank against other BrainQuizzer users!
          </motion.p>

          <form className="mt-8 flex flex-col gap-6 max-w-md mx-auto md:mx-0">
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white shadow-[0_0_10px_#21c8d4] focus:shadow-[0_0_20px_#21c8d4] focus:outline-none transition-all duration-300"
            />
            <select className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white shadow-[0_0_10px_#21c8d4] focus:shadow-[0_0_20px_#21c8d4] focus:outline-none transition-all duration-300">
              <option value=""  >Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <input
              type="text"
              placeholder="Which subject?"
              className="w-full px-4 py-3 rounded-lg bg-[#111827] text-white shadow-[0_0_10px_#21c8d4] focus:shadow-[0_0_20px_#21c8d4] focus:outline-none transition-all duration-300"
            />


            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <NavLink to="/quizzes">
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg bg-[#21c8d4] text-white font-bold hover:bg-cyan-600 transition-colors duration-300"
              >
                Start Quiz
              </button>
              </NavLink>
              <button
                type="reset"
                className="flex-1 px-6 py-3 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-600 transition-colors duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;
