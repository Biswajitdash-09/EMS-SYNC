
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';
import { ShiftSchedule } from '@/hooks/time-tracking/useTimeTrackingCore';

interface ShiftManagementProps {
  shifts?: ShiftSchedule[];
}

const ShiftManagement = ({ shifts }: ShiftManagementProps) => {
  const defaultShifts: ShiftSchedule[] = [
    { 
      id: '1', 
      employeeId: 'emp1',
      employeeName: 'Multiple Employees',
      shiftName: 'Morning Shift', 
      startTime: '09:00 AM', 
      endTime: '05:00 PM', 
      date: '2024-06-21',
      status: 'scheduled'
    },
    { 
      id: '2', 
      employeeId: 'emp2',
      employeeName: 'Multiple Employees',
      shiftName: 'Evening Shift', 
      startTime: '02:00 PM', 
      endTime: '10:00 PM', 
      date: '2024-06-21',
      status: 'scheduled'
    },
    { 
      id: '3', 
      employeeId: 'emp3',
      employeeName: 'Multiple Employees',
      shiftName: 'Night Shift', 
      startTime: '10:00 PM', 
      endTime: '06:00 AM', 
      date: '2024-06-21',
      status: 'scheduled'
    }
  ];

  const shiftData = shifts || defaultShifts;

  // Group shifts by shift name to show employee counts
  const groupedShifts = shiftData.reduce((acc, shift) => {
    const existing = acc.find(s => s.shiftName === shift.shiftName);
    if (existing) {
      existing.employeeCount += 1;
    } else {
      acc.push({
        ...shift,
        employeeCount: 1
      });
    }
    return acc;
  }, [] as (ShiftSchedule & { employeeCount: number })[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Shift Scheduling
        </CardTitle>
        <CardDescription>Manage employee work schedules and shifts</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          {groupedShifts.map((shift) => (
            <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{shift.shiftName}</h4>
                <p className="text-sm text-gray-600">{shift.startTime} - {shift.endTime}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{shift.employeeCount} employees</p>
                  <p className="text-sm text-gray-600">assigned</p>
                </div>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="w-full" variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Create New Shift
        </Button>
      </CardContent>
    </Card>
  );
};

export default ShiftManagement;
