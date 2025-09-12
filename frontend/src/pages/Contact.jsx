import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);


    setFormData({
      name: "",
      email: "",
      category: "General Inquiry",
      message: "",
    });

    setTimeout(() => setSubmitted(false), 4000);
  };

  const faqs = [
    { q: "How do I start a quiz?", a: "Just go to the Quizzes page, choose one, and click Start." },
    { q: "Can I retake quizzes?", a: "Yes! You can retake quizzes as many times as you like." },
    { q: "How is scoring calculated?", a: "Scores depend on accuracy, speed, and difficulty level." },
  ];

  return (
    <div className="bg-[#0d1117] min-h-screen text-white">
      <Navbar />

      <div className="text-center mt-10 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
        <p className="text-gray-400 mt-2">
          Have questions? We’d love to hear from you!
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6">

        <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-cyan-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-cyan-500"
              required
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-cyan-500"
            >
              <option>General Inquiry</option>
              <option>Support</option>
              <option>Feedback</option>
              <option>Business Collaboration</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#0d1117] border border-gray-600 focus:outline-cyan-500"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-cyan-700 hover:bg-cyan-600 py-2 rounded-lg font-semibold"
            >
              Send
            </button>
          </form>
          {submitted && (
            <p className="mt-3 text-green-400 font-medium text-center">
               Message Sent Successfully!
            </p>
          )}
        </div>


        <div>
          <div className="bg-[#161b22] p-6 rounded-2xl shadow-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">Our Office</h2>
            <p>Office No. 201, Gyan Tower, Knowledge Park</p>
            <p>Lucknow, Uttar Pradesh - 226010, India</p>
            <p className="mt-3"> info@brainquizzer.com</p>
            <p> +91 98765 43210</p>
          </div>
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.961904649211!2d80.94616631536395!3d26.84670898315671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2ffdddddd%3A0xabcdef123456789!2sLucknow!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="250"
            allowFullScreen=""
            loading="lazy"
            className="rounded-2xl border-0"
          ></iframe>
        </div>
      </div>


      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mt-16 px-6">
        <div className="bg-[#161b22] p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-cyan-400">5000+</h2>
          <p className="text-gray-400">Quizzes Taken</p>
        </div>
        <div className="bg-[#161b22] p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-cyan-400">1200+</h2>
          <p className="text-gray-400">Active Players</p>
        </div>
        <div className="bg-[#161b22] p-6 rounded-xl">
          <h2 className="text-3xl font-bold text-cyan-400">20+</h2>
          <p className="text-gray-400">Countries Reached</p>
        </div>
      </div>


      <div className="max-w-3xl mx-auto bg-[#161b22] p-8 mt-16 rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-3">Subscribe to our Newsletter</h2>
        <p className="text-gray-400 mb-4">
          Get updates on new quizzes, competitions, and rewards.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-lg bg-[#0d1117] border border-gray-600 text-white flex-1 focus:outline-cyan-500"
          />
          <button className="bg-cyan-700 hover:bg-cyan-600 py-2 px-6 rounded-lg font-semibold">
            Subscribe
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">FAQs</h2>
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="mb-4 bg-[#161b22] p-4 rounded-lg cursor-pointer"
          >
            <summary className="font-semibold">{faq.q}</summary>
            <p className="mt-2 text-gray-400">{faq.a}</p>
          </details>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
