import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Black overlay for text readability (no blue) */}
      <div className="absolute inset-0 bg-black/40 z-10" />
      
      {/* Brighter Background Image specifically for landing page */}
      <img
        src="/background (2).jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            FIT <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">TRACK</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 font-light">
            Track. Train. Transform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] w-full sm:w-auto justify-center"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-slate-800/80 backdrop-blur-md hover:bg-slate-700 text-white rounded-full font-semibold text-lg transition-all duration-300 border border-slate-700 w-full sm:w-auto justify-center flex"
            >
              Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
