import Link from "next/link"
import { ArrowRight, Car, Clock, CreditCard, MapPin, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPreview } from "@/components/map-preview"
import { PriceChart } from "@/components/price-chart"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { HowItWorks } from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CabCompare</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary" legacyBehavior>
              Login
            </Link>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
          <div className="container relative z-10">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Compare Cabs. See Live Traffic. <span className="text-primary">Save Big.</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Real-time price & travel estimation on an interactive map. Compare fares across Uber, Ola, and Rapido
                  instantly.
                </p>
                <div className="mt-4 space-y-4 rounded-xl bg-card p-4 shadow-lg">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="pickup" className="text-sm font-medium">
                        Pickup Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="pickup" placeholder="Enter pickup location" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="dropoff" className="text-sm font-medium">
                        Drop Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="dropoff" placeholder="Enter drop location" className="pl-10" />
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">
                        Date & Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="date" type="datetime-local" className="pl-10" />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full group relative overflow-hidden transition-all duration-300">
                        <span className="relative z-10">Compare Now</span>
                        <span className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 rounded-md"></span>
                        <span className="absolute inset-0 scale-0 rounded-full bg-primary/20 group-hover:scale-150 transition-all duration-500"></span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md overflow-hidden rounded-xl border shadow-xl">
                  <MapPreview />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                    <Button className="bg-background/80 backdrop-blur-sm hover:bg-background/90">
                      Try Live Comparison
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Powerful Features for Smart Commuters
              </h2>
              <p className="mt-4 text-muted-foreground">
                Compare prices, check ETAs, and make informed decisions with our comprehensive toolset.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-6">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <CardTitle>Real-Time Fare Comparison</CardTitle>
                  <CardDescription>
                    Compare prices across multiple cab services instantly and find the best deal.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-6">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Clock className="h-5 w-5" />
                  </div>
                  <CardTitle>Live ETA & Traffic Overlays</CardTitle>
                  <CardDescription>See real-time traffic conditions and accurate arrival estimates.</CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-6">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <CardTitle>Surge Pricing Alerts</CardTitle>
                  <CardDescription>
                    Get notified when prices drop or surge, so you can book at the right time.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="p-6">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Car className="h-5 w-5" />
                  </div>
                  <CardTitle>Best Value Suggestions</CardTitle>
                  <CardDescription>Smart recommendations based on price, ETA, and comfort preferences.</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
              <p className="mt-4 text-muted-foreground">Three simple steps to find the best cab for your journey.</p>
            </div>
            <HowItWorks />
          </div>
        </section>

        <section className="py-20">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Price Fluctuation Trends</h2>
              <p className="mt-4 text-muted-foreground">
                See how cab prices change throughout the day and plan your trips accordingly.
              </p>
            </div>
            <div className="mx-auto max-w-6xl">
              <Tabs defaultValue="daily" className="w-full">
                <div className="flex justify-center mb-6">
                  <TabsList className="bg-muted/50 p-1 h-auto">
                    <TabsTrigger
                      value="daily"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-md"
                    >
                      Daily Trends
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-md"
                    >
                      Weekly Trends
                    </TabsTrigger>
                    <TabsTrigger
                      value="monthly"
                      className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 rounded-md"
                    >
                      Monthly Trends
                    </TabsTrigger>
                  </TabsList>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                  <TabsContent value="daily" className="mt-0 p-0">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Daily Price Comparison</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Uber</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                            <span>Ola</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Rapido</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-[400px]">
                        <PriceChart />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="weekly" className="mt-0 p-0">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Weekly Price Comparison</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Uber</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                            <span>Ola</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Rapido</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-[400px]">
                        <PriceChart weekly />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="monthly" className="mt-0 p-0">
                    <div className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Monthly Price Comparison</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-primary" />
                            <span>Uber</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                            <span>Ola</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span>Rapido</span>
                          </div>
                        </div>
                      </div>
                      <div className="h-[400px]">
                        <PriceChart monthly />
                      </div>
                    </div>
                  </TabsContent>
                </div>

                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <p>Data updated in real-time. Prices may vary based on demand and traffic conditions.</p>
                </div>
              </Tabs>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of satisfied users who save time and money with CabCompare.
              </p>
            </div>
            <TestimonialCarousel />
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Start Saving?</h2>
              <p className="mt-4 text-primary-foreground/80">
                Join thousands of smart commuters who save time and money every day.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/demo">Watch Demo</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/30">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Car className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">CabCompare</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Compare cab fares, ETAs, and travel durations in real-time across multiple services.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CabCompare. All rights reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

