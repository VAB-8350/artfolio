'use client'
import { useIsMobile } from "@/hooks/use-mobile"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import InnerImageZoom from 'react-inner-image-zoom'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation';

import './ImagesOfPaintPage.css'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css'
import { useEffect, useRef, useState } from "react"
import { colors } from '@/config.json'
import { ChevronDown, ChevronUp } from "lucide-react"

export default function ImagesOfPaintPage({images}) {

  const [activeImg, setActiveImg] = useState(images[0].url)
  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    setMounted(false)
    setTimeout(() => {
      setMounted(true)
    }, 100)
    }, [isMobile])

  if (!isMobile && mounted) {
    return (
      <div className="h-full flex gap-5">

        <div className="w-24 max-h-full flex flex-col">
          <button ref={prevRef} className="mx-auto z-20 order-1 disabled:opacity-30">
            <ChevronUp size={40} />
          </button>
          <button ref={nextRef} className="mx-auto z-20 order-3 disabled:opacity-30">
            <ChevronDown size={40} />
          </button>
          <Swiper
            slidesPerView={'auto'}
            slidesPerGroup={3}
            direction={'vertical'}
            className="min-w-24 max-w-24 order-2"
            modules={[Navigation]}
            // centeredSlides={true}
            slideToClickedSlide={true}
            navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
            }}
            onSwiper={(swiper) => {
              // Actualiza las referencias de los botones una vez que el swiper esté inicializado
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              swiperRef.current = swiper;
          }}
          >
            {
              images?.map((paint, index) => (
                <SwiperSlide key={paint.url} className='flex items-center max-h-24'>
                  <button
                    onClick={() => {setActiveImg(paint.url);swiperRef.current.slideTo(index)}}
                    className={`${activeImg === paint.url? 'scale-100 opacity-100' : 'scale-75 opacity-60'} transition-all duration-300`}
                  >
                    <img
                      src={paint.url}
                      alt="paint"
                      className="min-w-24 max-w-24 min-h-24 object-cover rounded-xl shadow-lg hover:shadow-2xl duration-300"
                    />
                  </button>
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className="w-full relative" id="paint-images">
          <InnerImageZoom
              src={activeImg}
              alt='Image of paint'
              className='w-full h-full paint-images-zoom rounded-2xl'
              imgAttributes={{
                className: 'object-cover',
              }}
              zoomType="click"
            />
          <img src={activeImg} alt="paint" className="w-full h-full object-cover absolute inset-0 blur-xl -z-10 opacity-75" />
        </div>
      </div>
    )
  }

  return (
    mounted &&
    <Swiper
      slidesPerView={'auto'}
      centeredSlides={true}
      spaceBetween={10}
      id='paint-images'
      style={{
        '--navigation-color': colors.primary,
      }}
    >
      {
        images?.map(paint => (
          <SwiperSlide key={paint.url} className='flex items-center'>
            <InnerImageZoom
              src={paint.url}
              alt='Image of paint'
              className='bg-black/10 backdrop-blur-sm rounded-2xl w-full lg:h-full aspect-square paint-images-zoom'
              zoomType="click"
              fullscreenOnMobile={true}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
