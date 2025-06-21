
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RecentActivities = () => {
  const recentActivities = [{
    action: "New employee onboarded",
    employee: "Sarah Johnson",
    time: "2 hours ago",
    type: "success"
  }, {
    action: "Leave request submitted",
    employee: "Mike Chen",
    time: "4 hours ago",
    type: "warning"
  }, {
    action: "Payroll processed",
    employee: "All Employees",
    time: "1 day ago",
    type: "info"
  }, {
    action: "Performance review completed",
    employee: "David Wilson",
    time: "2 days ago",
    type: "success"
  }, {
    action: "Policy update published",
    employee: "HR Department",
    time: "3 days ago",
    type: "info"
  }];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activities</CardTitle>
        <CardDescription>
          Latest system activities and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.type === 'success' ? 'bg-green-500' : 
              activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
            }`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                {activity.action}
              </p>
              <p className="text-sm text-gray-500">{activity.employee}</p>
              <p className="text-xs text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
