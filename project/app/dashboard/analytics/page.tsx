"use client"

import { useState } from "react"
import { BarChart, Calendar, Clock, DollarSign, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SpendingChart } from "@/components/spending-chart"
import { RideFrequencyChart } from "@/components/ride-frequency-chart"
import { ServiceComparisonChart } from "@/components/service-comparison-chart"
import { SavingsOpportunityChart } from "@/components/savings-opportunity-chart"

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState("30days")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <Select value={timePeriod} onValueChange={setTimePeriod}>
          <SelectTrigger className="w-[180px]">
            <Calendar className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹549.25</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rides Taken</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+4 rides from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Cost</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹19.62</div>
            <p className="text-xs text-muted-foreground">+₹1.25 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Savings</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹87.50</div>
            <p className="text-xs text-muted-foreground">Based on optimal booking times</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending Over Time</CardTitle>
            <CardDescription>Your ride expenses over the selected period</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SpendingChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ride Frequency</CardTitle>
            <CardDescription>Number of rides by day of week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <RideFrequencyChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Comparison</CardTitle>
            <CardDescription>Cost comparison across different services</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ServiceComparisonChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Savings Opportunities</CardTitle>
            <CardDescription>Potential savings based on booking patterns</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SavingsOpportunityChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ride Insights</CardTitle>
          <CardDescription>Key insights and recommendations based on your ride history</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="savings">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="savings">Savings Tips</TabsTrigger>
              <TabsTrigger value="patterns">Usage Patterns</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="savings" className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Book During Off-Peak Hours</h4>
                  <p className="text-sm text-muted-foreground">
                    Booking between 1-4 PM on weekdays could save you up to 15% on your regular routes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Avoid Surge Pricing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your most common route experiences surge pricing on Friday evenings. Consider booking 30 minutes
                    earlier.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Try Alternative Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Switching to Ola for your morning commute could save you approximately ₹35.0 per ride.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="patterns" className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <BarChart className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Peak Usage Times</h4>
                  <p className="text-sm text-muted-foreground">
                    You most frequently book rides on Monday mornings and Friday evenings.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Service Preferences</h4>
                  <p className="text-sm text-muted-foreground">
                    You've used Uber for 65% of your rides, followed by Ola (25%) and Rapido (10%).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Spending Trends</h4>
                  <p className="text-sm text-muted-foreground">
                    Your average ride cost has increased by 8% over the last three months.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="recommendations" className="space-y-4 mt-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Consider a Subscription</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on your usage, an Uber Pass subscription could save you ₹35 per month.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Schedule Regular Rides</h4>
                  <p className="text-sm text-muted-foreground">
                    Pre-scheduling your Monday morning commute could save time and lock in lower rates.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-2">
                  <TrendingDown className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Route Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    A slight adjustment to your pickup location could reduce your average ride cost by 12%.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

