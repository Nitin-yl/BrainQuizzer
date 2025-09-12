import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0d1117] text-white pt-5 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        <div>
          <h2 className="text-2xl font-bold">
            <span className="text-[#21c8d4]">Brain</span>Quizzer
          </h2>
          <p className="mt-2 text-sm font-medium text-white">
            Challenge Karo, Champion Bano.
          </p>
          <p className="mt-4 text-sm leading-6">
            Office No. 201, 2nd Floor, <br />
            Gyan Tower, Knowledge Park, <br />
            Lucknow, Uttar Pradesh - 226010 <br />
            India
          </p>
          <p className="mt-3 text-sm leading-6">
            Email: info@brainquizzer.com <br />
            Phone: +91 98765 43210
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg">Explore</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href="/quizzes" className="hover:text-[#21c8d4]">Play Quizzes</a></li>
            <li><a href="/leaderboard" className="hover:text-[#21c8d4]">Leaderboard</a></li>
            <li><a href="/about" className="hover:text-[#21c8d4]">About Us</a></li>
            <li><a href="/contact" className="hover:text-[#21c8d4]">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg">Follow Us</h3>
          <div className="flex gap-5 mt-4">
            <a href="#" className="hover:text-[#21c8d4]"><Facebook size={22} /></a>
            <a href="#" className="hover:text-[#21c8d4]"><Instagram size={22} /></a>
            <a href="#" className="hover:text-[#21c8d4]"><Twitter size={22} /></a>
            <a href="#" className="hover:text-[#21c8d4]"><Linkedin size={22} /></a>
          </div>
        </div>
      </div>

      <div className="py-5 text-center text-sm text-white">
        © {new Date().getFullYear()}{" "}
        <span className="font-bold">
          <span className="text-[#21c8d4]">Brain</span>Quizzer
        </span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
