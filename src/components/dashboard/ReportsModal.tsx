
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, Plus, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Report {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'error';
  size: string;
  category: string;
}

const ReportsModal = ({ isOpen, onClose }: ReportsModalProps) => {
  const { toast } = useToast();
  const [showGenerateForm, setShowGenerateForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [generateParams, setGenerateParams] = useState({
    dateFrom: '',
    dateTo: '',
    department: '',
    employeeId: ''
  });

  // Enhanced mock reports data with more realistic content
  const [myReports, setMyReports] = useState<Report[]>([
    {
      id: 1,
      title: 'Employee Performance Summary',
      description: 'Quarterly performance review summary for all direct reports',
      type: 'Performance',
      date: '2024-06-20',
      status: 'completed',
      size: '2.4 MB',
      category: 'HR'
    },
    {
      id: 2,
      title: 'HR Metrics Dashboard',
      description: 'Monthly HR metrics including hiring, retention, and satisfaction',
      type: 'HR Analytics',
      date: '2024-06-15',
      status: 'completed',
      size: '1.8 MB',
      category: 'HR'
    },
    {
      id: 3,
      title: 'Payroll Processing Report',
      description: 'Bi-weekly payroll processing summary and exceptions',
      type: 'Payroll',
      date: '2024-06-10',
      status: 'completed',
      size: '3.2 MB',
      category: 'Finance'
    },
    {
      id: 4,
      title: 'System Usage Analytics',
      description: 'Monthly system usage and performance analytics',
      type: 'System',
      date: '2024-06-01',
      status: 'pending',
      size: 'Processing...',
      category: 'System'
    }
  ]);

  const reportTemplates = [
    {
      id: 1,
      title: 'Employee Attendance Report',
      description: 'Generate attendance summary for selected employees and date range',
      icon: Users,
      category: 'HR',
      requiresDateRange: true,
      requiresDepartment: true
    },
    {
      id: 2,
      title: 'Payroll Summary Report',
      description: 'Comprehensive payroll summary with breakdowns and statistics',
      icon: DollarSign,
      category: 'Finance',
      requiresDateRange: true,
      requiresDepartment: false
    },
    {
      id: 3,
      title: 'Performance Analytics',
      description: 'Employee performance metrics and trend analysis',
      icon: TrendingUp,
      category: 'Performance',
      requiresDateRange: true,
      requiresDepartment: true
    },
    {
      id: 4,
      title: 'Custom Data Export',
      description: 'Export custom data sets with filtering and formatting options',
      icon: FileText,
      category: 'Data',
      requiresDateRange: false,
      requiresDepartment: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'HR': return 'bg-blue-100 text-blue-800';
      case 'Finance': return 'bg-green-100 text-green-800';
      case 'Performance': return 'bg-purple-100 text-purple-800';
      case 'Data': return 'bg-orange-100 text-orange-800';
      case 'System': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateReportContent = (template: any, params: any) => {
    const currentDate = new Date().toLocaleDateString();
    const dateRange = params.dateFrom && params.dateTo ? 
      `${params.dateFrom} to ${params.dateTo}` : 
      'All available data';

    switch (template.id) {
      case 1: // Employee Attendance Report
        return `
EMPLOYEE ATTENDANCE REPORT
=========================
Generated: ${currentDate}
Date Range: ${dateRange}
Department: ${params.department || 'All Departments'}

SUMMARY:
========
Total Employees: 156
Present Today: 142 (91.0%)
On Leave: 8 (5.1%)
Absent: 6 (3.9%)

ATTENDANCE BREAKDOWN:
====================
• Full Day Present: 130 employees
• Half Day Present: 12 employees
• Late Arrivals: 15 employees
• Early Departures: 8 employees

DEPARTMENT WISE ATTENDANCE:
==========================
• IT Department: 45/50 (90.0%)
• HR Department: 12/12 (100.0%)
• Finance: 18/20 (90.0%)
• Operations: 35/40 (87.5%)
• Marketing: 22/25 (88.0%)
• Sales: 10/9 (111.1%) [Includes overtime]

LEAVE ANALYSIS:
===============
• Sick Leave: 4 employees
• Casual Leave: 2 employees
• Annual Leave: 2 employees

TOP PERFORMERS:
===============
1. Sarah Johnson - 100% attendance (30 days)
2. Mike Chen - 98% attendance (29/30 days)
3. Lisa Davis - 97% attendance (29/30 days)

ATTENTION REQUIRED:
==================
• John Smith - 3 consecutive absences
• Emma Wilson - Frequent late arrivals (5 times this month)

Generated by: Admin User
Report ID: ATT-${Date.now()}
        `.trim();

      case 2: // Payroll Summary Report
        return `
PAYROLL SUMMARY REPORT
=====================
Generated: ${currentDate}
Period: ${dateRange}

PAYROLL OVERVIEW:
================
Total Employees Processed: 156
Total Gross Pay: $485,750.00
Total Deductions: $125,896.25
Total Net Pay: $359,853.75

SALARY BREAKDOWN:
================
• Basic Salary: $375,000.00
• Overtime Pay: $45,250.00
• Bonuses: $35,500.00
• Allowances: $30,000.00

DEDUCTIONS SUMMARY:
==================
• Federal Tax: $72,862.50
• State Tax: $24,287.50
• Social Security: $15,058.25
• Medicare: $7,043.75
• Health Insurance: $4,680.00
• Retirement Fund: $1,964.25

DEPARTMENT WISE COST:
====================
• IT Department: $145,750.00
• Operations: $98,250.00
• Sales: $75,500.00
• Marketing: $52,000.00
• Finance: $48,750.00
• HR Department: $39,603.75

PAYROLL STATISTICS:
==================
• Average Salary: $3,111.22
• Highest Paid: $8,750.00 (CTO)
• Lowest Paid: $2,100.00 (Intern)
• Overtime Hours: 1,256 hours
• Overtime Cost: $45,250.00

PAYMENT METHODS:
===============
• Direct Deposit: 145 employees (92.9%)
• Check: 11 employees (7.1%)

Generated by: Admin User
Report ID: PAY-${Date.now()}
        `.trim();

      case 3: // Performance Analytics
        return `
PERFORMANCE ANALYTICS REPORT
============================
Generated: ${currentDate}
Analysis Period: ${dateRange}
Department: ${params.department || 'All Departments'}

OVERALL PERFORMANCE METRICS:
============================
• Average Performance Score: 4.2/5.0
• Top Performers (4.5+): 45 employees (28.8%)
• Good Performers (3.5-4.4): 89 employees (57.1%)
• Needs Improvement (<3.5): 22 employees (14.1%)

DEPARTMENT PERFORMANCE:
======================
• IT Department: 4.3/5.0 (Excellent)
• Finance: 4.1/5.0 (Good)
• Marketing: 4.0/5.0 (Good)
• Sales: 3.9/5.0 (Good)
• Operations: 3.8/5.0 (Satisfactory)
• HR Department: 4.2/5.0 (Good)

KEY PERFORMANCE INDICATORS:
===========================
• Goal Achievement Rate: 87.5%
• Project Completion Rate: 92.3%
• Quality Score: 4.1/5.0
• Customer Satisfaction: 4.4/5.0
• Team Collaboration: 4.0/5.0

TOP PERFORMERS:
===============
1. Alice Brown (IT) - 4.8/5.0
2. David Wilson (Finance) - 4.7/5.0
3. Sarah Johnson (Marketing) - 4.6/5.0
4. Mike Chen (Sales) - 4.6/5.0
5. Lisa Davis (Operations) - 4.5/5.0

IMPROVEMENT AREAS:
==================
• Communication Skills: 15% of employees
• Time Management: 12% of employees
• Technical Skills: 8% of employees
• Leadership: 5% of employees

TRAINING RECOMMENDATIONS:
========================
• Leadership Development Program - 15 employees
• Technical Skills Workshop - 25 employees
• Communication Enhancement - 20 employees
• Project Management Certification - 10 employees

PERFORMANCE TRENDS:
==================
• Q1 Average: 3.9/5.0
• Q2 Average: 4.2/5.0
• Improvement: +7.7%

Generated by: Admin User
Report ID: PERF-${Date.now()}
        `.trim();

      case 4: // Custom Data Export
        return `
CUSTOM DATA EXPORT
==================
Generated: ${currentDate}
Export Parameters: ${JSON.stringify(params, null, 2)}

EMPLOYEE DATA SUMMARY:
=====================
Total Records: 156
Active Employees: 142
Inactive Employees: 14

EXPORT INCLUDES:
===============
• Employee Basic Information
• Contact Details
• Employment History
• Salary Information
• Performance Records
• Attendance Data

SAMPLE DATA STRUCTURE:
=====================
{
  "employee_id": "EMP001",
  "name": "John Doe",
  "department": "IT",
  "position": "Software Engineer",
  "hire_date": "2023-01-15",
  "salary": 75000,
  "status": "Active",
  "performance_score": 4.2,
  "attendance_rate": 96.5
}

DATA QUALITY CHECKS:
====================
• Complete Records: 154/156 (98.7%)
• Missing Phone Numbers: 2 records
• Missing Emergency Contacts: 8 records
• Data Validation: Passed

EXPORT STATISTICS:
==================
• File Size: 2.8 MB
• Format: JSON/CSV
• Compression: ZIP
• Records per Department:
  - IT: 50 records
  - Operations: 40 records
  - Sales: 25 records
  - Marketing: 25 records
  - Finance: 20 records
  - HR: 12 records

Generated by: Admin User
Report ID: DATA-${Date.now()}
        `.trim();

      default:
        return `
REPORT GENERATED
================
Generated: ${currentDate}
Template: ${template.title}
Parameters: ${JSON.stringify(params, null, 2)}

This is a sample report with placeholder content.
In a production environment, this would contain
actual data from your system.

Generated by: Admin User
Report ID: REP-${Date.now()}
        `.trim();
    }
  };

  const handleDownloadReport = (reportId: number) => {
    const report = myReports.find(r => r.id === reportId);
    if (!report || report.status !== 'completed') {
      toast({
        title: "Download Failed",
        description: "Report is not ready for download.",
        variant: "destructive"
      });
      return;
    }

    // Generate comprehensive report content based on report type
    let content = '';
    const currentDate = new Date().toLocaleDateString();
    
    switch (report.type) {
      case 'Performance':
        content = generateReportContent({ id: 3, title: report.title }, {});
        break;
      case 'HR Analytics':
        content = generateReportContent({ id: 1, title: report.title }, {});
        break;
      case 'Payroll':
        content = generateReportContent({ id: 2, title: report.title }, {});
        break;
      case 'System':
        content = `
SYSTEM USAGE ANALYTICS REPORT
=============================
Generated: ${currentDate}

SYSTEM OVERVIEW:
===============
• Total Users: 156
• Active Sessions: 89
• System Uptime: 99.9%
• Average Response Time: 0.2s

USAGE STATISTICS:
================
• Login Sessions Today: 142
• Page Views: 2,847
• API Calls: 15,634
• Data Transfer: 45.6 GB

PERFORMANCE METRICS:
===================
• CPU Usage: 35%
• Memory Usage: 68%
• Disk Usage: 42%
• Network Latency: 15ms

TOP FEATURES USED:
==================
1. Employee Records: 45%
2. Payroll System: 28%
3. Reports: 15%
4. Settings: 12%

Generated by: Admin User
Report ID: SYS-${Date.now()}
        `.trim();
        break;
      default:
        content = `Report: ${report.title}\nGenerated: ${currentDate}\n\nContent not available.`;
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Report Downloaded",
      description: `${report.title} has been downloaded successfully.`,
    });
  };

  const handleGenerateReport = (templateId: number) => {
    const template = reportTemplates.find(t => t.id === templateId);
    if (!template) return;

    // Check if template requires parameters
    if (template.requiresDateRange && (!generateParams.dateFrom || !generateParams.dateTo)) {
      setSelectedTemplate(templateId);
      setShowGenerateForm(true);
      return;
    }

    // Generate report immediately
    const newReport: Report = {
      id: Date.now(),
      title: template.title,
      description: template.description,
      type: template.title,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`,
      category: template.category
    };

    setMyReports(prev => [newReport, ...prev]);
    
    toast({
      title: "Report Generated",
      description: `${template.title} has been generated successfully.`,
    });

    // Auto-download the generated report
    setTimeout(() => {
      const content = generateReportContent(template, generateParams);
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 500);
  };

  const handleGenerateWithParams = () => {
    if (selectedTemplate) {
      handleGenerateReport(selectedTemplate);
      setShowGenerateForm(false);
      setSelectedTemplate(null);
      setGenerateParams({
        dateFrom: '',
        dateTo: '',
        department: '',
        employeeId: ''
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            My Reports
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => {
                // Refresh reports
                toast({
                  title: "Reports Refreshed",
                  description: "Report list has been updated.",
                });
              }}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </DialogTitle>
          <DialogDescription>
            View, download, and generate reports for your administrative tasks
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Generate Report Form */}
          {showGenerateForm && selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>
                  Generate {reportTemplates.find(t => t.id === selectedTemplate)?.title}
                </CardTitle>
                <CardDescription>
                  Configure report parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateFrom">From Date</Label>
                    <Input
                      id="dateFrom"
                      type="date"
                      value={generateParams.dateFrom}
                      onChange={(e) => setGenerateParams(prev => ({ ...prev, dateFrom: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateTo">To Date</Label>
                    <Input
                      id="dateTo"
                      type="date"
                      value={generateParams.dateTo}
                      onChange={(e) => setGenerateParams(prev => ({ ...prev, dateTo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department (Optional)</Label>
                    <select
                      id="department"
                      value={generateParams.department}
                      onChange={(e) => setGenerateParams(prev => ({ ...prev, department: e.target.value }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="">All Departments</option>
                      <option value="IT">IT Department</option>
                      <option value="HR">HR Department</option>
                      <option value="Finance">Finance</option>
                      <option value="Operations">Operations</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="employeeId">Employee ID (Optional)</Label>
                    <Input
                      id="employeeId"
                      value={generateParams.employeeId}
                      onChange={(e) => setGenerateParams(prev => ({ ...prev, employeeId: e.target.value }))}
                      placeholder="e.g., EMP001"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleGenerateWithParams}>
                    <Plus className="w-4 h-4 mr-2" />
                    Generate Report
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowGenerateForm(false);
                      setSelectedTemplate(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Reports</CardTitle>
              <CardDescription>
                Your recently generated reports and their current status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex items-start gap-4 flex-1">
                      <FileText className="w-8 h-8 text-blue-600 mt-1" />
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{report.title}</h4>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                          <Badge className={getCategoryColor(report.category)}>
                            {report.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Generated: {new Date(report.date).toLocaleDateString()}</span>
                          </div>
                          <span>Size: {report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {report.status === 'completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Generate New Report</CardTitle>
              <CardDescription>
                Choose from available report templates to generate new reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTemplates.map((template) => {
                  const IconComponent = template.icon;
                  return (
                    <div key={template.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div className="flex items-start gap-4">
                        <IconComponent className="w-8 h-8 text-blue-600 mt-1" />
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{template.title}</h4>
                            <Badge className={getCategoryColor(template.category)}>
                              {template.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{template.description}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleGenerateReport(template.id)}
                            className="mt-2"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Generate Report
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{myReports.length}</div>
                  <div className="text-sm text-gray-600">Total Reports</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {myReports.filter(r => r.date >= new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]).length}
                  </div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {myReports.filter(r => r.status === 'completed').reduce((acc, r) => acc + parseFloat(r.size.replace(' MB', '')), 0).toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">MB Available</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {myReports.filter(r => r.status === 'pending').length}
                  </div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportsModal;
