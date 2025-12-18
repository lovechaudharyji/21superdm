"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Shield,
  Activity,
  LogOut,
  Bell,
  Search,
  Menu,
  CreditCard,
  ToggleLeft,
  IndianRupee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const adminItems = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin" },
  { name: "User Management", icon: Users, href: "/admin/users" },
  { name: "Plans & Pricing", icon: CreditCard, href: "/admin/plans" },
  { name: "Feature Flags", icon: ToggleLeft, href: "/admin/features" },
  { name: "Roles & Permissions", icon: Shield, href: "/admin/permissions" },
  { name: "Payments", icon: IndianRupee, href: "/admin/payments" },
  { name: "Activity Analytics", icon: Activity, href: "/admin/analytics" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-r border-slate-800">
      <div className="p-6 flex items-center gap-2 border-b border-slate-800">
        <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={32} height={32} className="object-contain brightness-0 invert" />
        <span className="font-display font-bold text-xl tracking-tight text-white">Supr DM Admin</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {adminItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${isActive 
                  ? "bg-primary text-white shadow-md shadow-primary/20" 
                  : "hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <item.icon className={`h-5 w-5 ${isActive ? "stroke-[2.5px]" : "stroke-2"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="flex items-center gap-3 px-2 mb-4">
           <Avatar className="h-9 w-9 border border-slate-600">
             <AvatarImage src="https://github.com/shadcn.png" />
             <AvatarFallback>AD</AvatarFallback>
           </Avatar>
           <div className="flex-1 min-w-0">
             <p className="text-sm font-bold text-white truncate">Super Admin</p>
             <p className="text-xs text-slate-500 truncate">admin@suprdm.in</p>
           </div>
        </div>
        <button
          onClick={() => router.push("/login")}
          className="flex items-center w-full px-4 py-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 gap-3 text-sm font-medium"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-slate-900 text-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={32} height={32} className="brightness-0 invert" />
           <span className="font-bold text-lg">Supr DM</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 bg-slate-900 border-r-slate-800 text-white">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 h-full">
          <SidebarContent />
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-slate-50">
          {/* Top Bar */}
          <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between z-10">
             <div className="flex items-center gap-4 text-muted-foreground">
               <span className="text-sm font-medium">Organization: <span className="text-foreground font-bold">Supr DM HQ</span></span>
             </div>
             
             <div className="flex items-center gap-4">
               <div className="relative hidden sm:block">
                 <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                 <input 
                   type="text" 
                   placeholder="Search users, logs..." 
                   className="h-9 w-64 rounded-md border border-input bg-transparent pl-9 pr-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                 />
               </div>
               
               <Button variant="ghost" size="icon" className="relative">
                 <Bell className="h-5 w-5 text-muted-foreground" />
                 <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
               </Button>
             </div>
          </header>

          <div className="flex-1 overflow-auto p-6 md:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
