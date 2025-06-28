
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Shield, Users, Building, Bell, Palette, Download, Upload, Trash2, Edit, Save, Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Company Settings State
  const [companyData, setCompanyData] = useState({
    name: 'EMP SYNC Inc.',
    address: '123 Business Street, City, State 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@empsync.com',
    website: 'https://www.empsync.com',
    industry: 'Technology',
    timezone: 'UTC-8',
    currency: 'USD'
  });

  // Notification Settings State
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [notificationTypes, setNotificationTypes] = useState({
    leaveRequests: true,
    payrollProcessing: true,
    performanceReviews: true,
    attendanceAlerts: false,
    newEmployeeOnboarding: true,
    policyUpdates: true,
    systemMaintenance: true,
    birthdayReminders: false
  });

  // Appearance Settings State
  const [darkMode, setDarkMode] = useState(false);
  const [selectedColorScheme, setSelectedColorScheme] = useState('blue');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Backup Settings State
  const [backupSettings, setBackupSettings] = useState({
    dailyBackups: true,
    weeklyFullBackup: true,
    cloudStorage: false,
    retentionDays: 30
  });

  // User Roles State
  const [userRoles, setUserRoles] = useState([
    { id: 1, name: 'Super Admin', users: 2, permissions: 'Full system access', editable: false },
    { id: 2, name: 'HR Manager', users: 5, permissions: 'HR and employee management', editable: true },
    { id: 3, name: 'Payroll Manager', users: 3, permissions: 'Payroll and financial data', editable: true },
    { id: 4, name: 'Department Manager', users: 12, permissions: 'Department-specific access', editable: true },
    { id: 5, name: 'Employee', users: 1226, permissions: 'Personal data access only', editable: true }
  ]);

  // Integrations State
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Slack', status: 'Connected', description: 'Team communication and notifications', config: {} },
    { id: 2, name: 'Google Workspace', status: 'Connected', description: 'Calendar and email integration', config: {} },
    { id: 3, name: 'Zoom', status: 'Disconnected', description: 'Video conferencing for meetings', config: {} },
    { id: 4, name: 'Microsoft Teams', status: 'Disconnected', description: 'Collaboration and meetings', config: {} }
  ]);

  // Loading States
  const [isExporting, setIsExporting] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Company Settings Handlers
  const handleCompanyDataChange = (field: string, value: string) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveCompanyData = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Company information saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save company information.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Export Settings Handler
  const handleExportSettings = async () => {
    setIsExporting(true);
    try {
      const settings = {
        company: companyData,
        notifications: { email: emailNotifications, sms: smsNotifications, types: notificationTypes },
        appearance: { darkMode, colorScheme: selectedColorScheme },
        backup: backupSettings,
        roles: userRoles,
        integrations: integrations,
        exportedAt: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `empsync-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Export Complete",
        description: "Settings have been exported successfully.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export settings.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Notification Handlers
  const handleNotificationTypeChange = (type: string, value: boolean) => {
    setNotificationTypes(prev => ({ ...prev, [type]: value }));
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast({
        title: "Notifications Updated",
        description: "Notification preferences saved successfully.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Role Management Handlers
  const handleDeleteRole = (roleId: number) => {
    const role = userRoles.find(r => r.id === roleId);
    if (role && !role.editable) {
      toast({
        title: "Cannot Delete",
        description: "This system role cannot be deleted.",
        variant: "destructive",
      });
      return;
    }
    
    setUserRoles(prev => prev.filter(role => role.id !== roleId));
    toast({
      title: "Role Deleted",
      description: "User role has been deleted successfully.",
    });
  };

  const handleCreateRole = () => {
    const newRole = {
      id: Math.max(...userRoles.map(r => r.id)) + 1,
      name: 'New Role',
      users: 0,
      permissions: 'Custom permissions',
      editable: true
    };
    setUserRoles(prev => [...prev, newRole]);
    toast({
      title: "Role Created",
      description: "New user role has been created.",
    });
  };

  // Integration Handlers
  const handleToggleIntegration = (integrationId: number) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, status: integration.status === 'Connected' ? 'Disconnected' : 'Connected' }
        : integration
    ));
    
    const integration = integrations.find(i => i.id === integrationId);
    const newStatus = integration?.status === 'Connected' ? 'Disconnected' : 'Connected';
    
    toast({
      title: `Integration ${newStatus}`,
      description: `${integration?.name} has been ${newStatus.toLowerCase()}.`,
    });
  };

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

  // Backup Handlers
  const handleBackupSettingChange = (setting: string, value: boolean | number) => {
    setBackupSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleCreateBackup = async () => {
    setIsBackingUp(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Backup Created",
        description: "System backup has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Backup Failed",
        description: "Failed to create system backup.",
        variant: "destructive",
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestoreBackup = () => {
    toast({
      title: "Restore Initiated",
      description: "Backup restoration process has been started.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <Settings className="w-6 h-6 text-gray-600" />
                <h1 className="text-xl font-bold text-gray-900">System Settings</h1>
              </div>
            </div>
            <Button 
              className="bg-gray-600 hover:bg-gray-700" 
              onClick={handleExportSettings}
              disabled={isExporting}
            >
              {isExporting ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              {isExporting ? 'Exporting...' : 'Export Settings'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  Company Profile Setup
                </CardTitle>
                <CardDescription>Configure your organization's basic information and settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={companyData.name}
                        onChange={(e) => handleCompanyDataChange('name', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea 
                        id="address" 
                        value={companyData.address}
                        onChange={(e) => handleCompanyDataChange('address', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={companyData.phone}
                        onChange={(e) => handleCompanyDataChange('phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={companyData.email}
                        onChange={(e) => handleCompanyDataChange('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={companyData.website}
                        onChange={(e) => handleCompanyDataChange('website', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select value={companyData.industry} onValueChange={(value) => handleCompanyDataChange('industry', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select value={companyData.timezone} onValueChange={(value) => handleCompanyDataChange('timezone', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                          <SelectItem value="UTC-7">UTC-7 (Mountain Time)</SelectItem>
                          <SelectItem value="UTC-6">UTC-6 (Central Time)</SelectItem>
                          <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                          <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                          <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Select value={companyData.currency} onValueChange={(value) => handleCompanyDataChange('currency', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                          <SelectItem value="CAD">CAD (C$)</SelectItem>
                          <SelectItem value="AUD">AUD (A$)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={handleSaveCompanyData}
                  disabled={isSaving}
                  className="w-full md:w-auto"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Company Information
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  User Roles and Permissions
                </CardTitle>
                <CardDescription>Manage user access levels and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRoles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-gray-600">{role.permissions}</p>
                        <p className="text-xs text-gray-500">{role.users} user(s) assigned</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        {role.editable && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteRole(role.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4" onClick={handleCreateRole}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Role
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure system notifications and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-600">Receive important updates via email</p>
                    </div>
                    <Switch 
                      checked={emailNotifications} 
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-gray-600">Receive urgent alerts via SMS</p>
                    </div>
                    <Switch 
                      checked={smsNotifications} 
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold">Notification Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      {Object.entries(notificationTypes).slice(0, 4).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <Switch 
                            checked={value} 
                            onCheckedChange={(checked) => handleNotificationTypeChange(key, checked)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {Object.entries(notificationTypes).slice(4).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <Switch 
                            checked={value} 
                            onCheckedChange={(checked) => handleNotificationTypeChange(key, checked)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleSaveNotifications} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Notification Settings
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Settings</CardTitle>
                <CardDescription>Connect with third-party tools and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={integration.status === 'Connected' ? 'default' : 'secondary'}
                          className={integration.status === 'Connected' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {integration.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={integration.status === 'Connected' ? 'text-red-600' : 'text-blue-600'}
                          onClick={() => handleToggleIntegration(integration.id)}
                        >
                          {integration.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">API Access</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    Configure API keys and webhooks for custom integrations
                  </p>
                  <Button variant="outline" size="sm">
                    Manage API Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
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
          </TabsContent>

          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Restore</CardTitle>
                <CardDescription>Manage system backups and data restoration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Automatic Backups</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Daily Backups</span>
                        <Switch 
                          checked={backupSettings.dailyBackups} 
                          onCheckedChange={(checked) => handleBackupSettingChange('dailyBackups', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly Full Backup</span>
                        <Switch 
                          checked={backupSettings.weeklyFullBackup} 
                          onCheckedChange={(checked) => handleBackupSettingChange('weeklyFullBackup', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cloud Storage</span>
                        <Switch 
                          checked={backupSettings.cloudStorage} 
                          onCheckedChange={(checked) => handleBackupSettingChange('cloudStorage', checked)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="retention">Backup Retention (days)</Label>
                      <Input 
                        id="retention" 
                        value={backupSettings.retentionDays} 
                        type="number" 
                        min="1"
                        max="365"
                        onChange={(e) => handleBackupSettingChange('retentionDays', parseInt(e.target.value) || 30)}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Manual Operations</h4>
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        onClick={handleCreateBackup}
                        disabled={isBackingUp}
                      >
                        {isBackingUp ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Creating Backup...
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Create Backup Now
                          </>
                        )}
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleRestoreBackup}>
                        <Upload className="w-4 h-4 mr-2" />
                        Restore from Backup
                      </Button>
                      <Button variant="outline" className="w-full" onClick={handleExportSettings}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Recent Backups</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Full System Backup</h5>
                        <p className="text-sm text-gray-600">June 21, 2024 at 2:00 AM</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        <Button variant="outline" size="sm" onClick={handleRestoreBackup}>
                          Restore
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Daily Incremental Backup</h5>
                        <p className="text-sm text-gray-600">June 20, 2024 at 11:30 PM</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        <Button variant="outline" size="sm" onClick={handleRestoreBackup}>
                          Restore
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemSettings;
