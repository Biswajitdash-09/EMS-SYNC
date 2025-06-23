
import { User } from 'lucide-react';

const DashboardHeaderLogo = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, Admin</p>
      </div>
    </div>
  );
};

export default DashboardHeaderLogo;
