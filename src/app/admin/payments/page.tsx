"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { IndianRupee, CheckCircle, XCircle, Clock } from "lucide-react";
import {
  Payment,
  STORE_KEYS,
  getInitialPayments,
  loadData,
} from "@/lib/jsonStore";

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const loaded = loadData<Payment[]>(
      STORE_KEYS.payments,
      getInitialPayments()
    );
    setPayments(loaded);
  }, []);

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount / 100);
  };

  const formatDate = (dateStr: Date | string | null) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 gap-1"><CheckCircle className="h-3 w-3" /> Paid</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-700 gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>;
      case 'created':
        return <Badge className="bg-yellow-100 text-yellow-700 gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const totalPaid = payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const pendingPayments = payments.filter(p => p.status === 'created').length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Payments</h1>
          <p className="text-muted-foreground">View and manage all payment transactions</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{formatAmount(totalPaid)}</div>
              <p className="text-sm text-muted-foreground mt-1">From successful payments</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Successful Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{payments.filter(p => p.status === 'paid').length}</div>
              <p className="text-sm text-muted-foreground mt-1">Completed transactions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingPayments}</div>
              <p className="text-sm text-muted-foreground mt-1">Awaiting completion</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{formatDate(payment.createdAt)}</TableCell>
                    <TableCell>{payment.userId}</TableCell>
                    <TableCell className="capitalize">{payment.planId}</TableCell>
                    <TableCell className="font-medium">{formatAmount(payment.amount)}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

