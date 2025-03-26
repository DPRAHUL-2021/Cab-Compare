"use client"

import { useState, useCallback, useEffect } from "react"
import { Clock, Loader2, MapPin, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RealisticMap } from "@/components/realistic-map"
import { ComparisonTable } from "@/components/comparison-table"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RideSummary {
  distance: string
  time: string
  traffic: string
  bestValue: { service: string; price: string }
  fastestOption: { service: string; eta: string }
}

export default function ComparePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [pickupLocation, setPickupLocation] = useState("")
  const [dropLocation, setDropLocation] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [autoBook, setAutoBook] = useState(false)
  const [rideType, setRideType] = useState("all")
  const [maxPrice, setMaxPrice] = useState([50])
  const [maxEta, setMaxEta] = useState([20])
  const [rideSummary, setRideSummary] = useState<RideSummary | null>(null)
  const [cabData, setCabData] = useState<any[]>([])

  const handleCompare = useCallback(async () => {
    if (!pickupLocation || !dropLocation) return

    setIsLoading(true)
    setShowResults(false)

    try {
      // Simulate API calls
      const [summaryResponse, cabResponse] = await Promise.all([
        fetchRideSummary(pickupLocation, dropLocation),
        fetchCabData(pickupLocation, dropLocation)
      ])

      setRideSummary(summaryResponse)
      setCabData(cabResponse)
      setShowResults(true)
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setIsLoading(false)
    }
  }, [pickupLocation, dropLocation])

  // Mock API functions - replace with real API calls
  const fetchRideSummary = async (pickup: string, dropoff: string): Promise<RideSummary> => {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Calculate dynamic values based on locations
    const distance = (4 + Math.random() * 3).toFixed(1)
    const time = `${10 + Math.floor(Math.random() * 15)}-${15 + Math.floor(Math.random() * 20)} minutes`
    const trafficConditions = ["Light", "Moderate", "Heavy"]
    const traffic = trafficConditions[Math.floor(Math.random() * trafficConditions.length)]
    
    return {
      distance: `${distance} miles`,
      time,
      traffic,
      bestValue: { service: "Ola", price: `$${(10 + Math.random() * 5).toFixed(2)}` },
      fastestOption: { service: "Rapido", eta: `${5 + Math.floor(Math.random() * 10)} min` }
    }
  }

  const fetchCabData = async (pickup: string, dropoff: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Generate dynamic data based on locations
    const basePrice = 10 + (pickup.length + dropoff.length) / 10
    const baseETA = 8 + (pickup.length + dropoff.length) / 20
    
    return [
      {
        id: 1,
        name: "Uber",
        logo: "/uber-logo.png",
        price: `$${(basePrice * (1 + Math.random() * 0.3)).toFixed(2)}`,
        eta: `${Math.max(3, Math.floor(baseETA + Math.random() * 8))} min`,
        distance: `${(4 + Math.random() * 2).toFixed(1)} km`,
        surge: Math.random() > 0.7,
        rating: 4.5 + Math.random() * 0.5,
        isBest: false
      },
      {
        id: 2,
        name: "Ola",
        logo: "/ola-logo.png",
        price: `$${(basePrice * (0.9 + Math.random() * 0.3)).toFixed(2)}`,
        eta: `${Math.max(3, Math.floor(baseETA + Math.random() * 10))} min`,
        distance: `${(4 + Math.random() * 2).toFixed(1)} km`,
        surge: Math.random() > 0.8,
        rating: 4.3 + Math.random() * 0.7,
        isBest: false
      },
      {
        id: 3,
        name: "Rapido",
        logo: "/rapido-logo.png",
        price: `$${(basePrice * (0.8 + Math.random() * 0.4)).toFixed(2)}`,
        eta: `${Math.max(3, Math.floor(baseETA - 2 + Math.random() * 6))} min`,
        distance: `${(4 + Math.random() * 2).toFixed(1)} km`,
        surge: Math.random() > 0.6,
        rating: 4.0 + Math.random() * 1.0,
        isBest: false
      }
    ]
  }

  const handleVoiceInput = useCallback(() => {
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      // Set demo locations that will trigger dynamic data
      setPickupLocation("Central Park")
      setDropLocation("Times Square")
    }, 2000)
  }, [])

  // Auto-trigger compare when locations are set via voice
  useEffect(() => {
    if (pickupLocation && dropLocation && (pickupLocation === "Central Park" || dropLocation === "Times Square")) {
      handleCompare()
    }
  }, [pickupLocation, dropLocation, handleCompare])

  return (
    <div className="space-y-6">
      {/* Header and Auto-book switch */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Compare Rides</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Auto-book best fare</span>
          <Switch checked={autoBook} onCheckedChange={setAutoBook} />
        </div>
      </div>

      {/* Search Form */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Find Your Ride</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Pickup Location */}
            <div className="space-y-2">
              <Label htmlFor="pickup" className="text-sm font-medium">
                Pickup Location
              </Label>
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
            
            {/* Drop Location */}
            <div className="space-y-2">
              <Label htmlFor="dropoff" className="text-sm font-medium">
                Drop Location
              </Label>
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
            
            {/* Date & Time */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm font-medium">
                Date & Time
              </Label>
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
            
            {/* Action Buttons */}
            <div className="flex items-end gap-2">
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
              <Button
                variant="outline"
                size="icon"
                className={`flex-shrink-0 ${isListening ? "bg-red-100 text-red-500 animate-pulse" : ""}`}
                onClick={handleVoiceInput}
                disabled={isListening}
              >
                <Mic className="h-4 w-4" />
                <span className="sr-only">Voice Input</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Ride Type */}
            <div className="space-y-2">
              <Label htmlFor="ride-type" className="text-sm font-medium">
                Ride Type
              </Label>
              <Select value={rideType} onValueChange={setRideType}>
                <SelectTrigger id="ride-type">
                  <SelectValue placeholder="Select ride type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="comfort">Comfort</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Max Price */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Max Price ($)</Label>
              <Slider 
                value={maxPrice} 
                onValueChange={setMaxPrice} 
                max={100} 
                step={1} 
                disabled={!showResults}
              />
              <div className="text-sm text-muted-foreground">
                Max: ${maxPrice[0]}
              </div>
            </div>
            
            {/* Max ETA */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Max ETA (minutes)</Label>
              <Slider 
                value={maxEta} 
                onValueChange={setMaxEta} 
                max={60} 
                step={1} 
                disabled={!showResults}
              />
              <div className="text-sm text-muted-foreground">
                Max: {maxEta[0]} min
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="mt-4 text-lg font-medium">Fetching the best rides for you...</p>
          <p className="text-sm text-muted-foreground">Comparing prices across Uber, Ola, and Rapido</p>
        </div>
      )}

      {/* Results */}
      {showResults && rideSummary && (
        <>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Map */}
            <Card className="col-span-full lg:col-span-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Route Map</CardTitle>
                  <div className="flex items-center gap-2">
                    <Tabs defaultValue="map">
                      <TabsList>
                        <TabsTrigger value="map">Map</TabsTrigger>
                        <TabsTrigger value="satellite">Satellite</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 aspect-[16/9] md:aspect-auto md:h-[500px]">
                <RealisticMap 
                  pickup={pickupLocation} 
                  dropoff={dropLocation} 
                  // animationSpeed={0.2}
                />
              </CardContent>
            </Card>
            
            {/* Ride Summary */}
            <Card className="lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle>Ride Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Route Distance</span>
                  <span>{rideSummary.distance}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Estimated Time</span>
                  <span>{rideSummary.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Traffic Conditions</span>
                  <span className={
                    rideSummary.traffic === "Heavy" ? "text-red-500" :
                    rideSummary.traffic === "Moderate" ? "text-yellow-500" :
                    "text-green-500"
                  }>
                    {rideSummary.traffic}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Best Value</span>
                  <span className="text-primary font-bold">
                    {rideSummary.bestValue.service} ({rideSummary.bestValue.price})
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fastest Option</span>
                  <span className="text-green-500">
                    {rideSummary.fastestOption.service} ({rideSummary.fastestOption.eta})
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Comparison Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ComparisonTable 
                pickup={pickupLocation} 
                dropoff={dropLocation} 
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}