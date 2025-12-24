"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { NumberTicker } from "@/components/ui/number-ticker";
import { 
  Zap, 
  Plus,
  Instagram,
  Crown,
  Users,
  TrendingUp
} from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { LimitReachedBanner } from "@/components/permissions/LimitReachedBanner";
import {
  Automation,
  STORE_KEYS,
  getInitialAutomations,
  loadData,
  saveData,
} from "@/lib/jsonStore";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function AutomationsList() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const { canCreateAutomation, getAutomationLimit, getPlanId } = usePermissions();
  const { toast } = useToast();
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const limits = getAutomationLimit();
  const planId = getPlanId();

  useEffect(() => {
    if (!user?.id) return;
    const allAutomations = loadData<Automation[]>(
      STORE_KEYS.automations,
      getInitialAutomations()
    );
    // Filter automations for current user
    const userAutomations = allAutomations.filter((a) => a.userId === user.id);
    setAutomations(userAutomations);
    setIsLoading(false);
  }, [user?.id]);

  const filteredAutomations = useMemo(
    () =>
      automations.filter((a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [automations, searchTerm]
  );

  const updateAutomations = (next: Automation[], message?: string) => {
    if (!user?.id) return;
    setAutomations(next);
    // Load all automations, update only current user's, save all
    const allAutomations = loadData<Automation[]>(
      STORE_KEYS.automations,
      getInitialAutomations()
    );
    const otherUsersAutomations = allAutomations.filter((a) => a.userId !== user.id);
    const updatedAll = [...otherUsersAutomations, ...next];
    saveData(STORE_KEYS.automations, updatedAll);
    if (message) toast({ title: message });
  };

  const handleToggle = (id: number, status: boolean) => {
    const updated = automations.map((a) =>
      a.id === id ? { ...a, status } : a
    );
    updateAutomations(updated);
  };

  const handleDelete = (id: number) => {
    const updated = automations.filter((a) => a.id !== id);
    updateAutomations(updated, "Automation deleted");
  };

  const canCreate = canCreateAutomation();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display">Automations</h1>
            <p className="text-muted-foreground mt-1">
              Manage your Instagram automation workflows
            </p>
          </div>
          {canCreate ? (
            <Link href="/dashboard/automations/new">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                New Automation
              </Button>
            </Link>
          ) : (
            <LimitReachedBanner />
          )}
        </div>

        {!canCreate && <LimitReachedBanner />}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Automations</p>
                <p className="text-2xl font-bold">
                  <NumberTicker value={automations.length} />
                </p>
              </div>
              <Zap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">
                  <NumberTicker value={automations.filter((a) => a.status).length} />
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">DMs Sent</p>
                <p className="text-2xl font-bold">
                  <NumberTicker value={automations.reduce((sum: number, a) => sum + a.dmsSent, 0)} />
                </p>
              </div>
              <Instagram className="h-8 w-8 text-pink-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Engagement</p>
                <p className="text-2xl font-bold">
                  <NumberTicker value={automations.reduce((sum: number, a) => sum + a.engaged, 0)} />
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Automations List */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading automations...</p>
          </div>
        ) : filteredAutomations.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border">
            <Zap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No automations found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try a different search term" : "Create your first automation to get started"}
            </p>
            {canCreate && (
              <Link href="/dashboard/automations/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Automation
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredAutomations.map((automation) => (
              <div key={automation.id} className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{automation.name}</h3>
                      <Badge variant={automation.status ? "default" : "secondary"}>
                        {automation.status ? "Active" : "Inactive"}
                      </Badge>
                      <Badge variant="outline">{automation.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Keywords: {automation.keywords?.join(", ") || "None"}
                    </p>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Runs</p>
                        <p className="font-semibold">{automation.runs}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">DMs Sent</p>
                        <p className="font-semibold">{automation.dmsSent}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Engaged</p>
                        <p className="font-semibold">{automation.engaged}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Clicks</p>
                        <p className="font-semibold">{automation.clicks}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Switch
                      checked={automation.status}
                      onCheckedChange={(checked) =>
                        handleToggle(automation.id, checked)
                      }
                    />
                    <div className="flex gap-2">
                      <Link href={`/dashboard/automations/${automation.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(automation.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

