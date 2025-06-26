
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, Calculator, FileText, CreditCard, Calendar, Download, Edit, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

interface SalaryComponent {
  id: string;
  name: string;
  type: 'earning' | 'deduction' | 'benefit';
  value: string;
  editable: boolean;
}

const PayrollSystem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [payrollData, setPayrollData] = useState<PayrollEmployee[]>([
    {
      id: 'EMP001',
      name: 'John Smith',
      baseSalary: 75000,
      bonuses: 5000,
      deductions: 8500,
      netPay: 71500,
      status: 'Processed'
    },
    {
      id: 'EMP002',
      name: 'Sarah Johnson',
      baseSalary: 85000,
      bonuses: 8000,
      deductions: 9800,
      netPay: 83200,
      status: 'Processed'
    },
    {
      id: 'EMP003',
      name: 'Mike Chen',
      baseSalary: 65000,
      bonuses: 3000,
      deductions: 7200,
      netPay: 60800,
      status: 'Pending'
    }
  ]);

  const [salaryComponents, setSalaryComponents] = useState<SalaryComponent[]>([
    // Earnings
    { id: 'earn1', name: 'Base Salary', type: 'earning', value: '100%', editable: false },
    { id: 'earn2', name: 'Performance Bonus', type: 'earning', value: 'Variable', editable: true },
    { id: 'earn3', name: 'Overtime', type: 'earning', value: '1.5x rate', editable: true },
    // Deductions
    { id: 'ded1', name: 'Federal Tax', type: 'deduction', value: '22%', editable: true },
    { id: 'ded2', name: 'State Tax', type: 'deduction', value: '5%', editable: true },
    { id: 'ded3', name: 'Health Insurance', type: 'deduction', value: '$250', editable: true },
    // Benefits
    { id: 'ben1', name: '401(k) Match', type: 'benefit', value: '4%', editable: true },
    { id: 'ben2', name: 'Dental Insurance', type: 'benefit', value: '$45', editable: true },
    { id: 'ben3', name: 'Life Insurance', type: 'benefit', value: '$25', editable: true }
  ]);

  const [editingComponent, setEditingComponent] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [processPayrollOpen, setProcessPayrollOpen] = useState(false);

  const handleProcessPayroll = () => {
    // Update pending employees to processed
    setPayrollData(prev => prev.map(emp => 
      emp.status === 'Pending' ? { ...emp, status: 'Processed' as const } : emp
    ));
    
    setProcessPayrollOpen(false);
    toast({
      title: "Payroll Processed",
      description: "All pending payroll entries have been processed successfully.",
    });
  };

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

  const handleDownloadAllPayslips = () => {
    // Simulate bulk download
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'all_payslips_June2024.zip';
    link.click();
    
    toast({
      title: "All Payslips Downloaded",
      description: "All payslips have been downloaded as a ZIP file.",
    });
  };

  const handleDownloadTaxReport = (reportType: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${reportType.toLowerCase().replace(' ', '_')}_report.pdf`;
    link.click();
    
    toast({
      title: "Tax Report Downloaded",
      description: `${reportType} has been downloaded.`,
    });
  };

  const handleEditComponent = (component: SalaryComponent) => {
    setEditingComponent(component.id);
    setEditValue(component.value);
  };

  const handleSaveComponent = (componentId: string) => {
    setSalaryComponents(prev => prev.map(comp => 
      comp.id === componentId ? { ...comp, value: editValue } : comp
    ));
    setEditingComponent(null);
    setEditValue('');
    
    toast({
      title: "Component Updated",
      description: "Salary component has been updated successfully.",
    });
  };

  const handleCancelEdit = () => {
    setEditingComponent(null);
    setEditValue('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <h1 className="text-xl font-bold text-gray-900">Payroll System</h1>
              </div>
            </div>
            <Dialog open={processPayrollOpen} onOpenChange={setProcessPayrollOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Calculator className="w-4 h-4 mr-2" />
                  Process Payroll
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Process Payroll</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to process the payroll for all pending employees? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setProcessPayrollOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleProcessPayroll} className="bg-purple-600 hover:bg-purple-700">
                    Process Payroll
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="components">Salary Components</TabsTrigger>
            <TabsTrigger value="payslips">Payslips</TabsTrigger>
            <TabsTrigger value="taxes">Tax Reports</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Payroll Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$215,500</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Employees Paid</CardTitle>
                  <Badge variant="outline">97</Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">97/100</div>
                  <p className="text-xs text-muted-foreground">3 pending</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tax Deductions</CardTitle>
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$35,240</div>
                  <p className="text-xs text-muted-foreground">Federal & State</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Pay Date</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">July 1</div>
                  <p className="text-xs text-muted-foreground">2024</p>
                </CardContent>
              </Card>
            </div>

            {/* Payroll Table */}
            <Card>
              <CardHeader>
                <CardTitle>Current Payroll Period</CardTitle>
                <CardDescription>June 2024 payroll processing status</CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary Components Configuration</CardTitle>
                <CardDescription>Manage base salary, bonuses, and deductions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-green-700">Earnings</h4>
                    <div className="space-y-2">
                      {salaryComponents.filter(comp => comp.type === 'earning').map((component) => (
                        <div key={component.id} className="flex justify-between items-center p-2 bg-green-50 rounded">
                          <span>{component.name}</span>
                          <div className="flex items-center space-x-2">
                            {editingComponent === component.id ? (
                              <>
                                <Input 
                                  value={editValue} 
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-20 h-6 text-xs"
                                />
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleSaveComponent(component.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={handleCancelEdit}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span>{component.value}</span>
                                {component.editable && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleEditComponent(component)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-red-700">Deductions</h4>
                    <div className="space-y-2">
                      {salaryComponents.filter(comp => comp.type === 'deduction').map((component) => (
                        <div key={component.id} className="flex justify-between items-center p-2 bg-red-50 rounded">
                          <span>{component.name}</span>
                          <div className="flex items-center space-x-2">
                            {editingComponent === component.id ? (
                              <>
                                <Input 
                                  value={editValue} 
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-20 h-6 text-xs"
                                />
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleSaveComponent(component.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={handleCancelEdit}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span>{component.value}</span>
                                {component.editable && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleEditComponent(component)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-700">Benefits</h4>
                    <div className="space-y-2">
                      {salaryComponents.filter(comp => comp.type === 'benefit').map((component) => (
                        <div key={component.id} className="flex justify-between items-center p-2 bg-blue-50 rounded">
                          <span>{component.name}</span>
                          <div className="flex items-center space-x-2">
                            {editingComponent === component.id ? (
                              <>
                                <Input 
                                  value={editValue} 
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-20 h-6 text-xs"
                                />
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={() => handleSaveComponent(component.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost" 
                                  onClick={handleCancelEdit}
                                  className="h-6 w-6 p-0"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span>{component.value}</span>
                                {component.editable && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => handleEditComponent(component)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payslips" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="taxes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Tax Calculation & Reports</CardTitle>
                <CardDescription>Federal and state tax calculations and compliance reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Tax Summary (YTD)</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Federal Income Tax</span>
                        <span className="font-medium">$185,420</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>State Income Tax</span>
                        <span className="font-medium">$42,180</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Social Security</span>
                        <span className="font-medium">$31,240</span>
                      </div>
                      <div className="flex justify-between p-3 bg-gray-50 rounded">
                        <span>Medicare</span>
                        <span className="font-medium">$7,305</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Quarterly Reports</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleDownloadTaxReport('Q1 2024 Tax Report')}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Q1 2024 Tax Report
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleDownloadTaxReport('Q2 2024 Tax Report')}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Q2 2024 Tax Report
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => handleDownloadTaxReport('Current Quarter Tax Report')}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Generate Current Quarter
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payroll History</CardTitle>
                <CardDescription>Historical payroll data and processing records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">May 2024 Payroll</h4>
                      <p className="text-sm text-gray-600">Processed on May 31, 2024</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">$210,340</p>
                        <p className="text-sm text-gray-600">100 employees</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadTaxReport('May 2024 Payroll Report')}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">April 2024 Payroll</h4>
                      <p className="text-sm text-gray-600">Processed on April 30, 2024</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">$208,920</p>
                        <p className="text-sm text-gray-600">98 employees</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadTaxReport('April 2024 Payroll Report')}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">March 2024 Payroll</h4>
                      <p className="text-sm text-gray-600">Processed on March 31, 2024</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">$205,680</p>
                        <p className="text-sm text-gray-600">95 employees</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDownloadTaxReport('March 2024 Payroll Report')}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PayrollSystem;
