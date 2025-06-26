
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const PayrollHistory = () => {
  const { toast } = useToast();

  const handleDownloadHistoryReport = (reportName: string) => {
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${reportName.toLowerCase().replace(/\s+/g, '_')}.pdf`;
    link.click();
    
    toast({
      title: "Report Downloaded",
      description: `${reportName} has been downloaded.`,
    });
  };

  const historyData = [
    {
      period: "May 2024 Payroll",
      processedDate: "May 31, 2024",
      totalAmount: "$210,340",
      employeeCount: "100 employees"
    },
    {
      period: "April 2024 Payroll",
      processedDate: "April 30, 2024",
      totalAmount: "$208,920",
      employeeCount: "98 employees"
    },
    {
      period: "March 2024 Payroll",
      processedDate: "March 31, 2024",
      totalAmount: "$205,680",
      employeeCount: "95 employees"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payroll History</CardTitle>
        <CardDescription>Historical payroll data and processing records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyData.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{record.period}</h4>
                <p className="text-sm text-gray-600">Processed on {record.processedDate}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-medium">{record.totalAmount}</p>
                  <p className="text-sm text-gray-600">{record.employeeCount}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDownloadHistoryReport(`${record.period} Report`)}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayrollHistory;
