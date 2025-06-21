
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, BarChart3, TrendingUp, Users, Calendar, DollarSign, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReportsAnalytics = () => {
  const navigate = useNavigate();

  const reportTemplates = [
    { id: 1, name: 'Monthly Attendance Report', category: 'Attendance', lastGenerated: '2024-06-01' },
    { id: 2, name: 'Payroll Summary Report', category: 'Payroll', lastGenerated: '2024-05-31' },
    { id: 3, name: 'Employee Turnover Analysis', category: 'HR Analytics', lastGenerated: '2024-06-15' },
    { id: 4, name: 'Performance Metrics Report', category: 'Performance', lastGenerated: '2024-06-10' }
  ];

  const metrics = [
    { title: 'Total Employees', value: '1,248', change: '+12', trend: 'up', icon: Users },
    { title: 'Avg. Attendance Rate', value: '94.5%', change: '+2.1%', trend: 'up', icon: Calendar },
    { title: 'Monthly Payroll', value: '$2.4M', change: '+5.2%', trend: 'up', icon: DollarSign },
    { title: 'Avg. Performance Score', value: '4.2/5', change: '+0.3', trend: 'up', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <FileText className="w-6 h-6 text-cyan-600" />
                <h1 className="text-xl font-bold text-gray-900">Reports & Analytics</h1>
              </div>
            </div>
            <Button className="bg-cyan-600 hover:bg-cyan-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              Custom Report Builder
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance Reports</TabsTrigger>
            <TabsTrigger value="payroll">Payroll Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="builder">Report Builder</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center space-x-1 text-xs">
                      <TrendingUp className={`h-3 w-3 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                      <span className={metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                        {metric.change}
                      </span>
                      <span className="text-gray-500">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comprehensive Business Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>Pre-built reports for common business needs</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Generated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportTemplates.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell>{report.category}</TableCell>
                        <TableCell>{report.lastGenerated}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <BarChart3 className="w-4 h-4 mr-1" />
                              Generate
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Attendance Reports
                </CardTitle>
                <CardDescription>Generate detailed attendance and time tracking reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Generate Report</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="reportType">Report Type</Label>
                        <Input id="reportType" placeholder="Select report type" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input id="startDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="endDate">End Date</Label>
                          <Input id="endDate" type="date" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" placeholder="All departments" />
                      </div>
                      <Button className="w-full">Generate Report</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Reports</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">June 2024 Attendance</h5>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">All departments • 94.5% avg. attendance</p>
                        <p className="text-xs text-gray-500">Generated: June 21, 2024</p>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">Q2 2024 Summary</h5>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">Quarterly analysis • 1,248 employees</p>
                        <p className="text-xs text-gray-500">Generated: June 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Payroll Reports
                </CardTitle>
                <CardDescription>Comprehensive payroll and financial reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Monthly Payroll</h4>
                    <div className="text-2xl font-bold text-green-600">$2.4M</div>
                    <p className="text-sm text-gray-600">June 2024</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Tax Deductions</h4>
                    <div className="text-2xl font-bold text-red-600">$485K</div>
                    <p className="text-sm text-gray-600">YTD Total</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="w-4 h-4 mr-1" />
                      Details
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Benefits Cost</h4>
                    <div className="text-2xl font-bold text-blue-600">$320K</div>
                    <p className="text-sm text-gray-600">Monthly Total</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analyze
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Payroll Report History</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">June 2024 Payroll Report</h5>
                        <p className="text-sm text-gray-600">1,248 employees • $2,415,600 total</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">May 2024 Payroll Report</h5>
                        <p className="text-sm text-gray-600">1,225 employees • $2,398,750 total</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Employee Turnover Analytics & Productivity Metrics</CardTitle>
                <CardDescription>Advanced analytics and business intelligence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Turnover Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-red-50 rounded">
                        <span>Turnover Rate (YTD)</span>
                        <span className="font-medium text-red-600">8.5%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-50 rounded">
                        <span>Avg. Tenure</span>
                        <span className="font-medium text-blue-600">3.2 years</span>
                      </div>
                      <div className="flex justify-between p-3 bg-green-50 rounded">
                        <span>Retention Rate</span>
                        <span className="font-medium text-green-600">91.5%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-purple-50 rounded">
                        <span>New Hires (YTD)</span>
                        <span className="font-medium text-purple-600">156</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Productivity Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-green-50 rounded">
                        <span>Avg. Performance Score</span>
                        <span className="font-medium text-green-600">4.2/5.0</span>
                      </div>
                      <div className="flex justify-between p-3 bg-blue-50 rounded">
                        <span>Goal Completion Rate</span>
                        <span className="font-medium text-blue-600">78%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-yellow-50 rounded">
                        <span>Training Hours/Employee</span>
                        <span className="font-medium text-yellow-600">24.5h</span>
                      </div>
                      <div className="flex justify-between p-3 bg-indigo-50 rounded">
                        <span>Employee Satisfaction</span>
                        <span className="font-medium text-indigo-600">4.1/5.0</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <TrendingUp className="w-8 h-8 mb-2 text-blue-600" />
                    <span className="font-medium">Trend Analysis</span>
                    <span className="text-sm text-gray-600">View trends over time</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <BarChart3 className="w-8 h-8 mb-2 text-green-600" />
                    <span className="font-medium">Department Analysis</span>
                    <span className="text-sm text-gray-600">Compare departments</span>
                  </Button>
                  <Button variant="outline" className="flex flex-col items-center p-6 h-auto">
                    <Users className="w-8 h-8 mb-2 text-purple-600" />
                    <span className="font-medium">Employee Insights</span>
                    <span className="text-sm text-gray-600">Individual analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Report Builder</CardTitle>
                <CardDescription>Build custom reports with drag-and-drop interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Report Configuration</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="reportName">Report Name</Label>
                        <Input id="reportName" placeholder="Enter report name" />
                      </div>
                      <div>
                        <Label htmlFor="dataSource">Data Source</Label>
                        <Input id="dataSource" placeholder="Select data source" />
                      </div>
                      <div>
                        <Label htmlFor="reportFormat">Format</Label>
                        <Input id="reportFormat" placeholder="PDF, Excel, CSV" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="startDate">Date Range Start</Label>
                          <Input id="startDate" type="date" />
                        </div>
                        <div>
                          <Label htmlFor="endDate">Date Range End</Label>
                          <Input id="endDate" type="date" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Available Fields</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">Employee Name</Button>
                      <Button variant="outline" size="sm">Department</Button>
                      <Button variant="outline" size="sm">Attendance</Button>
                      <Button variant="outline" size="sm">Performance</Button>
                      <Button variant="outline" size="sm">Salary</Button>
                      <Button variant="outline" size="sm">Leave Balance</Button>
                      <Button variant="outline" size="sm">Work Hours</Button>
                      <Button variant="outline" size="sm">Overtime</Button>
                    </div>
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Selected Fields</h5>
                      <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg min-h-[100px]">
                        <p className="text-gray-500 text-center">Drag fields here</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="flex-1">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Preview Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export to PDF/Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
