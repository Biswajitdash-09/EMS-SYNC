
import AddEmployeeForm from "./AddEmployeeForm";
import ProcessPayrollForm from "./ProcessPayrollForm";
import LeaveRequestsForm from "./LeaveRequestsForm";
import GenerateReportForm from "./GenerateReportForm";
import PerformanceReviewForm from "./PerformanceReviewForm";

interface QuickActionFormRendererProps {
  activeAction: string;
  employeeForm: any;
  reportParams: any;
  reviewForm: any;
  onEmployeeFormChange: (updates: any) => void;
  onReportParamsChange: (updates: any) => void;
  onReviewFormChange: (updates: any) => void;
  onAddEmployee: () => void;
  onProcessPayroll: () => void;
  onLeaveAction: (action: 'approve' | 'reject', requestId: string, employeeName: string) => void;
  onGenerateReport: () => void;
  onScheduleReview: () => void;
  onCancel: () => void;
}

const QuickActionFormRenderer = ({
  activeAction,
  employeeForm,
  reportParams,
  reviewForm,
  onEmployeeFormChange,
  onReportParamsChange,
  onReviewFormChange,
  onAddEmployee,
  onProcessPayroll,
  onLeaveAction,
  onGenerateReport,
  onScheduleReview,
  onCancel
}: QuickActionFormRendererProps) => {
  switch (activeAction) {
    case 'add-employee':
      return (
        <AddEmployeeForm
          employeeForm={employeeForm}
          onFormChange={onEmployeeFormChange}
          onSubmit={onAddEmployee}
          onCancel={onCancel}
        />
      );
    case 'process-payroll':
      return (
        <ProcessPayrollForm
          onSubmit={onProcessPayroll}
          onCancel={onCancel}
        />
      );
    case 'leave-requests':
      return (
        <LeaveRequestsForm
          onLeaveAction={onLeaveAction}
          onCancel={onCancel}
        />
      );
    case 'generate-report':
      return (
        <GenerateReportForm
          reportParams={reportParams}
          onParamsChange={onReportParamsChange}
          onSubmit={onGenerateReport}
          onCancel={onCancel}
        />
      );
    case 'performance-review':
      return (
        <PerformanceReviewForm
          reviewForm={reviewForm}
          onFormChange={onReviewFormChange}
          onSubmit={onScheduleReview}
          onCancel={onCancel}
        />
      );
    default:
      return null;
  }
};

export default QuickActionFormRenderer;
