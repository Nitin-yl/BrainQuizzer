import { useState } from "react";
import { MessageCircle, Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: "/", label: "Home" },
    { path: "/quizzes", label: "Quizzes" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="bg-[#0d1117]">
      <section className="h-16 flex items-center justify-between px-6 md:px-12">
   
        <NavLink to="/" className="flex items-center gap-2 md:ml-20">
          <div className="relative w-12 h-12">
            <MessageCircle
              className="w-full h-full text-[#21c8d4]"
              strokeWidth={2}
            />
            <span className="absolute inset-0 flex items-center justify-center font-bold text-white text-2xl">
              ?
            </span>
          </div>
          <span className="text-xl font-bold text-white">
            <span className="text-[#21c8d4]">Brain</span>Quizzer
          </span>
        </NavLink>

        <nav className="hidden md:flex">
          <ul className="flex gap-8 text-xl font-medium text-white">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="hover:text-[#21c8d4]"
              >
                <li>{link.label}</li>
              </NavLink>
            ))}
          </ul>
        </nav>


        <div className="hidden md:flex items-center gap-6 font-bold md:mr-20">
          <SignedIn>
            <NavLink
              to="/profile"
              className="text-white hover:text-[#21c8d4] text-lg"
            >
              My Profile
            </NavLink>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="border-2 border-white text-white rounded-lg px-5 py-1 cursor-pointer">
              <SignInButton mode="modal" />
            </div>
          </SignedOut>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </section>

      {isOpen && (
        <div className="md:hidden bg-[#0d1117] border-t px-6">
          <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-white">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-[#21c8d4]"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="font-bold mt-4 flex flex-col gap-4 items-center">
              <SignedIn>
                <NavLink
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-[#21c8d4] text-lg"
                >
                  My Profile
                </NavLink>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <div className="border-2 border-white text-white rounded-lg px-6 py-2 cursor-pointer">
                  <SignInButton mode="modal" />
                </div>
              </SignedOut>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
