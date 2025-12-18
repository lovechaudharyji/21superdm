"use client";

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
  Instagram
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const performanceData = [
  { label: "Messages Sent", value: "2,847", change: "+30%", icon: MessageSquare, color: "bg-blue-500" },
  { label: "Response Rate", value: "94.2%", change: "+12%", icon: TrendingUp, color: "bg-green-500" },
  { label: "Active Contacts", value: "1,256", change: "+18%", icon: Users, color: "bg-purple-500" },
  { label: "Automations Run", value: "458", change: "+25%", icon: Zap, color: "bg-amber-500" },
];

const socialAccounts = [
  { name: "@mybusiness", platform: "Instagram", followers: "12.5K", connected: true },
  { name: "@shopofficial", platform: "Instagram", followers: "8.2K", connected: true },
];

const activityHeatmapData = [
  { day: "Mon", hours: [3, 5, 7, 9, 8, 6, 7, 8, 9, 7, 5, 3] },
  { day: "Tue", hours: [2, 4, 6, 8, 9, 7, 8, 9, 8, 6, 4, 2] },
  { day: "Wed", hours: [4, 6, 8, 9, 8, 7, 6, 7, 8, 5, 3, 2] },
  { day: "Thu", hours: [3, 5, 7, 8, 9, 8, 7, 8, 7, 6, 4, 3] },
  { day: "Fri", hours: [2, 4, 5, 7, 8, 9, 8, 7, 6, 5, 4, 3] },
  { day: "Sat", hours: [5, 7, 8, 6, 5, 4, 5, 6, 7, 8, 6, 4] },
  { day: "Sun", hours: [6, 8, 7, 5, 4, 3, 4, 5, 6, 7, 5, 3] },
];

const growthData = [
  { date: "15", messages: 120, responses: 95 },
  { date: "16", messages: 150, responses: 120 },
  { date: "17", messages: 180, responses: 150 },
  { date: "18", messages: 140, responses: 110 },
  { date: "19", messages: 200, responses: 170 },
  { date: "20", messages: 220, responses: 190 },
  { date: "21", messages: 190, responses: 160 },
  { date: "22", messages: 250, responses: 210 },
  { date: "23", messages: 230, responses: 195 },
  { date: "24", messages: 270, responses: 230 },
  { date: "25", messages: 260, responses: 220 },
  { date: "26", messages: 290, responses: 250 },
];

const geoData = [
  { country: "India", percentage: 65 },
  { country: "UAE", percentage: 15 },
  { country: "USA", percentage: 10 },
  { country: "UK", percentage: 6 },
  { country: "Others", percentage: 4 },
];

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
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Schedule Post
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {performanceData.map((item, index) => (
            <Card key={index} className="border-[#e7e7e7]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className="bg-green-50 text-green-600 text-xs font-medium"
                  >
                    {item.change}
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-semibold text-[#141414]">{item.value}</p>
                  <p className="text-sm text-[#8b8b8b] mt-0.5">{item.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="border-[#e7e7e7]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-[#141414]">Social Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialAccounts.map((account, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#f8f8f8]"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
                    <Instagram className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#141414] truncate">{account.name}</p>
                    <p className="text-xs text-[#8b8b8b]">{account.followers} followers</p>
                  </div>
                  <Badge 
                    className={account.connected ? "bg-green-500" : "bg-gray-400"}
                  >
                    {account.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 gap-2">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-[#e7e7e7]">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-[#141414]">Audience Online Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[500px]">
                  <div className="flex gap-1 mb-2 pl-12">
                    {hours.map((hour) => (
                      <div key={hour} className="flex-1 text-center text-xs text-[#8b8b8b]">
                        {hour}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {activityHeatmapData.map((row) => (
                      <div key={row.day} className="flex items-center gap-1">
                        <span className="w-10 text-xs text-[#8b8b8b] text-right pr-2">{row.day}</span>
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
                    <span className="text-xs text-[#8b8b8b]">Less</span>
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
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium text-[#141414]">Growth and Development</CardTitle>
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
              <CardTitle className="text-base font-medium text-[#141414]">Geo Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {geoData.map((item, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#525252]">{item.country}</span>
                      <span className="font-medium text-[#141414]">{item.percentage}%</span>
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
      </div>
    </DashboardLayout>
  );
}

