
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const DashboardHeaderNotifications = () => {
  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Leave Request Approved",
      message: "Your leave request for Dec 25-26 has been approved",
      time: "2 hours ago",
      unread: true,
      type: "success"
    },
    {
      id: 2,
      title: "Performance Review Due",
      message: "Your quarterly performance review is due by Dec 31",
      time: "1 day ago",
      unread: true,
      type: "warning"
    },
    {
      id: 3,
      title: "New Policy Update",
      message: "Remote work policy has been updated. Please review.",
      time: "3 days ago",
      unread: false,
      type: "info"
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-medium">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <span className="text-xs text-gray-500">{unreadCount} unread</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-64 overflow-y-auto">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="flex-col items-start p-3 cursor-pointer">
              <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium">{notification.title}</h4>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center text-blue-600 cursor-pointer">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardHeaderNotifications;
