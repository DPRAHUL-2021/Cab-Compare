"use client"

import { useEffect, useState } from "react"
import { Check, Clock, FlameIcon as Fire, MapPin, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

interface ComparisonTableProps {
  pickup: string
  dropoff: string
}

interface CabService {
  id: number
  name: string
  logo: string
  price: string
  eta: string
  distance: string
  surge: boolean
  rating: number
  isBest: boolean
}

// Mock location database with coordinates
const LOCATION_DATABASE: Record<string, { lat: number; lng: number }> = {
  "Miyapur Metro Station": { lat: 17.4969, lng: 78.3545 },
  "AMB Cinemas": { lat: 17.4934, lng: 78.3910 },
  "Central Park": { lat: 40.7829, lng: -73.9654 },
  "Times Square": { lat: 40.7580, lng: -73.9855 },
  // Add more locations as needed
}

// Calculate distance between two points in km (Haversine formula)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export function ComparisonTable({ pickup, dropoff }: ComparisonTableProps) {
  const [cabData, setCabData] = useState<CabService[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!pickup || !dropoff) {
      setCabData([])
      return
    }

    const fetchCabData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Get coordinates for distance calculation
        const pickupCoords = LOCATION_DATABASE[pickup] || LOCATION_DATABASE["Miyapur Metro Station"]
        const dropoffCoords = LOCATION_DATABASE[dropoff] || LOCATION_DATABASE["AMB Cinemas"]
        
        // Calculate actual distance
        const distance = calculateDistance(
          pickupCoords.lat,
          pickupCoords.lng,
          dropoffCoords.lat,
          dropoffCoords.lng
        )
        
        // Generate dynamic data based on actual distance
        const mockResponse = await simulateApiCall(pickup, dropoff, distance)
        
        // Determine which option is best (lowest price)
        const prices = mockResponse.map(cab => parseFloat(cab.price.replace('$', '')))
        const minPrice = Math.min(...prices)
        
        const dataWithBestFlag = mockResponse.map(cab => ({
          ...cab,
          isBest: parseFloat(cab.price.replace('$', '')) === minPrice
        }))

        setCabData(dataWithBestFlag)
      } catch (err) {
        setError("Failed to fetch cab data. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    const simulateApiCall = async (
      pickup: string,
      dropoff: string,
      distance: number
    ): Promise<CabService[]> => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Calculate base price based on actual distance
      const basePricePerKm = 2.5 // $2.5 per km as base rate
      const basePrice = distance * basePricePerKm
      
      // Generate dynamic ETA based on distance (avg speed 30km/h in city traffic)
      const baseETA = (distance / 30) * 60 // Convert to minutes
      const etaVariation = Math.floor(Math.random() * 8) // Random variation

      return [
        {
          id: 1,
          name: "Uber",
          logo: "/uber-logo.png",
          price: `$${(basePrice * (1 + Math.random() * 0.3)).toFixed(2)}`, // +0-30% variation
          eta: `${Math.max(3, Math.floor(baseETA + etaVariation))} min`, // Minimum 3 min
          distance: `${distance.toFixed(1)} km`,
          surge: Math.random() > 0.7,
          rating: 4.5 + Math.random() * 0.5,
          isBest: false
        },
        {
          id: 2,
          name: "Ola",
          logo: "/ola-logo.webp",
          price: `$${(basePrice * (0.9 + Math.random() * 0.3)).toFixed(2)}`, // 10% cheaper base
          eta: `${Math.max(3, Math.floor(baseETA + etaVariation + 2))} min`,
          distance: `${distance.toFixed(1)} km`,
          surge: Math.random() > 0.8,
          rating: 4.3 + Math.random() * 0.7,
          isBest: false
        },
        {
          id: 3,
          name: "Rapido",
          logo: "/rapido-logo.jpg",
          price: `$${(basePrice * (0.8 + Math.random() * 0.4)).toFixed(2)}`, // 20% cheaper base
          eta: `${Math.max(3, Math.floor(baseETA + etaVariation - 2))} min`,
          distance: `${distance.toFixed(1)} km`,
          surge: Math.random() > 0.6,
          rating: 4.0 + Math.random() * 1.0,
          isBest: false
        }
      ]
    }

    fetchCabData()
  }, [pickup, dropoff])

  // ... rest of your component remains the same ...

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Service</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((row) => (
              <TableRow key={row}>
                <TableCell><Skeleton className="h-6 w-[100px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-6 w-[60px]" /></TableCell>
                <TableCell><Skeleton className="h-9 w-[90px]" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-md border p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Service</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Distance</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cabData.map((cab) => (
              <TableRow key={cab.id} className={cab.isBest ? "bg-primary/5 relative" : ""}>
                {cab.isBest && <div className="absolute -left-1 top-0 bottom-0 w-1 bg-primary" />}
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 relative">
                      <img 
                        src={cab.logo} 
                        alt={cab.name} 
                        className="object-contain w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg'
                        }}
                      />
                    </div>
                    <span>{cab.name}</span>
                    {cab.isBest && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary-foreground" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Best Value</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-semibold">{cab.price}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    {cab.eta}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {cab.distance}
                  </div>
                </TableCell>
                <TableCell>
                  {cab.surge ? (
                    <div className="flex items-center gap-1 text-red-500">
                      <Fire className="w-4 h-4" />
                      <span>Surge</span>
                    </div>
                  ) : (
                    <span className="text-green-500">Normal</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {cab.rating.toFixed(1)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    className={cab.isBest ? "" : "bg-muted-foreground hover:bg-muted-foreground/90"}
                    onClick={() => handleBookNow(cab)}
                  >
                    Book Now
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )

  function handleBookNow(cab: CabService) {
    // In a real app, this would redirect to the booking page or trigger a booking API call
    alert(`Booking ${cab.name} for ${pickup} to ${dropoff}\nPrice: ${cab.price}\nETA: ${cab.eta}`)
    
    // Example of what you might do:
    // window.open(`https://${cab.name.toLowerCase()}.com/book?pickup=${encodeURIComponent(pickup)}&dropoff=${encodeURIComponent(dropoff)}`, '_blank')
  }
}