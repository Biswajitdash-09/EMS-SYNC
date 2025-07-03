
/**
 * Landing Page - Main Entry Point
 * Refactored into smaller, focused components for better maintainability
 */

import { useState } from 'react';
import AuthModal from '@/components/AuthModal';
import EmployeeAuthModal from '@/components/EmployeeAuthModal';
import LandingNavigation from '@/components/landing/LandingNavigation';
import LandingHero from '@/components/landing/LandingHero';
import LandingFeatures from '@/components/landing/LandingFeatures';
import LandingStats from '@/components/landing/LandingStats';
import LandingCTA from '@/components/landing/LandingCTA';
import LandingFooter from '@/components/landing/LandingFooter';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showEmployeeAuth, setShowEmployeeAuth] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <LandingNavigation 
        onShowAuth={() => setShowAuth(true)}
        onShowEmployeeAuth={() => setShowEmployeeAuth(true)}
      />
      
      <LandingHero 
        onShowAuth={() => setShowAuth(true)}
        onShowEmployeeAuth={() => setShowEmployeeAuth(true)}
      />
      
      <LandingFeatures />
      
      <LandingStats />
      
      <LandingCTA 
        onShowAuth={() => setShowAuth(true)}
        onShowEmployeeAuth={() => setShowEmployeeAuth(true)}
      />
      
      <LandingFooter />

      {/* Auth Modals */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
      <EmployeeAuthModal open={showEmployeeAuth} onClose={() => setShowEmployeeAuth(false)} />
    </div>
  );
};

export default Index;
