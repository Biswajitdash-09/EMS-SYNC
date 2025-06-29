
/**
 * Enhanced Report Data Source Info Component
 * Shows live data statistics for report generation with improved styling
 */

import { Badge } from "@/components/ui/badge";
import { Database, TrendingUp } from 'lucide-react';

interface ReportDataSourceProps {
  totalEmployees: number;
  totalLeaveRequests: number;
}

const ReportDataSource = ({ totalEmployees, totalLeaveRequests }: ReportDataSourceProps) => {
  return (
    <div className="glass-effect p-6 rounded-xl border border-primary/20 hover-glow transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
          <Database className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <span className="font-playfair font-semibold text-foreground text-lg">Live Data Source</span>
          <div className="flex items-center gap-2 mt-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <span className="text-xs text-green-600 dark:text-green-400 font-inter">Real-time</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="glass-effect p-4 rounded-lg border border-border/50">
          <span className="text-muted-foreground font-inter text-sm">Total Employees</span>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
              {totalEmployees}
            </Badge>
          </div>
        </div>
        <div className="glass-effect p-4 rounded-lg border border-border/50">
          <span className="text-muted-foreground font-inter text-sm">Leave Requests</span>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 font-mono">
              {totalLeaveRequests}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDataSource;
