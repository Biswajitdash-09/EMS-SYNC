
import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { useLeaveData } from "@/hooks/useLeaveData";

export const useQuickActionHandlers = () => {
  const { toast } = useToast();
  const { addEmployee } = useEmployeeData();
  const { approveLeaveRequest, rejectLeaveRequest } = useLeaveData();

  const handleAddEmployee = (employeeForm: any, resetForm: () => void) => {
    // Validate form
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email || !employeeForm.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create comprehensive employee object that matches the Employee interface
    const currentDate = new Date().toISOString().split('T')[0];
    const joinDate = employeeForm.startDate || currentDate;
    const fullName = `${employeeForm.firstName} ${employeeForm.lastName}`;
    
    const newEmployee = {
      name: fullName,
      email: employeeForm.email,
      phone: employeeForm.phone || `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      department: employeeForm.department,
      role: employeeForm.position || 'Employee',
      status: 'Active' as const,
      joinDate: joinDate,
      address: employeeForm.address || 'Address not provided',
      dateOfBirth: '1990-01-01', // Default birth date, can be updated later
      profilePicture: undefined, // No profile picture initially
      emergencyContact: {
        name: 'Not specified',
        phone: 'Not specified',
        relationship: 'Not specified'
      },
      manager: 'Not assigned',
      baseSalary: parseInt(employeeForm.baseSalary) || 50000,
      employmentHistory: [{
        title: employeeForm.position || 'Employee',
        department: employeeForm.department,
        startDate: joinDate,
        current: true
      }],
      documents: []
    };

    // Add employee to the main employee data store
    addEmployee(newEmployee);
    
    toast({
      title: "Employee Added Successfully",
      description: `${fullName} has been added to the employee records and will appear on the Employee Records page.`,
    });

    // Reset form
    resetForm();
    
    console.log('Employee added via Quick Actions:', newEmployee);
  };

  const handleProcessPayroll = () => {
    toast({
      title: "Payroll Processing Started",
      description: "Payroll for the current period is being processed. You will be notified when complete.",
    });
  };

  const handleLeaveAction = (action: 'approve' | 'reject', requestId: string, employeeName: string) => {
    if (action === 'approve') {
      approveLeaveRequest(requestId, 'HR Manager', 'Approved via Quick Actions');
      toast({
        title: "Leave Request Approved",
        description: `${employeeName}'s leave request has been approved.`,
      });
    } else {
      rejectLeaveRequest(requestId, 'HR Manager', 'Rejected via Quick Actions - needs more information');
      toast({
        title: "Leave Request Rejected",
        description: `${employeeName}'s leave request has been rejected.`,
        variant: "destructive"
      });
    }
  };

  const handleGenerateReport = (reportParams: any) => {
    if (!reportParams.reportType) {
      toast({
        title: "Validation Error",
        description: "Please select a report type.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Report Generation Started",
      description: `${reportParams.reportType} is being generated. You will receive it shortly.`,
    });
  };

  const handleScheduleReview = (reviewForm: any, resetForm: () => void) => {
    if (!reviewForm.employee || !reviewForm.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please select an employee and due date.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Performance Review Scheduled",
      description: `Performance review has been scheduled for ${reviewForm.employee}.`,
    });

    // Reset form
    resetForm();
  };

  return {
    handleAddEmployee,
    handleProcessPayroll,
    handleLeaveAction,
    handleGenerateReport,
    handleScheduleReview
  };
};
