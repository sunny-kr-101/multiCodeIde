import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Code2, Play, Cloud, ShieldCheck, Users, Trophy } from "lucide-react";
import logo from "../images/mcl.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="MultiCode IDE Logo" className="h-10 w-10 object-contain" />
          <h1 className="text-2xl font-bold tracking-wide text-cyan-400">MultiCode IDE</h1>
        </Link>
        <div className="flex gap-4">
          <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">Login</Link>
          <Link to="/signup" className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-semibold hover:opacity-90 transition">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-5xl md:text-6xl font-extrabold leading-tight">
          Code. Compile. Run.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">All in One Browser IDE</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-6 max-w-2xl text-gray-400 text-lg">
          Write, run, and save code in multiple programming languages with lightning-fast execution and auto-save support.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-10 flex gap-4">
          <Link to="/signup" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold shadow-lg hover:scale-105 transition">Get Started Free</Link>
          <Link to="/login" className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-gray-800 transition">Login</Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          <Feature icon={<Code2 className="w-6 h-6 text-cyan-400" />} title="Multi-language Support" desc="Java, Python, C++, JavaScript, and more." />
          <Feature icon={<Play className="w-6 h-6 text-blue-400" />} title="Instant Execution" desc="Run your code instantly with real-time output." />
          <Feature icon={<Cloud className="w-6 h-6 text-cyan-400" />} title="Auto Save" desc="Your code is saved automatically and securely." />
          <Feature icon={<ShieldCheck className="w-6 h-6 text-blue-400" />} title="Secure & Reliable" desc="Authentication, protected routes, and cloud sync." />
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-6 py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-extrabold mb-12">
            Our Users' Experience
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            <Stat icon={<Users className="w-8 h-8 text-cyan-400" />} value="25K+" label="Active Users" />
            <Stat icon={<Trophy className="w-8 h-8 text-yellow-400" />} value="4.9/5" label="Average Rating" />
            <Stat icon={<Cloud className="w-8 h-8 text-blue-400" />} value="1M+" label="Projects Saved" />
            <Stat icon={<Code2 className="w-8 h-8 text-green-400" />} value="50+" label="Supported Languages" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MultiCode IDE. Built for developers.
      </footer>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 shadow-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
  );
}

function Stat({ icon, value, label }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 shadow-lg flex flex-col items-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-3xl font-bold mb-1">{value}</h3>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
}