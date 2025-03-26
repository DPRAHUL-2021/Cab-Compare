"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TestimonialCarousel() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Daily Commuter",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "CabCompare has saved me over $200 in the last month alone! I love being able to see all my options at once and choose the best value ride.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Traveler",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "As someone who travels for work, this app is a game-changer. The surge predictions have helped me avoid peak pricing countless times.",
      rating: 5,
    },
    {
      id: 3,
      name: "Priya Patel",
      role: "Student",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "On a student budget, every dollar counts. CabCompare helps me find the most affordable rides without compromising on safety or convenience.",
      rating: 4,
    },
    {
      id: 4,
      name: "David Wilson",
      role: "Urban Explorer",
      avatar: "/placeholder.svg?height=80&width=80",
      content:
        "The traffic overlay feature is incredibly accurate! I can see which routes are congested and choose the fastest option every time.",
      rating: 5,
    },
  ]

  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState([])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setVisibleTestimonials([testimonials[activeIndex]])
      } else if (width < 1024) {
        setVisibleTestimonials([testimonials[activeIndex], testimonials[(activeIndex + 1) % testimonials.length]])
      } else {
        setVisibleTestimonials([
          testimonials[activeIndex],
          testimonials[(activeIndex + 1) % testimonials.length],
          testimonials[(activeIndex + 2) % testimonials.length],
        ])
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [activeIndex, testimonials])

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative">
      <div className="flex overflow-hidden gap-4 py-4">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="min-w-0 flex-1 transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mt-6 gap-2">
        <Button variant="outline" size="icon" className="rounded-full" onClick={prevSlide}>
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <div className="flex gap-1">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 p-0 rounded-full ${index === activeIndex ? "bg-primary" : "bg-muted"}`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </Button>
          ))}
        </div>
        <Button variant="outline" size="icon" className="rounded-full" onClick={nextSlide}>
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  )
}

