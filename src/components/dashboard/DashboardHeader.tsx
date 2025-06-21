
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">EMP SYNC Dashboard</h1>
              <p className="text-sm text-gray-500">Welcome back, Admin</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-200">
              System Online
            </Badge>
            <Button variant="outline" onClick={() => navigate('/')} className="text-gray-600">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
