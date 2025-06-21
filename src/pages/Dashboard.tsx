import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Calendar, DollarSign, FileText, BarChart3, Settings, Clock, TrendingUp, UserCheck, AlertCircle, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('overview');
  const stats = [{
    title: "Total Employees",
    value: "1,248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "blue"
  }, {
    title: "Active Today",
    value: "1,156",
    change: "+5%",
    trend: "up",
    icon: UserCheck,
    color: "green"
  }, {
    title: "Pending Leaves",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: Calendar,
    color: "orange"
  }, {
    title: "Monthly Payroll",
    value: "$2.4M",
    change: "+3%",
    trend: "up",
    icon: DollarSign,
    color: "purple"
  }];
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
  const recentActivities = [{
    action: "New employee onboarded",
    employee: "Sarah Johnson",
    time: "2 hours ago",
    type: "success"
  }, {
    action: "Leave request submitted",
    employee: "Mike Chen",
    time: "4 hours ago",
    type: "warning"
  }, {
    action: "Payroll processed",
    employee: "All Employees",
    time: "1 day ago",
    type: "info"
  }, {
    action: "Performance review completed",
    employee: "David Wilson",
    time: "2 days ago",
    type: "success"
  }, {
    action: "Policy update published",
    employee: "HR Department",
    time: "3 days ago",
    type: "info"
  }];
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map(stat => <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span>
                  <span className="text-gray-500">from last month</span>
                </div>
              </CardContent>
            </Card>)}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Modules */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">System Modules</CardTitle>
                <CardDescription>
                  Access all employee management features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {modules.map(module => <div key={module.id} onClick={() => navigate(module.route)} className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-pointer bg-white hover:bg-gray-50">
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
                    </div>)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activities</CardTitle>
                <CardDescription>
                  Latest system activities and updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'success' ? 'bg-green-500' : activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-500">{activity.employee}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>)}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>
              Frequently used actions for faster workflow
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300" onClick={() => navigate('/employees/new')}>
                <UserPlus className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Add Employee</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300" onClick={() => navigate('/payroll/process')}>
                <DollarSign className="w-6 h-6 text-green-600" />
                <span className="text-sm">Process Payroll</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-300" onClick={() => navigate('/leave/requests')}>
                <Calendar className="w-6 h-6 text-orange-600" />
                <span className="text-sm">Leave Requests</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300" onClick={() => navigate('/reports/generate')}>
                <FileText className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Generate Report</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300" onClick={() => navigate('/performance/review')}>
                <BarChart3 className="w-6 h-6 text-red-600" />
                <span className="text-sm">Performance Review</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Dashboard;