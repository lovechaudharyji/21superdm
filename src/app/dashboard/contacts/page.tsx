"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { loadUserData, saveUserData } from "@/lib/jsonStore";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Users, 
  Search, 
  Download, 
  Upload, 
  Filter,
  MessageCircle,
  Instagram,
  MoreHorizontal,
  UserPlus,
  Mail,
  Calendar
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Contact = {
  id: string;
  name: string;
  handle: string;
  email: string;
  source: "Comment" | "DM" | "Story" | string;
  lastInteraction: string;
  messages: number;
  status: "active" | "inactive";
};

const CONTACTS_STORAGE_KEY = "suprdm_contacts";

const initialContacts: Contact[] = [
  { id: "c-1", name: "Rahul Sharma", handle: "@rahul_sharma", email: "rahul@gmail.com", source: "Comment", lastInteraction: "2 hours ago", messages: 12, status: "active" },
  { id: "c-2", name: "Priya Patel", handle: "@priya.style", email: "priya.p@yahoo.com", source: "DM", lastInteraction: "1 day ago", messages: 8, status: "active" },
  { id: "c-3", name: "Amit Kumar", handle: "@amitkumar", email: "amit.k@outlook.com", source: "Story", lastInteraction: "3 days ago", messages: 5, status: "inactive" },
  { id: "c-4", name: "Neha Gupta", handle: "@neha_fashion", email: "neha.g@gmail.com", source: "Comment", lastInteraction: "5 hours ago", messages: 23, status: "active" },
  { id: "c-5", name: "Vikram Singh", handle: "@vikram.tech", email: "vikram@techmail.com", source: "DM", lastInteraction: "1 week ago", messages: 3, status: "inactive" },
];

