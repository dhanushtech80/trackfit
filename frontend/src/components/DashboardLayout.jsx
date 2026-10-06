import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, Target, Droplets, History as HistoryIcon, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Workouts', path: '/dashboard/workouts', icon: Activity },
  { name: 'Goals', path: '/dashboard/goals', icon: Target },
  { name: 'Water', path: '/dashboard/water', icon: Droplets },
  { name: 'History', path: '/dashboard/history', icon: HistoryIcon },
  { name: 'Profile', path: '/dashboard/profile', icon: User },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const NavLinks = ({ onClick }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={onClick}
            className={cn(
              "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-emerald-500/10 text-emerald-400 font-medium" 
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
            )}
          >
            <Icon size={20} />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen bg-transparent flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
        <div className="text-xl font-bold text-emerald-400">FIT TRACK</div>
        <button onClick={() => setSidebarOpen(true)} className="text-slate-200">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-slate-900/80 backdrop-blur-md border-r border-slate-800 p-4 transform transition-transform duration-300 z-50 md:relative md:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between mb-8 px-4">
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            FIT TRACK
          </div>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-slate-200">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <NavLinks onClick={() => setSidebarOpen(false)} />
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 mt-auto text-slate-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
