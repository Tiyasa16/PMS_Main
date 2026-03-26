import React from "react";
import { Link } from "react-router-dom";
import { IMAGES } from "../../utils/constants";
import Navbar from "../Navbar/NavBar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-800">

      {/* Navbar */}
      {/* <nav className="flex justify-between items-center px-10 py-4 bg-white/90 backdrop-blur shadow-sm sticky top-0 z-50">
        
        <Link to="/">
          <img
            src={IMAGES.logo}
            alt="logo"
            className="w-28 object-contain"
          />
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/login"
            className="text-sm font-semibold text-gray-600 hover:text-[#002D74]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#002D74] text-white px-6 py-2 rounded-lg text-sm font-semibold shadow hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>
      </nav> */}
<Navbar/>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-10 py-20 grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-8">

          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">

            <span className="flex items-center gap-3">
              A New Way of
              <img src={IMAGES.acc1} alt="" className="w-10" />
            </span>

            <span className="flex items-center gap-3 text-[#002D74]">
              Project Management
              <img src={IMAGES.acc2} alt="" className="w-10" />
            </span>

          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
            Manage projects smarter, collaborate better, and achieve goals
            faster with our powerful project management platform built for
            modern teams.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-6 text-sm">

            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-[#002D74] text-lg">✔</span>
              Advanced Task Planning
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-[#002D74] text-lg">✔</span>
              Team Collaboration
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-[#002D74] text-lg">✔</span>
              Progress Tracking
            </div>

            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-[#002D74] text-lg">✔</span>
              Smart Dashboard
            </div>

          </div>

        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={IMAGES.heroBg}
            alt="hero"
            className="w-full max-w-xl drop-shadow-xl"
          />
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 mt-16">

        <div className="max-w-7xl mx-auto px-10 py-14 grid md:grid-cols-3 gap-10">

          {/* Logo */}
          <div className="space-y-4">
            <img src={IMAGES.logo} alt="logo" className="w-32" />
            <p className="text-sm text-gray-400">
              Simplify project management and improve team productivity
              with our modern project management solution.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact</h4>

            <p className="text-sm">📞 +91 9900112233</p>
            <p className="text-sm">✉ support@pms.com</p>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Follow Us</h4>

            <div className="flex gap-4">

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#002D74] transition">
                F
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#002D74] transition">
                X
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#002D74] transition">
                in
              </a>

              <a className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-[#002D74] transition">
                🌐
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center text-sm text-gray-500 border-t border-gray-700 py-4">
          © {new Date().getFullYear()} Project Management System
        </div>

      </footer>
    </div>
  );
};

export default Landing;