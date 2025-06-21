
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Building, FileText, Users, Shield, MessageSquare, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HRManagement = () => {
  const navigate = useNavigate();

  const policies = [
    { id: 1, title: 'Employee Code of Conduct', lastUpdated: '2024-01-15', category: 'Workplace Ethics' },
    { id: 2, title: 'Remote Work Policy', lastUpdated: '2024-02-10', category: 'Work Arrangement' },
    { id: 3, title: 'Anti-Harassment Policy', lastUpdated: '2024-01-05', category: 'Workplace Safety' },
    { id: 4, title: 'Data Privacy Policy', lastUpdated: '2024-03-01', category: 'Security' }
  ];

  const announcements = [
    { id: 1, title: 'Annual Performance Reviews Starting Next Month', date: '2024-06-15', priority: 'High' },
    { id: 2, title: 'New Health Insurance Benefits Available', date: '2024-06-10', priority: 'Medium' },
    { id: 3, title: 'Company Holiday Schedule Updated', date: '2024-06-05', priority: 'Low' }
  ];

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
                <Building className="w-6 h-6 text-green-600" />
                <h1 className="text-xl font-bold text-gray-900">HR Management</h1>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <FileText className="w-4 h-4 mr-2" />
              New Policy
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="policies" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="structure">Organization</TabsTrigger>
            <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="access">Access Control</TabsTrigger>
          </TabsList>

          <TabsContent value="policies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Company Policies & Handbook
                </CardTitle>
                <CardDescription>Manage company policies and employee handbook</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {policies.map((policy) => (
                    <div key={policy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div>
                        <h4 className="font-medium text-gray-900">{policy.title}</h4>
                        <p className="text-sm text-gray-600">Category: {policy.category}</p>
                        <p className="text-xs text-gray-500">Last updated: {policy.lastUpdated}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Organizational Structure
                </CardTitle>
                <CardDescription>Define company hierarchy and reporting structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-medium">Executive</h4>
                    <p className="text-sm text-gray-600">3 positions</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-medium">Management</h4>
                    <p className="text-sm text-gray-600">12 positions</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-medium">Staff</h4>
                    <p className="text-sm text-gray-600">89 positions</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Update Organization Chart
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="onboarding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding & Offboarding Workflows</CardTitle>
                <CardDescription>Manage employee onboarding and offboarding processes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Onboarding Checklist</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Welcome email sent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">IT equipment assigned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Office tour completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">HR documentation signed</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Offboarding Checklist</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Exit interview scheduled</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">IT equipment returned</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Access revoked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Final payroll processed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  HR Announcements
                </CardTitle>
                <CardDescription>Company-wide announcements and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.map((announcement) => (
                  <div key={announcement.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                        <p className="text-sm text-gray-600">{announcement.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        announcement.priority === 'High' ? 'bg-red-100 text-red-800' :
                        announcement.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {announcement.priority}
                      </span>
                    </div>
                  </div>
                ))}
                <Button className="w-full" variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Create New Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="access" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Role-Based Access Management
                </CardTitle>
                <CardDescription>Configure user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Admin</h4>
                      <p className="text-sm text-gray-600">Full system access</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <span className="text-sm text-gray-500">3 users</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">HR Manager</h4>
                      <p className="text-sm text-gray-600">HR and employee management</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <span className="text-sm text-gray-500">5 users</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Employee</h4>
                      <p className="text-sm text-gray-600">Basic access to personal data</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <span className="text-sm text-gray-500">89 users</span>
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

export default HRManagement;
