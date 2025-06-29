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
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 perspective-1000">
      {stats.map((stat, index) => <Card key={stat.title} className={`
          hover:shadow-lg transition-all duration-300 
          hover-lift card-3d transform-3d
          animate-slide-up stagger-${index + 1}
          group cursor-pointer
        `}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm transition-colors font-medium text-sky-500">
              {stat.title}
            </CardTitle>
            <div className={`
              p-2 rounded-lg transition-all duration-300
              bg-${stat.color}-100 dark:bg-${stat.color}-900/20
              group-hover:scale-110 group-hover:rotate-3
            `}>
              <stat.icon className={`h-4 w-4 text-${stat.color}-600 dark:text-${stat.color}-400`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:scale-105 transition-transform duration-300">
              {stat.value}
            </div>
            <div className="flex items-center space-x-1 text-xs mt-2 bg-amber-300">
              <TrendingUp className={`
                h-3 w-3 transition-all duration-300
                ${stat.trend === 'up' ? 'text-green-600 group-hover:animate-bounce' : 'text-red-600 rotate-180'}
              `} />
              <span className={`
                font-medium
                ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}
              `}>
                {stat.change}
              </span>
              <span className="text-indigo-900">from last month</span>
            </div>
          </CardContent>
        </Card>)}
    </div>;
};
export default StatsCards;