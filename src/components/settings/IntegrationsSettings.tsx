
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Integration {
  id: number;
  name: string;
  status: 'Connected' | 'Disconnected';
  description: string;
  config: Record<string, any>;
}

interface IntegrationsSettingsProps {
  initialIntegrations?: Integration[];
}

const IntegrationsSettings = ({ initialIntegrations }: IntegrationsSettingsProps) => {
  const { toast } = useToast();
  
  // Integrations State
  const [integrations, setIntegrations] = useState<Integration[]>(initialIntegrations || [
    { id: 1, name: 'Slack', status: 'Connected', description: 'Team communication and notifications', config: {} },
    { id: 2, name: 'Google Workspace', status: 'Connected', description: 'Calendar and email integration', config: {} },
    { id: 3, name: 'Zoom', status: 'Disconnected', description: 'Video conferencing for meetings', config: {} },
    { id: 4, name: 'Microsoft Teams', status: 'Disconnected', description: 'Collaboration and meetings', config: {} }
  ]);

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

  return (
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
  );
};

export default IntegrationsSettings;
