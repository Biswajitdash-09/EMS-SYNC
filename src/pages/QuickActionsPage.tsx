
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, DollarSign, Calendar, FileText, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { useLeaveData } from "@/hooks/useLeaveData";
import AddEmployeeForm from "@/components/quick-actions/AddEmployeeForm";
import ProcessPayrollForm from "@/components/quick-actions/ProcessPayrollForm";
import LeaveRequestsForm from "@/components/quick-actions/LeaveRequestsForm";
import GenerateReportForm from "@/components/quick-actions/GenerateReportForm";
import PerformanceReviewForm from "@/components/quick-actions/PerformanceReviewForm";

const QuickActionsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addEmployee } = useEmployeeData();
  const { approveLeaveRequest, rejectLeaveRequest } = useLeaveData();
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

  const renderActionContent = () => {
    switch (activeAction) {
      case 'add-employee':
        return (
          <AddEmployeeForm
            employeeForm={employeeForm}
            onFormChange={setEmployeeForm}
            onSubmit={handleAddEmployee}
            onCancel={() => setActiveAction(null)}
          />
        );
      case 'process-payroll':
        return (
          <ProcessPayrollForm
            onSubmit={handleProcessPayroll}
            onCancel={() => setActiveAction(null)}
          />
        );
      case 'leave-requests':
        return (
          <LeaveRequestsForm
            onLeaveAction={handleLeaveAction}
            onCancel={() => setActiveAction(null)}
          />
        );
      case 'generate-report':
        return (
          <GenerateReportForm
            reportParams={reportParams}
            onParamsChange={setReportParams}
            onSubmit={handleGenerateReport}
            onCancel={() => setActiveAction(null)}
          />
        );
      case 'performance-review':
        return (
          <PerformanceReviewForm
            reviewForm={reviewForm}
            onFormChange={setReviewForm}
            onSubmit={handleScheduleReview}
            onCancel={() => setActiveAction(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Quick Actions</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeAction ? (
          <div className="space-y-6">
            {renderActionContent()}
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Available Quick Actions</h2>
              <p className="text-gray-600">Perform common HR tasks quickly and efficiently</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quickActions.map((action) => {
                const IconComponent = action.icon;
                return (
                  <Card key={action.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full bg-${action.color}-100`}>
                          <IconComponent className={`w-6 h-6 text-${action.color}-600`} />
                        </div>
                        <span>{action.title}</span>
                      </CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button onClick={action.action} className="w-full">
                        Start Action
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionsPage;
