"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  MessageCircle, 
  MessagesSquare,
  Link2,
  CheckCircle,
  Clock,
  ExternalLink,
  Settings,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const integrations = [
  {
    id: "instagram",
    name: "Instagram",
    description: "Connect your Instagram Business or Creator account to automate DMs, comments, and story replies.",
    icon: Instagram,
    status: "disconnected",
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400",
    available: true,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Automate WhatsApp conversations with your customers using the WhatsApp Business API.",
    icon: MessageCircle,
    status: "coming_soon",
    color: "bg-green-500",
    available: false,
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    description: "Connect Facebook Messenger to handle customer inquiries and automate responses.",
    icon: MessagesSquare,
    status: "coming_soon",
    color: "bg-blue-600",
    available: false,
  },
];

export default function Integrations() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display">Integrations</h1>
          <p className="text-muted-foreground mt-1">
            Connect your social media accounts to start automating
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            const isConnected = integration.status === "connected";
            const isComingSoon = integration.status === "coming_soon";

            return (
              <Card key={integration.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${integration.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    {isConnected && (
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </Badge>
                    )}
                    {isComingSoon && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        <Clock className="h-3 w-3 mr-1" />
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardTitle>{integration.name}</CardTitle>
                  <CardDescription>{integration.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {isConnected ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className="font-medium text-green-600">Active</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                    </div>
                  ) : isComingSoon ? (
                    <Button disabled className="w-full" variant="outline">
                      Coming Soon
                    </Button>
                  ) : (
                    <Button className="w-full">
                      <Link2 className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your connected social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No accounts connected yet</p>
              <p className="text-sm mt-2">Connect an account to start automating</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

