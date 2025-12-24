"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  MoreHorizontal, 
  Shield, 
  Ban, 
  CheckCircle, 
  Crown, 
  Zap, 
  Sparkles,
  Eye,
} from "lucide-react";
import {
  Plan,
  Role,
  STORE_KEYS,
  User,
  getInitialPlans,
  getInitialRoles,
  getInitialUsers,
  loadData,
  saveData,
} from "@/lib/jsonStore";
import { useToast } from "@/hooks/use-toast";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    setUsers(loadData<User[]>(STORE_KEYS.users, getInitialUsers()));
    setPlans(loadData<Plan[]>(STORE_KEYS.plans, getInitialPlans()));
    setRoles(loadData<Role[]>(STORE_KEYS.roles, getInitialRoles()));
  }, []);

  const saveUsers = (next: User[], message?: string) => {
    setUsers(next);
    saveData(STORE_KEYS.users, next);
    if (message) {
      toast({ title: message });
    }
  };

  const handleStatusChange = (userId: string, status: string) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, status } : u
    );
    saveUsers(updated, "User status has been updated.");
  };

  const handleRoleChange = (userId: string, roleId: string) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, roleId } : u
    );
    saveUsers(updated, "User role has been updated.");
  };

  const handlePlanChange = (userId: string, planId: string) => {
    const updated = users.map((u) =>
      u.id === userId ? { ...u, planId } : u
    );
    saveUsers(updated, "User plan has been updated.");
  };

  const filteredUsers = users.filter(user => 
    (user.firstName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) || 
    (user.lastName?.toLowerCase() ?? '').includes(searchTerm.toLowerCase()) || 
    (user.email?.toLowerCase() ?? '').includes(searchTerm.toLowerCase())
  );

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'scale': return <Crown className="h-3 w-3" />;
      case 'growth': return <Zap className="h-3 w-3" />;
      default: return <Sparkles className="h-3 w-3" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'scale': return 'bg-purple-100 text-purple-700';
      case 'growth': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'inactive': return 'bg-slate-100 text-slate-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">User Management</h1>
            <p className="text-muted-foreground">Manage user access, roles, plans, and account status.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9 w-[300px]" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="w-[300px]">User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">
                            {(user.firstName?.[0] ?? '') + (user.lastName?.[0] ?? '')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-sm">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium capitalize">{user.roleId}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`font-medium gap-1 ${getPlanColor(user.planId)}`}>
                        {getPlanIcon(user.planId)}
                        <span className="capitalize">{user.planId}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className="font-medium">{user.automationsCount ?? 0}</span>
                        <span className="text-muted-foreground"> automations</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(user.status)} border-transparent shadow-none capitalize`}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Role</DropdownMenuLabel>
                          {roles.map((role) => (
                            <DropdownMenuItem
                              key={role.id}
                              onClick={() => handleRoleChange(user.id, role.id)}
                            >
                              <Shield className="mr-2 h-4 w-4" /> {role.name}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Plan</DropdownMenuLabel>
                          {plans.map((plan) => (
                            <DropdownMenuItem
                              key={plan.id}
                              onClick={() => handlePlanChange(user.id, plan.id)}
                            >
                              <Crown className="mr-2 h-4 w-4" /> {plan.name}
                            </DropdownMenuItem>
                          ))}
                          <DropdownMenuSeparator />
                          {user.status === 'active' ? (
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleStatusChange(user.id, 'suspended')}
                            >
                              <Ban className="mr-2 h-4 w-4" /> Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem 
                              className="text-green-600"
                              onClick={() => handleStatusChange(user.id, 'active')}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" /> Activate User
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}

