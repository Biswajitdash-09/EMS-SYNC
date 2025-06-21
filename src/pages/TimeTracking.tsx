
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Play, Pause, Calendar, MapPin, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TimeTracking = () => {
  const navigate = useNavigate();
  const [isClocked, setIsClocked] = useState(false);

  const attendanceData = [
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

  const shifts = [
    { id: 1, name: 'Morning Shift', start: '09:00 AM', end: '05:00 PM', employees: 45 },
    { id: 2, name: 'Evening Shift', start: '02:00 PM', end: '10:00 PM', employees: 25 },
    { id: 3, name: 'Night Shift', start: '10:00 PM', end: '06:00 AM', employees: 15 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-100 text-green-800';
      case 'Absent': return 'bg-red-100 text-red-800';
      case 'Late': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            {/* Today's Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92</div>
                  <p className="text-xs text-muted-foreground">Out of 100 employees</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
                  <Badge variant="outline" className="text-yellow-600">5</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">Arrived after 9:15 AM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Absences</CardTitle>
                  <Badge variant="outline" className="text-red-600">3</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Unplanned absences</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Work Hours</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.2</div>
                  <p className="text-xs text-muted-foreground">Hours per employee</p>
                </CardContent>
              </Card>
            </div>

            {/* Clock-in/Clock-out System */}
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
          </TabsContent>

          <TabsContent value="timesheets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Timesheets & Logs
                </CardTitle>
                <CardDescription>Detailed time tracking and work logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Create Timesheet Entry</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="project">Project/Task</Label>
                        <Input id="project" placeholder="Select project or task" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="startTime">Start Time</Label>
                          <Input id="startTime" type="time" />
                        </div>
                        <div>
                          <Label htmlFor="endTime">End Time</Label>
                          <Input id="endTime" type="time" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Input id="description" placeholder="What did you work on?" />
                      </div>
                      <Button className="w-full">Add Entry</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Today's Time Log</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium">Website Development</h5>
                          <span className="text-sm text-gray-500">3.5h</span>
                        </div>
                        <p className="text-sm text-gray-600">Working on user dashboard redesign</p>
                        <p className="text-xs text-gray-500">09:00 AM - 12:30 PM</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium">Team Meeting</h5>
                          <span className="text-sm text-gray-500">1h</span>
                        </div>
                        <p className="text-sm text-gray-600">Weekly standup and project planning</p>
                        <p className="text-xs text-gray-500">01:00 PM - 02:00 PM</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="font-medium">Code Review</h5>
                          <span className="text-sm text-gray-500">2h</span>
                        </div>
                        <p className="text-sm text-gray-600">Reviewing pull requests and testing</p>
                        <p className="text-xs text-gray-500">02:30 PM - 04:30 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shifts" className="space-y-6">
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
                  {shifts.map((shift) => (
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
          </TabsContent>

          <TabsContent value="overtime" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Overtime Tracking</CardTitle>
                <CardDescription>Monitor and approve overtime hours</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">This Week</h4>
                    <div className="text-2xl font-bold text-orange-600">45.5h</div>
                    <p className="text-sm text-gray-600">Total overtime hours</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">This Month</h4>
                    <div className="text-2xl font-bold text-red-600">182h</div>
                    <p className="text-sm text-gray-600">Total overtime hours</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Pending Approval</h4>
                    <div className="text-2xl font-bold text-blue-600">12h</div>
                    <p className="text-sm text-gray-600">Awaiting manager approval</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Overtime Requests</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">John Smith</h5>
                        <p className="text-sm text-gray-600">June 20, 2024 • 2.5 hours</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-green-600">Approve</Button>
                        <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Sarah Johnson</h5>
                        <p className="text-sm text-gray-600">June 19, 2024 • 1.5 hours</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Approved</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Absenteeism Reports & Analytics</CardTitle>
                <CardDescription>Generate comprehensive attendance and time tracking reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Quick Reports</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Daily Attendance Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="w-4 h-4 mr-2" />
                        Weekly Timesheet Summary
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Monthly Attendance Analysis
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="w-4 h-4 mr-2" />
                        Overtime Report
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Attendance Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Average Attendance Rate</span>
                        <span className="font-medium text-green-600">94.5%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Late Arrivals (This Month)</span>
                        <span className="font-medium text-yellow-600">23</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Absenteeism Rate</span>
                        <span className="font-medium text-red-600">5.5%</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Avg. Work Hours/Day</span>
                        <span className="font-medium text-blue-600">8.2h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TimeTracking;
