
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, DollarSign, Calendar, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
        <CardDescription>
          Frequently used actions for faster workflow
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300" 
            onClick={() => navigate('/employees/new')}
          >
            <UserPlus className="w-6 h-6 text-blue-600" />
            <span className="text-sm">Add Employee</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300" 
            onClick={() => navigate('/payroll/process')}
          >
            <DollarSign className="w-6 h-6 text-green-600" />
            <span className="text-sm">Process Payroll</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-orange-50 hover:border-orange-300" 
            onClick={() => navigate('/leave/requests')}
          >
            <Calendar className="w-6 h-6 text-orange-600" />
            <span className="text-sm">Leave Requests</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300" 
            onClick={() => navigate('/reports/generate')}
          >
            <FileText className="w-6 h-6 text-purple-600" />
            <span className="text-sm">Generate Report</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300" 
            onClick={() => navigate('/performance/review')}
          >
            <BarChart3 className="w-6 h-6 text-red-600" />
            <span className="text-sm">Performance Review</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
