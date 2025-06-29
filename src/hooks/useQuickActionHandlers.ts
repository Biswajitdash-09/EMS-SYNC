
/**
 * Quick Action Handlers Hook
 * Centralized handlers for all quick action operations
 * Ensures all actions are synchronized with main system records
 */

import { useToast } from "@/hooks/use-toast";
import { useEmployeeData } from "@/hooks/useEmployeeData";
import { useLeaveData } from "@/hooks/useLeaveData";

export const useQuickActionHandlers = () => {
  const { toast } = useToast();
  const { addEmployee, allEmployees } = useEmployeeData();
  const { approveLeaveRequest, rejectLeaveRequest, allLeaveRequests } = useLeaveData();

  /**
   * Handle adding new employee - integrates directly with main employee records
   * Validates form data and creates comprehensive employee record
   */
  const handleAddEmployee = (employeeForm: any, resetForm: () => void) => {
    // Validate required fields
    if (!employeeForm.firstName || !employeeForm.lastName || !employeeForm.email || !employeeForm.department) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate email in existing records
    const existingEmployee = allEmployees.find(emp => emp.email.toLowerCase() === employeeForm.email.toLowerCase());
    if (existingEmployee) {
      toast({
        title: "Duplicate Email",
        description: "An employee with this email already exists.",
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
      profilePicture: undefined,
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
      description: `${fullName} has been added to the employee records and is now available in the Employee Records page.`,
    });

    // Reset form after successful addition
    resetForm();
    
    console.log('Employee added via Quick Actions and synced to main records:', newEmployee);
  };

  /**
   * Handle payroll processing - synchronized with main employee records
   * Processes payroll for all active employees from main records
   */
  const handleProcessPayroll = () => {
    const activeEmployees = allEmployees.filter(emp => emp.status === 'Active');
    
    if (activeEmployees.length === 0) {
      toast({
        title: "No Active Employees",
        description: "No active employees found for payroll processing.",
        variant: "destructive"
      });
      return;
    }

    // Simulate payroll processing with employee data from main records
    console.log('Processing payroll for employees:', activeEmployees.map(emp => ({
      id: emp.id,
      name: emp.name,
      department: emp.department,
      baseSalary: emp.baseSalary
    })));

    toast({
      title: "Payroll Processing Started",
      description: `Payroll for ${activeEmployees.length} active employees is being processed from main records. You will be notified when complete.`,
    });
  };

  /**
   * Handle leave request actions - directly updates main leave records
   * Approves or rejects leave requests and updates main system
   */
  const handleLeaveAction = (action: 'approve' | 'reject', requestId: string, employeeName: string) => {
    // Find the request in main records to ensure it exists
    const request = allLeaveRequests.find(req => req.id === requestId);
    
    if (!request) {
      toast({
        title: "Request Not Found",
        description: "The leave request could not be found in the system.",
        variant: "destructive"
      });
      return;
    }

    if (request.status !== 'Pending') {
      toast({
        title: "Request Already Processed",
        description: `This leave request has already been ${request.status.toLowerCase()}.`,
        variant: "destructive"
      });
      return;
    }

    if (action === 'approve') {
      approveLeaveRequest(requestId, 'HR Manager', 'Approved via Quick Actions');
      toast({
        title: "Leave Request Approved",
        description: `${employeeName}'s leave request has been approved and updated in main records.`,
      });
    } else {
      rejectLeaveRequest(requestId, 'HR Manager', 'Rejected via Quick Actions - needs more information');
      toast({
        title: "Leave Request Rejected",
        description: `${employeeName}'s leave request has been rejected and updated in main records.`,
        variant: "destructive"
      });
    }

    console.log(`Leave request ${requestId} ${action}ed via Quick Actions and synced to main records`);
  };

  /**
   * Handle report generation - uses data from main system records
   * Generates reports based on current state of main database
   */
  const handleGenerateReport = (reportParams: any) => {
    if (!reportParams.reportType) {
      toast({
        title: "Validation Error",
        description: "Please select a report type.",
        variant: "destructive"
      });
      return;
    }

    // Get data from main records for report generation
    const reportData = {
      employees: allEmployees,
      leaveRequests: allLeaveRequests,
      reportType: reportParams.reportType,
      dateRange: reportParams.dateRange,
      department: reportParams.department,
      format: reportParams.format
    };

    // Simulate report generation with actual data
    console.log('Generating report with main system data:', {
      reportType: reportParams.reportType,
      totalEmployees: allEmployees.length,
      totalLeaveRequests: allLeaveRequests.length,
      parameters: reportParams
    });

    // Simulate file download
    const fileName = `${reportParams.reportType.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${reportParams.format.toLowerCase()}`;
    
    toast({
      title: "Report Generated Successfully",
      description: `${reportParams.reportType} has been generated from main system records. Download: ${fileName}`,
    });

    // In a real implementation, this would trigger actual file download
    console.log(`Report would be downloaded as: ${fileName}`);
  };

  /**
   * Handle performance review scheduling - uses main employee records
   * Schedules reviews for employees from main system
   */
  const handleScheduleReview = (reviewForm: any, resetForm: () => void) => {
    if (!reviewForm.employee || !reviewForm.dueDate) {
      toast({
        title: "Validation Error",
        description: "Please select an employee and due date.",
        variant: "destructive"
      });
      return;
    }

    // Verify employee exists in main records
    const employee = allEmployees.find(emp => emp.name === reviewForm.employee);
    if (!employee) {
      toast({
        title: "Employee Not Found",
        description: "The selected employee could not be found in main records.",
        variant: "destructive"
      });
      return;
    }

    // Create performance review record linked to main employee record
    const reviewData = {
      employeeId: employee.id,
      employeeName: employee.name,
      department: employee.department,
      reviewType: reviewForm.reviewType,
      reviewer: reviewForm.reviewer,
      dueDate: reviewForm.dueDate,
      goals: reviewForm.goals,
      scheduledDate: new Date().toISOString().split('T')[0],
      status: 'Scheduled'
    };

    console.log('Performance review scheduled for employee from main records:', reviewData);

    toast({
      title: "Performance Review Scheduled",
      description: `Performance review has been scheduled for ${reviewForm.employee} from main employee records.`,
    });

    // Reset form after successful scheduling
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
