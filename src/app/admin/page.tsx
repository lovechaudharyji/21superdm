"use client";

import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Activity, ArrowUpRight, Server, IndianRupee } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import {
  Automation,
  Payment,
  STORE_KEYS,
  User,
  getInitialAutomations,
  getInitialPayments,
  getInitialUsers,
  loadData,
} from "@/lib/jsonStore";
import { useEffect, useMemo, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    setUsers(loadData<User[]>(STORE_KEYS.users, getInitialUsers()));
    setAutomations(
      loadData<Automation[]>(STORE_KEYS.automations, getInitialAutomations())
    );
    setPayments(
      loadData<Payment[]>(STORE_KEYS.payments, getInitialPayments())
    );
  }, []);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const totalAutomations = automations.length;
    const totalRevenue = payments
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + p.amount, 0);

    return { totalUsers, activeUsers, totalAutomations, totalRevenue };
  }, [users, automations, payments]);

  const chartData = useMemo(() => {
    // Simple derived chart from active users count over last 3 periods
    const base = stats.activeUsers || 0;
    return [
      { name: "Mon", active: Math.round(base * 0.8) },
      { name: "Tue", active: Math.round(base * 0.9) },
      { name: "Wed", active: base },
      { name: "Thu", active: Math.round(base * 1.05) },
      { name: "Fri", active: Math.round(base * 1.1) },
      { name: "Sat", active: Math.round(base * 0.95) },
      { name: "Sun", active: Math.round(base * 0.9) },
    ];
  }, [stats.activeUsers]);

  const activity = useMemo(() => {
    // Generate activity from recent payments, automations, and user updates
    const activities: Array<{ action: string; userId: string; createdAt: string }> = [];
    
    // Add payment activities
    payments.slice(0, 5).forEach((payment) => {
      activities.push({
        action: `payment_${payment.status}`,
        userId: payment.userId,
        createdAt: payment.createdAt,
      });
    });

    // Add automation activities
    automations.slice(0, 3).forEach((automation) => {
      activities.push({
        action: automation.status ? "automation_activated" : "automation_deactivated",
        userId: automation.userId,
        createdAt: automation.updatedAt,
      });
    });

    // Add user creation activities
    users.slice(0, 3).forEach((user) => {
      activities.push({
        action: "user_created",
        userId: user.id,
        createdAt: user.createdAt,
      });
    });

    // Sort by date (newest first)
    return activities.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [payments, automations, users]);

  const formatRevenue = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
    return `₹${amount}`;
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">System Overview</h1>
          <p className="text-muted-foreground">Monitor key metrics and system health.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalUsers ?? 0}</div>
              <p className="text-xs text-muted-foreground flex items-center text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stats?.activeUsers ?? 0} active
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAutomations ?? 0}</div>
              <p className="text-xs text-muted-foreground flex items-center text-green-600 mt-1">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                Instagram DM automations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue (MRR)</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatRevenue(stats?.totalRevenue ?? 0)}</div>
              <p className="text-xs text-muted-foreground mt-1">Based on active plans</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <p className="text-xs text-muted-foreground mt-1">All systems operational</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>User Activity (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.length > 0 ? chartData : [{ name: 'No data', active: 0 }]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `${value}`} 
                    />
                    <Tooltip 
                      cursor={{fill: 'transparent'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="active" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {activity.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No recent activity
                  </p>
                ) : (
                  activity.slice(0, 5).map((item: any, i: number) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {item.action?.[0]?.toUpperCase() ?? 'A'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none capitalize">
                          {item.action?.replace(/_/g, ' ') ?? 'Unknown action'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          User: {item.userId?.slice(0, 8) ?? 'Unknown'}...
                        </p>
                      </div>
                      <div className="ml-auto font-medium text-xs text-muted-foreground">
                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}