function escapeCsv(value: string) {
  const v = value ?? "";
  if (/[",\n\r]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

function parseCsvLine(line: string): string[] {
  // Simple CSV parser (handles quotes + commas inside quotes)
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    const next = line[i + 1];
    if (ch === '"' && inQuotes && next === '"') {
      cur += '"';
      i++;
      continue;
    }
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map((s) => s.trim());
}

function normalizeHandle(handle: string) {
  const h = (handle ?? "").trim();
  if (!h) return "";
  return h.startsWith("@") ? h : `@${h}`;
}

function normalizeEmail(email: string) {
  return (email ?? "").trim().toLowerCase();
}

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user, isLoading } = useAuth();
  const { toast } = useToast();

  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newHandle, setNewHandle] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newSource, setNewSource] = useState<Contact["source"]>("DM");
  const [newStatus, setNewStatus] = useState<Contact["status"]>("active");

  // Load contacts for this user (local-only)
  useEffect(() => {
    if (isLoading) return;
    if (!user?.id) {
      setContacts(initialContacts);
      return;
    }
    const loaded = loadUserData<Contact[]>(user.id, CONTACTS_STORAGE_KEY, initialContacts);
    setContacts(loaded);
  }, [isLoading, user?.id]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  }, [contacts, searchTerm, filterStatus]);

  const persist = (next: Contact[]) => {
    setContacts(next);
    if (user?.id) {
      saveUserData(user.id, CONTACTS_STORAGE_KEY, next);
    }
  };

  const resetAddForm = () => {
    setNewName("");
    setNewHandle("");
    setNewEmail("");
    setNewSource("DM");
    setNewStatus("active");
  };

  const handleAddContact = () => {
    const name = newName.trim();
    const email = normalizeEmail(newEmail);
    const handle = normalizeHandle(newHandle);

    if (!name) {
      toast({
        title: "Missing name",
        description: "Please enter contact name.",
        variant: "destructive",
      });
      return;
    }

    // Merge if already exists by email or handle
    const existingIndex = contacts.findIndex((c) => {
      const sameEmail = email && normalizeEmail(c.email) === email;
      const sameHandle = handle && normalizeHandle(c.handle).toLowerCase() === handle.toLowerCase();
      return sameEmail || sameHandle;
    });

    const now = new Date();
    const lastInteraction = "just now";

    if (existingIndex >= 0) {
      const existing = contacts[existingIndex];
      const merged: Contact = {
        ...existing,
        name: name || existing.name,
        email: email || existing.email,
        handle: handle || existing.handle,
        source: newSource || existing.source,
        status: newStatus,
        lastInteraction,
      };
      const next = [...contacts];
      next[existingIndex] = merged;
      persist(next);
      toast({ title: "Contact updated", description: "Merged with an existing contact." });
    } else {
      const created: Contact = {
        id: `c-${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        email,
        handle,
        source: newSource,
        status: newStatus,
        messages: 0,
        lastInteraction,
      };
      persist([created, ...contacts]);
      toast({ title: "Contact added", description: "New contact saved." });
    }

    setAddOpen(false);
    resetAddForm();
  };

  const handleExport = () => {
    const rows = (filterStatus === "all" && !searchTerm ? contacts : filteredContacts).map((c) => ({
      id: c.id,
      name: c.name,
      handle: c.handle,
      email: c.email,
      source: c.source,
      messages: String(c.messages),
      lastInteraction: c.lastInteraction,
      status: c.status,
    }));

    const header = ["id", "name", "handle", "email", "source", "messages", "lastInteraction", "status"];
    const csv = [
      header.join(","),
      ...rows.map((r) =>
        header.map((k) => escapeCsv((r as any)[k] ?? "")).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contacts-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast({ title: "Export started", description: "Your contacts CSV is downloading." });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (file: File) => {
    try {
      const text = await file.text();
      const lines = text
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter(Boolean);

      if (lines.length < 2) {
        toast({ title: "Import failed", description: "CSV file looks empty.", variant: "destructive" });
        return;
      }

      const header = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
      const idx = (key: string) => header.indexOf(key.toLowerCase());

      const get = (cols: string[], key: string) => {
        const i = idx(key);
        return i >= 0 ? cols[i] ?? "" : "";
      };

      let added = 0;
      let updated = 0;

      const byEmail = new Map<string, Contact>();
      const byHandle = new Map<string, Contact>();
      for (const c of contacts) {
        if (c.email) byEmail.set(normalizeEmail(c.email), c);
        if (c.handle) byHandle.set(normalizeHandle(c.handle).toLowerCase(), c);
      }

      const next = [...contacts];

      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);
        const name = get(cols, "name").trim();
        const email = normalizeEmail(get(cols, "email"));
        const handle = normalizeHandle(get(cols, "handle"));
        const source = get(cols, "source").trim() || "DM";
        const lastInteraction = get(cols, "lastInteraction").trim() || "just now";
        const messages = Number(get(cols, "messages").trim() || "0");
        const statusRaw = get(cols, "status").trim().toLowerCase();
        const status: Contact["status"] = statusRaw === "inactive" ? "inactive" : "active";

        if (!name && !email && !handle) continue;

        const existing =
          (email && byEmail.get(email)) ||
          (handle && byHandle.get(handle.toLowerCase())) ||
          null;

        if (existing) {
          const merged: Contact = {
            ...existing,
            name: name || existing.name,
            email: email || existing.email,
            handle: handle || existing.handle,
            source: source || existing.source,
            lastInteraction: lastInteraction || existing.lastInteraction,
            messages: Number.isFinite(messages) ? messages : existing.messages,
            status,
          };
          const idxExisting = next.findIndex((c) => c.id === existing.id);
          if (idxExisting >= 0) next[idxExisting] = merged;
          byEmail.set(normalizeEmail(merged.email), merged);
          byHandle.set(normalizeHandle(merged.handle).toLowerCase(), merged);
          updated++;
        } else {
          const created: Contact = {
            id: `c-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: name || "Unnamed",
            email,
            handle,
            source,
            lastInteraction,
            messages: Number.isFinite(messages) ? messages : 0,
            status,
          };
          next.push(created);
          if (created.email) byEmail.set(created.email, created);
          if (created.handle) byHandle.set(created.handle.toLowerCase(), created);
          added++;
        }
      }

      persist(next);
      toast({
        title: "Import complete",
        description: `Added ${added} contact(s), updated ${updated} contact(s).`,
      });
    } catch (e: any) {
      toast({
        title: "Import failed",
        description: e?.message ?? "Could not read the CSV file.",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display">Contacts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your customer contacts and interactions
            </p>
          </div>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleImportFile(file);
                // allow importing same file again
                e.currentTarget.value = "";
              }}
            />
            <Button variant="outline" onClick={handleImportClick}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setAddOpen(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>

        {/* Add Contact Dialog */}
        <Dialog open={addOpen} onOpenChange={(open) => { setAddOpen(open); if (!open) resetAddForm(); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Contact</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Name</Label>
                <Input
                  id="contact-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Full name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact-handle">Instagram Handle</Label>
                <Input
                  id="contact-handle"
                  value={newHandle}
                  onChange={(e) => setNewHandle(e.target.value)}
                  placeholder="@username"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name@email.com"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Source</Label>
                  <Select value={newSource} onValueChange={(v) => setNewSource(v as Contact["source"])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DM">DM</SelectItem>
                      <SelectItem value="Comment">Comment</SelectItem>
                      <SelectItem value="Story">Story</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Status</Label>
                  <Select value={newStatus} onValueChange={(v) => setNewStatus(v as Contact["status"])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => { setAddOpen(false); resetAddForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleAddContact}>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Contacts ({filteredContacts.length})</CardTitle>
            <CardDescription>
              View and manage all your customer contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Messages</TableHead>
                  <TableHead>Last Interaction</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-muted-foreground">{contact.handle}</p>
                          <p className="text-xs text-muted-foreground">{contact.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{contact.source}</Badge>
                    </TableCell>
                    <TableCell>{contact.messages}</TableCell>
                    <TableCell>{contact.lastInteraction}</TableCell>
                    <TableCell>
                      <Badge variant={contact.status === "active" ? "default" : "secondary"}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Mail className="h-4 w-4 mr-2" />
                            Send Message
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="h-4 w-4 mr-2" />
                            View History
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

