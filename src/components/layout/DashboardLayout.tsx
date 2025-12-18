"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Zap, 
  Wallet, 
  Users, 
  Bot, 
  Settings, 
  BookOpen, 
  Menu,
  LogOut,
  Instagram,
  MessageCircle,
  MessagesSquare,
  Crown,
  Shield,
  Search,
  Bell,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions, FEATURE_IDS } from "@/hooks/usePermissions";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Automations", icon: Zap, href: "/dashboard/automations" },
  { name: "Billing", icon: Wallet, href: "/dashboard/billing" },
  { name: "Contacts", icon: Users, href: "/dashboard/contacts" },
  { name: "Integrations", icon: Settings, href: "/dashboard/integrations" },
  { name: "Guides", icon: BookOpen, href: "/dashboard/guides" },
];

const toolItems = [
  { name: "Magic Payments", icon: Wallet, href: "/dashboard/payments", comingSoon: true },
  { name: "Sales Agent", icon: Bot, href: "/dashboard/agent", comingSoon: true },
];

const channelItems = [
  { name: "Instagram DM", icon: Instagram, featureId: FEATURE_IDS.INSTAGRAM_DM, active: true },
  { name: "WhatsApp", icon: MessageCircle, featureId: FEATURE_IDS.WHATSAPP, comingSoon: true },
  { name: "Messenger", icon: MessagesSquare, featureId: FEATURE_IDS.MESSENGER, comingSoon: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user } = useAuth();
  const { isAdmin, getAutomationLimit, getPlanId } = usePermissions();

  const limits = getAutomationLimit();
  const planId = getPlanId();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-[#e7e7e7]">
      <div className="p-4 flex items-center gap-2.5">
        <div className="relative rounded-md overflow-hidden bg-primary/10 p-1.5">
          <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={20} height={20} className="object-contain" />
        </div>
        <span className="font-semibold text-[#141414] text-lg tracking-tight">Supr DM</span>
      </div>

      <div className="px-4 mb-4">
        <p className="text-xs font-normal text-[#8b8b8b] capitalize mb-2">
          Platform
        </p>
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(`${item.href}/`));
            return (
              <Link key={item.name} href={item.href}>
                <div 
                  className={`
                    flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${isActive 
                      ? "bg-primary text-white" 
                      : "text-[#525252] hover:bg-gray-50"
                    }
                  `}
                  data-testid={`nav-${item.name.toLowerCase()}`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-4 mb-4">
        <p className="text-xs font-normal text-[#8b8b8b] capitalize mb-2">
          Channels
        </p>
        <div className="space-y-1">
          {channelItems.map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium ${
                item.active 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'text-[#8b8b8b] bg-gray-50'
              }`}
              data-testid={`channel-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span>{item.name}</span>
              {item.comingSoon && (
                <Badge variant="outline" className="ml-auto text-[10px] py-0 h-5 bg-amber-50 text-amber-600 border-amber-200">
                  Soon
                </Badge>
              )}
              {item.active && (
                <Badge className="ml-auto text-[10px] py-0 h-5 bg-green-500">
                  Live
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mb-4">
        <p className="text-xs font-normal text-[#8b8b8b] capitalize mb-2">
          Tools
        </p>
        <nav className="space-y-1">
          {toolItems.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-[#8b8b8b] bg-gray-50 cursor-not-allowed"
              data-testid={`tool-${item.name.toLowerCase().replace(' ', '-')}`}
            >
              <item.icon className="h-[18px] w-[18px]" />
              <span>{item.name}</span>
              <Badge variant="outline" className="ml-auto text-[10px] py-0 h-5 bg-amber-50 text-amber-600 border-amber-200">
                Soon
              </Badge>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto">
        <div className="px-4 mb-4">
          <Link href="/dashboard/automations/new">
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-medium gap-2 h-11"
              disabled={limits.current >= limits.max}
              data-testid="button-new-automation"
            >
              <Zap className="h-[18px] w-[18px]" />
              New Automation
            </Button>
          </Link>
        </div>

        <div className="px-4 py-3 border-t border-[#e7e7e7]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -m-2 transition-colors">
                <Avatar className="h-9 w-9 rounded-md border border-[#e7e7e7]">
                  <AvatarImage src={user?.profileImageUrl ?? undefined} />
                  <AvatarFallback className="rounded-md bg-primary text-white text-sm">
                    {(user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#141414] truncate">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-[#8b8b8b] truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#8b8b8b]">Automations</span>
                  <span className="text-xs font-medium text-[#141414]">{limits.current} / {limits.max}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all rounded-full" 
                    style={{ width: `${Math.min((limits.current / limits.max) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-[10px] text-[#8b8b8b] mt-1 capitalize">{planId} Plan</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 cursor-pointer">
                <Crown className="h-4 w-4 text-amber-500" />
                Upgrade Plan
              </DropdownMenuItem>
              {isAdmin() && (
                <>
                  <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => router.push('/admin')}
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 text-destructive cursor-pointer"
                onClick={() => router.push('/login')}
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );

  const Header = () => (
    <header className="bg-white border-b border-[#e7e7e7] h-[60px] flex items-center px-5 sticky top-0 z-10">
      <div className="flex items-center gap-2 border border-[#e0e2e7] rounded-lg px-3 py-2 w-[234px]">
        <Search className="h-4 w-4 text-[#8b8b8b]" />
        <input 
          type="text"
          placeholder="Search"
          className="bg-transparent border-none outline-none text-sm text-[#8b8b8b] placeholder:text-[#8b8b8b] w-full font-['Outfit']"
          data-testid="input-search"
        />
      </div>
      
      <div className="ml-auto flex items-center gap-2.5">
        <button className="p-2.5 rounded-lg border border-[#e7e7e7] hover:bg-gray-50 transition-colors" data-testid="button-refresh">
          <RefreshCw className="h-[18px] w-[18px] text-[#525252]" />
        </button>
        <button className="p-2.5 rounded-lg border border-[#e7e7e7] hover:bg-gray-50 transition-colors" data-testid="button-notifications">
          <Bell className="h-[18px] w-[18px] text-[#525252]" />
        </button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2.5 ml-3 cursor-pointer hover:opacity-80 transition-opacity" data-testid="header-user-menu">
              <div className="text-right">
                <p className="text-sm font-medium text-[#141414]">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-[#484848]">{user?.email}</p>
              </div>
              <Avatar className="h-[42px] w-[42px] rounded-md">
                <AvatarImage src={user?.profileImageUrl ?? undefined} />
                <AvatarFallback className="rounded-md bg-primary text-white">
                  {(user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => router.push("/dashboard/settings")}>
              <Settings className="h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer">
              <Crown className="h-4 w-4 text-amber-500" />
              Upgrade Plan
            </DropdownMenuItem>
            {isAdmin() && (
              <>
                <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => router.push('/admin')}
              >
                <Shield className="h-4 w-4" />
                Admin Panel
              </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="gap-2 text-destructive cursor-pointer"
              onClick={() => router.push('/login')}
              data-testid="button-logout"
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[#e7e7e7] bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="rounded-md overflow-hidden bg-primary/10 p-1.5">
            <Image src="/assets/generated_images/suprdm_logo.png" alt="Supr DM" width={20} height={20} />
          </div>
          <span className="font-semibold text-[#141414] text-lg">Supr DM</span>
        </div>
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-[#525252]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[264px]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex h-screen overflow-hidden">
        <aside className="hidden md:block w-[264px] h-full shrink-0">
          <SidebarContent />
        </aside>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="hidden md:block">
            <Header />
          </div>
          <main className="flex-1 overflow-auto p-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
