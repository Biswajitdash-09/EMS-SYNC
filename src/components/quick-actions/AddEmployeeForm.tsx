
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from 'lucide-react';

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

const AddEmployeeForm = ({ employeeForm, onFormChange, onSubmit, onCancel }: AddEmployeeFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UserPlus className="w-5 h-5 text-blue-600" />
          <span>Add New Employee</span>
        </CardTitle>
        <CardDescription>Fill in the information to create a new employee profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">First Name *</Label>
            <Input 
              id="firstName" 
              value={employeeForm.firstName}
              onChange={(e) => onFormChange(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="Enter first name" 
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input 
              id="lastName" 
              value={employeeForm.lastName}
              onChange={(e) => onFormChange(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Enter last name" 
            />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email"
              value={employeeForm.email}
              onChange={(e) => onFormChange(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address" 
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input 
              id="phone" 
              value={employeeForm.phone}
              onChange={(e) => onFormChange(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number" 
            />
          </div>
          <div>
            <Label htmlFor="department">Department *</Label>
            <select
              id="department"  
              value={employeeForm.department}
              onChange={(e) => onFormChange(prev => ({ ...prev, department: e.target.value }))}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
            </select>
          </div>
          <div>
            <Label htmlFor="position">Position</Label>
            <Input 
              id="position" 
              value={employeeForm.position}
              onChange={(e) => onFormChange(prev => ({ ...prev, position: e.target.value }))}
              placeholder="Enter job position" 
            />
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input 
              id="startDate" 
              type="date"
              value={employeeForm.startDate}
              onChange={(e) => onFormChange(prev => ({ ...prev, startDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="baseSalary">Base Salary</Label>
            <Input 
              id="baseSalary" 
              type="number"
              value={employeeForm.baseSalary}
              onChange={(e) => onFormChange(prev => ({ ...prev, baseSalary: e.target.value }))}
              placeholder="Enter annual salary" 
            />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input 
            id="address" 
            value={employeeForm.address}
            onChange={(e) => onFormChange(prev => ({ ...prev, address: e.target.value }))}
            placeholder="Enter full address" 
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>Add Employee</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AddEmployeeForm;
