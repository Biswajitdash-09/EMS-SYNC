
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Settings, Shield, Users, Building, Bell, Palette, Download, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SystemSettings = () => {
  const navigate = useNavigate();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const userRoles = [
    { id: 1, name: 'Super Admin', users: 2, permissions: 'Full system access' },
    { id: 2, name: 'HR Manager', users: 5, permissions: 'HR and employee management' },
    { id: 3, name: 'Payroll Manager', users: 3, permissions: 'Payroll and financial data' },
    { id: 4, name: 'Department Manager', users: 12, permissions: 'Department-specific access' },
    { id: 5, name: 'Employee', users: 1226, permissions: 'Personal data access only' }
  ];

  const integrations = [
    { name: 'Slack', status: 'Connected', description: 'Team communication and notifications' },
    { name: 'Google Workspace', status: 'Connected', description: 'Calendar and email integration' },
    { name: 'Zoom', status: 'Disconnected', description: 'Video conferencing for meetings' },
    { name: 'Microsoft Teams', status: 'Disconnected', description: 'Collaboration and meetings' }
  ];

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
            <Button className="bg-gray-600 hover:bg-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export Settings
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
                      <Input id="companyName" defaultValue="EMP SYNC Inc." />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Business Street, City, State 12345" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" defaultValue="contact@empsync.com" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://www.empsync.com" />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Input id="industry" defaultValue="Technology" />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input id="timezone" defaultValue="UTC-8 (Pacific Time)" />
                    </div>
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <Input id="currency" defaultValue="USD ($)" />
                    </div>
                  </div>
                </div>
                <Button>Save Company Information</Button>
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
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="mt-4">
                  <Users className="w-4 h-4 mr-2" />
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
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Leave Requests</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Payroll Processing</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Performance Reviews</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Attendance Alerts</span>
                        <Switch />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">New Employee Onboarding</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Policy Updates</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">System Maintenance</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Birthday Reminders</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
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
                  {integrations.map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
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
                    <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-2"></div>
                      <span className="text-sm">Blue</span>
                    </div>
                    <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-2"></div>
                      <span className="text-sm">Green</span>
                    </div>
                    <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-purple-500 rounded mx-auto mb-2"></div>
                      <span className="text-sm">Purple</span>
                    </div>
                    <div className="p-4 border rounded-lg text-center cursor-pointer hover:bg-gray-50">
                      <div className="w-8 h-8 bg-orange-500 rounded mx-auto mb-2"></div>
                      <span className="text-sm">Orange</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Logo & Branding</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="logo">Company Logo</Label>
                      <Input id="logo" type="file" />
                    </div>
                    <div>
                      <Label htmlFor="favicon">Favicon</Label>
                      <Input id="favicon" type="file" />
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
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Weekly Full Backup</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Cloud Storage</span>
                        <Switch />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="retention">Backup Retention (days)</Label>
                      <Input id="retention" defaultValue="30" type="number" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Manual Operations</h4>
                    <div className="space-y-3">
                      <Button className="w-full">
                        <Download className="w-4 h-4 mr-2" />
                        Create Backup Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Upload className="w-4 h-4 mr-2" />
                        Restore from Backup
                      </Button>
                      <Button variant="outline" className="w-full">
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
                        <Button variant="outline" size="sm">Restore</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Daily Incremental Backup</h5>
                        <p className="text-sm text-gray-600">June 20, 2024 at 11:30 PM</p>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-green-100 text-green-800">Completed</Badge>
                        <Button variant="outline" size="sm">Restore</Button>
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
