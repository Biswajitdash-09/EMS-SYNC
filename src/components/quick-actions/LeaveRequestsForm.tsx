
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from 'lucide-react';
import { useLeaveData } from "@/hooks/useLeaveData";

interface LeaveRequestsFormProps {
  onLeaveAction: (action: 'approve' | 'reject', requestId: string, employeeName: string) => void;
  onCancel: () => void;
}

const LeaveRequestsForm = ({ onLeaveAction, onCancel }: LeaveRequestsFormProps) => {
  const { allLeaveRequests } = useLeaveData();
  const pendingLeaveRequests = allLeaveRequests.filter(req => req.status === 'Pending').slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-orange-600" />
          <span>Pending Leave Requests</span>
        </CardTitle>
        <CardDescription>Review and approve/reject leave applications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {pendingLeaveRequests.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No pending leave requests</p>
        ) : (
          <div className="space-y-3">
            {pendingLeaveRequests.map((request) => (
              <div key={request.id} className="p-3 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{request.employee}</h4>
                    <p className="text-sm text-gray-600">
                      {request.type} - {request.days} days
                    </p>
                    <p className="text-sm text-gray-500">
                      {request.startDate} to {request.endDate}
                    </p>
                    {request.reason && (
                      <p className="text-sm text-gray-600 mt-1">Reason: {request.reason}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => onLeaveAction('approve', request.id, request.employee)}
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => onLeaveAction('reject', request.id, request.employee)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Close</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaveRequestsForm;
