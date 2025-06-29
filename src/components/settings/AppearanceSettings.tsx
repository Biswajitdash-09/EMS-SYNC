
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from '@/components/ThemeProvider';

interface AppearanceSettingsProps {
  initialColorScheme?: string;
}

const AppearanceSettings = ({ 
  initialColorScheme = 'blue'
}: AppearanceSettingsProps) => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  // Appearance Settings State
  const [selectedColorScheme, setSelectedColorScheme] = useState(initialColorScheme);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Check if dark mode is currently active
  const isDarkMode = theme === 'dark';

  // Dark Mode Handler
  const handleDarkModeToggle = (checked: boolean) => {
    const newTheme = checked ? 'dark' : 'light';
    setTheme(newTheme);
    toast({
      title: "Theme Updated",
      description: `Switched to ${checked ? 'dark' : 'light'} mode successfully.`,
    });
  };

  // Enhanced Color Scheme Handler
  const handleColorSchemeChange = (color: string) => {
    setSelectedColorScheme(color);
    
    // Apply enhanced color scheme to CSS variables
    const root = document.documentElement;
    const colorSchemes = {
      blue: {
        primary: '221.2 83.2% 53.3%',
        primaryForeground: '210 40% 98%',
        accent: '210 40% 96.1%',
        accentForeground: '221.2 83.2% 53.3%',
        ring: '221.2 83.2% 53.3%'
      },
      green: {
        primary: '142 76% 36%',
        primaryForeground: '355 100% 97%',
        accent: '142 76% 96%',
        accentForeground: '142 76% 36%',
        ring: '142 76% 36%'
      },
      purple: {
        primary: '262 83% 58%',
        primaryForeground: '210 40% 98%',
        accent: '262 83% 96%',
        accentForeground: '262 83% 58%',
        ring: '262 83% 58%'
      },
      orange: {
        primary: '25 95% 53%',
        primaryForeground: '210 40% 98%',
        accent: '25 95% 96%',
        accentForeground: '25 95% 53%',
        ring: '25 95% 53%'
      },
      pink: {
        primary: '330 81% 60%',
        primaryForeground: '210 40% 98%',
        accent: '330 81% 96%',
        accentForeground: '330 81% 60%',
        ring: '330 81% 60%'
      },
      teal: {
        primary: '173 80% 40%',
        primaryForeground: '210 40% 98%',
        accent: '173 80% 96%',
        accentForeground: '173 80% 40%',
        ring: '173 80% 40%'
      }
    };

    const scheme = colorSchemes[color as keyof typeof colorSchemes];
    if (scheme) {
      root.style.setProperty('--primary', scheme.primary);
      root.style.setProperty('--primary-foreground', scheme.primaryForeground);
      root.style.setProperty('--accent', scheme.accent);
      root.style.setProperty('--accent-foreground', scheme.accentForeground);
      root.style.setProperty('--ring', scheme.ring);
      root.style.setProperty('--sidebar-primary', scheme.primary);
      root.style.setProperty('--sidebar-ring', scheme.ring);
    }

    toast({
      title: "Color Scheme Updated",
      description: `Color scheme changed to ${color} with enhanced theming.`,
    });
  };

  // Enhanced File Upload Handler
  const handleFileUpload = (type: 'logo' | 'favicon', file: File | null) => {
    if (type === 'logo') setLogoFile(file);
    if (type === 'favicon') setFaviconFile(file);
    
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${type} file uploaded successfully. Changes will be applied.`,
      });
    }
  };

  return (
    <Card className="card-enhanced">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 font-playfair">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-xl flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary-foreground" />
          </div>
          Theme Customization
        </CardTitle>
        <CardDescription className="text-muted-foreground font-inter">
          Customize the appearance and visual identity of your EMP SYNC system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Dark Mode Toggle */}
        <div className="glass-effect p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="font-playfair font-semibold text-foreground">Dark Mode</h4>
              <p className="text-sm text-muted-foreground font-inter">
                Toggle between light and dark theme for better visual comfort
              </p>
            </div>
            <Switch 
              checked={isDarkMode} 
              onCheckedChange={handleDarkModeToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
        
        {/* Enhanced Color Scheme Selection */}
        <div className="space-y-6">
          <div>
            <h4 className="font-playfair font-semibold text-foreground mb-2">Color Scheme</h4>
            <p className="text-sm text-muted-foreground font-inter mb-4">
              Choose your preferred color theme for the interface
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'blue', color: 'bg-blue-500', label: 'Ocean Blue' },
              { name: 'green', color: 'bg-green-500', label: 'Forest Green' },
              { name: 'purple', color: 'bg-purple-500', label: 'Royal Purple' },
              { name: 'orange', color: 'bg-orange-500', label: 'Sunset Orange' },
              { name: 'pink', color: 'bg-pink-500', label: 'Rose Pink' },
              { name: 'teal', color: 'bg-teal-500', label: 'Ocean Teal' }
            ].map((scheme) => (
              <div 
                key={scheme.name}
                className={`p-6 glass-effect rounded-xl text-center cursor-pointer hover-lift transition-all duration-300 ${
                  selectedColorScheme === scheme.name ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
                onClick={() => handleColorSchemeChange(scheme.name)}
              >
                <div className={`w-12 h-12 ${scheme.color} rounded-xl mx-auto mb-3 shadow-lg`}></div>
                <span className="text-sm font-medium font-inter text-foreground">{scheme.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Logo & Branding Section */}
        <div className="space-y-6">
          <div>
            <h4 className="font-playfair font-semibold text-foreground mb-2">Logo & Branding</h4>
            <p className="text-sm text-muted-foreground font-inter">
              Upload your company logo and favicon to personalize your system
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-effect p-6 rounded-xl space-y-4">
              <Label htmlFor="logo" className="font-inter font-medium text-foreground">Company Logo</Label>
              <Input 
                id="logo" 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload('logo', e.target.files?.[0] || null)}
                className="input-enhanced"
              />
              {logoFile && (
                <p className="text-sm text-green-600 dark:text-green-400 font-inter">
                  ✓ File uploaded: {logoFile.name}
                </p>
              )}
              <p className="text-xs text-muted-foreground font-inter">
                Recommended: PNG or SVG, max 2MB
              </p>
            </div>
            <div className="glass-effect p-6 rounded-xl space-y-4">
              <Label htmlFor="favicon" className="font-inter font-medium text-foreground">Favicon</Label>
              <Input 
                id="favicon" 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload('favicon', e.target.files?.[0] || null)}
                className="input-enhanced"
              />
              {faviconFile && (
                <p className="text-sm text-green-600 dark:text-green-400 font-inter">
                  ✓ File uploaded: {faviconFile.name}
                </p>
              )}
              <p className="text-xs text-muted-foreground font-inter">
                Recommended: ICO or PNG, 32x32px
              </p>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="glass-effect p-6 rounded-xl">
          <h4 className="font-playfair font-semibold text-foreground mb-4">Preview</h4>
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h5 className="font-playfair font-semibold text-foreground">EMP SYNC</h5>
              <p className="text-sm text-muted-foreground font-inter">
                {selectedColorScheme.charAt(0).toUpperCase() + selectedColorScheme.slice(1)} theme • {theme} mode
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
