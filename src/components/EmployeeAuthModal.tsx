
/**
 * Employee Authentication Modal
 * Separate login interface for employees
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

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

    // Mock authentication - will be replaced with Supabase authentication
    if (formData.email && formData.password) {
      // Simulate API call
      setTimeout(() => {
        // Store employee authentication data
        localStorage.setItem('employee-auth', JSON.stringify({
          email: formData.email,
          loginTime: new Date().toISOString(),
          role: 'employee'
        }));

        toast({
          title: "Login Successful",
          description: "Welcome to your employee dashboard!",
        });

        setIsLoading(false);
        onClose();
        navigate('/employee-dashboard');
      }, 1500);
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter valid credentials.",
        variant: "destructive",
      });
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeAuthModal;
