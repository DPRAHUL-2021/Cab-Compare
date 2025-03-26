"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

export function ServiceComparisonChart() {
  const data = [
    { name: "Uber", value: 65 },
    { name: "Ola", value: 25 },
    { name: "Rapido", value: 10 },
  ]

  const COLORS = ["#2563eb", "#f97316", "#22c55e"]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Usage"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

