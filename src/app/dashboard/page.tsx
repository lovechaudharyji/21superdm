"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Zap,
  Plus,
  Calendar,
  Instagram,
  Trash2,
  Edit,
  Settings
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  ActivityHeatmapRow,
  AnalyticsPoint,
  DashboardStats,
  GeoStat,
  Post,
  SocialAccount,
  STORE_KEYS,
  getInitialDashboardStats,
  getInitialGeoData,
  getInitialGrowthData,
  getInitialSocialAccounts,
  getInitialPosts,
  getInitialActivityHeatmap,
  loadData,
  saveData,
  loadUserData,
  saveUserData,
} from "@/lib/jsonStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"];

function getHeatmapColor(intensity: number): string {
  if (intensity <= 2) return "bg-primary/10";
  if (intensity <= 4) return "bg-primary/25";
  if (intensity <= 6) return "bg-primary/40";
  if (intensity <= 8) return "bg-primary/60";
  return "bg-primary/80";
}

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const firstName = user?.firstName || "User";
  const { toast } = useToast();

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [growthData, setGrowthData] = useState<AnalyticsPoint[]>([]);
  const [geoData, setGeoData] = useState<GeoStat[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activityHeatmapData, setActivityHeatmapData] = useState<ActivityHeatmapRow[]>([]);

  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [accountHandle, setAccountHandle] = useState("");
  const [accountFollowers, setAccountFollowers] = useState("");

  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [postAccountId, setPostAccountId] = useState<string>("");
  const [postContent, setPostContent] = useState("");
  const [postScheduledAt, setPostScheduledAt] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");

  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [newAccountHandle, setNewAccountHandle] = useState("");
  const [newAccountFollowers, setNewAccountFollowers] = useState("");

  const [editStatsOpen, setEditStatsOpen] = useState(false);
  const [editMessagesSent, setEditMessagesSent] = useState("");
  const [editResponseRate, setEditResponseRate] = useState("");
  const [editActiveContacts, setEditActiveContacts] = useState("");
  const [editAutomationsRun, setEditAutomationsRun] = useState("");

  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editPostContent, setEditPostContent] = useState("");
  const [editPostScheduledAt, setEditPostScheduledAt] = useState("");
  const [editPostImageUrl, setEditPostImageUrl] = useState("");

  // Function to load user-specific data
  const loadUserDashboardData = useCallback(() => {
    // Wait for auth to finish loading
    if (isLoading) return;
    
    if (!user?.id) {
      // Clear all data if no user
      setStats(null);
      setSocialAccounts([]);
      setGrowthData([]);
      setGeoData([]);
      setPosts([]);
      setActivityHeatmapData([]);
      return;
    }

    // Load user-specific data - each user gets their own isolated data
    const loadedStats = loadUserData<DashboardStats>(
      user.id,
      STORE_KEYS.dashboardStats,
      getInitialDashboardStats()
    );
    const loadedAccounts = loadUserData<SocialAccount[]>(
      user.id,
      STORE_KEYS.socialAccounts,
      getInitialSocialAccounts()
    );
    const loadedGrowth = loadUserData<AnalyticsPoint[]>(
      user.id,
      STORE_KEYS.growthData,
      getInitialGrowthData()
    );
    const loadedGeo = loadUserData<GeoStat[]>(
      user.id,
      STORE_KEYS.geoData,
      getInitialGeoData()
    );
    const loadedPosts = loadUserData<Post[]>(
      user.id,
      STORE_KEYS.posts,
      getInitialPosts()
    );
    const loadedHeatmap = loadUserData<ActivityHeatmapRow[]>(
      user.id,
      STORE_KEYS.activityHeatmap,
      getInitialActivityHeatmap()
    );

    setStats(loadedStats);
    setSocialAccounts(loadedAccounts);
    setGrowthData(loadedGrowth);
    setGeoData(loadedGeo);
    setPosts(loadedPosts);
    setActivityHeatmapData(loadedHeatmap);

    if (!postAccountId && loadedAccounts.length > 0) {
      setPostAccountId(loadedAccounts[0].id);
    }
  }, [user?.id, postAccountId, isLoading]);

  useEffect(() => {
    loadUserDashboardData();
  }, [loadUserDashboardData]);

  // Listen for storage changes (when user logs in/out)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORE_KEYS.currentUser) {
        // User changed, reload dashboard data
        loadUserDashboardData();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [loadUserDashboardData]);

  const performanceData = useMemo(
    () =>
      stats
        ? [
            {
              label: "Messages Sent",
              value: stats.messagesSent.toLocaleString(),
              change: "+30%",
              icon: MessageSquare,
              color: "bg-blue-500",
            },
            {
              label: "Response Rate",
              value: `${stats.responseRate.toFixed(1)}%`,
              change: "+12%",
              icon: TrendingUp,
              color: "bg-green-500",
            },
            {
              label: "Active Contacts",
              value: stats.activeContacts.toLocaleString(),
              change: "+18%",
              icon: Users,
              color: "bg-purple-500",
            },
            {
              label: "Automations Run",
              value: stats.automationsRun.toLocaleString(),
              change: "+25%",
              icon: Zap,
              color: "bg-amber-500",
            },
          ]
        : [],
    [stats]
  );

  const handleEditAccount = (acc: SocialAccount) => {
    setEditingAccountId(acc.id);
    setAccountHandle(acc.handle);
    setAccountFollowers(acc.followers.toString());
  };

  const handleSaveAccount = () => {
    if (!editingAccountId) return;

    const followersNumber = Number(accountFollowers.replace(/[^0-9]/g, ""));

    const updated = socialAccounts.map((acc) =>
      acc.id === editingAccountId
        ? {
            ...acc,
            handle: accountHandle || acc.handle,
            followers: Number.isNaN(followersNumber)
              ? acc.followers
              : followersNumber,
          }
        : acc
    );

    if (!user?.id) return;
    setSocialAccounts(updated);
    saveUserData(user.id, STORE_KEYS.socialAccounts, updated);
    setEditingAccountId(null);
    toast({ title: "Account updated" });
  };

  const handleResetGrowthAndGeo = () => {
    if (!user?.id) return;
    const initialGrowth = getInitialGrowthData();
    const initialGeo = getInitialGeoData();
    const initialHeatmap = getInitialActivityHeatmap();
    setGrowthData(initialGrowth);
    setGeoData(initialGeo);
    setActivityHeatmapData(initialHeatmap);
    saveUserData(user.id, STORE_KEYS.growthData, initialGrowth);
    saveUserData(user.id, STORE_KEYS.geoData, initialGeo);
    saveUserData(user.id, STORE_KEYS.activityHeatmap, initialHeatmap);
    toast({ title: "Dashboard data reset" });
  };

  const handleCreatePost = () => {
    if (!postContent.trim() || !postAccountId) {
      toast({ title: "Please select account and add content" });
      return;
    }

    const newPost: Post = {
      id: `post-${Date.now()}`,
      accountId: postAccountId,
      content: postContent.trim(),
      scheduledAt: postScheduledAt || null,
      imageUrl: postImageUrl || null,
      createdAt: new Date().toISOString(),
    };

    if (!user?.id) return;
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    saveUserData(user.id, STORE_KEYS.posts, updatedPosts);

    setPostContent("");
    setPostScheduledAt("");
    setPostImageUrl("");
    setCreatePostOpen(false);

    toast({ title: "Post created (local only)" });
  };

  const handleToggleConnection = (accountId: string) => {
    if (!user?.id) return;
    const updated = socialAccounts.map((acc) =>
      acc.id === accountId ? { ...acc, connected: !acc.connected } : acc
    );
    setSocialAccounts(updated);
    saveUserData(user.id, STORE_KEYS.socialAccounts, updated);
    toast({ 
      title: updated.find(a => a.id === accountId)?.connected 
        ? "Account connected" 
        : "Account disconnected" 
    });
  };

  const handleAddAccount = () => {
    if (!user?.id) return;
    if (!newAccountHandle.trim()) {
      toast({ title: "Please enter account handle" });
      return;
    }

    const followersNumber = Number(newAccountFollowers.replace(/[^0-9]/g, "")) || 0;

    const newAccount: SocialAccount = {
      id: `account-${Date.now()}`,
      handle: newAccountHandle.trim(),
      followers: followersNumber,
      connected: true,
      platform: "instagram",
    };

    const updated = [...socialAccounts, newAccount];
    setSocialAccounts(updated);
    saveUserData(user.id, STORE_KEYS.socialAccounts, updated);

    setNewAccountHandle("");
    setNewAccountFollowers("");
    setAddAccountOpen(false);
    toast({ title: "Account added" });
  };

  const handleDeleteAccount = (accountId: string) => {
    if (!user?.id) return;
    const updated = socialAccounts.filter((acc) => acc.id !== accountId);
    setSocialAccounts(updated);
    saveUserData(user.id, STORE_KEYS.socialAccounts, updated);
    toast({ title: "Account deleted" });
  };

  const handleEditStats = () => {
    if (!stats) return;

    // Parse values properly - check if input is valid, otherwise use current value
    const parseNumber = (value: string, current: number): number => {
      const cleaned = value.trim();
      if (cleaned === "") return current;
      const parsed = Number(cleaned);
      return isNaN(parsed) ? current : parsed;
    };

    const messagesSent = parseNumber(editMessagesSent, stats.messagesSent);
    const responseRate = parseNumber(editResponseRate, stats.responseRate);
    const activeContacts = parseNumber(editActiveContacts, stats.activeContacts);
    const automationsRun = parseNumber(editAutomationsRun, stats.automationsRun);

    const updated: DashboardStats = {
      messagesSent: Math.max(0, messagesSent),
      responseRate: Math.max(0, Math.min(100, responseRate)),
      activeContacts: Math.max(0, activeContacts),
      automationsRun: Math.max(0, automationsRun),
    };

    if (!user?.id) return;
    setStats(updated);
    saveUserData(user.id, STORE_KEYS.dashboardStats, updated);
    setEditStatsOpen(false);
    toast({ 
      title: "Stats updated",
      description: "Dashboard statistics have been updated successfully."
    });
  };

  const handleEditPost = (post: Post) => {
    setEditingPostId(post.id);
    setEditPostContent(post.content);
    setEditPostScheduledAt(post.scheduledAt || "");
    setEditPostImageUrl(post.imageUrl || "");
  };

  const handleSavePost = () => {
    if (!editingPostId || !editPostContent.trim()) {
      toast({ title: "Please enter post content" });
      return;
    }

    const updated = posts.map((p) =>
      p.id === editingPostId
        ? {
            ...p,
            content: editPostContent.trim(),
            scheduledAt: editPostScheduledAt || null,
            imageUrl: editPostImageUrl || null,
          }
        : p
    );

    if (!user?.id) return;
    setPosts(updated);
    saveUserData(user.id, STORE_KEYS.posts, updated);
    setEditingPostId(null);
    setEditPostContent("");
    setEditPostScheduledAt("");
    setEditPostImageUrl("");
    toast({ title: "Post updated" });
  };

  const handleDeletePost = (postId: string) => {
    if (!user?.id) return;
    const updated = posts.filter((p) => p.id !== postId);
    setPosts(updated);
    saveUserData(user.id, STORE_KEYS.posts, updated);
    toast({ title: "Post deleted" });
  };

  const handleOpenEditStats = () => {
    if (stats) {
      setEditMessagesSent(stats.messagesSent.toString());
      setEditResponseRate(stats.responseRate.toString());
      setEditActiveContacts(stats.activeContacts.toString());
      setEditAutomationsRun(stats.automationsRun.toString());
      setEditStatsOpen(true);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#141414]">
              Hello, {firstName}
            </h1>
            <p className="text-sm text-[#8b8b8b] mt-1">
              Make sure to stay engaged with your audience for better results
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={createPostOpen} onOpenChange={setCreatePostOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Account</p>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={postAccountId}
                      onChange={(e) => setPostAccountId(e.target.value)}
                    >
                      {socialAccounts.map((acc) => (
                        <option key={acc.id} value={acc.id}>
                          {acc.handle}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Content</p>
                    <Textarea
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="Write your post or DM content..."
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Schedule (optional)
                      </p>
                      <Input
                        type="datetime-local"
                        value={postScheduledAt}
                        onChange={(e) => setPostScheduledAt(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Image URL (optional)
                      </p>
                      <Input
                        value={postImageUrl}
                        onChange={(e) => setPostImageUrl(e.target.value)}
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => setCreatePostOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreatePost}>Save Post</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setCreatePostOpen(true)}
            >
              <Calendar className="h-4 w-4" />
              Schedule Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceData.map((item, index) => (
            <Card key={index} className="border-[#e7e7e7] cursor-pointer transition-colors" onClick={handleOpenEditStats}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5 text-Dark" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className="bg-green-50 text-green-600 text-xs font-medium"
                    >
                      {item.change}
                    </Badge>
                    <Settings className="h-3 w-3 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold text-Dark">{item.value}</p>
                  <p className="text-sm text-[#8b8b8b] mt-0.5">{item.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-[#e7e7e7]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-white flex items-center justify-between">
                <span className="text-dark font-bold">Social Accounts</span>
                <div className="flex gap-1">
                  <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-6 px-2 text-[10px]"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Social Account</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Instagram Handle</p>
                          <Input
                            value={newAccountHandle}
                            onChange={(e) => setNewAccountHandle(e.target.value)}
                            placeholder="@username"
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Followers</p>
                          <Input
                            value={newAccountFollowers}
                            onChange={(e) => setNewAccountFollowers(e.target.value)}
                            placeholder="1000"
                            type="number"
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => setAddAccountOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button onClick={handleAddAccount}>Add Account</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-6 px-2 text-[10px]"
                    onClick={() => {
                      if (!user?.id) return;
                      const initial = getInitialSocialAccounts();
                      setSocialAccounts(initial);
                      saveUserData(user.id, STORE_KEYS.socialAccounts, initial);
                      toast({ title: "Social accounts reset" });
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialAccounts.map((account) => (
                <div 
                  key={account.id} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#f8f8f8]"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black truncate">
                      {editingAccountId === account.id ? (
                        <Input
                          className="h-7"
                          value={accountHandle}
                          onChange={(e) => setAccountHandle(e.target.value)}
                        />
                      ) : (
                        account.handle
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
                      {editingAccountId === account.id ? (
                        <Input
                          className="mt-1 h-7 text-xs"
                          value={accountFollowers}
                          onChange={(e) => setAccountFollowers(e.target.value)}
                        />
                      ) : (
                        `${account.followers.toLocaleString()} followers`
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge 
                      className={`cursor-pointer ${account.connected ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"}`}
                      onClick={() => handleToggleConnection(account.id)}
                    >
                      {account.connected ? "Connected" : "Disconnected"}
                    </Badge>
                    {editingAccountId === account.id ? (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 px-2 text-[10px]"
                          onClick={handleSaveAccount}
                        >
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-[10px]"
                          onClick={() => setEditingAccountId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-[10px]"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-6 px-2 text-[10px] text-red-500 hover:text-red-600"
                          onClick={() => handleDeleteAccount(account.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-[#e7e7e7]">
            <CardHeader className="pb-3">
              <CardTitle className=" font-Bold text-dark">Audience Online Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                  <div className="flex gap-1 mb-2 pl-12">
                    {hours.map((hour) => (
                      <div key={hour} className="flex-1 text-center text-xs text-slate-300">
                        {hour}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {activityHeatmapData.map((row) => (
                      <div key={row.day} className="flex items-center gap-1">
                        <span className="w-10 text-xs text-slate-300 text-right pr-2">{row.day}</span>
                        {row.hours.map((intensity, i) => (
                          <div
                            key={i}
                            className={`flex-1 h-6 rounded-sm ${getHeatmapColor(intensity)} transition-colors`}
                            title={`${row.day} ${hours[i]}:00 - Activity: ${intensity}/10`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <span className="text-xs text-slate-300">Less</span>
                    <div className="flex gap-0.5">
                      {[10, 25, 40, 60, 80].map((opacity) => (
                        <div 
                          key={opacity} 
                          className={`w-4 h-4 rounded-sm bg-primary/${opacity}`}
                          style={{ backgroundColor: `hsl(var(--primary) / ${opacity / 100})` }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-[#8b8b8b]">More</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-[#e7e7e7]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <CardTitle className=" font-bold text-dark">
                Growth and Development
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                className="h-6 px-2 text-[10px]"
                onClick={handleResetGrowthAndGeo}
              >
                Reset
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={growthData} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e7e7e7" />
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#8b8b8b' }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#8b8b8b' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e7e7e7',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '10px' }}
                      formatter={(value) => <span className="text-sm text-[#525252]">{value}</span>}
                    />
                    <Bar 
                      dataKey="messages" 
                      name="Messages Sent"
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar 
                      dataKey="responses" 
                      name="Responses"
                      fill="hsl(var(--primary) / 0.4)" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e7e7e7]">
            <CardHeader className="pb-3">
              <CardTitle className="  font-bold text-black">
                Geo Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geoData.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-black">{item.country}</span>
                      <span className="font-medium text-black">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={editStatsOpen} onOpenChange={setEditStatsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Dashboard Stats</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Messages Sent</p>
                <Input
                  value={editMessagesSent}
                  onChange={(e) => setEditMessagesSent(e.target.value)}
                  type="number"
                  className="bg-white !text-black font-medium border-gray-300"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Response Rate (%)</p>
                <Input
                  value={editResponseRate}
                  onChange={(e) => setEditResponseRate(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className="bg-white !text-black font-medium border-gray-300"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Active Contacts</p>
                <Input
                  value={editActiveContacts}
                  onChange={(e) => setEditActiveContacts(e.target.value)}
                  type="number"
                  className="bg-white !text-black font-medium border-gray-300"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Automations Run</p>
                <Input
                  value={editAutomationsRun}
                  onChange={(e) => setEditAutomationsRun(e.target.value)}
                  type="number"
                  className="bg-white !text-black font-medium border-gray-300"
                  style={{ backgroundColor: '#ffffff', color: '#000000' }}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  onClick={() => setEditStatsOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleEditStats}>Save Changes</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {posts.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            <Card className="border-[#e7e7e7]">
              <CardHeader>
                <CardTitle className="text-base font-medium text-white">
                  Recent Posts (Local)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {posts.slice(0, 5).map((post) => {
                  const account = socialAccounts.find(
                    (acc) => acc.id === post.accountId
                  );
                  const isEditing = editingPostId === post.id;
                  return (
                    <div
                      key={post.id}
                      className="border rounded-lg p-3 bg-[#101010] space-y-2"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{account?.handle ?? "Unknown account"}</span>
                            <span>
                              {new Date(post.createdAt).toLocaleString()}
                              {post.scheduledAt
                                ? ` • Scheduled: ${new Date(
                                    post.scheduledAt
                                  ).toLocaleString()}`
                                : ""}
                            </span>
                          </div>
                          {isEditing ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editPostContent}
                                onChange={(e) => setEditPostContent(e.target.value)}
                                rows={3}
                                className="text-sm"
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  type="datetime-local"
                                  value={editPostScheduledAt}
                                  onChange={(e) => setEditPostScheduledAt(e.target.value)}
                                  placeholder="Schedule"
                                  className="text-xs h-7"
                                />
                                <Input
                                  value={editPostImageUrl}
                                  onChange={(e) => setEditPostImageUrl(e.target.value)}
                                  placeholder="Image URL"
                                  className="text-xs h-7"
                                />
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-6 px-2 text-[10px]"
                                  onClick={handleSavePost}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 px-2 text-[10px]"
                                  onClick={() => {
                                    setEditingPostId(null);
                                    setEditPostContent("");
                                    setEditPostScheduledAt("");
                                    setEditPostImageUrl("");
                                  }}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-white line-clamp-3">
                              {post.content}
                            </p>
                          )}
                        </div>
                        {!isEditing && (
                          <div className="flex gap-1 ml-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

