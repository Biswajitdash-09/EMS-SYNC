
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PayrollEmployee {
  id: string;
  name: string;
  baseSalary: number;
  bonuses: number;
  deductions: number;
  netPay: number;
  status: 'Processed' | 'Pending';
}

interface PayrollTableProps {
  payrollData: PayrollEmployee[];
}

const PayrollTable = ({ payrollData }: PayrollTableProps) => {
  const { toast } = useToast();

  const handleDownloadPayslip = (employeeId: string, employeeName: string) => {
    // Simulate PDF download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `payslip_${employeeId}_${employeeName.replace(' ', '_')}_June2024.pdf`;
    link.click();
    
    toast({
      title: "Payslip Downloaded",
      description: `Payslip for ${employeeName} has been downloaded.`,
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee</TableHead>
          <TableHead>Base Salary</TableHead>
          <TableHead>Bonuses</TableHead>
          <TableHead>Deductions</TableHead>
          <TableHead>Net Pay</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payrollData.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div>
                <div className="font-medium">{employee.name}</div>
                <div className="text-sm text-gray-500">{employee.id}</div>
              </div>
            </TableCell>
            <TableCell>${employee.baseSalary.toLocaleString()}</TableCell>
            <TableCell>${employee.bonuses.toLocaleString()}</TableCell>
            <TableCell>${employee.deductions.toLocaleString()}</TableCell>
            <TableCell className="font-medium">${employee.netPay.toLocaleString()}</TableCell>
            <TableCell>
              <Badge variant={employee.status === 'Processed' ? 'default' : 'secondary'}>
                {employee.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleDownloadPayslip(employee.id, employee.name)}
              >
                <FileText className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PayrollTable;
