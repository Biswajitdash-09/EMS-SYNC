
/**
 * Landing Footer Component
 * Footer with links and company information
 */

import { Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">EMP SYNC</span>
            </div>
            <p className="text-sm">The most advanced employee management system for modern businesses.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/employees')} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => navigate('/settings')} className="hover:text-white transition-colors">Security</button></li>
              <li><button onClick={() => navigate('/settings')} className="hover:text-white transition-colors">Integrations</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">About</button></li>
              <li><button onClick={() => navigate('/hr')} className="hover:text-white transition-colors">Careers</button></li>
              <li><button onClick={() => navigate('/reports')} className="hover:text-white transition-colors">Blog</button></li>
              <li><button onClick={() => navigate('/hr')} className="hover:text-white transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors">Help Center</button></li>
              <li><button onClick={() => navigate('/reports')} className="hover:text-white transition-colors">Documentation</button></li>
              <li><button onClick={() => navigate('/settings')} className="hover:text-white transition-colors">API Reference</button></li>
              <li><button onClick={() => navigate('/hr')} className="hover:text-white transition-colors">Community</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          © 2025 EMP SYNC . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
