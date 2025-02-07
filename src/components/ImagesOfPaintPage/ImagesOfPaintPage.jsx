'use client'
import { useIsMobile } from "@/hooks/use-mobile"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import InnerImageZoom from 'react-inner-image-zoom';

// Import Swiper styles
import 'swiper/css';

import './ImagesOfPaintPage.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { useEffect, useState } from "react";


export default function ImagesOfPaintPage({images}) {

  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    setMounted(false)
    setTimeout(() => {
      setMounted(true)
    }, 100)
    }, [isMobile])

  return (
    mounted &&
    <Swiper
      slidesPerView={isMobile ? 'auto' : 1}
      centeredSlides={true}
      spaceBetween={isMobile ? 10 : 30}
      loop={true}
      id='paint-images'
    >
      {
        images?.map(paint => (
          <SwiperSlide key={paint.url} className='flex items-center'>
            <InnerImageZoom
              src={paint.url}
              alt='Image of paint'
              className='bg-black/10 backdrop-blur-sm rounded-2xl w-full h-full paint-images-zoom'
              zoomType="click"
              fullscreenOnMobile={true}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
