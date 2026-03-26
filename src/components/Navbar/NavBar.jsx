import React from "react";
import { IMAGES } from "../../utils/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="sticky top-4 z-50 mt-4 w-[70%] mx-auto px-6 py-3 flex items-center justify-between font-[Poppins]
                 rounded-2xl
                 bg-white/20 backdrop-blur-md
                 border border-white/30
                 shadow-[0_8px_32px_rgba(0,45,116,0.15)]"
    >
      {/* Logo */}
      <div className="flex items-center">
        <img
          src={IMAGES.logo}
          alt="Logo"
          className="h-12 w-auto object-contain"
        />
      </div>

      {/* Links */}
      <ul className="flex gap-9 list-none">
        <li className="text-[#ebab0c] text-[14px] font-semibold cursor-pointer">
          Home
        </li>
        <li className="text-[#002d74] text-[14px] cursor-pointer hover:text-[#1691fd] transition-colors duration-200">
          Blog
        </li>
        <li className="text-[#002d74] text-[14px] cursor-pointer hover:text-[#1691fd] transition-colors duration-200">
          Contact
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-3">
        <button className="px-5 py-2 rounded-[20px] bg-[#002D74]/80 hover:bg-[#002D74] text-white font-bold text-[14px] cursor-pointer transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg">
          <Link to="/login" className="text-sm font-medium">
            Login ➤
          </Link>
        </button>

        <button className="px-5 py-2 rounded-[20px] bg-white/30 hover:bg-[#002D74] border border-[#002D74]/40 hover:border-transparent text-[#002D74] hover:text-white font-bold text-[14px] cursor-pointer transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg">
          <Link to="/register" className="text-sm font-medium">
            Sign Up ➤
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;