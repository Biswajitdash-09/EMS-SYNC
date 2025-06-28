
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Edit, Trash2, Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface UserRole {
  id: number;
  name: string;
  users: number;
  permissions: string;
  editable: boolean;
}

interface PermissionsSettingsProps {
  initialRoles?: UserRole[];
}

const PermissionsSettings = ({ initialRoles }: PermissionsSettingsProps) => {
  const { toast } = useToast();
  
  // User Roles State
  const [userRoles, setUserRoles] = useState<UserRole[]>(initialRoles || [
    { id: 1, name: 'Super Admin', users: 2, permissions: 'Full system access', editable: false },
    { id: 2, name: 'HR Manager', users: 5, permissions: 'HR and employee management', editable: true },
    { id: 3, name: 'Payroll Manager', users: 3, permissions: 'Payroll and financial data', editable: true },
    { id: 4, name: 'Department Manager', users: 12, permissions: 'Department-specific access', editable: true },
    { id: 5, name: 'Employee', users: 1226, permissions: 'Personal data access only', editable: true }
  ]);

  // Role Management Handlers
  const handleDeleteRole = (roleId: number) => {
    const role = userRoles.find(r => r.id === roleId);
    if (role && !role.editable) {
      toast({
        title: "Cannot Delete",
        description: "This system role cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    setUserRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "User role has been deleted successfully.",
    });
  };

  const handleCreateRole = () => {
    const newRole: UserRole = {
      id: Math.max(...userRoles.map(r => r.id)) + 1,
      name: 'New Role',
      users: 0,
      permissions: 'Custom permissions',
      editable: true
    };
    setUserRoles(prev => [...prev, newRole]);
    toast({
      title: "Role Created",
      description: "New user role has been created.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          User Roles and Permissions
        </CardTitle>
        <CardDescription>Manage user access levels and permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userRoles.map((role) => (
            <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{role.name}</h4>
                <p className="text-sm text-gray-600">{role.permissions}</p>
                <p className="text-xs text-gray-500">{role.users} user(s) assigned</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                {role.editable && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteRole(role.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4" onClick={handleCreateRole}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Role
        </Button>
      </CardContent>
    </Card>
  );
};

export default PermissionsSettings;
