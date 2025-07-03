
/**
 * Landing Call-to-Action Section Component
 * Final CTA section with action buttons
 */

import { Button } from "@/components/ui/button";

interface LandingCTAProps {
  onShowAuth: () => void;
  onShowEmployeeAuth: () => void;
}

const LandingCTA = ({ onShowAuth, onShowEmployeeAuth }: LandingCTAProps) => {
  return (
    <section className="py-20 bg-gray-900 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your HR?</h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of companies already using our Employee Management System
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onShowAuth} 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Get Started Today
          </Button>
          <Button 
            onClick={onShowEmployeeAuth} 
            variant="outline" 
            size="lg" 
            className="px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 border-white text-white hover:bg-white hover:text-gray-900"
          >
            Employee Access
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingCTA;
