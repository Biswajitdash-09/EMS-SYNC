
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plane, Clock, CheckCircle, XCircle, AlertCircle, Plus, Settings, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLeaveData } from '@/hooks/useLeaveData';
import { useEmployeeData } from '@/hooks/useEmployeeData';
import NewLeaveRequestModal from '@/components/leave/NewLeaveRequestModal';
import LeaveApprovalModal from '@/components/leave/LeaveApprovalModal';
import HolidayModal from '@/components/leave/HolidayModal';
import LeaveTypeModal from '@/components/leave/LeaveTypeModal';
import { useToast } from "@/hooks/use-toast";

const LeaveManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const {
    leaveRequests,
    leaveBalances,
    leaveTypes,
    holidays,
    statusFilter,
    typeFilter,
    employeeFilter,
    setStatusFilter,
    setTypeFilter,
    setEmployeeFilter,
    addLeaveRequest,
    approveLeaveRequest,
    rejectLeaveRequest,
    deleteLeaveRequest,
    addLeaveType,
    updateLeaveType,
    deleteLeaveType,
    addHoliday,
    updateHoliday,
    deleteHoliday,
    getAvailableBalance,
    pendingRequests,
    approvedThisMonth
  } = useLeaveData();

  const { allEmployees } = useEmployeeData();

  // Modal states
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [showLeaveTypeModal, setShowLeaveTypeModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingLeaveType, setEditingLeaveType] = useState(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-600" />;
      case 'Pending': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHolidayColor = (type: string) => {
    switch (type) {
      case 'National': return 'bg-red-50 border-red-200 text-red-800';
      case 'Company': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'Regional': return 'bg-green-50 border-green-200 text-green-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const handleApprovalAction = (request: any) => {
    setSelectedRequest(request);
    setShowApprovalModal(true);
  };

  const handleEditLeaveType = (leaveType: any) => {
    setEditingLeaveType(leaveType);
    setShowLeaveTypeModal(true);
  };

  const handleDeleteLeaveType = (id: string) => {
    if (confirm('Are you sure you want to delete this leave type?')) {
      deleteLeaveType(id);
      toast({
        title: "Leave Type Deleted",
        description: "The leave type has been removed successfully."
      });
    }
  };

  const handleDeleteHoliday = (id: string) => {
    if (confirm('Are you sure you want to delete this holiday?')) {
      deleteHoliday(id);
      toast({
        title: "Holiday Deleted",
        description: "The holiday has been removed from the calendar."
      });
    }
  };

  const employeeOptions = allEmployees.map(emp => ({
    id: emp.id,
    name: emp.name
  }));

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
                <Plane className="w-6 h-6 text-orange-600" />
                <h1 className="text-xl font-bold text-gray-900">Leave Management</h1>
              </div>
            </div>
            <Button 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => setShowNewRequestModal(true)}
            >
              <Calendar className="w-4 h-4 mr-2" />
              New Leave Request
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{pendingRequests}</p>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{approvedThisMonth}</p>
                  <p className="text-sm text-gray-600">Approved This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{holidays.length}</p>
                  <p className="text-sm text-gray-600">Holidays This Year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="requests">Leave Requests</TabsTrigger>
            <TabsTrigger value="balances">Leave Balances</TabsTrigger>
            <TabsTrigger value="types">Leave Types</TabsTrigger>
            <TabsTrigger value="calendar">Holiday Calendar</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Requests & Approval System</CardTitle>
                <CardDescription>Manage and process employee leave requests</CardDescription>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center space-x-2">
                    <Label>Status:</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label>Type:</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {leaveTypes.map(type => (
                          <SelectItem key={type.id} value={type.name}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Label>Employee:</Label>
                    <Select value={employeeFilter} onValueChange={setEmployeeFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {allEmployees.map(emp => (
                          <SelectItem key={emp.id} value={emp.name}>{emp.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Employee</TableHead>
                      <TableHead>Leave Type</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.id}</TableCell>
                        <TableCell>{request.employee}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.startDate}</TableCell>
                        <TableCell>{request.endDate}</TableCell>
                        <TableCell>{request.days}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <Badge className={getStatusColor(request.status)}>
                              {request.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {request.status === 'Pending' && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleApprovalAction(request)}
                              >
                                Review
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this request?')) {
                                  deleteLeaveRequest(request.id);
                                  toast({
                                    title: "Request Deleted",
                                    description: "The leave request has been deleted."
                                  });
                                }
                              }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balances" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Balance Tracking</CardTitle>
                <CardDescription>Monitor employee leave balances across different leave types</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Vacation Days</TableHead>
                      <TableHead>Sick Leave</TableHead>
                      <TableHead>Personal Days</TableHead>
                      <TableHead>Total Available</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveBalances.map((balance, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{balance.employee}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{balance.vacation - balance.usedVacation}/{balance.vacation} days</span>
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-blue-500 rounded" 
                                style={{ width: `${((balance.vacation - balance.usedVacation) / balance.vacation) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{balance.sick - balance.usedSick}/{balance.sick} days</span>
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-green-500 rounded" 
                                style={{ width: `${((balance.sick - balance.usedSick) / balance.sick) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{balance.personal - balance.usedPersonal}/{balance.personal} days</span>
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-purple-500 rounded" 
                                style={{ width: `${((balance.personal - balance.usedPersonal) / balance.personal) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {(balance.vacation - balance.usedVacation) + 
                           (balance.sick - balance.usedSick) + 
                           (balance.personal - balance.usedPersonal)} days
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="types" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Leave Types Configuration</CardTitle>
                    <CardDescription>Configure different types of leave policies</CardDescription>
                  </div>
                  <Button onClick={() => {
                    setEditingLeaveType(null);
                    setShowLeaveTypeModal(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Leave Type
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {leaveTypes.map((type) => (
                    <div key={type.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded bg-${type.color}-500`}></div>
                        <div>
                          <h4 className="font-medium">{type.name}</h4>
                          <p className="text-sm text-gray-600">
                            {type.description} • {type.maxDays} days per year
                            {type.carryForward && ' • Carry forward enabled'}
                            {type.requiresApproval && ' • Requires approval'}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditLeaveType(type)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteLeaveType(type.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Holiday Calendar
                    </CardTitle>
                    <CardDescription>Company holidays and important dates</CardDescription>
                  </div>
                  <Button onClick={() => setShowHolidayModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Holiday
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {holidays.map((holiday) => (
                    <div key={holiday.id} className={`p-4 border rounded-lg ${getHolidayColor(holiday.type)}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{holiday.name}</h4>
                          <p className="text-sm">{holiday.date}</p>
                          <p className="text-xs mt-1">{holiday.type} Holiday</p>
                          {holiday.description && (
                            <p className="text-xs mt-1 opacity-75">{holiday.description}</p>
                          )}
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteHoliday(holiday.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Leave Reports & Analytics</CardTitle>
                <CardDescription>Generate reports and track leave patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Quick Reports</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="w-4 h-4 mr-2" />
                        Monthly Leave Summary
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="w-4 h-4 mr-2" />
                        Employee Leave Balances
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Plane className="w-4 h-4 mr-2" />
                        Leave Trends Analysis
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Leave Statistics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Pending Requests</span>
                        <span className="font-medium text-yellow-600">{pendingRequests}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Approved This Month</span>
                        <span className="font-medium text-green-600">{approvedThisMonth}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Total Leave Types</span>
                        <span className="font-medium text-blue-600">{leaveTypes.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <NewLeaveRequestModal
        open={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        onSubmit={addLeaveRequest}
        leaveTypes={leaveTypes}
        employees={employeeOptions}
        getAvailableBalance={getAvailableBalance}
      />

      <LeaveApprovalModal
        open={showApprovalModal}
        onClose={() => {
          setShowApprovalModal(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
        onApprove={approveLeaveRequest}
        onReject={rejectLeaveRequest}
      />

      <HolidayModal
        open={showHolidayModal}
        onClose={() => setShowHolidayModal(false)}
        onSubmit={addHoliday}
      />

      <LeaveTypeModal
        open={showLeaveTypeModal}
        onClose={() => {
          setShowLeaveTypeModal(false);
          setEditingLeaveType(null);
        }}
        onSubmit={editingLeaveType ? 
          (data) => updateLeaveType(editingLeaveType.id, data) : 
          addLeaveType
        }
        leaveType={editingLeaveType}
        isEdit={!!editingLeaveType}
      />
    </div>
  );
};

export default LeaveManagement;
