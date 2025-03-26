"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Car, Menu, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { MainNav } from "@/components/main-nav"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <Link href="/dashboard" className="flex items-center gap-2">
                    <Car className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold">CabCompare</span>
                  </Link>
                </div>
                <MainNav className="flex flex-col px-2 py-4" />
              </SheetContent>
            </Sheet>
            <Link href="/dashboard" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CabCompare</span>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:gap-2">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CabCompare</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-[200px] pl-8 md:w-[240px] lg:w-[320px]" />
            </div>
            <ModeToggle />
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden w-[240px] flex-shrink-0 border-r md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-4">
              <MainNav className="px-2" />
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

