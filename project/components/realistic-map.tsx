"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import 'mapbox-gl/dist/mapbox-gl.css'

interface RealisticMapProps {
  pickup?: string
  dropoff?: string
  showTraffic?: boolean
  showAvailability?: boolean
  showWeather?: boolean
}

// Initialize Mapbox token (move to env file in production)
mapboxgl.accessToken = "pk.eyJ1IjoiZHByYWh1bDIwMjEiLCJhIjoiY204cGxwNHllMDBiczJrcHVwbjRwczZjdSJ9.e0KHrShsbxGtVKeMYNEKpA"

export function RealisticMap({
  pickup = "Miyapur Metro Station",
  dropoff = "AMB Cinemas",
  showTraffic = true,
  showAvailability = false,
  showWeather = false,
}: RealisticMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [78.3729, 17.4965], // Default to Hyderabad
      zoom: 12
    })

    map.current.on('load', () => {
      setLoading(false)
      updateRoute()
    })

    return () => {
      map.current?.remove()
    }
  }, [])

  useEffect(() => {
    if (!map.current) return
    updateRoute()
  }, [pickup, dropoff])

  const updateRoute = async () => {
    if (!map.current || !pickup || !dropoff) return
    
    try {
      setLoading(true)
      setError(null)

      // Geocode pickup and dropoff locations
      const [pickupCoords, dropoffCoords] = await Promise.all([
        geocodeAddress(pickup),
        geocodeAddress(dropoff)
      ])

      // Update map view to contain both points
      const bounds = new mapboxgl.LngLatBounds()
      bounds.extend(pickupCoords)
      bounds.extend(dropoffCoords)
      map.current.fitBounds(bounds, { padding: 50 })

      // Get route between points (simplified - in real app use Mapbox Directions API)
      addRouteToMap(pickupCoords, dropoffCoords)

      // Add markers
      addMarkers(pickupCoords, dropoffCoords)

      setLoading(false)
    } catch (err) {
      setError('Failed to load route')
      setLoading(false)
    }
  }

  const geocodeAddress = async (address: string): Promise<[number, number]> => {
    // In a real app, use Mapbox Geocoding API
    // This is a simplified mock implementation
    const mockLocations: Record<string, [number, number]> = {
      "Miyapur Metro Station": [78.3545, 17.4969],
      "AMB Cinemas": [78.3910, 17.4934],
      "Kukatpally Housing Board": [78.4136, 17.4945],
  "Inorbit Mall": [78.3802, 17.4321],
  "Jubilee Hills Check Post": [78.4147, 17.4260],
  "Hitech City Metro Station": [78.3869, 17.4504],
  "Gachibowli Stadium": [78.3429, 17.4449],
  "Shilparamam": [78.3780, 17.4492],
  "Forum Sujana Mall": [78.3916, 17.4940],
  "IKEA Hyderabad": [78.3918, 17.4425],
  "Banjara Hills Road No. 12": [78.4452, 17.4162],
  "Raheja Mindspace": [78.3761, 17.4507],
  "Cyber Towers": [78.3784, 17.4503],
  "Durgam Cheruvu": [78.3943, 17.4343],
      // Add more mock locations as needed
    }

    if (mockLocations[address]) {
      return mockLocations[address]
    }

    // Fallback to geocoding API if not in mock data
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapboxgl.accessToken}`
    )
    const data = await response.json()
    if (data.features && data.features.length > 0) {
      return data.features[0].center
    }
    throw new Error('Location not found')
  }

  const addRouteToMap = (start: [number, number], end: [number, number]) => {
    if (!map.current) return

    // Remove existing route layer if it exists
    if (map.current.getLayer('route')) {
      map.current.removeLayer('route')
    }
    if (map.current.getSource('route')) {
      map.current.removeSource('route')
    }

    // In a real app, use Mapbox Directions API to get the actual route
    // This is a simplified straight line for demonstration
    map.current.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [start, end]
        }
      }
    })

    map.current.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#3b82f6',
        'line-width': 4
      }
    })
  }

  const addMarkers = (start: [number, number], end: [number, number]) => {
    if (!map.current) return

    // Clear existing markers
    const markers = document.querySelectorAll('.mapboxgl-marker')
    markers.forEach(marker => marker.remove())

    // Add pickup marker
    new mapboxgl.Marker({ color: '#3b82f6' })
      .setLngLat(start)
      .setPopup(new mapboxgl.Popup().setHTML(`<strong>Pickup:</strong> ${pickup}`))
      .addTo(map.current)

    // Add dropoff marker
    new mapboxgl.Marker({ color: '#10b981' })
      .setLngLat(end)
      .setPopup(new mapboxgl.Popup().setHTML(`<strong>Dropoff:</strong> ${dropoff}`))
      .addTo(map.current)
  }

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden">
      <div ref={mapContainer} className="w-full h-full" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading map...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
          <div className="text-center p-4 bg-white rounded-lg shadow">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={updateRoute}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}