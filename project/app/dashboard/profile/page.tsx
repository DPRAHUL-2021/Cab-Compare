"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Camera, CreditCard, Edit, Loader2, Mail, Phone, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      setIsEditing(false)
    }, 1500)
  }

  return (
    // <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Your profile picture will be visible to cab drivers</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/yoyoyo.webp" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                      <Camera className="h-4 w-4" />
                      <span className="sr-only">Change profile picture</span>
                    </Button>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-medium">Pranav Rahul</h3>
                  <p className="text-sm text-muted-foreground">Member since March 2025</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Status</CardTitle>
                <CardDescription>Your current account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Account Type</span>
                  <Badge>Premium</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Verification</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rides Completed</span>
                  <span className="text-sm">124</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Member Since</span>
                  <span className="text-sm">March 2025</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" defaultValue="Pranav" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" defaultValue="Rahul" disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input id="email" type="email" defaultValue="dprahul@email.com" disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <Input id="phone" type="tel" defaultValue="+91 1234567890" disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your ride experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive ride confirmations and receipts</p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive ride updates via text message</p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Price Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when prices drop for your saved routes
                      </p>
                    </div>
                    <Switch defaultChecked disabled={!isEditing} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Default to Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Use dark theme by default</p>
                    </div>
                    <Switch disabled={!isEditing} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cards">
                  <TabsList>
                    <TabsTrigger value="cards">Cards</TabsTrigger>
                    <TabsTrigger value="wallets">Digital Wallets</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cards" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-primary/10 p-2">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 04/26</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Default</Badge>
                        {isEditing && (
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-muted p-2">
                          <CreditCard className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 8888</p>
                          <p className="text-sm text-muted-foreground">Expires 12/25</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isEditing && (
                          <>
                            <Button variant="outline" size="sm">
                              Set Default
                            </Button>
                            <Button variant="ghost" size="sm">
                              Remove
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Add New Card
                      </Button>
                    )}
                  </TabsContent>
                  <TabsContent value="wallets" className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="rounded-md bg-muted p-2">
                          <svg className="h-6 w-6" viewBox="0 0 24 24">
                            <path
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                              fill="#FBBC05"
                            />
                            <path
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                              fill="#EA4335"
                            />
                            <path d="M1 1h22v22H1z" fill="none" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Google Pay</p>
                          <p className="text-sm text-muted-foreground">Connected</p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          Disconnect
                        </Button>
                      )}
                    </div>

                    {isEditing && (
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    // </DashboardLayout>
  )
}

