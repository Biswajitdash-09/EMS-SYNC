
/**
 * Landing Features Section Component
 * Grid of features with icons and descriptions
 */

import { Users, Shield, BarChart3, Calendar, FileText, Settings, DollarSign, Clock } from 'lucide-react';

const LandingFeatures = () => {
  const features = [
    {
      icon: Users,
      title: "Employee Records",
      description: "Comprehensive employee database with detailed profiles"
    },
    {
      icon: Shield,
      title: "HR Management",
      description: "Complete HR workflow and policy management"
    },
    {
      icon: DollarSign,
      title: "Payroll System",
      description: "Automated payroll processing and salary management"
    },
    {
      icon: Calendar,
      title: "Leave Management",
      description: "Track and manage employee leave requests"
    },
    {
      icon: FileText,
      title: "Performance Analytics",
      description: "Monitor and analyze employee performance metrics"
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Accurate time and attendance management"
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Detailed reports and business intelligence"
    },
    {
      icon: Settings,
      title: "System Administration",
      description: "Complete system configuration and management"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete HR Solution</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to manage your workforce efficiently in one integrated platform
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title} 
              className="group p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1" 
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
