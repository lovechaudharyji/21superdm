"use client";

import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Users, IndianRupee, MessageCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import {
  Payment,
  Plan,
  STORE_KEYS,
  User,
  getInitialPayments,
  getInitialPlans,
  getInitialUsers,
  loadData,
} from "@/lib/jsonStore";

const COLORS = ['#ff5e86', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];

export default function Analytics() {
  const [days, setDays] = useState("30");
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    setUsers(loadData<User[]>(STORE_KEYS.users, getInitialUsers()));
    setPlans(loadData<Plan[]>(STORE_KEYS.plans, getInitialPlans()));
    setPayments(
      loadData<Payment[]>(STORE_KEYS.payments, getInitialPayments())
    );
  }, []);

  const userGrowth = useMemo(() => {
    const total = users.length;
    const base = Math.max(total, 1);
    return Array.from({ length: 30 }, (_, i) => {
      const factor = 0.7 + (i / 29) * 0.6;
      const totalUsers = Math.round(base * factor);
      const prev =
        i === 0
          ? Math.round(base * 0.7)
          : Math.round(base * (0.7 + ((i - 1) / 29) * 0.6));
      const newUsers = Math.max(totalUsers - prev, 0);
      return {
        date: new Date(Date.now() - (29 - i) * 86400000).toISOString(),
        newUsers,
        totalUsers,
      };
    });
  }, [users, days]);

  const planDistribution = useMemo(() => {
    if (users.length === 0 || plans.length === 0) return [];
    const counts: Record<string, number> = {};
    users.forEach((u) => {
      counts[u.planId] = (counts[u.planId] || 0) + 1;
    });
    const total = users.length || 1;
    return plans.map((plan) => ({
      planId: plan.id,
      planName: plan.name,
      count: counts[plan.id] || 0,
      percentage: Math.round(((counts[plan.id] || 0) / total) * 100),
    }));
  }, [users, plans]);

  const paymentData = useMemo(() => {
    if (payments.length === 0) return null;
    const successful = payments.filter((p) => p.status === "paid");
    const failed = payments.filter((p) => p.status === "failed");
    const totalRevenue = successful.reduce((sum, p) => sum + p.amount, 0);

    const windowMs =
      parseInt(days, 10) * 24 * 60 * 60 * 1000 || 30 * 24 * 60 * 60 * 1000;
    const startTime = Date.now() - windowMs;

    const dailyMap: Record<string, { date: string; amount: number; count: number }> = {};

    successful.forEach((p) => {
      const dateObj = new Date(p.createdAt);
      if (dateObj.getTime() < startTime) return;
      const key = dateObj.toISOString().slice(0, 10);
      if (!dailyMap[key]) {
        dailyMap[key] = { date: key, amount: 0, count: 0 };
      }
      dailyMap[key].amount += p.amount;
      dailyMap[key].count += 1;
    });

    const dailyRevenue = Object.values(dailyMap).sort(
      (a, b) => a.date.localeCompare(b.date)
    );

    return {
      totalRevenue,
      successfulPayments: successful.length,
      failedPayments: failed.length,
      dailyRevenue,
    };
  }, [payments, days]);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Analytics</h1>
            <p className="text-muted-foreground">View detailed analytics and insights</p>
          </div>
          <Select value={days} onValueChange={setDays}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userGrowth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="totalUsers" stroke="#ff5e86" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>New Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={userGrowth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="newUsers" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            {paymentData && (
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">₹{(paymentData.totalRevenue / 100).toLocaleString()}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Successful Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{paymentData.successfulPayments}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Failed Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{paymentData.failedPayments}</div>
                  </CardContent>
                </Card>
              </div>
            )}
            {paymentData && (
              <Card>
                <CardHeader>
                  <CardTitle>Daily Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={paymentData.dailyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={planDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name}: ${percentage}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {planDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}

