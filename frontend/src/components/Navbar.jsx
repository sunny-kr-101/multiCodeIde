import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <div className="nav w-full bg-[#0f0e0e] border-b border-white/10 px-6 md:px-[100px] h-[80px] flex items-center justify-between relative">

        {/* Logo */}
        <motion.img
          src={logo}
          alt="logo"
          className="w-[150px] md:w-[170px] object-cover"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
        />

        {/* Desktop Links */}
        <div className="hidden md:flex gap-[25px] text-white font-medium text-lg">
          {["Home", "About", "Services", "Contact Us"].map((item, index) => (
            <motion.a
              key={index}
              href="#"
              className="transition-all hover:text-blue-500"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Icon */}
        <motion.button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
          whileTap={{ scale: 0.85 }}
        >
          ☰
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="absolute top-[80px] left-0 w-full bg-[#0f0e0e] border-t border-white/10 flex flex-col items-start px-6 py-5 gap-4 md:hidden z-50"
            >
              {["Home", "About", "Services", "Contact Us"].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-white text-lg font-medium hover:text-blue-400 transition"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default Navbar;
