
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const OvertimeTracking = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overtime Tracking</CardTitle>
        <CardDescription>Monitor and approve overtime hours</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg text-center">
            <h4 className="font-medium mb-2">This Week</h4>
            <div className="text-2xl font-bold text-orange-600">45.5h</div>
            <p className="text-sm text-gray-600">Total overtime hours</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <h4 className="font-medium mb-2">This Month</h4>
            <div className="text-2xl font-bold text-red-600">182h</div>
            <p className="text-sm text-gray-600">Total overtime hours</p>
          </div>
          <div className="p-4 border rounded-lg text-center">
            <h4 className="font-medium mb-2">Pending Approval</h4>
            <div className="text-2xl font-bold text-blue-600">12h</div>
            <p className="text-sm text-gray-600">Awaiting manager approval</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold">Recent Overtime Requests</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">John Smith</h5>
                <p className="text-sm text-gray-600">June 20, 2024 • 2.5 hours</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="text-green-600">Approve</Button>
                <Button size="sm" variant="outline" className="text-red-600">Reject</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <h5 className="font-medium">Sarah Johnson</h5>
                <p className="text-sm text-gray-600">June 19, 2024 • 1.5 hours</p>
              </div>
              <Badge className="bg-green-100 text-green-800">Approved</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OvertimeTracking;
