
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download } from 'lucide-react';
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

interface PayslipGenerationProps {
  payrollData: PayrollEmployee[];
}

const PayslipGeneration = ({ payrollData }: PayslipGenerationProps) => {
  const { toast } = useToast();

  const handleDownloadPayslip = (employeeId: string, employeeName: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `payslip_${employeeId}_${employeeName.replace(' ', '_')}_June2024.pdf`;
    link.click();
    
    toast({
      title: "Payslip Downloaded",
      description: `Payslip for ${employeeName} has been downloaded.`,
    });
  };

  const handleDownloadAllPayslips = () => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'all_payslips_June2024.zip';
    link.click();
    
    toast({
      title: "All Payslips Downloaded",
      description: "All payslips have been downloaded as a ZIP file.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Payslip Generation
        </CardTitle>
        <CardDescription>Generate and manage employee payslips</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <Label htmlFor="payPeriod">Pay Period</Label>
            <Input id="payPeriod" value="June 2024" readOnly />
          </div>
          <Button onClick={handleDownloadAllPayslips}>
            <Download className="w-4 h-4 mr-2" />
            Generate All Payslips
          </Button>
        </div>
        <div className="grid gap-4">
          {payrollData.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{employee.name}</h4>
                <p className="text-sm text-gray-600">Net Pay: ${employee.netPay.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleDownloadPayslip(employee.id, employee.name)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayslipGeneration;
