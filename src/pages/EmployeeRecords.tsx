
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Filter, FileText, Calendar, Phone, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeRecords = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    {
      id: 'EMP001',
      name: 'John Smith',
      department: 'Engineering',
      role: 'Senior Developer',
      status: 'Active',
      joinDate: '2022-01-15',
      email: 'john.smith@company.com',
      phone: '+1 234-567-8900',
      address: '123 Main St, City, State'
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      department: 'HR',
      role: 'HR Manager',
      status: 'Active',
      joinDate: '2021-03-10',
      email: 'sarah.johnson@company.com',
      phone: '+1 234-567-8901',
      address: '456 Oak Ave, City, State'
    },
    {
      id: 'EMP003',
      name: 'Mike Chen',
      department: 'Finance',
      role: 'Financial Analyst',
      status: 'Probation',
      joinDate: '2024-01-05',
      email: 'mike.chen@company.com',
      phone: '+1 234-567-8902',
      address: '789 Pine St, City, State'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Probation': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
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
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Employee Records</h1>
              </div>
            </div>
            <Button onClick={() => {}} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="employment">Employment History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
                <CardDescription>Manage and view all employee records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search employees..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                {/* Employee Table */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">{employee.id}</TableCell>
                        <TableCell>{employee.name}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.role}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{employee.joinDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Personal Information & Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" />
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter address" />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Emergency Contact</h4>
                  <div>
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input id="emergencyName" placeholder="Emergency contact name" />
                  </div>
                  <div>
                    <Label htmlFor="emergencyPhone">Contact Phone</Label>
                    <Input id="emergencyPhone" placeholder="Emergency contact phone" />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input id="relationship" placeholder="Relationship to employee" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Employment History & Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input id="jobTitle" placeholder="Current job title" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" placeholder="Department" />
                  </div>
                  <div>
                    <Label htmlFor="manager">Reporting Manager</Label>
                    <Input id="manager" placeholder="Manager name" />
                  </div>
                  <div>
                    <Label htmlFor="joinDate">Join Date</Label>
                    <Input id="joinDate" type="date" />
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Employment History</h4>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">Senior Developer</h5>
                          <p className="text-sm text-gray-600">Engineering Department</p>
                          <p className="text-xs text-gray-500">Jan 2022 - Present</p>
                        </div>
                        <Badge variant="outline">Current</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Employee Documents
                </CardTitle>
                <CardDescription>Manage ID cards, contracts, and other important documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <div>
                        <h5 className="font-medium">Employment Contract</h5>
                        <p className="text-sm text-gray-600">PDF • 2.4 MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-green-600" />
                      <div>
                        <h5 className="font-medium">ID Verification</h5>
                        <p className="text-sm text-gray-600">PDF • 1.8 MB</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-purple-600" />
                      <div>
                        <h5 className="font-medium">Tax Documents</h5>
                        <p className="text-sm text-gray-600">PDF • 1.2 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="mt-6" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EmployeeRecords;
