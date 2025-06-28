
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';

interface Shift {
  id: number;
  name: string;
  start: string;
  end: string;
  employees: number;
}

interface ShiftManagementProps {
  shifts?: Shift[];
}

const ShiftManagement = ({ shifts }: ShiftManagementProps) => {
  const defaultShifts: Shift[] = [
    { id: 1, name: 'Morning Shift', start: '09:00 AM', end: '05:00 PM', employees: 45 },
    { id: 2, name: 'Evening Shift', start: '02:00 PM', end: '10:00 PM', employees: 25 },
    { id: 3, name: 'Night Shift', start: '10:00 PM', end: '06:00 AM', employees: 15 }
  ];

  const shiftData = shifts || defaultShifts;

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
          {shiftData.map((shift) => (
            <div key={shift.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{shift.name}</h4>
                <p className="text-sm text-gray-600">{shift.start} - {shift.end}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{shift.employees} employees</p>
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
