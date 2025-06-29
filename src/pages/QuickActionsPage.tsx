
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import QuickActionsGrid from "@/components/quick-actions/QuickActionsGrid";
import QuickActionFormRenderer from "@/components/quick-actions/QuickActionFormRenderer";
import { useQuickActionForms } from "@/hooks/useQuickActionForms";
import { useQuickActionHandlers } from "@/hooks/useQuickActionHandlers";

const QuickActionsPage = () => {
  const navigate = useNavigate();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  // Custom hooks for form state and handlers
  const {
    employeeForm,
    setEmployeeForm,
    reportParams,
    setReportParams,
    reviewForm,
    setReviewForm,
    resetEmployeeForm,
    resetReviewForm
  } = useQuickActionForms();

  const {
    handleAddEmployee,
    handleProcessPayroll,
    handleLeaveAction,
    handleGenerateReport,
    handleScheduleReview
  } = useQuickActionHandlers();

  // Action handlers that include form reset and navigation
  const onAddEmployee = () => {
    handleAddEmployee(employeeForm, resetEmployeeForm);
    setActiveAction(null);
  };

  const onProcessPayroll = () => {
    handleProcessPayroll();
    setActiveAction(null);
  };

  const onGenerateReport = () => {
    handleGenerateReport(reportParams);
    setActiveAction(null);
  };

  const onScheduleReview = () => {
    handleScheduleReview(reviewForm, resetReviewForm);
    setActiveAction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-gray-900">Quick Actions</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeAction ? (
          <div className="space-y-6">
            <QuickActionFormRenderer
              activeAction={activeAction}
              employeeForm={employeeForm}
              reportParams={reportParams}
              reviewForm={reviewForm}
              onEmployeeFormChange={setEmployeeForm}
              onReportParamsChange={setReportParams}
              onReviewFormChange={setReviewForm}
              onAddEmployee={onAddEmployee}
              onProcessPayroll={onProcessPayroll}
              onLeaveAction={handleLeaveAction}
              onGenerateReport={onGenerateReport}
              onScheduleReview={onScheduleReview}
              onCancel={() => setActiveAction(null)}
            />
          </div>
        ) : (
          <QuickActionsGrid onActionSelect={setActiveAction} />
        )}
      </div>
    </div>
  );
};

export default QuickActionsPage;
