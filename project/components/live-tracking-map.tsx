"use client"

import { useEffect, useRef, useState } from "react"
import { Cloud, CloudRain, Sun } from "lucide-react"

interface LiveTrackingMapProps {
  mapType?: string
  showTraffic?: boolean
  showAvailability?: boolean
  showWeather?: boolean
  activeRide?: boolean
}

export function LiveTrackingMap({
  mapType = "standard",
  showTraffic = true,
  showAvailability = false,
  showWeather = false,
  activeRide = false,
}: LiveTrackingMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Make canvas responsive
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      // Set canvas dimensions to match parent element
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      // Redraw after resize
      drawMap()
    }

    // Initial resize
    resizeCanvas()

    // Add resize listener
    window.addEventListener("resize", resizeCanvas)

    // Animation frame
    let animationFrameId: number

    // Draw map function
    function drawMap() {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw map background
      ctx.fillStyle = mapType === "satellite" ? "#263238" : "#f3f4f6"
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = mapType === "satellite" ? "#455a64" : "#e5e7eb"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i < height; i += 40) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
      }

      // Vertical grid lines
      for (let i = 0; i < width; i += 40) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
      }

      // Draw main roads
      ctx.strokeStyle = mapType === "satellite" ? "#78909c" : "#d1d5db"
      ctx.lineWidth = 12

      // Horizontal main roads
      for (let i = 0.2; i <= 0.8; i += 0.2) {
        ctx.beginPath()
        ctx.moveTo(0, height * i)
        ctx.lineTo(width, height * i)
        ctx.stroke()
      }

      // Vertical main roads
      for (let i = 0.2; i <= 0.8; i += 0.2) {
        ctx.beginPath()
        ctx.moveTo(width * i, 0)
        ctx.lineTo(width * i, height)
        ctx.stroke()
      }

      // Draw secondary roads
      ctx.strokeStyle = mapType === "satellite" ? "#546e7a" : "#e5e7eb"
      ctx.lineWidth = 6

      // Horizontal secondary roads
      for (let i = 0.1; i < 1; i += 0.1) {
        if (i % 0.2 === 0) continue // Skip main roads
        ctx.beginPath()
        ctx.moveTo(0, height * i)
        ctx.lineTo(width, height * i)
        ctx.stroke()
      }

      // Vertical secondary roads
      for (let i = 0.1; i < 1; i += 0.1) {
        if (i % 0.2 === 0) continue // Skip main roads
        ctx.beginPath()
        ctx.moveTo(width * i, 0)
        ctx.lineTo(width * i, height)
        ctx.stroke()
      }

      // Draw traffic if enabled
      if (showTraffic) {
        // Red traffic (congested)
        ctx.strokeStyle = "#ef4444"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(width * 0.2, height * 0.2)
        ctx.lineTo(width * 0.4, height * 0.2)
        ctx.stroke()

        // Yellow traffic (moderate)
        ctx.strokeStyle = "#f59e0b"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(width * 0.6, height * 0.4)
        ctx.lineTo(width * 0.8, height * 0.4)
        ctx.stroke()

        // Green traffic (good flow)
        ctx.strokeStyle = "#22c55e"
        ctx.lineWidth = 8
        ctx.beginPath()
        ctx.moveTo(width * 0.4, height * 0.6)
        ctx.lineTo(width * 0.6, height * 0.6)
        ctx.stroke()
      }

      // Draw cab availability heatmap if enabled
      if (showAvailability) {
        // High availability area (green)
        ctx.fillStyle = "rgba(34, 197, 94, 0.2)"
        ctx.beginPath()
        ctx.arc(width * 0.3, height * 0.3, 80, 0, Math.PI * 2)
        ctx.fill()

        // Medium availability area (yellow)
        ctx.fillStyle = "rgba(245, 158, 11, 0.2)"
        ctx.beginPath()
        ctx.arc(width * 0.7, height * 0.7, 60, 0, Math.PI * 2)
        ctx.fill()

        // Low availability area (red)
        ctx.fillStyle = "rgba(239, 68, 68, 0.2)"
        ctx.beginPath()
        ctx.arc(width * 0.8, height * 0.2, 40, 0, Math.PI * 2)
        ctx.fill()
      }

      // Draw weather overlays if enabled
      if (showWeather) {
        // Sunny area
        ctx.fillStyle = "rgba(250, 204, 21, 0.1)"
        ctx.beginPath()
        ctx.rect(0, 0, width * 0.4, height)
        ctx.fill()

        // Draw sun icon
        ctx.fillStyle = "#facc15"
        ctx.beginPath()
        ctx.arc(width * 0.2, height * 0.1, 15, 0, Math.PI * 2)
        ctx.fill()

        // Cloudy area
        ctx.fillStyle = "rgba(148, 163, 184, 0.1)"
        ctx.beginPath()
        ctx.rect(width * 0.4, 0, width * 0.3, height)
        ctx.fill()

        // Rainy area
        ctx.fillStyle = "rgba(56, 189, 248, 0.1)"
        ctx.beginPath()
        ctx.rect(width * 0.7, 0, width * 0.3, height)
        ctx.fill()

        // Draw rain drops
        ctx.fillStyle = "#38bdf8"
        for (let i = 0; i < 20; i++) {
          const x = width * 0.7 + Math.random() * width * 0.3
          const y = Math.random() * height
          ctx.beginPath()
          ctx.arc(x, y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw active ride if enabled
      if (activeRide) {
        // Draw pickup point
        ctx.fillStyle = "#2563eb"
        ctx.beginPath()
        ctx.arc(width * 0.2, height * 0.2, 10, 0, Math.PI * 2)
        ctx.fill()

        // Add label
        ctx.fillStyle = mapType === "satellite" ? "#ffffff" : "#000000"
        ctx.font = "12px Arial"
        ctx.fillText("Pickup", width * 0.2 - 20, height * 0.2 - 15)

        // Draw dropoff point
        ctx.fillStyle = "#22c55e"
        ctx.beginPath()
        ctx.arc(width * 0.8, height * 0.8, 10, 0, Math.PI * 2)
        ctx.fill()

        // Add label
        ctx.fillStyle = mapType === "satellite" ? "#ffffff" : "#000000"
        ctx.font = "12px Arial"
        ctx.fillText("Dropoff", width * 0.8 - 20, height * 0.8 - 15)

        // Draw route
        ctx.strokeStyle = "#2563eb"
        ctx.lineWidth = 4
        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(width * 0.2, height * 0.2)
        ctx.lineTo(width * 0.2, height * 0.4)
        ctx.lineTo(width * 0.4, height * 0.4)
        ctx.lineTo(width * 0.4, height * 0.6)
        ctx.lineTo(width * 0.6, height * 0.6)
        ctx.lineTo(width * 0.6, height * 0.8)
        ctx.lineTo(width * 0.8, height * 0.8)
        ctx.stroke()

        // Draw car on route
        const carPosition = position / 100
        let carX, carY

        if (carPosition < 0.14) {
          // First segment (vertical)
          carX = width * 0.2
          carY = height * (0.2 + carPosition * 1.4)
        } else if (carPosition < 0.28) {
          // Second segment (horizontal)
          carX = width * (0.2 + (carPosition - 0.14) * 1.4)
          carY = height * 0.4
        } else if (carPosition < 0.42) {
          // Third segment (vertical)
          carX = width * 0.4
          carY = height * (0.4 + (carPosition - 0.28) * 1.4)
        } else if (carPosition < 0.56) {
          // Fourth segment (horizontal)
          carX = width * (0.4 + (carPosition - 0.42) * 1.4)
          carY = height * 0.6
        } else if (carPosition < 0.7) {
          // Fifth segment (vertical)
          carX = width * 0.6
          carY = height * (0.6 + (carPosition - 0.56) * 1.4)
        } else {
          // Sixth segment (horizontal)
          carX = width * (0.6 + (carPosition - 0.7) * 1.4)
          carY = height * 0.8
        }

        // Draw car
        ctx.fillStyle = "#2563eb"
        ctx.beginPath()
        ctx.arc(carX, carY, 8, 0, Math.PI * 2)
        ctx.fill()

        // Draw pulse effect around car
        ctx.strokeStyle = "#2563eb"
        ctx.lineWidth = 2
        ctx.setLineDash([2, 2])
        ctx.beginPath()
        ctx.arc(carX, carY, 12 + Math.sin(position / 5) * 3, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Draw random cabs
      for (let i = 0; i < 10; i++) {
        const x = (i * width) / 10 + Math.sin((position + i * 10) / 10) * 20
        const y = (i % 2 === 0 ? 0.3 : 0.7) * height + Math.cos((position + i * 10) / 10) * 20

        ctx.fillStyle = i % 3 === 0 ? "#2563eb" : i % 3 === 1 ? "#f97316" : "#22c55e"
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const animate = () => {
      // Update position for animations
      setPosition((prev) => (prev + 0.5) % 100)

      // Draw map
      drawMap()

      // Request next animation frame
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mapType, showTraffic, showAvailability, showWeather, activeRide, position])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="w-full h-full" />

      {showWeather && (
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-md flex items-center gap-1">
            <Sun className="h-4 w-4 text-yellow-400" />
            <span className="text-xs">28°C</span>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-md flex items-center gap-1">
            <Cloud className="h-4 w-4 text-gray-400" />
            <span className="text-xs">24°C</span>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 p-2 rounded-md flex items-center gap-1">
            <CloudRain className="h-4 w-4 text-blue-400" />
            <span className="text-xs">19°C</span>
          </div>
        </div>
      )}
    </div>
  )
}

