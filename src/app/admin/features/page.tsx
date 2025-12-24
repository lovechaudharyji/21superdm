"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Feature,
  STORE_KEYS,
  getInitialFeatures,
  loadData,
  saveData,
} from "@/lib/jsonStore";

export default function FeaturesManagement() {
  const { toast } = useToast();
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const loaded = loadData<Feature[]>(
      STORE_KEYS.features,
      getInitialFeatures()
    );
    setFeatures(loaded);
  }, []);

  const updateFeatures = (next: Feature[]) => {
    setFeatures(next);
    saveData(STORE_KEYS.features, next);
    toast({
      title: "Feature updated",
      description: "Feature settings have been updated.",
    });
  };

  const toggleActive = (feature: Feature) => {
    const next = features.map((f) =>
      f.id === feature.id ? { ...f, isActive: !f.isActive } : f
    );
    updateFeatures(next);
  };

  const toggleComingSoon = (feature: Feature) => {
    const next = features.map((f) =>
      f.id === feature.id ? { ...f, isComingSoon: !f.isComingSoon } : f
    );
    updateFeatures(next);
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    const category = feature.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Features Management</h1>
          <p className="text-muted-foreground">Manage platform features and their availability</p>
        </div>

        {Object.entries(groupedFeatures).map(([category, categoryFeatures]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="capitalize">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryFeatures.map((feature) => (
                  <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{feature.name}</h3>
                        {feature.isComingSoon && (
                          <Badge variant="outline">Coming Soon</Badge>
                        )}
                        {feature.isActive && !feature.isComingSoon && (
                          <Badge className="bg-green-100 text-green-700">Active</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Active</span>
                        <Switch
                          checked={feature.isActive}
                          onCheckedChange={() => toggleActive(feature)}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Coming Soon</span>
                        <Switch
                          checked={feature.isComingSoon}
                          onCheckedChange={() => toggleComingSoon(feature)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
}

