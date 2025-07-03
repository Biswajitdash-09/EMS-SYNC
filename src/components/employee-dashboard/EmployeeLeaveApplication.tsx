
/**
 * Employee Leave Application Component
 * Allows employees to apply for leave and view their leave history
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
}

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedBy?: string;
  comments?: string;
}

interface EmployeeLeaveApplicationProps {
  employee: Employee;
}

const EmployeeLeaveApplication = ({ employee }: EmployeeLeaveApplicationProps) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Mock leave history - will be replaced with Supabase data
  const [leaveHistory] = useState<LeaveRequest[]>([
    {
      id: 'LR001',
      type: 'Annual Leave',
      startDate: '2024-06-15',
      endDate: '2024-06-20',
      days: 5,
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: '2024-06-01',
      approvedBy: 'Jane Smith',
      comments: 'Approved for family vacation'
    },
    {
      id: 'LR002',
      type: 'Sick Leave',
      startDate: '2024-05-10',
      endDate: '2024-05-12',
      days: 3,
      reason: 'Medical treatment',
      status: 'Approved',
      appliedDate: '2024-05-09',
      approvedBy: 'Jane Smith'
    },
    {
      id: 'LR003',
      type: 'Personal Leave',
      startDate: '2024-07-08',
      endDate: '2024-07-08',
      days: 1,
      reason: 'Personal appointment',
      status: 'Pending',
      appliedDate: '2024-07-01'
    }
  ]);

  const calculateDays = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.startDate || !formData.endDate || !formData.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const days = calculateDays(formData.startDate, formData.endDate);
    
    // Check leave balance
    const leaveType = formData.type.toLowerCase().replace(' leave', '');
    const availableBalance = employee.leaveBalance[leaveType as keyof typeof employee.leaveBalance];
    
    if (days > availableBalance) {
      toast({
        title: "Insufficient Leave Balance",
        description: `You only have ${availableBalance} days of ${formData.type.toLowerCase()} remaining.`,
        variant: "destructive",
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Leave Application Submitted",
      description: `Your ${formData.type.toLowerCase()} application for ${days} days has been submitted for approval.`,
    });

    // Reset form
    setFormData({
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setShowForm(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Leave Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Annual Leave</p>
                <p className="text-2xl font-bold">{employee.leaveBalance.annual}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sick Leave</p>
                <p className="text-2xl font-bold">{employee.leaveBalance.sick}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Personal Leave</p>
                <p className="text-2xl font-bold">{employee.leaveBalance.personal}</p>
              </div>
              <Clock className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Application Form */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Apply for Leave
            </CardTitle>
            <Button onClick={() => setShowForm(!showForm)} variant="outline">
              {showForm ? 'Cancel' : 'New Application'}
            </Button>
          </div>
        </CardHeader>
        
        {showForm && (
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="leaveType">Leave Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                      <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                      <SelectItem value="Personal Leave">Personal Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="days">Calculated Days</Label>
                  <Input 
                    value={calculateDays(formData.startDate, formData.endDate)} 
                    readOnly 
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input 
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input 
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="reason">Reason *</Label>
                <Textarea 
                  placeholder="Please provide a reason for your leave application..."
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  rows={3}
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit Leave Application
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      {/* Leave History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Leave History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveHistory.map((leave) => (
              <div key={leave.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(leave.status)}
                    <h4 className="font-medium">{leave.type}</h4>
                    <Badge className={getStatusColor(leave.status)}>
                      {leave.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-500">
                    Applied: {new Date(leave.appliedDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Duration:</span> {leave.days} day{leave.days > 1 ? 's' : ''}
                  </div>
                  <div>
                    <span className="font-medium">From:</span> {new Date(leave.startDate).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">To:</span> {new Date(leave.endDate).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mt-2">
                  <span className="font-medium">Reason:</span> {leave.reason}
                </p>
                
                {leave.comments && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Comments:</span> {leave.comments}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeLeaveApplication;
