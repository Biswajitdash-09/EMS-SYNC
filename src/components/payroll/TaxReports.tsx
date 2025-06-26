
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const TaxReports = () => {
  const { toast } = useToast();

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

  return (
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
  );
};

export default TaxReports;
