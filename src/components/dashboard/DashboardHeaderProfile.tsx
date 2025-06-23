
import { useState } from 'react';
import { User, Settings, LogOut, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from "@/hooks/use-toast";
import ProfileModal from './ProfileModal';
import SettingsModal from './SettingsModal';
import ScheduleModal from './ScheduleModal';
import ReportsModal from './ReportsModal';

const DashboardHeaderProfile = () => {
  const { toast } = useToast();
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  const handleLogout = () => {
    // In real app, this would handle actual logout
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    console.log('User logged out');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">Admin User</p>
              <p className="text-xs leading-none text-muted-foreground">admin@company.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setProfileOpen(true)}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setScheduleOpen(true)}
          >
            <Calendar className="mr-2 h-4 w-4" />
            <span>My Schedule</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setReportsOpen(true)}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>My Reports</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="cursor-pointer text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={profileOpen} 
        onClose={() => setProfileOpen(false)} 
      />

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)} 
      />

      {/* Schedule Modal */}
      <ScheduleModal 
        isOpen={scheduleOpen} 
        onClose={() => setScheduleOpen(false)} 
      />

      {/* Reports Modal */}
      <ReportsModal 
        isOpen={reportsOpen} 
        onClose={() => setReportsOpen(false)} 
      />
    </>
  );
};

export default DashboardHeaderProfile;
