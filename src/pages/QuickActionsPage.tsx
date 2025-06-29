import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, DollarSign, Calendar, FileText, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { useLeaveData } from "@/hooks/useLeaveData";

const QuickActionsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addEmployee } = useEmployeeData();
  const { allLeaveRequests, approveLeaveRequest, rejectLeaveRequest } = useLeaveData();
  const [activeAction, setActiveAction] = useState<string | null>(null);

  // Form states for different actions
  const [employeeForm, setEmployeeForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    position: '',
    startDate: '',
    phone: '',
    address: '',
    baseSalary: ''
  });

  const [reportParams, setReportParams] = useState({
    reportType: 'Attendance Report',
    dateRange: 'Last 30 Days',
    format: 'PDF',
    department: ''
  });

  const [reviewForm, setReviewForm] = useState({
    employee: '',
    reviewType: 'Annual Review',
    reviewer: 'Direct Manager',
    dueDate: '',
    goals: ''
  });

  const quickActions = [
    {
      id: 'add-employee',
      title: 'Add Employee',
      description: 'Quickly onboard new team members',
      icon: UserPlus,
      color: 'blue',
      action: () => setActiveAction('add-employee')
    },
    {
      id: 'process-payroll',
      title: 'Process Payroll',
      description: 'Calculate and process monthly payroll',
      icon: DollarSign,
      color: 'green',
      action: () => setActiveAction('process-payroll')
    },
    {
      id: 'leave-requests',
      title: 'Leave Requests',
      description: 'Review pending leave applications',
      icon: Calendar,
      color: 'orange',
      action: () => setActiveAction('leave-requests')
    },
    {
      id: 'generate-report',
      title: 'Generate Report',
      description: 'Create comprehensive business reports',
      icon: FileText,
      color: 'purple',
      action: () => setActiveAction('generate-report')
    },
    {
      id: 'performance-review',
      title: 'Performance Review',
      description: 'Conduct employee performance evaluations',
      icon: BarChart3,
      color: 'red',
      action: () => setActiveAction('performance-review')
    }
  ];

  const handleAddEmployee = () => {
    // Validate form
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email || !employeeForm.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create employee object
    const newEmployee = {
      name: `${employeeForm.firstName} ${employeeForm.lastName}`,
      email: employeeForm.email,
      phone: employeeForm.phone || '+1 234-567-8900',
      department: employeeForm.department,
      role: employeeForm.position || 'Employee',
      status: 'Active' as const,
      joinDate: employeeForm.startDate || new Date().toISOString().split('T')[0],
      address: employeeForm.address || 'Not specified',
      dateOfBirth: '1990-01-01',
      emergencyContact: {
        name: 'Not specified',
        phone: 'Not specified',
        relationship: 'Not specified'
      },
      manager: 'Not assigned',
      baseSalary: parseInt(employeeForm.baseSalary) || 50000,
      employmentHistory: [{
        title: employeeForm.position || 'Employee',
        department: employeeForm.department,
        startDate: employeeForm.startDate || new Date().toISOString().split('T')[0],
        current: true
      }],
      documents: []
    };

    addEmployee(newEmployee);
    
    toast({
      title: "Employee Added",
      description: `${newEmployee.name} has been successfully added to the system.`,
    });

    // Reset form
    setEmployeeForm({
      firstName: '',
      lastName: '',
      email: '',
      department: '',
      position: '',
      startDate: '',
      phone: '',
      address: '',
      baseSalary: ''
    });
    setActiveAction(null);
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processing Started",
      description: "Payroll for the current period is being processed. You will be notified when complete.",
    });
    setActiveAction(null);
  };

  const handleLeaveAction = (action: 'approve' | 'reject', requestId: string, employeeName: string) => {
    if (action === 'approve') {
      approveLeaveRequest(requestId, 'HR Manager', 'Approved via Quick Actions');
      toast({
        title: "Leave Request Approved",
        description: `${employeeName}'s leave request has been approved.`,
      });
    } else {
      rejectLeaveRequest(requestId, 'HR Manager', 'Rejected via Quick Actions - needs more information');
      toast({
        title: "Leave Request Rejected",
        description: `${employeeName}'s leave request has been rejected.`,
        variant: "destructive"
      });
    }
  };

  const handleGenerateReport = () => {
    if (!reportParams.reportType) {
      toast({
        title: "Validation Error",
        description: "Please select a report type.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Generation Started",
      description: `${reportParams.reportType} is being generated. You will receive it shortly.`,
    });
    setActiveAction(null);
  };

  const handleScheduleReview = () => {
    if (!reviewForm.employee || !reviewForm.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please select an employee and due date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Performance Review Scheduled",
      description: `Performance review has been scheduled for ${reviewForm.employee}.`,
    });

    // Reset form
    setReviewForm({
      employee: '',
      reviewType: 'Annual Review',
      reviewer: 'Direct Manager',
      dueDate: '',
      goals: ''
    });
    setActiveAction(null);
  };

  const pendingLeaveRequests = allLeaveRequests.filter(req => req.status === 'Pending').slice(0, 3);

  const renderActionContent = () => {
    switch (activeAction) {
      case 'add-employee':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <span>Add New Employee</span>
              </CardTitle>
              <CardDescription>Fill in the information to create a new employee profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input 
                    id="firstName" 
                    value={employeeForm.firstName}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name" 
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input 
                    id="lastName" 
                    value={employeeForm.lastName}
                    onChange={(e) => setEmployeeForm(
