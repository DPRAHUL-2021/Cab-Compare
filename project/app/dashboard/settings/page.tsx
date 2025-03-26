"use client"

import { useState } from "react"
import { Bell, Globe, Lock, Moon, Save, Volume2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [isDirty, setIsDirty] = useState(false)

  const handleChange = () => {
    setIsDirty(true)
  }

  return (
    // <DashboardLayout>
      <div className="grid gap-4 md:gap-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          {isDirty && (
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Manage your general application preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en" onValueChange={handleChange}>
                    <SelectTrigger id="language" className="w-full md:w-[240px]">
                      <Globe className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select defaultValue="usd" onValueChange={handleChange}>
                    <SelectTrigger id="currency" className="w-full md:w-[240px]">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="inr">INR (₹)</SelectItem>
                      <SelectItem value="jpy">JPY (¥)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="distance-unit">Distance Unit</Label>
                  <RadioGroup defaultValue="miles" onValueChange={handleChange} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="miles" id="miles" />
                      <Label htmlFor="miles">Miles</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kilometers" id="kilometers" />
                      <Label htmlFor="kilometers">Kilometers</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto-refresh Data</Label>
                    <p className="text-sm text-muted-foreground">Automatically refresh ride prices and availability</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Save Search History</Label>
                    <p className="text-sm text-muted-foreground">Save your recent searches for quick access</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Manage how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <Label>Push Notifications</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive ride confirmations and receipts via email</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive ride updates via text message</p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Label>Notification Sound Volume</Label>
                  </div>
                  <Slider
                    defaultValue={[75]}
                    max={100}
                    step={1}
                    className="w-full md:w-[240px]"
                    onValueChange={() => handleChange()}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Notification Types</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Price Alerts</span>
                      <Switch defaultChecked onCheckedChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Driver Arrival</span>
                      <Switch defaultChecked onCheckedChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Ride Completion</span>
                      <Switch defaultChecked onCheckedChange={handleChange} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Promotions & Offers</span>
                      <Switch onCheckedChange={handleChange} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    <Label>Theme</Label>
                  </div>
                  <RadioGroup defaultValue="system" onValueChange={handleChange} className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 bg-background">
                        <Sun className="h-6 w-6" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="light" />
                        <Label htmlFor="light">Light</Label>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 bg-background dark:bg-slate-950">
                        <Moon className="h-6 w-6" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="dark" />
                        <Label htmlFor="dark">Dark</Label>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex h-16 w-16 items-center justify-center rounded-md border-2 bg-background">
                        <div className="flex">
                          <div className="h-6 w-3 bg-background"></div>
                          <div className="h-6 w-3 bg-slate-950"></div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="system" id="system" />
                        <Label htmlFor="system">System</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Map Style</Label>
                  <RadioGroup defaultValue="standard" onValueChange={handleChange} className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex h-16 w-full items-center justify-center rounded-md border-2 bg-slate-100">
                        <span className="text-xs">Standard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">Standard</Label>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <div className="flex h-16 w-full items-center justify-center rounded-md border-2 bg-slate-700">
                        <span className="text-xs text-white">Satellite</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="satellite" id="satellite" />
                        <Label htmlFor="satellite">Satellite</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Reduce Motion</Label>
                    <p className="text-sm text-muted-foreground">Minimize animations for accessibility</p>
                  </div>
                  <Switch onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>High Contrast Mode</Label>
                    <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                  </div>
                  <Switch onCheckedChange={handleChange} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <Label>Two-Factor Authentication</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Location Tracking</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow the app to track your location in the background
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Data Collection</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow anonymous usage data collection to improve the app
                    </p>
                  </div>
                  <Switch defaultChecked onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Communications</Label>
                    <p className="text-sm text-muted-foreground">Receive marketing emails and promotions</p>
                  </div>
                  <Switch onCheckedChange={handleChange} />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full md:w-auto">
                    Change Password
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button variant="outline" className="w-full md:w-auto">
                    Download My Data
                  </Button>
                </div>

                <div className="space-y-2">
                  <Button variant="destructive" className="w-full md:w-auto">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    // </DashboardLayout>
  )
}

// Add the missing Sun component
function Sun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

