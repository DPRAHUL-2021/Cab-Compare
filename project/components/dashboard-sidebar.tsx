"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Car, Heart, History, Home, Map, Menu, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface DashboardSidebarProps {
  className?: string
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Compare Ride",
      icon: Car,
      href: "/dashboard/compare",
      active: pathname === "/dashboard/compare",
    },
    {
      label: "Live Map",
      icon: Map,
      href: "/dashboard/map",
      active: pathname === "/dashboard/map",
    },
    {
      label: "Saved Routes",
      icon: Heart,
      href: "/dashboard/saved",
      active: pathname === "/dashboard/saved",
    },
    {
      label: "History",
      icon: History,
      href: "/dashboard/history",
      active: pathname === "/dashboard/history",
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/dashboard/analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 px-4 border-b">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">CabCompare</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                route.active ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <route.icon className="h-5 w-5" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )

  // For mobile: show a sheet
  if (className === undefined) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          {SidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  // For desktop: show a regular sidebar
  return <div className={cn("h-screen", className)}>{SidebarContent}</div>
}

