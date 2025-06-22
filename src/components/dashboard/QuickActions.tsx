
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, DollarSign, Calendar, FileText, BarChart3, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'add-employee',
      title: 'Add Employee',
      description: 'Onboard new team members',
      icon: UserPlus,
      color: 'blue',
      route: '/quick-actions'
    },
    {
      id: 'process-payroll',
      title: 'Process Payroll',
      description: 'Monthly salary processing',
      icon: DollarSign,
      color: 'green',
      route: '/quick-actions'
    },
    {
      id: 'leave-requests',
      title: 'Leave Requests',
      description: 'Review pending applications',
      icon: Calendar,
      color: 'orange',
      route: '/quick-actions'
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Business intelligence reports',
      icon: FileText,
      color: 'purple',
      route: '/quick-actions'
    },
    {
      id: 'performance-review',
      title: 'Performance Review',
      description: 'Employee evaluations',
      icon: BarChart3,
      color: 'red',
      route: '/quick-actions'
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>
              Frequently used actions for faster workflow
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/quick-actions')}
            className="flex items-center space-x-2"
          >
            <span>View All</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <div key={action.id} className="group">
                <Button 
                  variant="outline" 
                  className="h-auto p-4 flex flex-col items-center space-y-3 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-600 w-full transition-all duration-300" 
                  onClick={() => navigate(action.route)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-${action.color}-100 dark:bg-${action.color}-900/30 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-5 h-5 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{action.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{action.description}</div>
                  </div>
                </Button>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
