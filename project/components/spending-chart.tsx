"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

export function SpendingChart() {
  const data = [
    { date: "Mar 1", uber: 25, ola: 18, rapido: 12 },
    { date: "Mar 5", uber: 32, ola: 22, rapido: 15 },
    { date: "Mar 10", uber: 18, ola: 16, rapido: 10 },
    { date: "Mar 15", uber: 29, ola: 24, rapido: 18 },
    { date: "Mar 20", uber: 35, ola: 28, rapido: 20 },
    { date: "Mar 25", uber: 22, ola: 19, rapido: 15 },
    { date: "Mar 30", uber: 28, ola: 21, rapido: 17 },
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
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
        <Legend />
        <Bar dataKey="uber" name="Uber" fill="#2563eb" radius={[4, 4, 0, 0]} />
        <Bar dataKey="ola" name="Ola" fill="#f97316" radius={[4, 4, 0, 0]} />
        <Bar dataKey="rapido" name="Rapido" fill="#22c55e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

