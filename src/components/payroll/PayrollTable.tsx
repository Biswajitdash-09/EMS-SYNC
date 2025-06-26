
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

  const generatePayslipContent = (employee: PayrollEmployee) => {
    const content = `
      PAYSLIP - ${employee.name}
      Employee ID: ${employee.id}
      Pay Period: June 2024
      Generated on: ${new Date().toLocaleDateString()}
      
      EARNINGS:
      Base Salary: $${employee.baseSalary.toLocaleString()}
      Bonuses: $${employee.bonuses.toLocaleString()}
      Total Earnings: $${(employee.baseSalary + employee.bonuses).toLocaleString()}
      
      DEDUCTIONS:
      Total Deductions: $${employee.deductions.toLocaleString()}
      
      NET PAY: $${employee.netPay.toLocaleString()}
      
      Status: ${employee.status}
      
      This payslip is generated electronically and is valid without signature.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    return URL.createObjectURL(blob);
  };

  const handleDownloadPayslip = (employee: PayrollEmployee) => {
    try {
      const payslipUrl = generatePayslipContent(employee);
      const link = document.createElement('a');
      link.href = payslipUrl;
      link.download = `payslip_${employee.id}_${employee.name.replace(' ', '_')}_June2024.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(payslipUrl);
      
      toast({
        title: "Payslip Downloaded",
        description: `Payslip for ${employee.name} has been downloaded successfully.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download the payslip. Please try again.",
        variant: "destructive",
      });
    }
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
                onClick={() => handleDownloadPayslip(employee)}
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
