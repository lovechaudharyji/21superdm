"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Save, 
  Plus, 
  MessageSquare,
  CreditCard,
  Type,
  X,
  AlertTriangle
} from "lucide-react";
import { usePermissions } from "@/hooks/usePermissions";
import { useToast } from "@/hooks/use-toast";

export default function AutomationBuilder() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { canCreateAutomation } = usePermissions();

  const [formData, setFormData] = useState({
    name: "",
    category: "COMMENT",
    triggerType: "specific",
    keywords: [] as string[],
    keywordInput: "",
    messageContent: "",
    messageType: "text",
    replyOnShare: false,
    sendPublicReply: false,
    followersOnly: false,
    status: true,
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await fetch("/api/automations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create automation");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/automations"] });
      toast({
        title: "Success",
        description: "Automation created successfully!",
      });
      router.push("/dashboard/automations");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create automation",
        variant: "destructive",
      });
    },
  });

  const handleAddKeyword = () => {
    if (formData.keywordInput.trim() && !formData.keywords.includes(formData.keywordInput.trim())) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, formData.keywordInput.trim()],
        keywordInput: "",
      });
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter(k => k !== keyword),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreateAutomation()) {
      toast({
        title: "Limit Reached",
        description: "You've reached your automation limit. Please upgrade your plan.",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(formData);
  };

  if (!canCreateAutomation()) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <AlertTriangle className="h-12 w-12 mx-auto text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Automation Limit Reached</h2>
          <p className="text-muted-foreground mb-4">
            You've reached your plan's automation limit. Upgrade to create more automations.
          </p>
          <Button onClick={() => router.push("/dashboard/billing")}>
            Upgrade Plan
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold font-display">Create Automation</h1>
            <p className="text-muted-foreground mt-1">
              Set up a new Instagram automation workflow
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Settings */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Automation Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Price Inquiry Bot"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Category</Label>
                <RadioGroup
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="COMMENT" id="comment" />
                    <Label htmlFor="comment">Comment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="STORY" id="story" />
                    <Label htmlFor="story">Story</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DM" id="dm" />
                    <Label htmlFor="dm">DM</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Trigger Type</Label>
                <RadioGroup
                  value={formData.triggerType}
                  onValueChange={(value) => setFormData({ ...formData, triggerType: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="specific" id="specific" />
                    <Label htmlFor="specific">Specific Keywords</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="any" id="any" />
                    <Label htmlFor="any">Any Message/Comment</Label>
                  </div>
                </RadioGroup>
              </div>

              {formData.triggerType === "specific" && (
                <div className="space-y-2">
                  <Label>Keywords</Label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.keywordInput}
                      onChange={(e) => setFormData({ ...formData, keywordInput: e.target.value })}
                      placeholder="Enter keyword"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddKeyword();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddKeyword}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {formData.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="gap-1">
                          {keyword}
                          <button
                            type="button"
                            onClick={() => handleRemoveKeyword(keyword)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Message Settings */}
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Message Type</Label>
                <RadioGroup
                  value={formData.messageType}
                  onValueChange={(value) => setFormData({ ...formData, messageType: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card">Card</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="messageContent">Message Content</Label>
                <Textarea
                  id="messageContent"
                  value={formData.messageContent}
                  onChange={(e) => setFormData({ ...formData, messageContent: e.target.value })}
                  placeholder="Enter your automated message..."
                  rows={6}
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="replyOnShare">Reply on Story Share</Label>
                  <Switch
                    id="replyOnShare"
                    checked={formData.replyOnShare}
                    onCheckedChange={(checked) => setFormData({ ...formData, replyOnShare: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sendPublicReply">Send Public Reply</Label>
                  <Switch
                    id="sendPublicReply"
                    checked={formData.sendPublicReply}
                    onCheckedChange={(checked) => setFormData({ ...formData, sendPublicReply: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="followersOnly">Followers Only</Label>
                  <Switch
                    id="followersOnly"
                    checked={formData.followersOnly}
                    onCheckedChange={(checked) => setFormData({ ...formData, followersOnly: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {createMutation.isPending ? "Creating..." : "Create Automation"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

