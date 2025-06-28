
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Play, Pause } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AttendanceStats from '@/components/time-tracking/AttendanceStats';
import AttendanceTable from '@/components/time-tracking/AttendanceTable';
import TimesheetSection from '@/components/time-tracking/TimesheetSection';
import ShiftManagement from '@/components/time-tracking/ShiftManagement';
import OvertimeTracking from '@/components/time-tracking/OvertimeTracking';
import ReportsSection from '@/components/time-tracking/ReportsSection';

const TimeTracking = () => {
  const navigate = useNavigate();
  const [isClocked, setIsClocked] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">Time Tracking</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today: 7.5 hours</p>
                <p className="text-xs text-gray-500">This week: 37.5 hours</p>
              </div>
              <Button 
                onClick={() => setIsClocked(!isClocked)}
                className={isClocked ? "bg-red-600 hover:bg-red-700" : "bg-indigo-600 hover:bg-indigo-700"}
              >
                {isClocked ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isClocked ? 'Clock Out' : 'Clock In'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="timesheets">Timesheets</TabsTrigger>
            <TabsTrigger value="shifts">Shift Schedule</TabsTrigger>
            <TabsTrigger value="overtime">Overtime</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-6">
            <AttendanceStats />
            <AttendanceTable />
          </TabsContent>

          <TabsContent value="timesheets" className="space-y-6">
            <TimesheetSection />
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
            <ShiftManagement />
          </TabsContent>

          <TabsContent value="overtime" className="space-y-6">
            <OvertimeTracking />
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <ReportsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TimeTracking;
