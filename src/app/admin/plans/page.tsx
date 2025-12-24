"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Crown, Zap, Sparkles, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Feature,
  Plan,
  STORE_KEYS,
  getInitialFeatures,
  getInitialPlans,
  loadData,
} from "@/lib/jsonStore";

export default function PlansManagement() {
  const { toast } = useToast();
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    setPlans(loadData(STORE_KEYS.plans, getInitialPlans()));
    setFeatures(loadData(STORE_KEYS.features, getInitialFeatures()));
  }, []);

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'scale': return <Crown className="h-5 w-5" />;
      case 'growth': return <Zap className="h-5 w-5" />;
      default: return <Sparkles className="h-5 w-5" />;
    }
  };

  const formatPrice = (paise: number) => {
    if (paise === 0) return "Free";
    return `₹${(paise / 100).toLocaleString('en-IN')}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Plans Management</h1>
          <p className="text-muted-foreground">Manage subscription plans and their features</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    {getPlanIcon(plan.id)}
                  </div>
                  <div>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-2xl font-bold">
                    {formatPrice(plan.priceMonthly)}/mo
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatPrice(plan.priceYearly)}/year
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Features:</div>
                  <div className="space-y-2">
                    {features.slice(0, 5).map((feature) => (
                      <div key={feature.id} className="flex items-center gap-2">
                        <Checkbox checked={true} />
                        <span className="text-sm">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setEditingPlan(plan.id)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Edit Features
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

