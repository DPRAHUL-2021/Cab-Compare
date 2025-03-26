"use client"

import { useEffect, useRef } from "react"

export function DashboardMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Draw map function
    function drawMap() {
      const width = canvas.width
      const height = canvas.height

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Draw map background
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, width, height)

      // Draw grid
      ctx.strokeStyle = "#e5e7eb"
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
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = 12

      // Horizontal main roads
      ctx.beginPath()
      ctx.moveTo(0, height * 0.25)
      ctx.lineTo(width, height * 0.25)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, height * 0.5)
      ctx.lineTo(width, height * 0.5)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(0, height * 0.75)
      ctx.lineTo(width, height * 0.75)
      ctx.stroke()

      // Vertical main roads
      ctx.beginPath()
      ctx.moveTo(width * 0.2, 0)
      ctx.lineTo(width * 0.2, height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(width * 0.5, 0)
      ctx.lineTo(width * 0.5, height)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(width * 0.8, 0)
      ctx.lineTo(width * 0.8, height)
      ctx.stroke()

      // Draw secondary roads
      ctx.strokeStyle = "#e5e7eb"
      ctx.lineWidth = 6

      // Horizontal secondary roads
      for (let i = 0.1; i < 1; i += 0.15) {
        if (i === 0.25 || i === 0.5 || i === 0.75) continue // Skip main roads
        ctx.beginPath()
        ctx.moveTo(0, height * i)
        ctx.lineTo(width, height * i)
        ctx.stroke()
      }

      // Vertical secondary roads
      for (let i = 0.1; i < 1; i += 0.15) {
        if (i === 0.2 || i === 0.5 || i === 0.8) continue // Skip main roads
        ctx.beginPath()
        ctx.moveTo(width * i, 0)
        ctx.lineTo(width * i, height)
        ctx.stroke()
      }

      // Draw traffic
      // Red traffic (congested)
      ctx.strokeStyle = "#ef4444"
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(width * 0.2, height * 0.25)
      ctx.lineTo(width * 0.5, height * 0.25)
      ctx.stroke()

      // Yellow traffic (moderate)
      ctx.strokeStyle = "#f59e0b"
      ctx.lineWidth = 8
      ctx.beginPath()
      ctx.moveTo(width * 0.5, height * 0.5)
      ctx.lineTo(width * 0.8, height * 0.5)
      ctx.stroke()

      // Draw pickup point
      ctx.fillStyle = "#2563eb"
      ctx.beginPath()
      ctx.arc(width * 0.2, height * 0.25, 10, 0, Math.PI * 2)
      ctx.fill()

      // Add label
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText("Pickup", width * 0.2 - 20, height * 0.25 - 15)

      // Draw dropoff point
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(width * 0.8, height * 0.75, 10, 0, Math.PI * 2)
      ctx.fill()

      // Add label
      ctx.fillStyle = "#000000"
      ctx.font = "12px Arial"
      ctx.fillText("Dropoff", width * 0.8 - 20, height * 0.75 - 15)

      // Draw routes
      // Uber route
      ctx.strokeStyle = "#2563eb"
      ctx.lineWidth = 4
      ctx.setLineDash([])
      ctx.beginPath()
      ctx.moveTo(width * 0.2, height * 0.25)
      ctx.lineTo(width * 0.5, height * 0.25)
      ctx.lineTo(width * 0.5, height * 0.75)
      ctx.lineTo(width * 0.8, height * 0.75)
      ctx.stroke()

      // Ola route
      ctx.strokeStyle = "#f97316"
      ctx.lineWidth = 4
      ctx.setLineDash([5, 5])
      ctx.beginPath()
      ctx.moveTo(width * 0.2, height * 0.25)
      ctx.lineTo(width * 0.2, height * 0.5)
      ctx.lineTo(width * 0.8, height * 0.5)
      ctx.lineTo(width * 0.8, height * 0.75)
      ctx.stroke()

      // Rapido route
      ctx.strokeStyle = "#22c55e"
      ctx.lineWidth = 4
      ctx.setLineDash([10, 5])
      ctx.beginPath()
      ctx.moveTo(width * 0.2, height * 0.25)
      ctx.lineTo(width * 0.2, height * 0.75)
      ctx.lineTo(width * 0.8, height * 0.75)
      ctx.stroke()
    }

    // Animate cars
    let position = 0
    const animate = () => {
      position = (position + 0.5) % 100

      // Redraw map
      drawMap()

      // Draw Uber car
      let uberCarX, uberCarY
      if (position < 33) {
        // First leg
        uberCarX = canvas.width * 0.2 + (canvas.width * 0.3 * position) / 33
        uberCarY = canvas.height * 0.25
      } else if (position < 66) {
        // Second leg
        const adjustedPosition = position - 33
        uberCarX = canvas.width * 0.5
        uberCarY = canvas.height * 0.25 + (canvas.height * 0.5 * adjustedPosition) / 33
      } else {
        // Third leg
        const adjustedPosition = position - 66
        uberCarX = canvas.width * 0.5 + (canvas.width * 0.3 * adjustedPosition) / 34
        uberCarY = canvas.height * 0.75
      }

      ctx.fillStyle = "#2563eb"
      ctx.beginPath()
      ctx.arc(uberCarX, uberCarY, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw Ola car
      let olaCarX, olaCarY
      if (position < 25) {
        // First leg
        olaCarX = canvas.width * 0.2
        olaCarY = canvas.height * 0.25 + (canvas.height * 0.25 * position) / 25
      } else if (position < 75) {
        // Second leg
        const adjustedPosition = position - 25
        olaCarX = canvas.width * 0.2 + (canvas.width * 0.6 * adjustedPosition) / 50
        olaCarY = canvas.height * 0.5
      } else {
        // Third leg
        const adjustedPosition = position - 75
        olaCarX = canvas.width * 0.8
        olaCarY = canvas.height * 0.5 + (canvas.height * 0.25 * adjustedPosition) / 25
      }

      ctx.fillStyle = "#f97316"
      ctx.beginPath()
      ctx.arc(olaCarX, olaCarY, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw Rapido car
      let rapidoCarX, rapidoCarY
      if (position < 50) {
        // First leg
        rapidoCarX = canvas.width * 0.2
        rapidoCarY = canvas.height * 0.25 + (canvas.height * 0.5 * position) / 50
      } else {
        // Second leg
        const adjustedPosition = position - 50
        rapidoCarX = canvas.width * 0.2 + (canvas.width * 0.6 * adjustedPosition) / 50
        rapidoCarY = canvas.height * 0.75
      }

      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(rapidoCarX, rapidoCarY, 6, 0, Math.PI * 2)
      ctx.fill()

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

