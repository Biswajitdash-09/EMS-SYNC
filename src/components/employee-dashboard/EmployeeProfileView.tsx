
/**
 * Employee Profile View Component
 * Displays employee's personal and professional information
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Calendar,
  UserCheck,
  AlertCircle
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  joinDate: string;
  profilePicture?: string;
  manager: string;
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  salary: {
    basic: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  };
  leaveBalance: {
    annual: number;
    sick: number;
    personal: number;
  };
}

interface EmployeeProfileViewProps {
  employee: Employee;
}

const EmployeeProfileView = ({ employee }: EmployeeProfileViewProps) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTenure = (joinDate: string) => {
    const join = new Date(joinDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - join.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    }
    return `${months} month${months > 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={employee.profilePicture} alt={employee.name} />
                <AvatarFallback className="text-lg">{getInitials(employee.name)}</AvatarFallback>
              </Avatar>
              <Badge variant="secondary" className="text-sm">
                Employee ID: {employee.id}
              </Badge>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{employee.name}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400">{employee.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{employee.department}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">
                    Joined {formatDate(employee.joinDate)} ({calculateTenure(employee.joinDate)})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">Reports to {employee.manager}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Emergency Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <User className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.emergencyContact.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.emergencyContact.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <UserCheck className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Relationship</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{employee.emergencyContact.relationship}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employment Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Employment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium mb-1">Department</p>
              <Badge variant="outline">{employee.department}</Badge>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Position</p>
              <Badge variant="outline">{employee.role}</Badge>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Manager</p>
              <Badge variant="outline">{employee.manager}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeProfileView;
