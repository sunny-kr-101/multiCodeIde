import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../images/mcl.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("isAuthenticated", "false");
    navigate("/" ,{replace:true});
  };

  const userName = localStorage.getItem("name") || "User";
  const avatarURL = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    userName
  )}&background=random&size=128`;

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
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
      <div className="hidden md:flex items-center gap-4 relative" ref={profileRef}>
        {/* Profile button */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <img
            src={avatarURL}
            alt="profile"
            className="w-10 h-10 rounded-full border border-gray-400"
          />
          <span className="text-white font-medium">{userName}</span>
        </motion.div>

        {/* Profile Dropdown */}
        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-[60px] right-0 bg-gray-800 rounded-xl border border-gray-700 p-4 shadow-lg flex flex-col gap-3 z-50 w-40"
            >
              <button className="text-white hover:text-blue-400 text-left">
                Pricing
              </button>
              <button
                onClick={handleLogout}
                className="text-white hover:text-red-500 text-left"
              >
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
            <motion.button
              className="text-white text-lg font-medium hover:text-blue-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setProfileOpen(!profileOpen)}
            >
              Profile
            </motion.button>
            {profileOpen && (
              <>
                <button className="text-white hover:text-blue-400 text-left">
                  Pricing
                </button>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-500 text-left"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
