
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
    gradient: 'from-blue-400 to-blue-600',
    route: '/employees'
  }, {
    id: 'hr',
    title: 'HR Management',
    description: 'HR policies and workflow management',
    icon: Building,
    color: 'bg-green-500',
    gradient: 'from-green-400 to-green-600',
    route: '/hr'
  }, {
    id: 'payroll',
    title: 'Payroll System',
    description: 'Salary processing and management',
    icon: DollarSign,
    color: 'bg-purple-500',
    gradient: 'from-purple-400 to-purple-600',
    route: '/payroll'
  }, {
    id: 'leave',
    title: 'Leave Management',
    description: 'Track and manage employee leaves',
    icon: Calendar,
    color: 'bg-orange-500',
    gradient: 'from-orange-400 to-orange-600',
    route: '/leave'
  }, {
    id: 'performance',
    title: 'Performance Analytics',
    description: 'Employee performance monitoring',
    icon: BarChart3,
    color: 'bg-red-500',
    gradient: 'from-red-400 to-red-600',
    route: '/performance'
  }, {
    id: 'time',
    title: 'Time Tracking',
    description: 'Attendance and time management',
    icon: Clock,
    color: 'bg-indigo-500',
    gradient: 'from-indigo-400 to-indigo-600',
    route: '/time-tracking'
  }, {
    id: 'reports',
    title: 'Reports & Analytics',
    description: 'Comprehensive business reports',
    icon: FileText,
    color: 'bg-cyan-500',
    gradient: 'from-cyan-400 to-cyan-600',
    route: '/reports'
  }, {
    id: 'settings',
    title: 'System Settings',
    description: 'Configure system preferences',
    icon: Settings,
    color: 'bg-gray-500',
    gradient: 'from-gray-400 to-gray-600',
    route: '/settings'
  }];

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl animate-fade-in">System Modules</CardTitle>
        <CardDescription className="animate-fade-in stagger-1">
          Access all employee management features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 perspective-1000">
          {modules.map((module, index) => (
            <div 
              key={module.id} 
              onClick={() => navigate(module.route)} 
              className={`
                group relative p-6 border border-gray-200 dark:border-gray-700 
                rounded-xl cursor-pointer overflow-hidden
                transition-all duration-500 ease-out
                hover:border-transparent hover:shadow-2xl
                hover-tilt transform-3d
                animate-bounce-in stagger-${Math.min(index + 1, 6)}
                bg-gradient-to-br from-white to-gray-50 
                dark:from-gray-800 dark:to-gray-900
                hover:from-gray-50 hover:to-white
                dark:hover:from-gray-700 dark:hover:to-gray-800
              `}
            >
              {/* Animated Background Gradient */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-10 
                transition-opacity duration-500
                bg-gradient-to-br ${module.gradient}
              `} />
              
              {/* Glow Effect */}
              <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-20
                transition-opacity duration-500 blur-xl
                bg-gradient-to-br ${module.gradient}
                -z-10
              `} />
              
              <div className="flex items-center space-x-4 relative z-10">
                {/* Icon Container with 3D Effects */}
                <div className={`
                  relative w-16 h-16 rounded-2xl flex items-center justify-center
                  transition-all duration-500 transform-3d
                  group-hover:scale-110 group-hover:rotate-12
                  bg-gradient-to-br ${module.gradient}
                  shadow-lg group-hover:shadow-xl
                `}>
                  {/* Icon Glow */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-75
                    transition-opacity duration-500 blur-md
                    bg-gradient-to-br ${module.gradient}
                  `} />
                  
                  <module.icon className="w-8 h-8 text-white relative z-10 group-hover:animate-pulse" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="
                    font-semibold text-lg text-gray-900 dark:text-gray-100
                    group-hover:text-transparent group-hover:bg-gradient-to-r 
                    group-hover:from-gray-900 group-hover:to-gray-600
                    dark:group-hover:from-gray-100 dark:group-hover:to-gray-300
                    group-hover:bg-clip-text
                    transition-all duration-300
                  ">
                    {module.title}
                  </h3>
                  <p className="
                    text-sm text-gray-600 dark:text-gray-400 
                    group-hover:text-gray-700 dark:group-hover:text-gray-300
                    transition-colors duration-300
                  ">
                    {module.description}
                  </p>
                </div>
                
                {/* Arrow Indicator */}
                <div className="
                  w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700
                  flex items-center justify-center
                  group-hover:bg-gradient-to-br group-hover:from-blue-400 group-hover:to-blue-600
                  transition-all duration-300 group-hover:scale-110
                ">
                  <svg 
                    className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-300"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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
