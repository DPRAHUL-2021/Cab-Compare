"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, Car, Heart, History, Home, Map, Settings, User } from "lucide-react"

import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

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

  return (
    <nav className={cn("flex flex-col space-y-1", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
            route.active ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <route.icon className="h-5 w-5" />
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

