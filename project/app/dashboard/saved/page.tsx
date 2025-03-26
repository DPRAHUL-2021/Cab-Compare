"use client"

import { useState } from "react"
import { Clock, Edit, MoreHorizontal, Plus, Star, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SavedRoutesPage() {
  const [savedRoutes, setSavedRoutes] = useState([
    {
      id: 1,
      name: "Home to Hitech City",
      pickup: "Madhapur",
      dropoff: "Hitech City",
      distance: "3.8 km",
      avgPrice: "₹120",
      favorite: true,
      lastUsed: "2 days ago",
    },
    {
      id: 2,
      name: "Office to Jubilee Hills",
      pickup: "Hitech City",
      dropoff: "Jubilee Hills Check Post",
      distance: "5.5 km",
      avgPrice: "₹160",
      favorite: false,
      lastUsed: "5 days ago",
    },
    {
      id: 3,
      name: "Home to RGIA Airport",
      pickup: "Gachibowli",
      dropoff: "Rajiv Gandhi International Airport",
      distance: "30 km",
      avgPrice: "₹850",
      favorite: true,
      lastUsed: "1 week ago",
    },
    {
      id: 4,
      name: "Hitech City to IKEA",
      pickup: "Hitech City",
      dropoff: "IKEA Hyderabad",
      distance: "3.2 km",
      avgPrice: "₹110",
      favorite: false,
      lastUsed: "2 weeks ago",
    },
    {
      id: 5,
      name: "Madhapur to Inorbit Mall",
      pickup: "Madhapur",
      dropoff: "Inorbit Mall",
      distance: "2 km",
      avgPrice: "₹90",
      favorite: false,
      lastUsed: "1 month ago",
    },
    {
      id: 6,
      name: "Gachibowli to Botanical Garden",
      pickup: "Gachibowli",
      dropoff: "Kondapur Botanical Garden",
      distance: "4.1 km",
      avgPrice: "₹130",
      favorite: true,
      lastUsed: "4 days ago",
    },
    
  ])

  const [openDialog, setOpenDialog] = useState(false)
  const [newRoute, setNewRoute] = useState({
    name: "",
    pickup: "",
    dropoff: "",
  })

  const handleAddRoute = () => {
    const newId = savedRoutes.length > 0 ? Math.max(...savedRoutes.map((route) => route.id)) + 1 : 1

    setSavedRoutes([
      ...savedRoutes,
      {
        id: newId,
        name: newRoute.name,
        pickup: newRoute.pickup,
        dropoff: newRoute.dropoff,
        distance: "0.0 miles",
        avgPrice: "$0.00",
        favorite: false,
        lastUsed: "Never",
      },
    ])

    setNewRoute({
      name: "",
      pickup: "",
      dropoff: "",
    })

    setOpenDialog(false)
  }

  const toggleFavorite = (id: number) => {
    setSavedRoutes(savedRoutes.map((route) => (route.id === id ? { ...route, favorite: !route.favorite } : route)))
  }

  const deleteRoute = (id: number) => {
    setSavedRoutes(savedRoutes.filter((route) => route.id !== id))
  }

  return (
    // <DashboardLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Saved Routes</h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Route
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Route</DialogTitle>
                <DialogDescription>Save a route for quick access and comparison.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Route Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Home to Work"
                    value={newRoute.name}
                    onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input
                    id="pickup"
                    placeholder="Enter pickup address"
                    value={newRoute.pickup}
                    onChange={(e) => setNewRoute({ ...newRoute, pickup: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dropoff">Dropoff Location</Label>
                  <Input
                    id="dropoff"
                    placeholder="Enter destination address"
                    value={newRoute.dropoff}
                    onChange={(e) => setNewRoute({ ...newRoute, dropoff: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddRoute}>Save Route</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {savedRoutes.map((route) => (
            <Card key={route.id} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{route.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(route.id)}>
                      <Star
                        className={`h-4 w-4 ${
                          route.favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                      <span className="sr-only">{route.favorite ? "Remove from favorites" : "Add to favorites"}</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Route
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteRoute(route.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Route
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardDescription>Last used {route.lastUsed}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    <p className="text-sm">{route.pickup}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex flex-col items-center">
                      <div className="w-0.5 h-4 bg-muted-foreground/30" />
                    </div>
                    <p className="text-xs text-muted-foreground">{route.distance}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 flex justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <p className="text-sm">{route.dropoff}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Avg. price: {route.avgPrice}</span>
                </div>
                <Button size="sm">Compare Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    // {/* </DashboardLayout> */}
  )
}

