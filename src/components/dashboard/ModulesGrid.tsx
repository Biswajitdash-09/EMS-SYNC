
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, DollarSign, BarChart3, Settings, Clock, FileText, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ModulesGrid = () => {
  const navigate = useNavigate();

  const modules = [{
    id: 'employees',
    title: 'Employee Records',
    description: 'Manage employee profiles and information',
    icon: Users,
    color: 'bg-blue-500',
    route: '/employees'
  }, {
    id: 'hr',
    title: 'HR Management',
    description: 'HR policies and workflow management',
    icon: Building,
    color: 'bg-green-500',
    route: '/hr'
  }, {
    id: 'payroll',
    title: 'Payroll System',
    description: 'Salary processing and management',
    icon: DollarSign,
    color: 'bg-purple-500',
    route: '/payroll'
  }, {
    id: 'leave',
    title: 'Leave Management',
    description: 'Track and manage employee leaves',
    icon: Calendar,
    color: 'bg-orange-500',
    route: '/leave'
  }, {
    id: 'performance',
    title: 'Performance Analytics',
    description: 'Employee performance monitoring',
    icon: BarChart3,
    color: 'bg-red-500',
    route: '/performance'
  }, {
    id: 'time',
    title: 'Time Tracking',
    description: 'Attendance and time management',
    icon: Clock,
    color: 'bg-indigo-500',
    route: '/time-tracking'
  }, {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'Comprehensive business reports',
    icon: FileText,
    color: 'bg-cyan-500',
    route: '/reports'
  }, {
    id: 'settings',
    title: 'System Settings',
    description: 'Configure system preferences',
    icon: Settings,
    color: 'bg-gray-500',
    route: '/settings'
  }];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">System Modules</CardTitle>
        <CardDescription>
          Access all employee management features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map(module => (
            <div 
              key={module.id} 
              onClick={() => navigate(module.route)} 
              className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer bg-white hover:bg-gray-50"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${module.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <module.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {module.title}
                  </h3>
                  <p className="text-sm text-gray-500">{module.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ModulesGrid;
