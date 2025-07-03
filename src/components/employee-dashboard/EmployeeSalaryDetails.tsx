
/**
 * Employee Salary Details Component
 * Displays salary information, payslips, and tax details
 */

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Download, TrendingUp, TrendingDown, FileText, Calendar } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  salary: {
    basic: number;
    allowances: number;
    deductions: number;
    netSalary: number;
  };
}

interface Payslip {
  id: string;
  month: string;
  year: number;
  basicSalary: number;
  allowances: {
    hra: number;
    transport: number;
    medical: number;
    other: number;
  };
  deductions: {
    tax: number;
    providentFund: number;
    insurance: number;
    other: number;
  };
  grossSalary: number;
  netSalary: number;
  status: 'Processed' | 'Pending';
}

interface EmployeeSalaryDetailsProps {
  employee: Employee;
}

const EmployeeSalaryDetails = ({ employee }: EmployeeSalaryDetailsProps) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  
  // Mock payslip data - will be replaced with Supabase data
  const [payslips] = useState<Payslip[]>([
    {
      id: 'PS-2024-06',
      month: 'June',
      year: 2024,
      basicSalary: 75000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        other: 1000
      },
      deductions: {
        tax: 15000,
        providentFund: 9000,
        insurance: 2000,
        other: 500
      },
      grossSalary: 102000,
      netSalary: 75500,
      status: 'Processed'
    },
    {
      id: 'PS-2024-05',
      month: 'May',
      year: 2024,
      basicSalary: 75000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        other: 1000
      },
      deductions: {
        tax: 15000,
        providentFund: 9000,
        insurance: 2000,
        other: 500
      },
      grossSalary: 102000,
      netSalary: 75500,
      status: 'Processed'
    },
    {
      id: 'PS-2024-04',
      month: 'April',
      year: 2024,
      basicSalary: 75000,
      allowances: {
        hra: 22500,
        transport: 2000,
        medical: 1500,
        other: 1000
      },
      deductions: {
        tax: 15000,
        providentFund: 9000,
        insurance: 2000,
        other: 500
      },
      grossSalary: 102000,
      netSalary: 75500,
      status: 'Processed'
    }
  ]);

  const currentPayslip = payslips[0];
  const totalAllowances = Object.values(currentPayslip.allowances).reduce((sum, amount) => sum + amount, 0);
  const totalDeductions = Object.values(currentPayslip.deductions).reduce((sum, amount) => sum + amount, 0);

  const downloadPayslip = (payslipId: string) => {
    // Simulate payslip download - will be replaced with actual file generation
    console.log(`Downloading payslip: ${payslipId}`);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Salary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Basic Salary</p>
                <p className="text-2xl font-bold">{formatCurrency(employee.salary.basic)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Allowances</p>
                <p className="text-2xl font-bold">{formatCurrency(totalAllowances)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deductions</p>
                <p className="text-2xl font-bold">{formatCurrency(totalDeductions)}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Net Salary</p>
                <p className="text-2xl font-bold">{formatCurrency(employee.salary.netSalary)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current">Current Payslip</TabsTrigger>
          <TabsTrigger value="history">Payslip History</TabsTrigger>
          <TabsTrigger value="tax">Tax Information</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Current Payslip - {currentPayslip.month} {currentPayslip.year}
                </CardTitle>
                <Button 
                  onClick={() => downloadPayslip(currentPayslip.id)}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Earnings */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-green-700">Earnings</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Basic Salary</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.basicSalary)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>House Rent Allowance</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.allowances.hra)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport Allowance</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.allowances.transport)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medical Allowance</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.allowances.medical)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Allowances</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.allowances.other)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Gross Salary</span>
                        <span>{formatCurrency(currentPayslip.grossSalary)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-red-700">Deductions</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Income Tax</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.deductions.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provident Fund</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.deductions.providentFund)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance Premium</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.deductions.insurance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other Deductions</span>
                      <span className="font-medium">{formatCurrency(currentPayslip.deductions.other)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total Deductions</span>
                        <span>{formatCurrency(totalDeductions)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Net Salary</span>
                  <span className="text-2xl font-bold text-blue-600">{formatCurrency(currentPayslip.netSalary)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Payslip History
                </CardTitle>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payslips.map((payslip) => (
                  <div key={payslip.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{payslip.month} {payslip.year}</h4>
                        <p className="text-sm text-gray-600">Net Salary: {formatCurrency(payslip.netSalary)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={payslip.status === 'Processed' ? 'default' : 'secondary'}>
                          {payslip.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => downloadPayslip(payslip.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tax Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Current Financial Year (2024-25)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Tax Deducted (YTD)</span>
                      <span className="font-medium">{formatCurrency(45000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provident Fund (YTD)</span>
                      <span className="font-medium">{formatCurrency(27000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance Premium (YTD)</span>
                      <span className="font-medium">{formatCurrency(6000)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Tax Documents</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Form 16 (2023-24)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Investment Declaration
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Salary Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeSalaryDetails;
