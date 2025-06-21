
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Calendar, DollarSign, TrendingUp } from 'lucide-react';

const StatsCards = () => {
  const stats = [{
    title: "Total Employees",
    value: "1,248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "blue"
  }, {
    title: "Active Today",
    value: "1,156",
    change: "+5%",
    trend: "up",
    icon: UserCheck,
    color: "green"
  }, {
    title: "Pending Leaves",
    value: "23",
    change: "-8%",
    trend: "down",
    icon: Calendar,
    color: "orange"
  }, {
    title: "Monthly Payroll",
    value: "$2.4M",
    change: "+3%",
    trend: "up",
    icon: DollarSign,
    color: "purple"
  }];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map(stat => (
        <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 text-${stat.color}-600`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="flex items-center space-x-1 text-xs">
              <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
              <span className={stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                {stat.change}
              </span>
              <span className="text-gray-500">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
