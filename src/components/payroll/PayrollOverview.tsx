
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PayrollSummaryCards from './PayrollSummaryCards';
import PayrollTable from './PayrollTable';

interface PayrollEmployee {
  id: string;
  name: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  status: 'Processed' | 'Pending';
}

interface PayrollOverviewProps {
  payrollData: PayrollEmployee[];
}

const PayrollOverview = ({ payrollData }: PayrollOverviewProps) => {
  return (
    <div className="space-y-6">
      {/* Payroll Summary */}
      <PayrollSummaryCards />

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Payroll Period</CardTitle>
          <CardDescription>June 2024 payroll processing status</CardDescription>
        </CardHeader>
        <CardContent>
          <PayrollTable payrollData={payrollData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default PayrollOverview;
