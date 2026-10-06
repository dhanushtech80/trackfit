import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Droplets, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const WaterTracker = () => {
  const { user } = useAuth();
  const [water, setWater] = useState(0);
  const goal = user?.goals?.water || 2.5;

  const fetchActivity = async () => {
    try {
      const { data } = await axios.get('/activity/today');
      setWater(data.water);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const addWater = async (amount) => {
    try {
      const newAmount = water + amount;
      await axios.put('/activity/today', { water: newAmount });
      setWater(newAmount);
      toast.success(`Added ${amount * 1000}ml of water!`);
    } catch (error) {
      toast.error('Failed to update water');
    }
  };

  const percentage = Math.min(Math.round((water / goal) * 100), 100);

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Droplets className="text-cyan-400" size={32} /> Water Tracker
        </h1>
        <p className="text-slate-400">Stay hydrated! Your daily goal is {goal}L.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden"
      >
        {/* Decorative background circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-10" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-48 h-48 rounded-full border-8 border-slate-800 flex items-center justify-center mb-8 relative">
            {/* Progress Circle (simplified with CSS for now) */}
            <div 
              className="absolute inset-0 rounded-full border-8 border-cyan-400 transition-all duration-1000"
              style={{
                clipPath: `polygon(0 0, 100% 0, 100% ${100 - percentage}%, 0 ${100 - percentage}%)`,
                transform: 'rotate(180deg)'
              }}
            />
            <div className="text-center z-20">
              <span className="text-4xl font-bold text-white block">{water.toFixed(2)}L</span>
              <span className="text-cyan-400 font-medium">{percentage}% of goal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <button 
              onClick={() => addWater(0.25)}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-300 p-4 rounded-2xl transition-all flex flex-col items-center justify-center group"
            >
              <Droplets className="mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>250 ml</span>
              <span className="text-xs text-slate-500">Glass</span>
            </button>
            <button 
              onClick={() => addWater(0.5)}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-300 p-4 rounded-2xl transition-all flex flex-col items-center justify-center group"
            >
              <Droplets className="mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>500 ml</span>
              <span className="text-xs text-slate-500">Bottle</span>
            </button>
            <button 
              onClick={() => addWater(0.75)}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-300 p-4 rounded-2xl transition-all flex flex-col items-center justify-center group"
            >
              <Droplets className="mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>750 ml</span>
              <span className="text-xs text-slate-500">Large Bottle</span>
            </button>
            <button 
              onClick={() => addWater(1.0)}
              className="bg-slate-950 border border-slate-800 hover:border-cyan-500 hover:bg-cyan-500/10 text-slate-300 p-4 rounded-2xl transition-all flex flex-col items-center justify-center group"
            >
              <Droplets className="mb-2 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>1000 ml</span>
              <span className="text-xs text-slate-500">Jug</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WaterTracker;
