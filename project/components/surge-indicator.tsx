"use client"

import { useEffect, useState } from "react"

export function SurgeIndicator() {
  const [surgeValue, setSurgeValue] = useState(59)

  useEffect(() => {
    const interval = setInterval(() => {
      // Random fluctuation between -3 and +3
      const fluctuation = Math.floor(Math.random() * 7) - 3
      setSurgeValue((prev) => {
        const newValue = prev + fluctuation
        return Math.min(Math.max(newValue, 0), 100) // Keep between 0 and 100
      })
    }, 3000)

    return () => clearInterval(interval)
  }, []) // Empty dependency array to run only once

  // Determine color based on surge value
  const getColor = () => {
    if (surgeValue < 30) return "#22c55e" // Green
    if (surgeValue < 70) return "#f59e0b" // Yellow/Orange
    return "#ef4444" // Red
  }

  const color = getColor()
  const riskLevel = surgeValue < 30 ? "Low" : surgeValue < 70 ? "Moderate" : "High"
  const message =
    surgeValue < 30
      ? "Good time to book"
      : surgeValue < 70
        ? "Consider booking soon"
        : "Wait for better rates if possible"

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeDasharray={`${surgeValue * 2.83} 283`}
            strokeLinecap="round"
            className="transition-all duration-700 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold" style={{ color }}>
            {surgeValue}%
          </span>
          <span className="text-xs text-muted-foreground">Probability</span>
        </div>
      </div>
      <div className="mt-2 text-center">
        <p className="text-sm font-medium" style={{ color }}>
          {riskLevel} Surge Risk
        </p>
        <p className="text-xs text-muted-foreground mt-1">{message}</p>
      </div>
    </div>
  )
}

