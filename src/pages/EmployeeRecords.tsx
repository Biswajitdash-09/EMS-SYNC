
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeData, Employee } from '@/hooks/useEmployeeData';
import EmployeeFilters from '@/components/employee/EmployeeFilters';
import AddEmployeeModal from '@/components/employee/AddEmployeeModal';
import EmployeeTable from '@/components/employee/EmployeeTable';
import EmployeeDetailsModal from '@/components/employee/EmployeeDetailsModal';
import EditEmployeeModal from '@/components/employee/EditEmployeeModal';
import PersonalDetailsTab from '@/components/employee/PersonalDetailsTab';
import EmploymentHistoryTab from '@/components/employee/EmploymentHistoryTab';
import DocumentsTab from '@/components/employee/DocumentsTab';
import LoginCredentialsTab from '@/components/employee/LoginCredentialsTab';

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
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null);

  const handleViewEmployee = (employee: Employee) => {
    setModalEmployee(employee);
  };

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    if (activeTab === 'overview') {
      setActiveTab('personal');
    }
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
  };

  const handleUpdateEmployee = (updates: Partial<Employee>) => {
    if (editingEmployee) {
      updateEmployee(editingEmployee.id, updates);
      setEditingEmployee(null);
      
      // Update selected employee if it's the same as the one being edited
      if (selectedEmployee?.id === editingEmployee.id) {
        setSelectedEmployee(prev => prev ? { ...prev, ...updates } : null);
      }
    }
  };

  const handleDeleteEmployee = (employeeId: string) => {
    deleteEmployee(employeeId);
    // Clear selected employee if it was deleted
    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(null);
    }
  };

  const handleUpdateCredentials = (employeeId: string, credentials: { loginEmail: string; password: string; isActive: boolean }) => {
    const updates = {
      loginCredentials: credentials
    };
    updateEmployee(employeeId, updates);
    
    // Update selected employee if it's the same as the one being updated
    if (selectedEmployee?.id === employeeId) {
      setSelectedEmployee(prev => prev ? { ...prev, loginCredentials: credentials } : null);
    }
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedEmployee) return;

    // Create new document object
    const newDocument = {
      id: `doc${Date.now()}`,
      name: file.name,
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('image') ? 'Image' : 'Document',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0]
    };

    // Update employee with new document
    const updatedDocuments = [...selectedEmployee.documents, newDocument];
    updateEmployee(selectedEmployee.id, { documents: updatedDocuments });
    
    // Update selected employee state
    setSelectedEmployee(prev => prev ? { ...prev, documents: updatedDocuments } : null);
    
    // Clear the input
    event.target.value = '';
    
    console.log('Document uploaded:', newDocument);
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Details</TabsTrigger>
            <TabsTrigger value="employment">Employment History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="credentials">Login Credentials</TabsTrigger>
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

                <EmployeeTable
                  employees={employees}
                  selectedEmployee={selectedEmployee}
                  onSelectEmployee={handleSelectEmployee}
                  onViewEmployee={handleViewEmployee}
                  onEditEmployee={handleEditEmployee}
                  onDeleteEmployee={handleDeleteEmployee}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <PersonalDetailsTab selectedEmployee={selectedEmployee} />
          </TabsContent>

          <TabsContent value="employment" className="space-y-6">
            <EmploymentHistoryTab selectedEmployee={selectedEmployee} />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentsTab 
              selectedEmployee={selectedEmployee}
              onDocumentUpload={handleDocumentUpload}
            />
          </TabsContent>

          <TabsContent value="credentials" className="space-y-6">
            <LoginCredentialsTab 
              selectedEmployee={selectedEmployee}
              onUpdateCredentials={handleUpdateCredentials}
            />
          </TabsContent>
        </Tabs>
      </div>

      <EmployeeDetailsModal 
        employee={modalEmployee}
        onClose={() => setModalEmployee(null)}
      />

      <EditEmployeeModal 
        employee={editingEmployee}
        onClose={() => setEditingEmployee(null)}
        onUpdateEmployee={handleUpdateEmployee}
      />
    </div>
  );
};

export default EmployeeRecords;
