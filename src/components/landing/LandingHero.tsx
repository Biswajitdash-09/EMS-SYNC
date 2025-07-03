
/**
 * Landing Hero Section Component
 * Main hero section with animated background and CTAs
 */

import { Button } from "@/components/ui/button";
import { Shield } from 'lucide-react';

interface LandingHeroProps {
  onShowAuth: () => void;
  onShowEmployeeAuth: () => void;
}

const LandingHero = ({ onShowAuth, onShowEmployeeAuth }: LandingHeroProps) => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full text-blue-800 dark:text-blue-200 text-sm font-medium mb-6 animate-scale-in">
            <Shield className="w-4 h-4 mr-2" />
            Next Generation Employee Management
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Modern
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Employee </span>
            Management System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Streamline your HR operations with our comprehensive employee management platform. 
            From hiring to retirement, manage your workforce efficiently with advanced analytics and automation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onShowAuth} 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              Admin Portal
            </Button>
            <Button 
              onClick={onShowEmployeeAuth} 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 border-blue-300 dark:border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              Employee Portal
            </Button>
          </div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{
        animationDelay: '2s'
      }}></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{
        animationDelay: '4s'
      }}></div>
    </section>
  );
};

export default LandingHero;
