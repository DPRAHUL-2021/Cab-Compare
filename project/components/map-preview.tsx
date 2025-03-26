"use client"

import { useEffect, useRef } from "react"

export function MapPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw map background
    ctx.fillStyle = "#f3f4f6"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw roads
    ctx.strokeStyle = "#d1d5db"
    ctx.lineWidth = 8

    // Horizontal roads
    ctx.beginPath()
    ctx.moveTo(0, canvas.height * 0.3)
    ctx.lineTo(canvas.width, canvas.height * 0.3)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, canvas.height * 0.7)
    ctx.lineTo(canvas.width, canvas.height * 0.7)
    ctx.stroke()

    // Vertical roads
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.25, 0)
    ctx.lineTo(canvas.width * 0.25, canvas.height)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.75, 0)
    ctx.lineTo(canvas.width * 0.75, canvas.height)
    ctx.stroke()

    // Draw route
    ctx.strokeStyle = "#2563eb"
    ctx.lineWidth = 4
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(canvas.width * 0.25, canvas.height * 0.3)
    ctx.lineTo(canvas.width * 0.75, canvas.height * 0.3)
    ctx.lineTo(canvas.width * 0.75, canvas.height * 0.7)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw pickup point
    ctx.fillStyle = "#2563eb"
    ctx.beginPath()
    ctx.arc(canvas.width * 0.25, canvas.height * 0.3, 8, 0, Math.PI * 2)
    ctx.fill()

    // Draw dropoff point
    ctx.fillStyle = "#22c55e"
    ctx.beginPath()
    ctx.arc(canvas.width * 0.75, canvas.height * 0.7, 8, 0, Math.PI * 2)
    ctx.fill()

    // Animate cars
    let position = 0
    const animate = () => {
      // Clear previous cars
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Redraw map
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Redraw roads
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 8

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.3)
      ctx.lineTo(canvas.width, canvas.height * 0.3)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, canvas.height * 0.7)
      ctx.lineTo(canvas.width, canvas.height * 0.7)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.25, 0)
      ctx.lineTo(canvas.width * 0.25, canvas.height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.75, 0)
      ctx.lineTo(canvas.width * 0.75, canvas.height)
      ctx.stroke()

      // Redraw route
      ctx.strokeStyle = "#2563eb"
      ctx.lineWidth = 4
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.25, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.75, canvas.height * 0.3)
      ctx.lineTo(canvas.width * 0.75, canvas.height * 0.7)
      ctx.stroke()
      ctx.setLineDash([])

      // Redraw pickup point
      ctx.fillStyle = "#2563eb"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.25, canvas.height * 0.3, 8, 0, Math.PI * 2)
      ctx.fill()

      // Redraw dropoff point
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.75, canvas.height * 0.7, 8, 0, Math.PI * 2)
      ctx.fill()

      // Calculate car positions
      position = (position + 0.5) % 100

      // Draw car 1 (horizontal road)
      const car1X = (canvas.width * position) / 100
      const car1Y = canvas.height * 0.3

      ctx.fillStyle = "#2563eb"
      ctx.beginPath()
      ctx.arc(car1X, car1Y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw car 2 (vertical road)
      const car2X = canvas.width * 0.75
      const car2Y = (canvas.height * position) / 100

      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(car2X, car2Y, 5, 0, Math.PI * 2)
      ctx.fill()

      // Draw car on route
      let routePosition
      if (position < 50) {
        // First leg of the route (horizontal)
        const routeX = canvas.width * 0.25 + (canvas.width * 0.5 * position) / 50
        const routeY = canvas.height * 0.3

        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.arc(routeX, routeY, 6, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Second leg of the route (vertical)
        const adjustedPosition = position - 50
        const routeX = canvas.width * 0.75
        const routeY = canvas.height * 0.3 + (canvas.height * 0.4 * adjustedPosition) / 50

        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.arc(routeX, routeY, 6, 0, Math.PI * 2)
        ctx.fill()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [])

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

