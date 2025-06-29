
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileText } from 'lucide-react';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="w-5 h-5 text-purple-600" />
          <span>Generate Report</span>
        </CardTitle>
        <CardDescription>Configure report parameters and generate comprehensive reports</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>Generate Report</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerateReportForm;
