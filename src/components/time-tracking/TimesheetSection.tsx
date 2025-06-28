
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from 'lucide-react';

const TimesheetSection = () => {
  return (
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
  );
};

export default TimesheetSection;
