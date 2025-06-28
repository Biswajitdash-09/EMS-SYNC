
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Palette } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface AppearanceSettingsProps {
  initialDarkMode?: boolean;
  initialColorScheme?: string;
}

const AppearanceSettings = ({ 
  initialDarkMode = false,
  initialColorScheme = 'blue'
}: AppearanceSettingsProps) => {
  const { toast } = useToast();
  
  // Appearance Settings State
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [selectedColorScheme, setSelectedColorScheme] = useState(initialColorScheme);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Appearance Handlers
  const handleColorSchemeChange = (color: string) => {
    setSelectedColorScheme(color);
    toast({
      title: "Color Scheme Updated",
      description: `Color scheme changed to ${color}.`,
    });
  };

  const handleFileUpload = (type: 'logo' | 'favicon', file: File | null) => {
    if (type === 'logo') setLogoFile(file);
    if (type === 'favicon') setFaviconFile(file);
    
    if (file) {
      toast({
        title: "File Uploaded",
        description: `${type} file uploaded successfully.`,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Customization
        </CardTitle>
        <CardDescription>Customize the appearance of your EMP SYNC system</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Dark Mode</h4>
              <p className="text-sm text-gray-600">Switch to dark theme</p>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold">Color Scheme</h4>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'blue', color: 'bg-blue-500' },
              { name: 'green', color: 'bg-green-500' },
              { name: 'purple', color: 'bg-purple-500' },
              { name: 'orange', color: 'bg-orange-500' }
            ].map((scheme) => (
              <div 
                key={scheme.name}
                className={`p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50 ${
                  selectedColorScheme === scheme.name ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => handleColorSchemeChange(scheme.name)}
              >
                <div className={`w-8 h-8 ${scheme.color} rounded mx-auto mb-2`}></div>
                <span className="text-sm capitalize">{scheme.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Logo & Branding</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <Input 
                id="logo" 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload('logo', e.target.files?.[0] || null)}
              />
              {logoFile && (
                <p className="text-sm text-green-600 mt-1">File uploaded: {logoFile.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="favicon">Favicon</Label>
              <Input 
                id="favicon" 
                type="file" 
                accept="image/*"
                onChange={(e) => handleFileUpload('favicon', e.target.files?.[0] || null)}
              />
              {faviconFile && (
                <p className="text-sm text-green-600 mt-1">File uploaded: {faviconFile.name}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
