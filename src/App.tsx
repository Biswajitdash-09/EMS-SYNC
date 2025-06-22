
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import QuickActionsPage from "./pages/QuickActionsPage";
import EmployeeRecords from "./pages/EmployeeRecords";
import HRManagement from "./pages/HRManagement";
import PayrollSystem from "./pages/PayrollSystem";
import LeaveManagement from "./pages/LeaveManagement";
import PerformanceAnalytics from "./pages/PerformanceAnalytics";
import TimeTracking from "./pages/TimeTracking";
import ReportsAnalytics from "./pages/ReportsAnalytics";
import SystemSettings from "./pages/SystemSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="lovable-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quick-actions" element={<QuickActionsPage />} />
            <Route path="/employees" element={<EmployeeRecords />} />
            <Route path="/hr" element={<HRManagement />} />
            <Route path="/payroll" element={<PayrollSystem />} />
            <Route path="/leave" element={<LeaveManagement />} />
            <Route path="/performance" element={<PerformanceAnalytics />} />
            <Route path="/time-tracking" element={<TimeTracking />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/settings" element={<SystemSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
