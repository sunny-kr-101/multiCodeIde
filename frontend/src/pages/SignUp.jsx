import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(api_base_url + "/signUp", {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
          navigate("/login");
        toast.success("✅ Signup successful! Please log in.");
      }
      else {
        toast.error(data.msg || "⚠️ Signup failed. Try again.");
      }
    } catch (err) {
      setMessage("⚠️ Server error. Please try later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Left section with animated gradient */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 flex flex-col justify-center items-center text-center p-10 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 blur-3xl animate-pulse" />
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-4 z-10">
          Welcome to <span className="text-blue-500">MultiCode IDE</span>
        </h1>
        <p className="text-gray-400 max-w-md z-10">
          Build, run, and share your code from anywhere — let’s get you started!
        </p>
      </motion.div>

      {/* Signup form */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 flex justify-center items-center p-10"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-700 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Create Account
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
                className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-200"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition rounded-lg font-semibold text-white tracking-wide shadow-lg"
            >
              Sign Up
            </motion.button>
          </div>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-300">{message}</p>
          )}

          <p className="text-gray-400 text-center mt-6 text-sm">
  Already have an account?{" "}
  <motion.a
    href="/login"
    className="text-blue-400 relative inline-block font-medium"
    whileHover={{ scale: 1.05, color: "#60A5FA" }} // same smooth hover motion
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    Log In
    <motion.span
      className="absolute left-0 bottom-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 origin-left scale-x-0"
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </motion.a>
</p>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
