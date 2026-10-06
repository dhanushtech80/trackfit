import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Target } from 'lucide-react';
import { motion } from 'framer-motion';

const Goals = () => {
  const { user, updateProfile } = useAuth();
  const [goals, setGoals] = useState({
    steps: 10000,
    water: 2.5,
    calories: 2500,
    workoutDuration: 60
  });

  useEffect(() => {
    if (user?.goals) {
      setGoals(user.goals);
    }
  }, [user]);

  const handleChange = (e) => {
    setGoals({ ...goals, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({ goals });
      toast.success('Goals updated successfully!');
    } catch (error) {
      toast.error('Failed to update goals');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Target className="text-emerald-400" /> Daily Goals
        </h1>
        <p className="text-slate-400">Set your targets for each day.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Daily Steps</label>
              <input
                type="number"
                name="steps"
                value={goals.steps}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Water Intake (Liters)</label>
              <input
                type="number"
                name="water"
                step="0.1"
                value={goals.water}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Calories Burned</label>
              <input
                type="number"
                name="calories"
                value={goals.calories}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Workout Duration (Minutes)</label>
              <input
                type="number"
                name="workoutDuration"
                value={goals.workoutDuration}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl transition-colors mt-4"
          >
            Save Goals
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Goals;
