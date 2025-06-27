
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, MapPin, Users, Plus, Download, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScheduleEvent {
  id: number;
  title: string;
  time: string;
  location: string;
  attendees: number;
  type: 'meeting' | 'review' | 'maintenance' | 'training';
  status: 'upcoming' | 'completed' | 'cancelled';
  description?: string;
  date: string;
}

const ScheduleModal = ({ isOpen, onClose }: ScheduleModalProps) => {
  const { toast } = useToast();
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ScheduleEvent | null>(null);
  const [newEvent, setNewEvent] = useState({
    title: '',
    time: '',
    location: '',
    attendees: 1,
    type: 'meeting' as const,
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  // Mock schedule data with more comprehensive information
  const [todaySchedule, setTodaySchedule] = useState<ScheduleEvent[]>([
    {
      id: 1,
      title: 'Team Standup Meeting',
      time: '09:00 - 09:30',
      location: 'Conference Room A',
      attendees: 8,
      type: 'meeting',
      status: 'upcoming',
      description: 'Daily standup to discuss progress and blockers',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 2,
      title: 'HR Policy Review',
      time: '11:00 - 12:00',
      location: 'HR Office',
      attendees: 4,
      type: 'review',
      status: 'upcoming',
      description: 'Review updated HR policies and procedures',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 3,
      title: 'Employee Performance Reviews',
      time: '14:00 - 16:00',
      location: 'Meeting Room B',
      attendees: 3,
      type: 'review',
      status: 'upcoming',
      description: 'Quarterly performance review sessions',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: 4,
      title: 'System Maintenance Check',
      time: '16:30 - 17:00',
      location: 'Server Room',
      attendees: 2,
      type: 'maintenance',
      status: 'upcoming',
      description: 'Regular system health check and updates',
      date: new Date().toISOString().split('T')[0]
    }
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState<ScheduleEvent[]>([
    {
      id: 5,
      title: 'Monthly Board Meeting',
      date: 'Tomorrow',
      time: '10:00 - 11:30',
      location: 'Boardroom',
      type: 'meeting',
      attendees: 12,
      status: 'upcoming',
      description: 'Monthly board meeting to discuss company progress'
    },
    {
      id: 6,
      title: 'New Employee Orientation',
      date: 'Friday',
      time: '09:00 - 17:00',
      location: 'Training Room',
      type: 'training',
      attendees: 6,
      status: 'upcoming',
      description: 'Comprehensive orientation for new hires'
    },
    {
      id: 7,
      title: 'Quarterly Review Meeting',
      date: 'Next Week',
      time: '14:00 - 16:00',
      location: 'Conference Room A',
      type: 'review',
      attendees: 15,
      status: 'upcoming',
      description: 'Q2 performance and goals review'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'training': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.time || !newEvent.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event: ScheduleEvent = {
      id: Date.now(),
      ...newEvent,
      status: 'upcoming'
    };

    if (newEvent.date === new Date().toISOString().split('T')[0]) {
      setTodaySchedule(prev => [...prev, event]);
    } else {
      setUpcomingEvents(prev => [...prev, event]);
    }

    setNewEvent({
      title: '',
      time: '',
      location: '',
      attendees: 1,
      type: 'meeting',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
    setShowAddEvent(false);
    
    toast({
      title: "Event Added",
      description: "New event has been added to your schedule.",
    });
  };

  const handleDeleteEvent = (id: number, isToday: boolean) => {
    if (isToday) {
      setTodaySchedule(prev => prev.filter(event => event.id !== id));
    } else {
      setUpcomingEvents(prev => prev.filter(event => event.id !== id));
    }
    
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your schedule.",
    });
  };

  const handleExportSchedule = () => {
    const scheduleData = {
      today: todaySchedule,
      upcoming: upcomingEvents,
      exportDate: new Date().toISOString(),
      totalEvents: todaySchedule.length + upcomingEvents.length
    };

    const content = `
SCHEDULE EXPORT - ${new Date().toLocaleDateString()}
==============================================

TODAY'S SCHEDULE (${new Date().toLocaleDateString()}):
${todaySchedule.map(event => `
• ${event.title}
  Time: ${event.time}
  Location: ${event.location}
  Attendees: ${event.attendees}
  Type: ${event.type}
  Description: ${event.description || 'No description'}
`).join('\n')}

UPCOMING EVENTS:
${upcomingEvents.map(event => `
• ${event.title}
  Date: ${event.date}
  Time: ${event.time}
  Location: ${event.location}
  Attendees: ${event.attendees}
  Type: ${event.type}
  Description: ${event.description || 'No description'}
`).join('\n')}

SUMMARY:
Total Events: ${todaySchedule.length + upcomingEvents.length}
Today's Events: ${todaySchedule.length}
Upcoming Events: ${upcomingEvents.length}

Generated on: ${new Date().toLocaleString()}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `schedule-export-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Schedule Exported",
      description: "Your schedule has been downloaded successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            My Schedule
            <div className="ml-auto flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportSchedule}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddEvent(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>
            View and manage your upcoming meetings, tasks, and events
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add Event Form */}
          {showAddEvent && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter event title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                      placeholder="e.g., 09:00 - 10:00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Enter location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="attendees">Attendees</Label>
                    <Input
                      id="attendees"
                      type="number"
                      min="1"
                      value={newEvent.attendees}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, attendees: parseInt(e.target.value) || 1 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <select
                      id="type"
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="review">Review</option>
                      <option value="training">Training</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter event description (optional)"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddEvent}>Add Event</Button>
                  <Button variant="outline" onClick={() => setShowAddEvent(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

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
                      {event.description && (
                        <p className="text-sm text-gray-600">{event.description}</p>
                      )}
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
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id, true)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
                      {event.description && (
                        <p className="text-sm text-gray-600">{event.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{event.time}</span>
                        </div>
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
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteEvent(event.id, false)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
                  <div className="text-2xl font-bold text-blue-600">{todaySchedule.length}</div>
                  <div className="text-sm text-gray-600">Today's Events</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{upcomingEvents.length}</div>
                  <div className="text-sm text-gray-600">Upcoming Events</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {(todaySchedule.length + upcomingEvents.length) * 1.5}
                  </div>
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
