import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Search, FileText, Calendar, Phone, MapPin, Briefcase, Eye, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeData, Employee } from '@/hooks/useEmployeeData';
import EmployeeFilters from '@/components/employee/EmployeeFilters';
import AddEmployeeModal from '@/components/employee/AddEmployeeModal';

const EmployeeRecords = () => {
  const navigate = useNavigate();
  const {
    employees,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    statusFilter,
    setStatusFilter,
    departments,
    statuses,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployeeData();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Probation': return 'bg-yellow-100 text-yellow-800';
      case 'Terminated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = (updates: Partial<Employee>) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, updates);
      setEditingEmployee(null);
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(employeeId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Employee Records</h1>
              </div>
            </div>
            <AddEmployeeModal onAddEmployee={addEmployee} />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
                <CardDescription>Manage and view all employee records ({employees.length} employees)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search employees by name, email, or ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <EmployeeFilters
                  departmentFilter={departmentFilter}
                  setDepartmentFilter={setDepartmentFilter}
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  departments={departments}
                  statuses={statuses}
                />

                {/* Employee Table */}
                <div className="border rounded-lg">
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
                          <TableCell>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-sm text-gray-500">{employee.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>{employee.department}</TableCell>
                          <TableCell>{employee.role}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(employee.status)}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewEmployee(employee)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditEmployee(employee)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDeleteEmployee(employee.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {employees.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No employees found matching your criteria.
                  </div>
                )}
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
              <CardContent>
                {selectedEmployee ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Personal Details</h4>
                      <div className="space-y-2">
                        <div><strong>Full Name:</strong> {selectedEmployee.name}</div>
                        <div><strong>Email:</strong> {selectedEmployee.email}</div>
                        <div><strong>Phone:</strong> {selectedEmployee.phone}</div>
                        <div><strong>Date of Birth:</strong> {new Date(selectedEmployee.dateOfBirth).toLocaleDateString()}</div>
                        <div><strong>Address:</strong> {selectedEmployee.address}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Emergency Contact</h4>
                      <div className="space-y-2">
                        <div><strong>Contact Name:</strong> {selectedEmployee.emergencyContact.name}</div>
                        <div><strong>Contact Phone:</strong> {selectedEmployee.emergencyContact.phone}</div>
                        <div><strong>Relationship:</strong> {selectedEmployee.emergencyContact.relationship}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Select an employee from the Overview tab to view their personal details.
                  </div>
                )}
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
              <CardContent>
                {selectedEmployee ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><strong>Current Job Title:</strong> {selectedEmployee.role}</div>
                      <div><strong>Department:</strong> {selectedEmployee.department}</div>
                      <div><strong>Reporting Manager:</strong> {selectedEmployee.manager}</div>
                      <div><strong>Join Date:</strong> {new Date(selectedEmployee.joinDate).toLocaleDateString()}</div>
                      <div><strong>Base Salary:</strong> ${selectedEmployee.baseSalary.toLocaleString()}</div>
                      <div><strong>Status:</strong> 
                        <Badge className={`ml-2 ${getStatusColor(selectedEmployee.status)}`}>
                          {selectedEmployee.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Employment History</h4>
                      <div className="space-y-3">
                        {selectedEmployee.employmentHistory.map((job, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <h5 className="font-medium">{job.title}</h5>
                                <p className="text-sm text-gray-600">{job.department}</p>
                                <p className="text-xs text-gray-500">
                                  {new Date(job.startDate).toLocaleDateString()} - {job.current ? 'Present' : new Date(job.endDate!).toLocaleDateString()}
                                </p>
                              </div>
                              {job.current && <Badge variant="outline">Current</Badge>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Select an employee from the Overview tab to view their employment history.
                  </div>
                )}
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
                {selectedEmployee ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedEmployee.documents.map((doc) => (
                        <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-blue-600" />
                            <div className="flex-1">
                              <h5 className="font-medium">{doc.name}</h5>
                              <p className="text-sm text-gray-600">{doc.type} • {doc.size}</p>
                              <p className="text-xs text-gray-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {selectedEmployee.documents.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No documents uploaded for this employee.
                      </div>
                    )}
                    
                    <Button className="mt-6" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Upload Document
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Select an employee from the Overview tab to view their documents.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Employee Details Modal */}
      {selectedEmployee && (
        <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Employee Details - {selectedEmployee.name}</DialogTitle>
              <DialogDescription>
                Complete information for {selectedEmployee.name} ({selectedEmployee.id})
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Basic Information</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>ID:</strong> {selectedEmployee.id}</div>
                    <div><strong>Name:</strong> {selectedEmployee.name}</div>
                    <div><strong>Email:</strong> {selectedEmployee.email}</div>
                    <div><strong>Phone:</strong> {selectedEmployee.phone}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Employment</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Department:</strong> {selectedEmployee.department}</div>
                    <div><strong>Role:</strong> {selectedEmployee.role}</div>
                    <div><strong>Manager:</strong> {selectedEmployee.manager}</div>
                    <div><strong>Status:</strong> 
                      <Badge className={`ml-1 ${getStatusColor(selectedEmployee.status)}`}>
                        {selectedEmployee.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployeeRecords;
