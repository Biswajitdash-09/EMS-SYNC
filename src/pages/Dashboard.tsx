
import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import ModulesGrid from '@/components/dashboard/ModulesGrid';
import RecentActivities from '@/components/dashboard/RecentActivities';
import QuickActions from '@/components/dashboard/QuickActions';
import AIChatbot from '@/components/dashboard/AIChatbot';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ModulesGrid />
          </div>

          <div>
            <RecentActivities />
          </div>
        </div>

        <QuickActions />
      </div>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
};

export default Dashboard;
