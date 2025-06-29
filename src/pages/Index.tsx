
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
    description: "Comprehensive employee database with detailed profiles and advanced search capabilities"
  }, {
    icon: Shield,
    title: "HR Management",
    description: "Complete HR workflow and policy management with automated compliance tracking"
  }, {
    icon: DollarSign,
    title: "Payroll System",
    description: "Automated payroll processing with tax calculations and direct deposit integration"
  }, {
    icon: Calendar,
    title: "Leave Management",
    description: "Streamlined leave tracking with approval workflows and balance management"
  }, {
    icon: FileText,
    title: "Performance Analytics",
    description: "Advanced performance monitoring with KPI tracking and review automation"
  }, {
    icon: Clock,
    title: "Time Tracking",
    description: "Precise time and attendance management with overtime calculations"
  }, {
    icon: BarChart3,
    title: "Reports & Analytics",
    description: "Comprehensive reporting suite with real-time analytics and custom dashboards"
  }, {
    icon: Settings,
    title: "System Administration",
    description: "Complete system configuration with role-based access and security controls"
  }];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Enhanced Navigation */}
      <nav className="glass-effect sticky top-0 z-50 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold font-playfair text-foreground">EMP SYNC</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => setShowAuth(true)} 
                className="btn-premium"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="inline-flex items-center px-6 py-3 glass-effect rounded-full text-primary font-medium mb-8 animate-bounce-in">
              <Shield className="w-5 h-5 mr-2" />
              Next Generation Employee Management
            </div>
            <h1 className="font-playfair font-bold text-foreground mb-8 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Modern
              <span className="gradient-text"> Employee </span>
              Management System
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-4xl mx-auto leading-relaxed font-inter animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Streamline your HR operations with our comprehensive employee management platform. 
              From hiring to retirement, manage your workforce efficiently with advanced analytics, 
              automated workflows, and intelligent insights that drive business success.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button 
                onClick={() => setShowAuth(true)} 
                size="lg" 
                className="btn-premium text-lg px-8 py-4 shadow-premium"
              >
                Start Free Trial
              </Button>
              <Button 
                onClick={() => navigate('/dashboard')} 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 glass-effect hover-lift border-border/50"
              >
                View Demo
              </Button>
            </div>
          </div>
        </div>
        
        {/* Enhanced animated background elements */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-playfair font-bold text-foreground mb-6 animate-fade-in-up">Complete HR Solution</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-inter animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Everything you need to manage your workforce efficiently in one integrated platform with 
              enterprise-grade security and scalability.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                className="group card-enhanced p-8 hover-lift hover-glow animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-playfair font-semibold text-foreground mb-4 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-inter text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-24 animated-gradient text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            {[
              { number: "10,000+", label: "Companies Trust Us" },
              { number: "500K+", label: "Employees Managed" },
              { number: "99.9%", label: "Uptime Guarantee" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <div key={stat.label} className="animate-bounce-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="font-playfair font-bold text-5xl mb-3">{stat.number}</div>
                <div className="font-inter text-primary-foreground/80 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair font-bold text-white mb-8 animate-fade-in-up">Ready to Transform Your HR?</h2>
          <p className="text-xl text-slate-300 mb-10 leading-relaxed font-inter animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Join thousands of companies already using our Employee Management System to streamline 
            their operations and boost productivity.
          </p>
          <Button 
            onClick={() => setShowAuth(true)} 
            size="lg" 
            className="btn-premium text-lg px-10 py-4 shadow-premium-lg animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-950 dark:bg-black text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold font-playfair text-white">EMP SYNC</span>
              </div>
              <p className="font-inter leading-relaxed text-slate-400">
                The most advanced employee management system for modern businesses. 
                Trusted by companies worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-white mb-6 text-lg">Product</h4>
              <ul className="space-y-3 font-inter">
                <li><button onClick={() => navigate('/employees')} className="hover:text-white transition-colors duration-200">Features</button></li>
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors duration-200">Pricing</button></li>
                <li><button onClick={() => navigate('/settings')} className="hover:text-white transition-colors duration-200">Security</button></li>
                <li><button onClick={() => navigate('/settings')} className="hover:text-white transition-colors duration-200">Integrations</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-3 font-inter">
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors duration-200">About</button></li>
                <li><button onClick={() => navigate('/hr')} className="hover:text-white transition-colors duration-200">Careers</button></li>
                <li><button onClick={() => navigate('/reports')} className="hover:text-white transition-colors duration-200">Blog</button></li>
                <li><button onClick={() => navigate('/hr')} className="hover:text-white transition-colors duration-200">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-playfair font-semibold text-white mb-6 text-lg">Support</h4>
              <ul className="space-y-3 font-inter">
                <li><button onClick={() => navigate('/dashboard')} className="hover:text-white transition-colors duration-200">Help Center</button></li>
                <li><button onClick={() => navigate('/reports')} className="hover:text-white transition-colors duration-200">Documentation</button></li>
                <li><button onClick={() => navigate('/settings')} className="hover:text-white transition-colors duration-200">API Reference</button></li>
                <li><button onClick={() => navigate('/hr')} className="hover:text-white transition-colors duration-200">Community</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center font-inter">
            <p className="text-slate-500">© 2025 EMP SYNC. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
};

export default Index;
