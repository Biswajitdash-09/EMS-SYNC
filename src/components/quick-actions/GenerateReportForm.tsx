
/**
 * Generate Report Form Component for Quick Actions
 * Creates reports using data from main system records
 * Supports multiple report types with real-time data integration
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, Database, Download } from 'lucide-react';
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { useLeaveData } from "@/hooks/useLeaveData";

interface GenerateReportFormProps {
  reportParams: {
    reportType: string;
    dateRange: string;
    format: string;
    department: string;
  };
  onParamsChange: (updates: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const GenerateReportForm = ({ reportParams, onParamsChange, onSubmit, onCancel }: GenerateReportFormProps) => {
  // Get real-time data from main system records
  const { allEmployees, departments } = useEmployeeData();
  const { allLeaveRequests } = useLeaveData();

  // Calculate data statistics for report preview
  const activeEmployees = allEmployees.filter(emp => emp.status === 'Active');
  const filteredEmployees = reportParams.department 
    ? allEmployees.filter(emp => emp.department === reportParams.department)
    : allEmployees;
    
  const recentLeaveRequests = allLeaveRequests.filter(req => {
    const requestDate = new Date(req.appliedDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return requestDate >= thirtyDaysAgo;
  });

  // Get data count based on report type and filters
  const getDataCount = () => {
    switch (reportParams.reportType) {
      case 'Attendance Report':
        return filteredEmployees.length;
      case 'Payroll Summary':
        return activeEmployees.length;
      case 'Leave Analysis':
        return reportParams.department 
          ? allLeaveRequests.filter(req => {
              const emp = allEmployees.find(e => e.name === req.employee);
              return emp?.department === reportParams.department;
            }).length
          : allLeaveRequests.length;
      case 'Performance Report':
        return filteredEmployees.length;
      case 'Department Overview':
        return reportParams.department ? filteredEmployees.length : departments.length;
      default:
        return filteredEmployees.length;
    }
  };

  const dataCount = getDataCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span>Generate Report</span>
        </CardTitle>
        <CardDescription>
          Configure report parameters and generate comprehensive reports from main system data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Source Info */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Database className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Live Data Source</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700">Total Employees:</span>
              <Badge variant="secondary" className="ml-2">{allEmployees.length}</Badge>
            </div>
            <div>
              <span className="text-blue-700">Leave Requests:</span>
              <Badge variant="secondary" className="ml-2">{allLeaveRequests.length}</Badge>
            </div>
          </div>
        </div>

        {/* Report Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <select
              id="reportType"
              value={reportParams.reportType}
              onChange={(e) => onParamsChange(prev => ({ ...prev, reportType: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="Attendance Report">Attendance Report</option>
              <option value="Payroll Summary">Payroll Summary</option>
              <option value="Leave Analysis">Leave Analysis</option>
              <option value="Performance Report">Performance Report</option>
              <option value="Department Overview">Department Overview</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="dateRange">Date Range</Label>
            <select
              id="dateRange"
              value={reportParams.dateRange}
              onChange={(e) => onParamsChange(prev => ({ ...prev, dateRange: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="Last 3 Months">Last 3 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Last Year">Last Year</option>
              <option value="Current Month">Current Month</option>
              <option value="Current Quarter">Current Quarter</option>
              <option value="Last Quarter">Last Quarter</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="format">Format</Label>
            <select
              id="format"
              value={reportParams.format}
              onChange={(e) => onParamsChange(prev => ({ ...prev, format: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>
          
          <div>
            <Label htmlFor="department">Department (Optional)</Label>
            <select
              id="department"
              value={reportParams.department}
              onChange={(e) => onParamsChange(prev => ({ ...prev, department: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Report Preview */}
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-800">Report Preview</span>
          </div>
          <div className="text-sm text-gray-600">
            <p><strong>Report:</strong> {reportParams.reportType}</p>
            <p><strong>Period:</strong> {reportParams.dateRange}</p>
            <p><strong>Format:</strong> {reportParams.format}</p>
            <p><strong>Scope:</strong> {reportParams.department || 'All Departments'}</p>
            <p><strong>Data Records:</strong> {dataCount} items will be included</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={onSubmit}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={dataCount === 0}
          >
            Generate Report ({dataCount} records)
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        {dataCount === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">No data available for the selected criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenerateReportForm;
