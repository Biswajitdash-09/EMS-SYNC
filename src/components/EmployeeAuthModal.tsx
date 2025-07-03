
/**
 * Employee Authentication Modal
 * Separate login interface for employees with real credential validation
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { authenticateEmployee, storeEmployeeAuth } from '@/services/employeeAuthService';

interface EmployeeAuthModalProps {
  open: boolean;
  onClose: () => void;
}

const EmployeeAuthModal = ({ open, onClose }: EmployeeAuthModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate credentials against employee records
      const authData = authenticateEmployee(formData.email, formData.password);
      
      if (authData) {
        // Store authentication data
        storeEmployeeAuth(authData);

        toast({
          title: "Login Successful",
          description: `Welcome ${authData.employee.name}! Redirecting to your dashboard...`,
        });

        // Reset form and navigate
        setFormData({ email: '', password: '' });
        onClose();
        navigate('/employee-dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Employee Portal Login
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employee-email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="employee-email" 
                type="email" 
                placeholder="Enter your work email" 
                className="pl-10"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employee-password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                id="employee-password" 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="pl-10 pr-10"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
        </form>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Having trouble logging in? Contact your administrator.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Use your assigned work email and password to access your dashboard.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeAuthModal;
