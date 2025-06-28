
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from 'lucide-react';

interface AttendanceStatsProps {
  presentCount?: number;
  totalEmployees?: number;
  lateArrivals?: number;
  absences?: number;
  avgWorkHours?: number;
}

const AttendanceStats = ({ 
  presentCount = 92, 
  totalEmployees = 100, 
  lateArrivals = 5, 
  absences = 3, 
  avgWorkHours = 8.2 
}: AttendanceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{presentCount}</div>
          <p className="text-xs text-muted-foreground">Out of {totalEmployees} employees</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          <Badge variant="outline" className="text-yellow-600">{lateArrivals}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{lateArrivals}</div>
          <p className="text-xs text-muted-foreground">Arrived after 9:15 AM</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Absences</CardTitle>
          <Badge variant="outline" className="text-red-600">{absences}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{absences}</div>
          <p className="text-xs text-muted-foreground">Unplanned absences</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Work Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgWorkHours}</div>
          <p className="text-xs text-muted-foreground">Hours per employee</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStats;
