"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface PriceChartProps {
  weekly?: boolean
  monthly?: boolean
}

export function PriceChart({ weekly, monthly }: PriceChartProps) {
  const hourlyData = [
    { time: "6 AM", uber: 8.5, ola: 7.8, rapido: 9.2 },
    { time: "8 AM", uber: 14.2, ola: 12.5, rapido: 16.8 },
    { time: "10 AM", uber: 11.7, ola: 10.3, rapido: 13.5 },
    { time: "12 PM", uber: 10.9, ola: 9.6, rapido: 12.1 },
    { time: "2 PM", uber: 9.8, ola: 8.7, rapido: 11.4 },
    { time: "4 PM", uber: 13.5, ola: 11.9, rapido: 15.2 },
    { time: "6 PM", uber: 17.8, ola: 15.6, rapido: 19.5 },
    { time: "8 PM", uber: 15.2, ola: 13.4, rapido: 17.1 },
    { time: "10 PM", uber: 12.3, ola: 10.8, rapido: 14.6 },
  ]
  
  const weeklyData = [
    { day: "Mon", uber: 11.2, ola: 9.8, rapido: 13.1 },
    { day: "Tue", uber: 10.5, ola: 9.2, rapido: 12.4 },
    { day: "Wed", uber: 12.1, ola: 10.7, rapido: 14.3 },
    { day: "Thu", uber: 14.3, ola: 12.6, rapido: 16.2 },
    { day: "Fri", uber: 16.8, ola: 14.9, rapido: 18.7 },
    { day: "Sat", uber: 18.5, ola: 16.4, rapido: 20.1 },
    { day: "Sun", uber: 15.2, ola: 13.5, rapido: 17.3 },
  ]
  
  const monthlyData = [
    { week: "Week 1", uber: 12.3, ola: 10.8, rapido: 14.1 },
    { week: "Week 2", uber: 13.1, ola: 11.5, rapido: 15.2 },
    { week: "Week 3", uber: 14.7, ola: 13.0, rapido: 16.5 },
    { week: "Week 4", uber: 15.4, ola: 13.6, rapido: 17.2 },
  ]

  const data = monthly ? monthlyData : weekly ? weeklyData : hourlyData
  const dataKey = monthly ? "week" : weekly ? "day" : "time"

  return (
    <div className="h-[400px] w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <XAxis 
            dataKey={dataKey}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <Tooltip 
            formatter={(value) => [`$${value}`, {
              uber: "Uber",
              ola: "Ola",
              rapido: "Rapido"
            }[value as string]]}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="uber"
            stroke="#3b82f6"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Uber"
          />
          <Line
            type="monotone"
            dataKey="ola"
            stroke="#f97316"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Ola"
          />
          <Line
            type="monotone"
            dataKey="rapido"
            stroke="#22c55e"
            strokeWidth={2}
            activeDot={{ r: 6 }}
            name="Rapido"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}