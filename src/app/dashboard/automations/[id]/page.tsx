"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  X,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mockAutomations } from "@/lib/mock-data";

export default function EditAutomation() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const id = params.id as string;

  const { data: automation } = useQuery({
    queryKey: ["/api/automations", id],
    queryFn: async () => {
      // Mock - in real app, fetch from API
      return mockAutomations.find(a => a.id === parseInt(id)) || mockAutomations[0];
    },
  });

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

  useEffect(() => {
    if (automation) {
      setFormData({
        name: automation.name,
        category: automation.category,
        triggerType: automation.triggerType,
        keywords: automation.keywords || [],
        keywordInput: "",
        messageContent: automation.messageContent,
        messageType: automation.messageType,
        replyOnShare: automation.replyOnShare,
        sendPublicReply: automation.sendPublicReply,
        followersOnly: automation.followersOnly,
        status: automation.status,
      });
    }
  }, [automation]);

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/automations"] });
      toast({
        title: "Success",
        description: "Automation updated successfully!",
      });
      router.push("/dashboard/automations");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/automations"] });
      toast({
        title: "Deleted",
        description: "Automation deleted successfully!",
      });
      router.push("/dashboard/automations");
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
    updateMutation.mutate(formData);
  };

  if (!automation) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold font-display">Edit Automation</h1>
              <p className="text-muted-foreground mt-1">
                Update your automation settings
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Automation Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="messageContent">Message Content</Label>
                <Textarea
                  id="messageContent"
                  value={formData.messageContent}
                  onChange={(e) => setFormData({ ...formData, messageContent: e.target.value })}
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="status">Active</Label>
                  <Switch
                    id="status"
                    checked={formData.status}
                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              <Save className="h-4 w-4 mr-2" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}

