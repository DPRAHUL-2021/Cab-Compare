"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface FareTrendChartProps {
  daily?: boolean
  weekly?: boolean
}

export function FareTrendChart({ daily, weekly }: FareTrendChartProps) {
  const hourlyData = [
    { time: "Now", uber: 12, ola: 10, rapido: 14 },
    { time: "+1h", uber: 14, ola: 12, rapido: 16 },
    { time: "+2h", uber: 16, ola: 14, rapido: 18 },
    { time: "+3h", uber: 13, ola: 11, rapido: 15 },
    { time: "+4h", uber: 11, ola: 9, rapido: 13 },
    { time: "+5h", uber: 10, ola: 8, rapido: 12 },
  ]

  const dailyData = [
    { time: "Today", uber: 12, ola: 10, rapido: 14 },
    { time: "Tomorrow", uber: 13, ola: 11, rapido: 15 },
    { time: "Day 3", uber: 14, ola: 12, rapido: 16 },
    { time: "Day 4", uber: 12, ola: 10, rapido: 14 },
    { time: "Day 5", uber: 15, ola: 13, rapido: 17 },
  ]

  const weeklyData = [
    { time: "This Week", uber: 13, ola: 11, rapido: 15 },
    { time: "Next Week", uber: 14, ola: 12, rapido: 16 },
    { time: "Week 3", uber: 15, ola: 13, rapido: 17 },
    { time: "Week 4", uber: 13, ola: 11, rapido: 15 },
  ]

  const data = weekly ? weeklyData : daily ? dailyData : hourlyData

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 0,
        }}
      >
        <XAxis dataKey="time" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => [`$${value}`, "Price"]} />
        <Legend />
        <Area type="monotone" dataKey="uber" name="Uber" stroke="#2563eb" fill="#2563eb" fillOpacity={0.1} />
        <Area type="monotone" dataKey="ola" name="Ola" stroke="#f97316" fill="#f97316" fillOpacity={0.1} />
        <Area type="monotone" dataKey="rapido" name="Rapido" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

