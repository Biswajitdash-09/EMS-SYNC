import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { UserPlus, AlertCircle } from 'lucide-react';
import { useEmployeeData } from "@/hooks/useEmployeeData";
interface AddEmployeeFormProps {
  employeeForm: {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    position: string;
    startDate: string;
    phone: string;
    address: string;
    baseSalary: string;
  };
  onFormChange: (updates: any) => void;
  onSubmit: () => void;
  onCancel: () => void;
}
const AddEmployeeForm = ({
  employeeForm,
  onFormChange,
  onSubmit,
  onCancel
}: AddEmployeeFormProps) => {
  const {
    allEmployees,
    departments
  } = useEmployeeData();

  // Validation helper
  const isFormValid = () => {
    return employeeForm.firstName.trim() && employeeForm.lastName.trim() && employeeForm.email.trim() && employeeForm.department;
  };

  // Check for duplicate email
  const isDuplicateEmail = () => {
    if (!employeeForm.email.trim()) return false;
    return allEmployees.some(emp => emp.email.toLowerCase() === employeeForm.email.toLowerCase());
  };

  // Email validation
  const isValidEmail = () => {
    if (!employeeForm.email.trim()) return true; // Don't show error for empty email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(employeeForm.email);
  };
  const handleSubmit = () => {
    if (!isFormValid()) {
      return; // Form validation will show via UI
    }
    onSubmit();
  };
  return <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-blue-600" />
            <span>Add New Employee</span>
          </div>
          <Badge variant="secondary">
            Current Total: {allEmployees.length}
          </Badge>
        </CardTitle>
        <CardDescription>
          Fill in the information to create a new employee profile. 
          Fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Email validation warnings */}
        {!isValidEmail() && <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">Please enter a valid email address</span>
            </div>
          </div>}
        
        {isDuplicateEmail() && <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm text-yellow-700">An employee with this email already exists</span>
            </div>
          </div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input id="firstName" value={employeeForm.firstName} onChange={e => onFormChange(prev => ({
            ...prev,
            firstName: e.target.value
          }))} placeholder="Enter first name" className={!employeeForm.firstName.trim() && employeeForm.firstName !== '' ? 'border-red-300' : ''} />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input id="lastName" value={employeeForm.lastName} onChange={e => onFormChange(prev => ({
            ...prev,
            lastName: e.target.value
          }))} placeholder="Enter last name" className={!employeeForm.lastName.trim() && employeeForm.lastName !== '' ? 'border-red-300' : ''} />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={employeeForm.email} onChange={e => onFormChange(prev => ({
            ...prev,
            email: e.target.value
          }))} placeholder="Enter email address" className={!isValidEmail() || isDuplicateEmail() ? 'border-red-300' : ''} />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={employeeForm.phone} onChange={e => onFormChange(prev => ({
            ...prev,
            phone: e.target.value
          }))} placeholder="Enter phone number" />
          </div>
          <div>
            <Label htmlFor="department">Department *</Label>
            <select id="department" value={employeeForm.department} onChange={e => onFormChange(prev => ({
            ...prev,
            department: e.target.value
          }))} className={`w-full p-2 border rounded-md ${!employeeForm.department ? 'border-red-300' : ''}`}>
              <option value="">Select Department</option>
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input id="position" value={employeeForm.position} onChange={e => onFormChange(prev => ({
            ...prev,
            position: e.target.value
          }))} placeholder="Enter job position" />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" type="date" value={employeeForm.startDate} onChange={e => onFormChange(prev => ({
            ...prev,
            startDate: e.target.value
          }))} />
          </div>
          <div>
            <Label htmlFor="baseSalary">Base Salary (Annual)</Label>
            <Input id="baseSalary" type="number" min="0" step="1000" value={employeeForm.baseSalary} onChange={e => onFormChange(prev => ({
            ...prev,
            baseSalary: e.target.value
          }))} placeholder="Enter annual salary" />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" value={employeeForm.address} onChange={e => onFormChange(prev => ({
          ...prev,
          address: e.target.value
        }))} placeholder="Enter full address" />
        </div>
        
        {/* Form status */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-700">
            <p><strong>Form Status:</strong> {isFormValid() ? 'Ready to submit' : 'Please fill required fields'}</p>
            <p><strong>Will be added to:</strong> Main Employee Records ({allEmployees.length} current employees)</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleSubmit} disabled={!isFormValid() || !isValidEmail() || isDuplicateEmail()} className="bg-violet-950 hover:bg-violet-800">
            Add Employee to Records
          </Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>;
};
export default AddEmployeeForm;