import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Activity, Dumbbell, Zap, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const workoutTypes = [
  { name: 'Running', icon: Activity, calPerMin: 10 },
  { name: 'Walking', icon: Activity, calPerMin: 4 },
  { name: 'Cycling', icon: Activity, calPerMin: 8 },
  { name: 'Gym', icon: Dumbbell, calPerMin: 6 },
  { name: 'Yoga', icon: Zap, calPerMin: 3 },
  { name: 'Strength Training', icon: Dumbbell, calPerMin: 5 },
  { name: 'HIIT', icon: Timer, calPerMin: 12 },
];

const Workouts = () => {
  const [selectedType, setSelectedType] = useState(workoutTypes[0]);
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const handleDurationChange = (e) => {
    const val = e.target.value;
    setDuration(val);
    if (val && selectedType) {
      setCalories((val * selectedType.calPerMin).toString());
    } else {
      setCalories('');
    }
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    if (duration) {
      setCalories((duration * type.calPerMin).toString());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!duration || !calories) return;

    try {
      await axios.post('/activity/workout', {
        type: selectedType.name,
        duration: Number(duration),
        calories: Number(calories)
      });
      toast.success('Workout added successfully!');
      setDuration('');
      setCalories('');
    } catch (error) {
      toast.error('Failed to add workout');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Log Workout</h1>
        <p className="text-slate-400">Record your activities and track your progress.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-4">Select Activity Type</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workoutTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = selectedType.name === type.name;
                return (
                  <div
                    key={type.name}
                    onClick={() => handleTypeSelect(type)}
                    className={`cursor-pointer flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                      isSelected 
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' 
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <Icon size={24} className="mb-2" />
                    <span className="text-sm font-medium text-center">{type.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Duration (minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={handleDurationChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Calories Burned</label>
              <input
                type="number"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500"
                required
                min="1"
              />
              <p className="text-xs text-slate-500 mt-2">*Auto-calculated based on average intensity</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors text-lg shadow-lg shadow-emerald-500/20"
          >
            Save Workout
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Workouts;
