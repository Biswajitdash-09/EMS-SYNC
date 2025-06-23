
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';

interface ReportsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReportsModal = ({ isOpen, onClose }: ReportsModalProps) => {
  // Mock reports data - in real app this would come from API
  const myReports = [
    {
      id: 1,
      title: 'Employee Performance Summary',
      description: 'Quarterly performance review summary for all direct reports',
      type: 'Performance',
      date: '2024-06-20',
      status: 'completed',
      size: '2.4 MB'
    },
    {
      id: 2,
      title: 'HR Metrics Dashboard',
      description: 'Monthly HR metrics including hiring, retention, and satisfaction',
      type: 'HR Analytics',
      date: '2024-06-15',
      status: 'completed',
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Payroll Processing Report',
      description: 'Bi-weekly payroll processing summary and exceptions',
      type: 'Payroll',
      date: '2024-06-10',
      status: 'completed',
      size: '3.2 MB'
    },
    {
      id: 4,
      title: 'System Usage Analytics',
      description: 'Monthly system usage and performance analytics',
      type: 'System',
      date: '2024-06-01',
      status: 'pending',
      size: 'Processing...'
    }
  ];

  const reportTemplates = [
    {
      id: 1,
      title: 'Employee Attendance Report',
      description: 'Generate attendance summary for selected employees and date range',
      icon: Users,
      category: 'HR'
    },
    {
      id: 2,
      title: 'Payroll Summary Report',
      description: 'Comprehensive payroll summary with breakdowns and statistics',
      icon: DollarSign,
      category: 'Finance'
    },
    {
      id: 3,
      title: 'Performance Analytics',
      description: 'Employee performance metrics and trend analysis',
      icon: TrendingUp,
      category: 'Performance'
    },
    {
      id: 4,
      title: 'Custom Data Export',
      description: 'Export custom data sets with filtering and formatting options',
      icon: FileText,
      category: 'Data'
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownloadReport = (reportId: number) => {
    console.log(`Downloading report ${reportId}`);
    // In real app, this would trigger actual download
  };

  const handleGenerateReport = (templateId: number) => {
    console.log(`Generating report from template ${templateId}`);
    // In real app, this would open report generation modal
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            My Reports
          </DialogTitle>
          <DialogDescription>
            View, download, and generate reports for your administrative tasks
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
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
                          <Badge variant="outline">
                            {report.type}
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
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-gray-600">Total Reports</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">This Month</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">8.4</div>
                  <div className="text-sm text-gray-600">MB Downloaded</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">1</div>
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
