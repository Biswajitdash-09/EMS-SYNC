
/**
 * Main Dashboard Page Component
 * Central hub for the HR management system
 * Displays overview statistics, modules, and quick actions
 */

import { useState } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import ModulesGrid from '@/components/dashboard/ModulesGrid';
import RecentActivities from '@/components/dashboard/RecentActivities';
import QuickActions from '@/components/dashboard/QuickActions';

const Dashboard = () => {
  // Track active module for navigation
  const [activeModule, setActiveModule] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main navigation header */}
      <DashboardHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key performance indicators */}
        <StatsCards />

        {/* Main content grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary modules section */}
          <div className="lg:col-span-2">
            <ModulesGrid />
          </div>

          {/* Secondary activities sidebar */}
          <div>
            <RecentActivities />
          </div>
        </div>

        {/* Quick action buttons */}
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
