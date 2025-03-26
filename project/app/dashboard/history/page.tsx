"use client"

import { useState } from "react"
import { Calendar, Car, Download, Filter, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const rideHistory = [
    {
      id: "RID-1234",
      date: "Mar 24, 2025",
      time: "9:30 AM",
      service: "Uber",
      pickup: "Inorbit Mall",
      dropoff: "Madhapur",
      price: "₹180",
      status: "Completed",
    },
    {
      id: "RID-1235",
      date: "Mar 22, 2025",
      time: "2:15 PM",
      service: "Ola",
      pickup: "Kukatpally Metro Station",
      dropoff: "Hitech City",
      price: "₹240",
      status: "Completed",
    },
    {
      id: "RID-1236",
      date: "Mar 20, 2025",
      time: "7:45 PM",
      service: "Rapido",
      pickup: "Gachibowli",
      dropoff: "RGIA Airport",
      price: "₹850",
      status: "Completed",
    },
    {
      id: "RID-1237",
      date: "Mar 18, 2025",
      time: "11:20 AM",
      service: "Uber",
      pickup: "Banjara Hills",
      dropoff: "Hussain Sagar",
      price: "₹150",
      status: "Cancelled",
    },
    {
      id: "RID-1238",
      date: "Mar 15, 2025",
      time: "8:00 AM",
      service: "Ola",
      pickup: "Kondapur",
      dropoff: "Hitech City",
      price: "₹125",
      status: "Completed",
    },
    {
      id: "RID-1239",
      date: "Mar 12, 2025",
      time: "6:30 PM",
      service: "Rapido",
      pickup: "Financial District",
      dropoff: "Gachibowli",
      price: "₹100",
      status: "Completed",
    },
    {
      id: "RID-1240",
      date: "Mar 10, 2025",
      time: "9:15 PM",
      service: "Uber",
      pickup: "Begumpet",
      dropoff: "Secunderabad Railway Station",
      price: "₹210",
      status: "Completed",
    },    
  ]

  const filteredRides = rideHistory.filter(
    (ride) =>
      ride.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ride.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    // <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Ride History</h1>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Total Rides</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">{rideHistory.length}</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Total Spent</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">
                ₹{rideHistory.reduce((sum, ride) => sum + Number.parseFloat(ride.price.replace("₹", "")), 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-base">Average Ride Cost</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-3xl font-bold">
                ₹
                {(
                  rideHistory.reduce((sum, ride) => sum + Number.parseFloat(ride.price.replace("₹", "")), 0) /
                  rideHistory.length
                ).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Your Past Rides</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search rides..."
                    className="pl-9 w-full sm:w-[200px] md:w-[300px]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[130px]">
                      <Calendar className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Time Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem checked>Uber</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Ola</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Rapido</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Completed</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem checked>Cancelled</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="list" className="w-full">
              <div className="px-4 md:px-6">
                <TabsList className="grid w-full max-w-[400px] grid-cols-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="list" className="mt-0">
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ride ID</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Route</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredRides.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No rides found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredRides.map((ride) => (
                            <TableRow key={ride.id}>
                              <TableCell className="font-medium">{ride.id}</TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <span>{ride.date}</span>
                                  <span className="text-xs text-muted-foreground">{ride.time}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Car className="h-4 w-4 text-muted-foreground" />
                                  <span>{ride.service}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-primary" />
                                    <span className="text-xs">{ride.pickup}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3 w-3 text-green-500" />
                                    <span className="text-xs">{ride.dropoff}</span>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{ride.price}</TableCell>
                              <TableCell>
                                <Badge variant={ride.status === "Completed" ? "default" : "destructive"}>
                                  {ride.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">
                                  View Details
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="calendar" className="mt-0 p-4 md:p-6">
                <div className="flex items-center justify-center h-[400px] border rounded-md bg-muted/20">
                  <div className="text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-medium">Calendar View</h3>
                    <p className="text-sm text-muted-foreground">Calendar view is coming soon.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    // </DashboardLayout>
  )
}

