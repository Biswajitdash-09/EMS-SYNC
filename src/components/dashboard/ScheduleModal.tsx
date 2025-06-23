
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
  // Mock schedule data - in real app this would come from API
  const todaySchedule = [
    {
      id: 1,
      title: 'Team Standup Meeting',
      time: '09:00 - 09:30',
      location: 'Conference Room A',
      attendees: 8,
      type: 'meeting',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'HR Policy Review',
      time: '11:00 - 12:00',
      location: 'HR Office',
      attendees: 4,
      type: 'review',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Employee Performance Reviews',
      time: '14:00 - 16:00',
      location: 'Meeting Room B',
      attendees: 3,
      type: 'review',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'System Maintenance Check',
      time: '16:30 - 17:00',
      location: 'Server Room',
      attendees: 2,
      type: 'maintenance',
      status: 'upcoming'
    }
  ];

  const upcomingEvents = [
    {
      id: 5,
      title: 'Monthly Board Meeting',
      date: 'Tomorrow',
      time: '10:00 - 11:30',
      location: 'Boardroom',
      type: 'meeting'
    },
    {
      id: 6,
      title: 'New Employee Orientation',
      date: 'Friday',
      time: '09:00 - 17:00',
      location: 'Training Room',
      type: 'training'
    },
    {
      id: 7,
      title: 'Quarterly Review Meeting',
      date: 'Next Week',
      time: '14:00 - 16:00',
      location: 'Conference Room A',
      type: 'review'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'training': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            My Schedule
          </DialogTitle>
          <DialogDescription>
            View your upcoming meetings, tasks, and events
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex flex-col items-center gap-1 min-w-[80px]">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{event.time}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>
                Your scheduled events for the coming days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                    <div className="flex flex-col items-center gap-1 min-w-[80px]">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{event.title}</h4>
                        <Badge className={getTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Today's Events</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-600">Upcoming Events</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">6.5</div>
                  <div className="text-sm text-gray-600">Hours Scheduled</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleModal;
