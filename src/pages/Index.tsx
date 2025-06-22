import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Users, Shield, BarChart3, Calendar, FileText, Settings, DollarSign, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';
import ThemeToggle from '@/components/ThemeToggle';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const features = [{
    icon: Users,
    title: "Employee Records",
    description: "Comprehensive employee database with detailed profiles"
  }, {
    icon: Shield,
    title: "HR Management",
    description: "Complete HR workflow and policy management"
  }, {
    icon: DollarSign,
    title: "Payroll System",
    description: "Automated payroll processing and salary management"
  }, {
    icon: Calendar,
    title: "Leave Management",
    description: "Track and manage employee leave requests"
  }, {
    icon: FileText,
    title: "Performance Analytics",
    description: "Monitor and analyze employee performance metrics"
  }, {
    icon: Clock,
    title: "Time Tracking",
    description: "Accurate time and attendance management"
  }, {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Detailed reports and business intelligence"
  }, {
    icon: Settings,
    title: "System Administration",
    description: "Complete system configuration and management"
  }];
  
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Navigation */}
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
              <Button onClick={() => setShowAuth(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
              <Button onClick={() => setShowAuth(true)} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105">
                Start Free Trial
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline" size="lg" className="px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 border-gray-300 dark:border-gray-600">
                View Demo
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

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Complete HR Solution</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to manage your workforce efficiently in one integrated platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => <div key={feature.title} className="group p-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1" style={{
            animationDelay: `${index * 100}ms`
          }}>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[{
            number: "10,000+",
            label: "Companies Trust Us"
          }, {
            number: "500K+",
            label: "Employees Managed"
          }, {
            number: "99.9%",
            label: "Uptime Guarantee"
          }, {
            number: "24/7",
            label: "Customer Support"
          }].map((stat, index) => <div key={stat.label} className="text-white">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your HR?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of companies already using our Employee Management System
          </p>
          <Button onClick={() => setShowAuth(true)} size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
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
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">© 2025 EMP SYNC . All rights reserved.</div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>;
};

export default Index;
