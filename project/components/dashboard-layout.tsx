"use client"

import type React from "react"
import { Bell, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Fixed width sidebar */}
      <DashboardSidebar className="hidden md:block w-64 flex-shrink-0 border-r" />

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Fixed header */}
        <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="md:hidden">
              <DashboardSidebar />
            </div>
            <div className="relative max-w-md w-full">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="pl-8 w-full md:w-[240px] lg:w-[320px]" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <UserNav />
          </div>
        </header>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</div>
        </div>
      </div>
    </div>
  )
}

