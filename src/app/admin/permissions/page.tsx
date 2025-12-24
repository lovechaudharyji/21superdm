"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Plus, Save, Trash2 } from "lucide-react";
import { PERMISSIONS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import {
  Role,
  STORE_KEYS,
  getInitialRoles,
  loadData,
  saveData,
} from "@/lib/jsonStore";

const permissionCategories = [
  {
    name: "User Management",
    permissions: [
      { id: "users.view", label: "View Users" },
      { id: "users.create", label: "Create Users" },
      { id: "users.edit", label: "Edit User Details" },
      { id: "users.delete", label: "Delete Users" },
    ]
  },
  {
    name: "System Administration",
    permissions: [
      { id: "admin.access", label: "Admin Panel Access" },
      { id: "settings.view", label: "View System Settings" },
      { id: "settings.edit", label: "Edit System Settings" },
    ]
  },
  {
    name: "Financials",
    permissions: [
      { id: "billing.view", label: "View Revenue/Invoices" },
      { id: "billing.manage", label: "Manage Subscriptions" },
      { id: "refunds.process", label: "Process Refunds" },
    ]
  },
];

export default function Permissions() {
  const { toast } = useToast();
  
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    const loaded = loadData<Role[]>(STORE_KEYS.roles, getInitialRoles());
    setRoles(loaded);
  }, []);

  const handleRoleSelect = (roleId: string) => {
    setSelectedRoleId(roleId);
    const role = roles.find(r => r.id === roleId);
    setEditingPermissions(role?.permissions || []);
  };

  const togglePermission = (permissionId: string) => {
    setEditingPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(p => p !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    if (!selectedRoleId) return;
    const updated = roles.map((role) =>
      role.id === selectedRoleId
        ? { ...role, permissions: editingPermissions }
        : role
    );
    setRoles(updated);
    saveData(STORE_KEYS.roles, updated);
    toast({
      title: "Permissions updated",
      description: "Role permissions have been updated.",
    });
    setSelectedRoleId(null);
  };

  const selectedRole = roles.find(r => r.id === selectedRoleId);

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Permissions Management</h1>
          <p className="text-muted-foreground">Manage role-based access control and permissions</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Roles</CardTitle>
              <CardDescription>Select a role to manage its permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {roles.map((role) => (
                <Button
                  key={role.id}
                  variant={selectedRoleId === role.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {role.name}
                </Button>
              ))}
            </CardContent>
          </Card>

          {selectedRole && (
            <Card>
              <CardHeader>
                <CardTitle>Permissions for {selectedRole.name}</CardTitle>
                <CardDescription>Toggle permissions for this role</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {permissionCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className="font-semibold mb-3">{category.name}</h3>
                    <div className="space-y-2">
                      {category.permissions.map((permission) => (
                        <div key={permission.id} className="flex items-center gap-2">
                          <Checkbox
                            checked={editingPermissions.includes(permission.id)}
                            onCheckedChange={() => togglePermission(permission.id)}
                          />
                          <label className="text-sm">{permission.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <Button onClick={handleSave} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Permissions
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

