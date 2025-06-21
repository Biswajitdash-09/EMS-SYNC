
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, DollarSign, Calendar, FileText, BarChart3, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const QuickActionsPage = () => {
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState<string | null>(null);

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
              <CardDescription>Fill in the basic information to create a new employee profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="employee@company.com" />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Input id="department" placeholder="e.g., Engineering, HR, Sales" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input id="position" placeholder="Job title" />
                </div>
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-blue-600 hover:bg-blue-700">Create Employee</Button>
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
                  <Input id="department" placeholder="All departments" />
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
                <Button className="bg-green-600 hover:bg-green-700">Process Payroll</Button>
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
                {[
                  { name: "John Smith", type: "Vacation", dates: "Jun 15-20, 2024", days: 5 },
                  { name: "Sarah Johnson", type: "Sick Leave", dates: "Jun 22, 2024", days: 1 },
                  { name: "Mike Chen", type: "Personal", dates: "Jun 25-26, 2024", days: 2 }
                ].map((request, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{request.name}</h4>
                        <p className="text-sm text-gray-600">{request.type} - {request.dates}</p>
                        <p className="text-sm">Duration: {request.days} day(s)</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
                        <Button size="sm" variant="outline">Reject</Button>
                      </div>
                    </div>
                  </div>
                ))}
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
                  <Label htmlFor="reportType">Report Type</Label>
                  <select id="reportType" className="w-full p-2 border rounded-md">
                    <option>Attendance Report</option>
                    <option>Payroll Summary</option>
                    <option>Employee Performance</option>
                    <option>Leave Analysis</option>
                    <option>Department Overview</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="dateRange">Date Range</Label>
                  <select id="dateRange" className="w-full p-2 border rounded-md">
                    <option>Last 30 Days</option>
                    <option>Last Quarter</option>
                    <option>Last 6 Months</option>
                    <option>Last Year</option>
                    <option>Custom Range</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="format">Export Format</Label>
                  <select id="format" className="w-full p-2 border rounded-md">
                    <option>PDF</option>
                    <option>Excel</option>
                    <option>CSV</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="department">Department Filter</Label>
                  <select id="department" className="w-full p-2 border rounded-md">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>HR</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="bg-purple-600 hover:bg-purple-700">Generate Report</Button>
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
                  <Label htmlFor="employee">Select Employee</Label>
                  <select id="employee" className="w-full p-2 border rounded-md">
                    <option>John Smith - Engineering</option>
                    <option>Sarah Johnson - HR</option>
                    <option>Mike Chen - Sales</option>
                    <option>David Wilson - Marketing</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reviewType">Review Type</Label>
                  <select id="reviewType" className="w-full p-2 border rounded-md">
                    <option>Annual Review</option>
                    <option>Quarterly Review</option>
                    <option>Project Review</option>
                    <option>Probation Review</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reviewer">Primary Reviewer</Label>
                  <select id="reviewer" className="w-full p-2 border rounded-md">
                    <option>Direct Manager</option>
                    <option>HR Manager</option>
                    <option>Department Head</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" />
                </div>
              </div>
              <div>
                <Label htmlFor="goals">Key Performance Areas</Label>
                <textarea 
                  id="goals" 
                  className="w-full p-2 border rounded-md h-20" 
                  placeholder="List key areas to focus on during the review..."
                />
              </div>
              <div className="flex space-x-2">
                <Button className="bg-red-600 hover:bg-red-700">Schedule Review</Button>
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
