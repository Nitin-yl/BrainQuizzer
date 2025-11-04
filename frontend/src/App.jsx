import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import { TbLoader3 } from "react-icons/tb";
import Loader from "./components/Loader";
import About from "./pages/About";
import LeaderBoard from "./pages/LeaderBoard";
import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import QuizPage from "./pages/QuizPage";
import AddPage from "./pages/Addpage";

function App() {
  const { isLoaded } = useAuth();
  const [minDelayPassed, setMinDelayPassed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMinDelayPassed(true), 400);
    return () => clearTimeout(t);
  }, []);

  if (!isLoaded || !minDelayPassed) {
    return (
      <div className="bg-[#0d1117] min-h-screen flex items-center justify-center text-white">
        <TbLoader3 className="animate-spin text-5xl text-cyan-700" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={
            <>
              <SignedIn>
                <About />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <>
              <SignedIn>
                <LeaderBoard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/quizzes"
          element={
            <>
              <SignedIn>
                <Quizzes />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/quiz/:id"
          element={
            <>
              <SignedIn>
                <QuizPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <SignedIn>
                <Contact />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/profile"
          element={
            <>
              <SignedIn>
                <MyProfile />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="/add"
          element={
            <>
              <SignedIn>
                <AddPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        <Route
          path="*"
          element={
            <>
              <SignedIn>
                <Navigate to="/" />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
