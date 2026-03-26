import React from "react";
import { IMAGES } from "../../utils/constants";

const Footer = () => {
  return (
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

      <div className="text-center text-sm text-gray-500 border-t border-gray-700 py-4">
        © {new Date().getFullYear()} Project Management System
      </div>

    </footer>
  );
};

export default Footer;