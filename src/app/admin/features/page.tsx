"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { mockFeatures } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function FeaturesManagement() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: features = mockFeatures } = useQuery({
    queryKey: ["/api/admin/features"],
    queryFn: async () => {
      return mockFeatures;
    },
  });

  const updateFeatureMutation = useMutation({
    mutationFn: async (feature: { id: string; isActive?: boolean; isComingSoon?: boolean }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/features"] });
      toast({ title: "Feature updated", description: "Feature settings have been updated." });
    },
  });

  const toggleActive = (feature: typeof mockFeatures[0]) => {
    updateFeatureMutation.mutate({
      id: feature.id,
      isActive: !feature.isActive,
    });
  };

  const toggleComingSoon = (feature: typeof mockFeatures[0]) => {
    updateFeatureMutation.mutate({
      id: feature.id,
      isComingSoon: !feature.isComingSoon,
    });
  };

  const groupedFeatures = features.reduce((acc, feature) => {
    const category = feature.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(feature);
    return acc;
  }, {} as Record<string, typeof mockFeatures>);

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

