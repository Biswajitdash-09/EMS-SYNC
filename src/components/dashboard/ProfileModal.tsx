
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building, Mail, Phone, Calendar, MapPin } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  // Mock admin profile data - in real app this would come from auth context
  const adminProfile = {
    id: 'ADM001',
    name: 'Admin User',
    email: 'admin@company.com',
    phone: '+1 234-567-8900',
    role: 'System Administrator',
    department: 'IT Administration',
    joinDate: '2020-01-15',
    address: '123 Admin St, Corporate City, CC 12345',
    status: 'Active',
    lastLogin: new Date().toLocaleDateString(),
    permissions: ['Full System Access', 'User Management', 'Reports Access', 'Settings Management']
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            My Profile
          </DialogTitle>
          <DialogDescription>
            View and manage your profile information
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Full Name:</span>
                  </div>
                  <p className="ml-6">{adminProfile.name}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Email:</span>
                  </div>
                  <p className="ml-6">{adminProfile.email}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Phone:</span>
                  </div>
                  <p className="ml-6">{adminProfile.phone}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Address:</span>
                  </div>
                  <p className="ml-6">{adminProfile.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Employment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Department:</span>
                  </div>
                  <p className="ml-6">{adminProfile.department}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Role:</span>
                  </div>
                  <p className="ml-6">{adminProfile.role}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Join Date:</span>
                  </div>
                  <p className="ml-6">{new Date(adminProfile.joinDate).toLocaleDateString()}</p>
                </div>
                
                <div className="space-y-2">
                  <span className="font-medium">Status:</span>
                  <div className="ml-6">
                    <Badge className="bg-green-100 text-green-800">
                      {adminProfile.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <span className="font-medium">Last Login:</span>
                <p className="ml-4">{adminProfile.lastLogin}</p>
              </div>
              
              <div className="space-y-2">
                <span className="font-medium">Permissions:</span>
                <div className="ml-4 flex flex-wrap gap-2">
                  {adminProfile.permissions.map((permission, index) => (
                    <Badge key={index} variant="outline">
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
