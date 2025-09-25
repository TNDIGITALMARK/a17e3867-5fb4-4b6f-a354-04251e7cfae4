"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Scale, Users, BookOpen, Settings, Bell } from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Scale,
    description: "AI Assessment Portal"
  },
  {
    name: "Cases",
    href: "/cases",
    icon: BookOpen,
    description: "Case Dashboard & Evidence"
  },
  {
    name: "Community",
    href: "/community",
    icon: Users,
    description: "Community & Resources"
  },
  {
    name: "Academy",
    href: "/academy",
    icon: BookOpen,
    description: "Legal Education Hub"
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "Platform Settings"
  }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-card border-b">
      <div className="flex items-center gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-legal-primary to-legal-secondary rounded-lg flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-legal-primary to-legal-secondary bg-clip-text text-transparent">
            LEXpert
          </span>
        </Link>

        {/* Navigation Items */}
        <div className="hidden md:flex items-center gap-1">
          {navigationItems.slice(0, 4).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={cn(
                    "gap-2 text-sm font-medium transition-colors",
                    isActive && "bg-legal-secondary/10 text-legal-primary"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-4 h-4" />
          <Badge variant="destructive" className="absolute -top-1 -right-1 w-2 h-2 p-0 flex items-center justify-center text-xs">

          </Badge>
        </Button>

        {/* Settings */}
        <Link href="/settings">
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </Link>

        {/* User Avatar Placeholder */}
        <div className="w-8 h-8 bg-gradient-to-r from-legal-primary to-legal-secondary rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-white">U</span>
        </div>
      </div>
    </nav>
  );
}