"use client"

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

export function SavingsOpportunityChart() {
  const data = [
    { time: "6 AM", actual: 15, optimal: 12 },
    { time: "9 AM", actual: 22, optimal: 16 },
    { time: "12 PM", actual: 18, optimal: 15 },
    { time: "3 PM", actual: 16, optimal: 14 },
    { time: "6 PM", actual: 24, optimal: 18 },
    { time: "9 PM", actual: 20, optimal: 17 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="time" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
        <Legend />
        <Area type="monotone" dataKey="actual" name="Actual Cost" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
        <Area type="monotone" dataKey="optimal" name="Optimal Cost" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

