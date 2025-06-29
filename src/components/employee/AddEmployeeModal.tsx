
/**
 * Add Employee Modal Component
 * Modal form for adding new employees to the system
 * Handles comprehensive employee data collection including personal details and emergency contacts
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus } from 'lucide-react';
import { Employee } from '@/hooks/useEmployeeData';
import ProfilePictureUpload from './ProfilePictureUpload';
import EmployeeFormFields from './EmployeeFormFields';
import EmergencyContactFields from './EmergencyContactFields';

interface AddEmployeeModalProps {
  onAddEmployee: (employee: Omit<Employee, 'id'>) => void;
}

const AddEmployeeModal = ({ onAddEmployee }: AddEmployeeModalProps) => {
  // Modal visibility state
  const [open, setOpen] = useState(false);
  
  // Profile picture upload state
  const [profilePicture, setProfilePicture] = useState<string>('');
  
  // Employee form data state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    status: 'Active' as const,
    joinDate: '',
    address: '',
    dateOfBirth: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    manager: '',
    baseSalary: 0
  });

  /**
   * Handle form submission
   * Validates and processes new employee data
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct complete employee object
    const newEmployee: Omit<Employee, 'id'> = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      department: formData.department,
      role: formData.role,
      status: formData.status,
      joinDate: formData.joinDate,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
      profilePicture: profilePicture || undefined,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelationship
      },
      manager: formData.manager,
      baseSalary: formData.baseSalary,
      // Initialize employment history with current role
      employmentHistory: [{
        title: formData.role,
        department: formData.department,
        startDate: formData.joinDate,
        current: true
      }],
      // Initialize empty documents array
      documents: []
    };

    // Submit employee data
    onAddEmployee(newEmployee);
    setOpen(false);
    
    // Reset form to initial state
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      status: 'Active',
      joinDate: '',
      address: '',
      dateOfBirth: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      emergencyContactRelationship: '',
      manager: '',
      baseSalary: 0
    });
    setProfilePicture('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Modal trigger button */}
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </DialogTrigger>
      
      {/* Modal content */}
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
          <DialogDescription>
            Fill in the employee details to add them to the system.
          </DialogDescription>
        </DialogHeader>
        
        {/* Employee form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile picture upload section */}
          <ProfilePictureUpload
            profilePicture={profilePicture}
            setProfilePicture={setProfilePicture}
            employeeName={formData.name}
          />

          {/* Basic employee information fields */}
          <EmployeeFormFields
            formData={formData}
            setFormData={setFormData}
          />
          
          {/* Emergency contact information fields */}
          <EmergencyContactFields
            formData={formData}
            setFormData={setFormData}
          />

          {/* Form action buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Employee</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEmployeeModal;
