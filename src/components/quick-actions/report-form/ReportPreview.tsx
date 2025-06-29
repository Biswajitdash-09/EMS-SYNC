
/**
 * Enhanced Report Preview Component
 * Shows preview of report parameters and statistics with improved styling
 */

import { Download, FileText, Calendar, Building } from 'lucide-react';

interface ReportPreviewProps {
  reportParams: {
    reportType: string;
    dateRange: string;
    format: string;
    department: string;
  };
  dataCount: number;
  additionalStats: string;
}

const ReportPreview = ({ reportParams, dataCount, additionalStats }: ReportPreviewProps) => {
  return (
    <div className="glass-effect p-6 rounded-xl border border-border/50 hover-lift transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-slate-600 to-slate-700 dark:from-slate-500 dark:to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
          <Download className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-playfair font-semibold text-foreground text-lg">Report Preview</span>
          <p className="text-xs text-muted-foreground font-inter">Generated report details</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-effect p-4 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="font-inter font-medium text-foreground text-sm">Report Type</span>
            </div>
            <p className="text-sm font-inter text-muted-foreground">{reportParams.reportType}</p>
          </div>
          
          <div className="glass-effect p-4 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-inter font-medium text-foreground text-sm">Time Period</span>
            </div>
            <p className="text-sm font-inter text-muted-foreground">{reportParams.dateRange}</p>
          </div>
          
          <div className="glass-effect p-4 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Building className="w-4 h-4 text-primary" />
              <span className="font-inter font-medium text-foreground text-sm">Department</span>
            </div>
            <p className="text-sm font-inter text-muted-foreground">
              {reportParams.department || 'All Departments'}
            </p>
          </div>
          
          <div className="glass-effect p-4 rounded-lg border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <Download className="w-4 h-4 text-primary" />
              <span className="font-inter font-medium text-foreground text-sm">Export Format</span>
            </div>
            <p className="text-sm font-inter text-muted-foreground">{reportParams.format}</p>
          </div>
        </div>
        
        <div className="glass-effect p-4 rounded-lg border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between">
            <span className="font-inter font-medium text-foreground text-sm">Data Records</span>
            <span className="font-mono font-semibold text-primary">{dataCount} items</span>
          </div>
          <p className="text-xs text-muted-foreground font-inter mt-1">
            {additionalStats}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
