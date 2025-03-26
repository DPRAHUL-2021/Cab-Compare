"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function RideFrequencyChart() {
  const data = [
    { day: "Mon", rides: 8 },
    { day: "Tue", rides: 5 },
    { day: "Wed", rides: 4 },
    { day: "Thu", rides: 6 },
    { day: "Fri", rides: 9 },
    { day: "Sat", rides: 7 },
    { day: "Sun", rides: 3 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip formatter={(value) => [value, "Rides"]} />
        <Bar dataKey="rides" name="Rides" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

