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
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter last name" 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={employeeForm.email}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="employee@company.com" 
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input 
                    id="phone" 
                    value={employeeForm.phone}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 234-567-8900" 
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <select
                    id="department"
                    value={employeeForm.department}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input 
                    id="position" 
                    value={employeeForm.position}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, position: e.target.value }))}
                    placeholder="Job title" 
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date" 
                    value={employeeForm.startDate}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="baseSalary">Base Salary</Label>
                  <Input 
                    id="baseSalary" 
                    type="number" 
                    value={employeeForm.baseSalary}
                    onChange={(e) => setEmployeeForm(prev => ({ ...prev, baseSalary: e.target.value }))}
                    placeholder="50000" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  value={employeeForm.address}
                  onChange={(e) => setEmployeeForm(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Full address" 
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddEmployee} className="bg-blue-600 hover:bg-blue-700">
                  Create Employee
                </Button>
                <Button variant="outline" onClick={() => setActiveAction(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'process-payroll':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span>Process Payroll</span>
              </CardTitle>
              <CardDescription>Calculate and process payroll for the current period</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="payPeriod">Pay Period</Label>
                  <Input id="payPeriod" type="month" defaultValue="2024-06" />
                </div>
                <div>
                  <Label htmlFor="department">Department (Optional)</Label>
                  <select id="department" className="w-full p-2 border rounded-md">
                    <option value="">All departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Payroll Summary</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Total Employees: <span className="font-semibold">45</span></div>
                  <div>Gross Pay: <span className="font-semibold text-green-600">$125,000</span></div>
                  <div>Deductions: <span className="font-semibold text-red-600">$15,000</span></div>
                  <div>Net Pay: <span className="font-semibold">$110,000</span></div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleProcessPayroll} className="bg-green-600 hover:bg-green-700">
                  Process Payroll
                </Button>
                <Button variant="outline" onClick={() => setActiveAction(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'leave-requests':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <span>Pending Leave Requests</span>
              </CardTitle>
              <CardDescription>Review and approve/reject leave applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingLeaveRequests.length > 0 ? (
                  pendingLeaveRequests.map((request) => (
                    <div key={request.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{request.employee}</h4>
                          <p className="text-sm text-gray-600">{request.type} - {request.startDate} to {request.endDate}</p>
                          <p className="text-sm">Duration: {request.days} day(s)</p>
                          {request.reason && <p className="text-sm text-gray-500 mt-1">Reason: {request.reason}</p>}
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleLeaveAction('approve', request.id, request.employee)}
                          >
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleLeaveAction('reject', request.id, request.employee)}
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No pending leave requests at this time.</p>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Button variant="outline" onClick={() => setActiveAction(null)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'generate-report':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Generate Report</span>
              </CardTitle>
              <CardDescription>Create custom reports for business insights</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reportType">Report Type *</Label>
                  <select 
                    id="reportType" 
                    value={reportParams.reportType}
                    onChange={(e) => setReportParams(prev => ({ ...prev, reportType: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Attendance Report">Attendance Report</option>
                    <option value="Payroll Summary">Payroll Summary</option>
                    <option value="Employee Performance">Employee Performance</option>
                    <option value="Leave Analysis">Leave Analysis</option>
                    <option value="Department Overview">Department Overview</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <select 
                    id="dateRange" 
                    value={reportParams.dateRange}
                    onChange={(e) => setReportParams(prev => ({ ...prev, dateRange: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Last 30 Days">Last 30 Days</option>
                    <option value="Last Quarter">Last Quarter</soption>
                    <option value="Last 6 Months">Last 6 Months</option>
                    <option value="Last Year">Last Year</option>
                    <option value="Custom Range">Custom Range</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <select 
                    id="format" 
                    value={reportParams.format}
                    onChange={(e) => setReportParams(prev => ({ ...prev, format: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Excel">Excel</option>
                    <option value="CSV">CSV</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="department">Department Filter</Label>
                  <select 
                    id="department" 
                    value={reportParams.department}
                    onChange={(e) => setReportParams(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleGenerateReport} className="bg-purple-600 hover:bg-purple-700">
                  Generate Report
                </Button>
                <Button variant="outline" onClick={() => setActiveAction(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'performance-review':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-red-600" />
                <span>Performance Review</span>
              </CardTitle>
              <CardDescription>Initiate or schedule performance evaluations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="employee">Select Employee *</Label>
                  <select 
                    id="employee" 
                    value={reviewForm.employee}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, employee: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Choose an employee</option>
                    <option value="John Smith - Engineering">John Smith - Engineering</option>
                    <option value="Sarah Johnson - HR">Sarah Johnson - HR</option>
                    <option value="Mike Chen - Finance">Mike Chen - Finance</option>
                    <option value="David Wilson - Marketing">David Wilson - Marketing</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reviewType">Review Type</Label>
                  <select 
                    id="reviewType" 
                    value={reviewForm.reviewType}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, reviewType: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Annual Review">Annual Review</option>
                    <option value="Quarterly Review">Quarterly Review</option>
                    <option value="Project Review">Project Review</option>
                    <option value="Probation Review">Probation Review</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reviewer">Primary Reviewer</Label>
                  <select 
                    id="reviewer" 
                    value={reviewForm.reviewer}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, reviewer: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Direct Manager">Direct Manager</option>
                    <option value="HR Manager">HR Manager</option>
                    <option value="Department Head">Department Head</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    value={reviewForm.dueDate}
                    onChange={(e) => setReviewForm(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="goals">Key Performance Areas</Label>
                <textarea 
                  id="goals" 
                  value={reviewForm.goals}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, goals: e.target.value }))}
                  className="w-full p-2 border rounded-md h-20" 
                  placeholder="List key areas to focus on during the review..."
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleScheduleReview} className="bg-red-600 hover:bg-red-700">
                  Schedule Review
                </Button>
                <Button variant="outline" onClick={() => setActiveAction(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
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
              <Button 
                variant="ghost" 
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-gray-900">Quick Actions</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!activeAction ? (
          <>
            {/* Quick Actions Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Card key={action.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${action.color}-100`}>
                            <Icon className={`w-6 h-6 text-${action.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{action.title}</h3>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-4" 
                          variant="outline"
                          onClick={action.action}
                        >
                          Start Action
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Recent Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Quick Actions</CardTitle>
                <CardDescription>Your recently performed quick actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "Employee Added", details: "Sarah Johnson - Engineering", time: "2 hours ago" },
                    { action: "Payroll Processed", details: "May 2024 - All Departments", time: "1 day ago" },
                    { action: "Leave Approved", details: "John Smith - Vacation Leave", time: "2 days ago" },
                    { action: "Report Generated", details: "Attendance Report - Q2 2024", time: "3 days ago" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-600">{item.details}</p>
                      </div>
                      <span className="text-xs text-gray-400">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderActionContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionsPage;
