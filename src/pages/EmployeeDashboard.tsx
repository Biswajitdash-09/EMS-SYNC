
/**
 * Employee Dashboard Page
 * Main dashboard for employees after login
 * Features: Profile view, leave application, salary details, logout
 * Now uses real employee data from authentication
 */

import { useEffect } from 'react';
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
import { useEmployeeAuth } from '@/contexts/EmployeeAuthContext';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { employee, isAuthenticated, isLoading, logout, refreshEmployeeData } = useEmployeeAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Access Denied",
        description: "Please log in to access your dashboard.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate, toast]);

  // Refresh employee data on mount to ensure sync with admin portal
  useEffect(() => {
    if (isAuthenticated) {
      refreshEmployeeData();
    }
  }, [isAuthenticated, refreshEmployeeData]);

  const handleLogout = () => {
    logout();
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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated || !employee) {
    return null;
  }

  // Transform employee data for the salary component
  const salaryData = {
    basic: employee.baseSalary,
    allowances: Math.round(employee.baseSalary * 0.2), // 20% allowances
    deductions: Math.round(employee.baseSalary * 0.1), // 10% deductions
    netSalary: Math.round(employee.baseSalary * 1.1) // Net after allowances and deductions
  };

  // Mock leave balance - in production, this would come from the employee record
  const leaveBalance = {
    annual: 20,
    sick: 10,
    personal: 5
  };

  const employeeWithSalaryAndLeave = {
    ...employee,
    salary: salaryData,
    leaveBalance: leaveBalance
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
                  <AvatarImage src={employee.profilePicture} alt={employee.name} />
                  <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{employee.name}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{employee.role}</div>
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
            Welcome back, {employee.name.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile, apply for leave, and view your salary details.
          </p>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span>Employee ID: {employee.id}</span>
            <span>•</span>
            <span>Department: {employee.department}</span>
            <span>•</span>
            <span>Status: <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>{employee.status}</Badge></span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Annual Leave</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance.annual}</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance.sick}</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personal Leave</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leaveBalance.personal}</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Base Salary</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${employee.baseSalary.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">annual</p>
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
            <EmployeeProfileView employee={employeeWithSalaryAndLeave} />
          </TabsContent>

          <TabsContent value="leave" className="space-y-6">
            <EmployeeLeaveApplication employee={employeeWithSalaryAndLeave} />
          </TabsContent>

          <TabsContent value="salary" className="space-y-6">
            <EmployeeSalaryDetails employee={employeeWithSalaryAndLeave} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
