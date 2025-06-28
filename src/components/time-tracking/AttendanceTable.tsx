
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AttendanceRecord {
  employee: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  overtime: string;
  status: string;
}

interface AttendanceTableProps {
  data?: AttendanceRecord[];
}

const AttendanceTable = ({ data }: AttendanceTableProps) => {
  const defaultData: AttendanceRecord[] = [
    {
      employee: 'John Smith',
      date: '2024-06-21',
      clockIn: '09:00 AM',
      clockOut: '05:30 PM',
      totalHours: '8.5',
      overtime: '0.5',
      status: 'Present'
    },
    {
      employee: 'Sarah Johnson',
      date: '2024-06-21',
      clockIn: '08:45 AM',
      clockOut: '05:15 PM',
      totalHours: '8.5',
      overtime: '0.5',
      status: 'Present'
    },
    {
      employee: 'Mike Chen',
      date: '2024-06-21',
      clockIn: '-',
      clockOut: '-',
      totalHours: '0',
      overtime: '0',
      status: 'Absent'
    }
  ];

  const attendanceData = data || defaultData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Clock-in/Clock-out System</CardTitle>
        <CardDescription>Real-time attendance tracking and management</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Clock In</TableHead>
              <TableHead>Clock Out</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Overtime</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((record, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{record.employee}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.clockIn}</TableCell>
                <TableCell>{record.clockOut}</TableCell>
                <TableCell>{record.totalHours}h</TableCell>
                <TableCell>{record.overtime}h</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(record.status)}>
                    {record.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AttendanceTable;
