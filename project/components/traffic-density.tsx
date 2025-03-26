"use client"

import { useEffect, useState } from "react"

export function TrafficDensity() {
  const [trafficData, setTrafficData] = useState([
    { id: 1, label: "Low", value: 20, color: "#22c55e" },
    { id: 2, label: "Medium", value: 45, color: "#f59e0b" },
    { id: 3, label: "High", value: 35, color: "#ef4444" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficData((prev) => {
        return prev.map((item) => {
          // Random fluctuation between -3 and +3
          const fluctuation = Math.floor(Math.random() * 7) - 3
          const newValue = Math.min(Math.max(item.value + fluctuation, 10), 70)
          return { ...item, value: newValue }
        })
      })
    }, 3000)

    return () => clearInterval(interval)
  }, []) // Empty dependency array to run only once

  return (
    <div className="flex items-end justify-between h-[120px] gap-4">
      {trafficData.map((item) => (
        <div key={item.id} className="flex flex-col items-center flex-1">
          <div
            className="w-full rounded-t-sm transition-all duration-700 ease-in-out"
            style={{
              height: `${item.value}%`,
              backgroundColor: item.color,
            }}
          />
          <div className="mt-2 text-center">
            <p className="text-xs font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.value}%</p>
          </div>
        </div>
      ))}
    </div>
  )
}

