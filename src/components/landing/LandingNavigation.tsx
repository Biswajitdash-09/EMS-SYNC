
/**
 * Landing Navigation Component
 * Navigation header for the landing page
 */

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Users } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

interface LandingNavigationProps {
  onShowAuth: () => void;
  onShowEmployeeAuth: () => void;
}

const LandingNavigation = ({ onShowAuth, onShowEmployeeAuth }: LandingNavigationProps) => {
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">EMP SYNC</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              onClick={onShowEmployeeAuth} 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Employee Login
            </Button>
            <Button 
              onClick={onShowAuth} 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
            >
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavigation;
