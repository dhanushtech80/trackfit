import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Activity, Droplets, Flame, Footprints, Target, Timer } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, unit, icon: Icon, color, goal, current }) => {
  const percentage = goal ? Math.min(Math.round((current / goal) * 100), 100) : 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon size={24} />
        </div>
        {goal && (
          <span className="text-sm font-medium text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
            {percentage}%
          </span>
        )}
      </div>
      <h3 className="text-slate-400 font-medium mb-1">{title}</h3>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-slate-500 font-medium">{unit}</span>
      </div>
      {goal && (
        <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </motion.div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateSteps, setUpdateSteps] = useState('');
  
  const fetchActivity = async () => {
    try {
      const { data } = await axios.get('/activity/today');
      setActivity(data);
    } catch (error) {
      toast.error('Failed to load activity');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  const handleUpdateSteps = async (e) => {
    e.preventDefault();
    if (!updateSteps) return;
    try {
      await axios.put('/activity/today', { steps: Number(updateSteps) });
      toast.success('Steps updated!');
      setUpdateSteps('');
      fetchActivity();
    } catch (error) {
      toast.error('Failed to update steps');
    }
  };

  const handleQuickAddWater = async () => {
    try {
      await axios.put('/activity/today', { water: activity.water + 0.25 });
      toast.success('Added 250ml water!');
      fetchActivity();
    } catch (error) {
      toast.error('Failed to update water');
    }
  };

  if (loading) return <div className="text-white">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Hello, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-slate-400">Here's your activity for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Steps" 
          value={activity?.steps || 0} 
          unit="steps" 
          icon={Footprints}
          color="bg-blue-500/10 text-blue-400"
          goal={user?.goals?.steps}
          current={activity?.steps}
        />
        <StatCard 
          title="Calories Burned" 
          value={activity?.caloriesBurned || 0} 
          unit="kcal" 
          icon={Flame}
          color="bg-orange-500/10 text-orange-400"
          goal={user?.goals?.calories}
          current={activity?.caloriesBurned}
        />
        <StatCard 
          title="Water Intake" 
          value={activity?.water || 0} 
          unit="L" 
          icon={Droplets}
          color="bg-cyan-500/10 text-cyan-400"
          goal={user?.goals?.water}
          current={activity?.water}
        />
        <StatCard 
          title="Active Time" 
          value={activity?.workoutDuration || 0} 
          unit="min" 
          icon={Timer}
          color="bg-emerald-500/10 text-emerald-400"
          goal={user?.goals?.workoutDuration}
          current={activity?.workoutDuration}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="text-emerald-400" /> Quick Update
          </h3>
          
          <div className="space-y-6">
            <form onSubmit={handleUpdateSteps} className="flex gap-4">
              <input
                type="number"
                placeholder="Enter total steps for today"
                value={updateSteps}
                onChange={(e) => setUpdateSteps(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
              <button 
                type="submit"
                className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl transition-colors"
              >
                Update Steps
              </button>
            </form>

            <div className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div>
                <p className="text-white font-medium">Drink Water</p>
                <p className="text-slate-400 text-sm">+250ml glass</p>
              </div>
              <button 
                onClick={handleQuickAddWater}
                className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
              >
                <Droplets size={18} /> Add
              </button>
            </div>
          </div>
        </div>

        {/* Today's Workouts */}
        <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Target className="text-emerald-400" /> Today's Workouts
          </h3>
          
          {activity?.workouts?.length > 0 ? (
            <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              {activity.workouts.map((workout, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{workout.type}</span>
                    <span className="text-slate-400 text-sm">
                      {new Date(workout.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold">{workout.duration} min</p>
                    <p className="text-slate-400 text-sm">{workout.calories} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <Activity size={48} className="mx-auto mb-4 opacity-20" />
              <p>No workouts recorded today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
