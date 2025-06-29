
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from 'lucide-react';

interface ProcessPayrollFormProps {
  onSubmit: () => void;
  onCancel: () => void;
}

const ProcessPayrollForm = ({ onSubmit, onCancel }: ProcessPayrollFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-600" />
          <span>Process Payroll</span>
        </CardTitle>
        <CardDescription>Calculate and process monthly payroll for all employees</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h4 className="font-medium text-yellow-800">Payroll Processing</h4>
          <p className="text-sm text-yellow-600 mt-1">
            This will calculate salaries, deductions, and taxes for the current pay period.
            Make sure all timesheet data is complete before proceeding.
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={onSubmit}>Process Payroll</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessPayrollForm;
