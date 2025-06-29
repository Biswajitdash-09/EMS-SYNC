
/**
 * Enhanced Report Configuration Component
 * Handles report parameter selection and configuration with improved styling
 */

import { Label } from "@/components/ui/label";
import { FileText, Calendar, Download, Building } from 'lucide-react';

interface ReportConfigurationProps {
  reportParams: {
    reportType: string;
    dateRange: string;
    format: string;
    department: string;
  };
  departments: string[];
  onParamsChange: (updates: any) => void;
}

const ReportConfiguration = ({ reportParams, departments, onParamsChange }: ReportConfigurationProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Label htmlFor="reportType" className="flex items-center gap-2 font-inter font-medium text-foreground">
            <FileText className="w-4 h-4 text-primary" />
            Report Type *
          </Label>
          <select
            id="reportType"
            value={reportParams.reportType}
            onChange={(e) => onParamsChange((prev: any) => ({ ...prev, reportType: e.target.value }))}
            className="w-full p-3 input-enhanced rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm font-inter text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          >
            <option value="Attendance Report">📊 Attendance Report</option>
            <option value="Payroll Summary">💰 Payroll Summary</option>
            <option value="Leave Analysis">🏖️ Leave Analysis</option>
            <option value="Performance Report">📈 Performance Report</option>
            <option value="Department Overview">🏢 Department Overview</option>
          </select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="dateRange" className="flex items-center gap-2 font-inter font-medium text-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            Date Range *
          </Label>
          <select
            id="dateRange"
            value={reportParams.dateRange}
            onChange={(e) => onParamsChange((prev: any) => ({ ...prev, dateRange: e.target.value }))}
            className="w-full p-3 input-enhanced rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm font-inter text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          >
            <option value="Last 30 Days">📅 Last 30 Days</option>
            <option value="Last 3 Months">🗓️ Last 3 Months</option>
            <option value="Last 6 Months">📊 Last 6 Months</option>
            <option value="Last Year">📈 Last Year</option>
            <option value="Current Month">📆 Current Month</option>
            <option value="Current Quarter">🎯 Current Quarter</option>
            <option value="Last Quarter">📋 Last Quarter</option>
          </select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="format" className="flex items-center gap-2 font-inter font-medium text-foreground">
            <Download className="w-4 h-4 text-primary" />
            Export Format *
          </Label>
          <select
            id="format"
            value={reportParams.format}
            onChange={(e) => onParamsChange((prev: any) => ({ ...prev, format: e.target.value }))}
            className="w-full p-3 input-enhanced rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm font-inter text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          >
            <option value="PDF">📄 PDF Document</option>
            <option value="Excel">📊 Excel Spreadsheet</option>
            <option value="CSV">📈 CSV File</option>
            <option value="Text">📝 Text File</option>
          </select>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="department" className="flex items-center gap-2 font-inter font-medium text-foreground">
            <Building className="w-4 h-4 text-primary" />
            Department (Optional)
          </Label>
          <select
            id="department"
            value={reportParams.department}
            onChange={(e) => onParamsChange((prev: any) => ({ ...prev, department: e.target.value }))}
            className="w-full p-3 input-enhanced rounded-lg border border-border/50 bg-background/80 backdrop-blur-sm font-inter text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          >
            <option value="">🏢 All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>🏛️ {dept}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReportConfiguration;
