import { useState, useEffect } from 'react';
import axios from 'axios';
import { History as HistoryIcon, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await axios.get('/activity/history');
        // Reverse data so oldest is first for chart, but we might want newest first for list
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="text-white">Loading history...</div>;

  // Prepare chart data (reverse to chronological order for charts)
  const chartData = [...history].reverse().map(item => ({
    ...item,
    formattedDate: format(parseISO(item.dateString), 'MMM dd')
  }));

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <HistoryIcon className="text-indigo-400" /> Activity History
        </h1>
        <p className="text-slate-400">Review your past performance and trends.</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
          <Calendar className="mx-auto text-slate-600 mb-4" size={48} />
          <h2 className="text-xl text-white font-medium mb-2">No History Yet</h2>
          <p className="text-slate-400">Start tracking your activity today!</p>
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 h-80">
              <h3 className="text-lg font-medium text-white mb-4">Steps Trend</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="formattedDate" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                    itemStyle={{ color: '#38bdf8' }}
                  />
                  <Line type="monotone" dataKey="steps" stroke="#38bdf8" strokeWidth={3} dot={{ fill: '#0f172a', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-800 h-80">
              <h3 className="text-lg font-medium text-white mb-4">Calories & Active Time</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="formattedDate" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" yAxisId="left" />
                  <YAxis stroke="#94a3b8" yAxisId="right" orientation="right" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="caloriesBurned" name="Calories" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="workoutDuration" name="Duration (min)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History List */}
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Detailed Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-950/50 text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Steps</th>
                    <th className="px-6 py-4 font-medium">Water (L)</th>
                    <th className="px-6 py-4 font-medium">Calories</th>
                    <th className="px-6 py-4 font-medium">Active (min)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {history.map((record, index) => (
                    <motion.tr 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={record._id} 
                      className="hover:bg-slate-800/30 transition-colors text-slate-300"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {format(parseISO(record.dateString), 'MMM dd, yyyy')}
                      </td>
                      <td className="px-6 py-4">{record.steps.toLocaleString()}</td>
                      <td className="px-6 py-4">{record.water.toFixed(2)}</td>
                      <td className="px-6 py-4">{record.caloriesBurned.toLocaleString()}</td>
                      <td className="px-6 py-4">{record.workoutDuration}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default History;
