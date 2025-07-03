
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Employee } from '@/hooks/useEmployeeData';

interface EditEmployeeModalProps {
  employee: Employee | null;
  onClose: () => void;
  onUpdateEmployee: (updates: Partial<Employee>) => void;
}

const EditEmployeeModal = ({ employee, onClose, onUpdateEmployee }: EditEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    name: employee?.name || '',
    email: employee?.email || '',
    phone: employee?.phone || '',
    department: employee?.department || '',
    role: employee?.role || '',
    status: employee?.status || 'Active',
    address: employee?.address || '',
    dateOfBirth: employee?.dateOfBirth || '',
    manager: employee?.manager || '',
    baseSalary: employee?.baseSalary || 0,
    emergencyContactName: employee?.emergencyContact?.name || '',
    emergencyContactPhone: employee?.emergencyContact?.phone || '',
    emergencyContactRelationship: employee?.emergencyContact?.relationship || '',
    loginEmail: employee?.loginCredentials?.loginEmail || '',
    loginPassword: employee?.loginCredentials?.password || '',
    isLoginActive: employee?.loginCredentials?.isActive || false
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updates: Partial<Employee> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: formData.role,
      status: formData.status as 'Active' | 'Probation' | 'Terminated',
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      manager: formData.manager,
      baseSalary: Number(formData.baseSalary),
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship
      },
      loginCredentials: {
        loginEmail: formData.loginEmail,
        password: formData.loginPassword,
        isActive: formData.isLoginActive
      }
    };

    onUpdateEmployee(updates);
    onClose();
  };

  if (!employee) return null;

  return (
    <Dialog open={!!employee} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Employee - {employee.name}</DialogTitle>
          <DialogDescription>
            Update employee information including login credentials for {employee.name} ({employee.id})
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Basic Information</h4>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Employment Information</h4>
              
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => handleInputChange('department', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Operations">Operations</SelectItem>
                    <SelectItem value="Legal">Legal</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Probation">Probation</SelectItem>
                    <SelectItem value="Terminated">Terminated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">Manager</Label>
                <Input
                  id="manager"
                  value={formData.manager}
                  onChange={(e) => handleInputChange('manager', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baseSalary">Base Salary</Label>
                <Input
                  id="baseSalary"
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) => handleInputChange('baseSalary', parseInt(e.target.value))}
                  required
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Emergency Contact</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelationship">Relationship</Label>
                <Input
                  id="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Login Credentials Section */}
          <div className="space-y-4 border-t pt-6">
            <h4 className="font-semibold text-blue-600">Login Credentials</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loginEmail">Login Email</Label>
                <Input
                  id="loginEmail"
                  type="email"
                  value={formData.loginEmail}
                  onChange={(e) => handleInputChange('loginEmail', e.target.value)}
                  placeholder="employee.login@company.com"
                  required
                />
                <p className="text-sm text-gray-500">Email used for employee login</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="loginPassword">Login Password</Label>
                <Input
                  id="loginPassword"
                  type="password"
                  value={formData.loginPassword}
                  onChange={(e) => handleInputChange('loginPassword', e.target.value)}
                  placeholder="Enter new password"
                  required
                />
                <p className="text-sm text-gray-500">Password for employee access</p>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isLoginActive"
                    checked={formData.isLoginActive}
                    onCheckedChange={(checked) => handleInputChange('isLoginActive', checked)}
                  />
                  <Label htmlFor="isLoginActive">Enable Login Access</Label>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {formData.isLoginActive ? 'Employee can log in to their dashboard' : 'Employee login is disabled'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEmployeeModal;
