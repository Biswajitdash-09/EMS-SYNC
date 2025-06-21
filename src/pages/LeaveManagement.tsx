
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plane, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeaveManagement = () => {
  const navigate = useNavigate();

  const leaveRequests = [
    {
      id: 'LR001',
      employee: 'John Smith',
      type: 'Vacation',
      startDate: '2024-07-15',
      endDate: '2024-07-19',
      days: 5,
      status: 'Pending',
      reason: 'Family vacation'
    },
    {
      id: 'LR002',
      employee: 'Sarah Johnson',
      type: 'Sick Leave',
      startDate: '2024-06-20',
      endDate: '2024-06-21',
      days: 2,
      status: 'Approved',
      reason: 'Medical appointment'
    },
    {
      id: 'LR003',
      employee: 'Mike Chen',
      type: 'Personal',
      startDate: '2024-07-01',
      endDate: '2024-07-01',
      days: 1,
      status: 'Rejected',
      reason: 'Personal matters'
    }
  ];

  const leaveBalances = [
    { employee: 'John Smith', vacation: 15, sick: 8, personal: 3 },
    { employee: 'Sarah Johnson', vacation: 12, sick: 5, personal: 2 },
    { employee: 'Mike Chen', vacation: 20, sick: 10, personal: 4 }
  ];

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
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Calendar className="w-4 h-4 mr-2" />
              New Leave Request
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                          {request.status === 'Pending' && (
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="text-green-600">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
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
                            <span>{balance.vacation} days</span>
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-blue-500 rounded" 
                                style={{ width: `${(balance.vacation / 25) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{balance.sick} days</span>
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-green-500 rounded" 
                                style={{ width: `${(balance.sick / 15) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{balance.personal} days</span>
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-purple-500 rounded" 
                                style={{ width: `${(balance.personal / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {balance.vacation + balance.sick + balance.personal} days
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
                <CardTitle>Leave Types Configuration</CardTitle>
                <CardDescription>Configure different types of leave policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Vacation Leave</h4>
                      <p className="text-sm text-gray-600">Annual vacation days • 25 days per year</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Sick Leave</h4>
                      <p className="text-sm text-gray-600">Medical leave • 15 days per year</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Personal Leave</h4>
                      <p className="text-sm text-gray-600">Personal matters • 5 days per year</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Maternity/Paternity</h4>
                      <p className="text-sm text-gray-600">Family leave • 12 weeks</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Holiday Calendar
                </CardTitle>
                <CardDescription>Company holidays and important dates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-800">Independence Day</h4>
                    <p className="text-sm text-red-600">July 4, 2024</p>
                    <p className="text-xs text-red-500">National Holiday</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-medium text-blue-800">Labor Day</h4>
                    <p className="text-sm text-blue-600">September 2, 2024</p>
                    <p className="text-xs text-blue-500">National Holiday</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h4 className="font-medium text-green-800">Thanksgiving</h4>
                    <p className="text-sm text-green-600">November 28, 2024</p>
                    <p className="text-xs text-green-500">National Holiday</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <h4 className="font-medium text-purple-800">Christmas Day</h4>
                    <p className="text-sm text-purple-600">December 25, 2024</p>
                    <p className="text-xs text-purple-500">National Holiday</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-orange-50">
                    <h4 className="font-medium text-orange-800">New Year's Day</h4>
                    <p className="text-sm text-orange-600">January 1, 2025</p>
                    <p className="text-xs text-orange-500">National Holiday</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-medium text-gray-800">Company Retreat</h4>
                    <p className="text-sm text-gray-600">August 15-16, 2024</p>
                    <p className="text-xs text-gray-500">Company Event</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Add Holiday
                </Button>
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
                        <span className="font-medium text-yellow-600">8</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Approved This Month</span>
                        <span className="font-medium text-green-600">24</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Average Leave Days</span>
                        <span className="font-medium text-blue-600">18.5</span>
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

export default LeaveManagement;
