
/**
 * Employee Dashboard Page
 * Main dashboard for employees after login
 * Features: Profile view, leave application, salary details, logout
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Calendar, 
  DollarSign, 
  LogOut, 
  FileText, 
  Clock, 
  Building,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import EmployeeProfileView from '@/components/employee-dashboard/EmployeeProfileView';
import EmployeeLeaveApplication from '@/components/employee-dashboard/EmployeeLeaveApplication';
import EmployeeSalaryDetails from '@/components/employee-dashboard/EmployeeSalaryDetails';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock employee data - will be replaced with Supabase data
  const [currentEmployee] = useState({
    id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 0123',
    department: 'Engineering',
    role: 'Senior Developer',
    joinDate: '2023-01-15',
    profilePicture: '',
    manager: 'Jane Smith',
    address: '123 Main St, City, State 12345',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+1 (555) 0124',
      relationship: 'Spouse'
    },
    salary: {
      basic: 75000,
      allowances: 15000,
      deductions: 5000,
      netSalary: 85000
    },
    leaveBalance: {
      annual: 20,
      sick: 10,
      personal: 5
    }
  });

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('employee-auth');
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building className="w-8 h-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">EMP SYNC</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Employee Portal</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentEmployee.profilePicture} alt={currentEmployee.name} />
                  <AvatarFallback>{getInitials(currentEmployee.name)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{currentEmployee.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{currentEmployee.role}</div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {currentEmployee.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile, apply for leave, and view your salary details.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentEmployee.leaveBalance.annual}</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentEmployee.leaveBalance.sick}</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personal Leave</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentEmployee.leaveBalance.personal}</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentEmployee.salary.netSalary.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">monthly</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </TabsTrigger>
            <TabsTrigger value="leave" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Leave Application</span>
            </TabsTrigger>
            <TabsTrigger value="salary" className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4" />
              <span>Salary Details</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <EmployeeProfileView employee={currentEmployee} />
          </TabsContent>

          <TabsContent value="leave" className="space-y-6">
            <EmployeeLeaveApplication employee={currentEmployee} />
          </TabsContent>

          <TabsContent value="salary" className="space-y-6">
            <EmployeeSalaryDetails employee={currentEmployee} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
