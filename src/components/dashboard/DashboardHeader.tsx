
/**
 * Dashboard Header Component
 * Top navigation bar with search, notifications, and user actions
 * Includes AI chatbot integration and theme toggle
 */

import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import { useState } from 'react';
import AIChatbot from './AIChatbot';
import DashboardHeaderLogo from './DashboardHeaderLogo';
import DashboardHeaderSearch from './DashboardHeaderSearch';
import DashboardHeaderNotifications from './DashboardHeaderNotifications';
import DashboardHeaderProfile from './DashboardHeaderProfile';

const DashboardHeader = () => {
  // Control AI chatbot modal visibility
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      {/* Main header navigation */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Company logo and branding */}
            <DashboardHeaderLogo />

            {/* Right side navigation tools */}
            <div className="flex items-center space-x-4">
              {/* Global search functionality */}
              <DashboardHeaderSearch />
              
              {/* Dark/light mode toggle */}
              <ThemeToggle />

              {/* AI Assistant access button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsChatbotOpen(true)}
                className="relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0"
              >
                <Bot className="w-4 h-4 text-white" />
              </Button>
              
              {/* System notifications */}
              <DashboardHeaderNotifications />

              {/* User profile menu */}
              <DashboardHeaderProfile />
            </div>
          </div>
        </div>
      </header>

      {/* AI Chatbot Modal Overlay */}
      <AIChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default DashboardHeader;
