"use client"
import { useState, useCallback } from "react"
import { Clock, Loader2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealisticMap } from "@/components/realistic-map"
import { ComparisonTable } from "@/components/comparison-table"
import { FareTrendChart } from "@/components/fare-trend-chart"
import { SurgeIndicator } from "@/components/surge-indicator"
import { TrafficDensity } from "@/components/traffic-density"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [dateTime, setDateTime] = useState("")

  const handleCompare = useCallback(() => {
    if (!pickupLocation || !dropLocation) return

    setIsLoading(true)
    setShowResults(false)

    // Simulate API processing time
    setTimeout(() => {
      setIsLoading(false)
      setShowResults(true)
    }, 1000)
  }, [pickupLocation, dropLocation])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Ride Comparison Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>Find Your Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label htmlFor="pickup" className="text-sm font-medium">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    className="pl-10"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="dropoff" className="text-sm font-medium">
                  Drop Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="dropoff"
                    placeholder="Enter drop location"
                    className="pl-10"
                    value={dropLocation}
                    onChange={(e) => setDropLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date & Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="date"
                    type="datetime-local"
                    className="pl-10"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full"
                  onClick={handleCompare}
                  disabled={isLoading || !pickupLocation || !dropLocation}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Comparing...
                    </>
                  ) : (
                    "Compare Now"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Surge Probability</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <SurgeIndicator pickup={pickupLocation} dropoff={dropLocation} />
          </CardContent>
        </Card>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg font-medium">Fetching the best rides for you...</p>
          <p className="text-sm text-muted-foreground">Comparing prices across Uber, Ola, and Rapido</p>
        </div>
      )}

      {showResults && (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle>Route Map</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    Traffic
                  </Button>
                  <Button variant="outline" size="sm">
                    Availability
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 aspect-[16/9] md:aspect-auto md:h-[400px]">
                <RealisticMap 
                  pickup={pickupLocation} 
                  dropoff={dropLocation} 
                  showTraffic={true}
                />
              </CardContent>
            </Card>

            <div className="grid gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Fare Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="hourly">
                    <TabsList className="mb-4 w-full">
                      <TabsTrigger value="hourly" className="flex-1">
                        Hourly
                      </TabsTrigger>
                      <TabsTrigger value="daily" className="flex-1">
                        Daily
                      </TabsTrigger>
                      <TabsTrigger value="weekly" className="flex-1">
                        Weekly
                      </TabsTrigger>
                    </TabsList>
                    <div className="h-[200px]">
                      <TabsContent value="hourly" className="mt-0 h-full">
                        <FareTrendChart pickup={pickupLocation} dropoff={dropLocation} />
                      </TabsContent>
                      <TabsContent value="daily" className="mt-0 h-full">
                        <FareTrendChart pickup={pickupLocation} dropoff={dropLocation} daily />
                      </TabsContent>
                      <TabsContent value="weekly" className="mt-0 h-full">
                        <FareTrendChart pickup={pickupLocation} dropoff={dropLocation} weekly />
                      </TabsContent>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Traffic Density</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrafficDensity pickup={pickupLocation} dropoff={dropLocation} />
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Comparison Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonTable pickup={pickupLocation} dropoff={dropLocation} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}