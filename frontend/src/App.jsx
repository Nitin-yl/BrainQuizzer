import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";

import About from "./pages/About";
import LeaderBoard from "./pages/LeaderBoard";
import Home from "./pages/Home";
import Quizzes from "./pages/Quizzes";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import QuizPage from "./pages/QuizPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page - no protection */}
        <Route path="/" element={<Home />} />

        {/* About page - protected */}
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

        {/* Leaderboard page - protected */}
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

        {/* Quizzes page - protected */}
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

        {/* Quiz page (dynamic) - protected */}
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

        {/* Contact page - protected */}
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

        {/* My Profile - protected */}
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

        {/* Catch all route */}
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
