"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Car, Clock, Layers, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealisticMap } from "@/components/realistic-map"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function MapPage() {
  const [mapType, setMapType] = useState("standard")
  const [showTraffic, setShowTraffic] = useState(true)
  const [showAvailability, setShowAvailability] = useState(false)
  const [showWeather, setShowWeather] = useState(false)
  const [activeRide, setActiveRide] = useState(true)
  const [searchLocation, setSearchLocation] = useState("")

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      // In a real app, this would trigger a search
      console.log("Searching for:", searchLocation)
    },
    [searchLocation],
  )

  const handleContactDriver = useCallback(() => {
    alert("Connecting to driver...")
  }, [])

  const handleCancelRide = useCallback(() => {
    if (confirm("Are you sure you want to cancel this ride?")) {
      setActiveRide(false)
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Live Map</h1>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Layers className="mr-2 h-4 w-4" />
                Map Layers
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem checked={showTraffic} onCheckedChange={setShowTraffic}>
                Traffic
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showAvailability} onCheckedChange={setShowAvailability}>
                Cab Availability
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked={showWeather} onCheckedChange={setShowWeather}>
                Weather
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="space-y-6 lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search for a location"
                    className="pl-9"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button variant="outline" type="submit" className="w-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  Current Location
                </Button>
              </form>
            </CardContent>
          </Card>

          {activeRide && (
            <Card className="border-primary/50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Active Ride</CardTitle>
                  <Badge>In Progress</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    <Car className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">Uber X</p>
                    <p className="text-xs text-muted-foreground">Toyota Innova • ABC 123</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm">Miyapur Metro</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-muted-foreground/30" />
                    </div>
                    <p className="text-xs text-muted-foreground">9.2 Kilometres • 32 min</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <p className="text-sm">AMB Cinemas</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>ETA: 8:45 AM</span>
                  </div>
                  <p className="font-medium">₹180.50</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" onClick={handleContactDriver}>
                    Contact Driver
                  </Button>
                  <Button variant="destructive" size="sm" onClick={handleCancelRide}>
                    Cancel Ride
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Map Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <span className="text-sm font-medium">Map Type</span>
                <Tabs defaultValue={mapType} onValueChange={setMapType} className="w-full">
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="standard">Standard</TabsTrigger>
                    <TabsTrigger value="satellite">Satellite</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Traffic</span>
                  <Switch checked={showTraffic} onCheckedChange={setShowTraffic} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Cab Availability</span>
                  <Switch checked={showAvailability} onCheckedChange={setShowAvailability} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Show Weather</span>
                  <Switch checked={showWeather} onCheckedChange={setShowWeather} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-3 overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[calc(100vh-12rem)]">
              <RealisticMap
                mapType={mapType}
                showTraffic={showTraffic}
                showAvailability={showAvailability}
                showWeather={showWeather}
                animationSpeed={0.1} // Slower animation
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

