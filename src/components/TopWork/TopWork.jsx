'use client'
import { useIsMobile } from "@/hooks/use-mobile"
import useLanguageInURL from '@/hooks/useLanguageInURL'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './TopWork.css';

// import required modules
import { Autoplay } from 'swiper/modules';
import Link from 'next/link'
import { useEffect, useState } from "react";

export default function TopWork({works, lang}) {

  const [mounted, setMounted] = useState(false)
  const isMobile = useIsMobile()
  const { addLangToURL } = useLanguageInURL()

  useEffect(() => {
    setMounted(false)
    setTimeout(() => {
      setMounted(true)
    }, 100)
  }, [isMobile])

  return (
    mounted &&
    <Swiper
      slidesPerView='auto'
      centeredSlides={true}
      spaceBetween={isMobile ? 20 : 30}
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: true,
      }}
      id='top-works'
    >
      {
        works.topWorks.map(work => (
          <SwiperSlide key={work._id}>
            <Link href={addLangToURL(`/paint/${work._id}`)}>
              <div className='relative shadow-lg rounded-[10px] overflow-hidden group'>
                <img src={work.images[0].url} alt={lang === 'es' ? work.titleSpanish : work.titleEnglish} className="group-hover:scale-110 duration-500 transition-scale" />

                <span className='absolute bottom-0 right-0 inline-block w-full h-full z-20 bg-[radial-gradient(circle_80px_at_95%_100%,#00000090,transparent)]' />
                <span className='absolute bottom-2 right-5 text-front-gray z-30 font-poppins text-base'>{work.year}</span>
              </div>

              <div>
                <h3 className='font-poppins text-xl text-front-text mt-2 line-clamp-1 overflow-hidden text-ellipsis'>
                  { lang === 'es' ? work.titleSpanish : work.titleEnglish }
                </h3>
                <p className='font-poppins text-sm text-front-text font-extralight line-clamp-3 overflow-hidden text-ellipsis text-pretty'>
                  {lang === 'es' ? work.descriptionSpanish : work.descriptionEnglish}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
}
