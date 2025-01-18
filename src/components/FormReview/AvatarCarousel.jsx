'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AvatarCarousel({setValue}) {
  const itemsRef = React.useRef([])

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const avatar = entry.target.getAttribute('data-avatar')
          setValue('avatarOption', parseInt(avatar))
        }
      })
    }, { threshold: 0.5 }) // Adjust threshold as needed

    itemsRef.current.forEach(item => {
      if (item) {
        observer.observe(item)
      }
    })

    return () => {
      itemsRef.current.forEach(item => {
        if (item) {
          observer.unobserve(item)
        }
      })
    }
  }, [])

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} ref={el => itemsRef.current[index] = el} data-avatar={`${index + 1}`}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious type="button" />
      <CarouselNext type="button" />
    </Carousel>
  )
}
