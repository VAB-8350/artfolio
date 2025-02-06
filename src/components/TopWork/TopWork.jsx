'use client'
import { useEffect, useState } from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

import './TopWork.css';

// import required modules
import { Navigation } from 'swiper/modules';
import Link from 'next/link';

export default function TopWork({works, lang}) {

  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    getSize()
    window.addEventListener('resize', getSize)

    return () => {
      window.removeEventListener('resize', getSize)
    }

  }, [])

  const getSize = () => setIsMobile(window.innerWidth <= 768)

  return (
    <Swiper
      slidesPerView={isMobile ? 'auto' : 3}
      centeredSlides={isMobile}
      spaceBetween={20}
      modules={isMobile ? [] : [Navigation]}
      id='top-works'
    >
      {
        works.topWorks.map(work => (
          <SwiperSlide key={work._id}>
            <Link href='#'>
              <div className='relative shadow-lg rounded-[10px] overflow-hidden'>
                <img src={work.images[0].url} alt={lang === 'es' ? work.titleSpanish : work.titleEnglish} />

                <span className='absolute bottom-0 right-0 inline-block w-full h-full z-20 bg-[radial-gradient(circle_80px_at_95%_100%,#00000090,transparent)]' />
                <span className='absolute bottom-2 right-5 text-front-gray z-30 font-poppins text-base'>{work.year}</span>
              </div>

              <div>
                <h3 className='font-poppins text-xl text-front-text mt-2 line-clamp-1 overflow-hidden text-ellipsis'>
                  { lang === 'es' ? work.titleSpanish : work.titleEnglish }
                </h3>
                <p className='font-poppins text-sm text-front-text font-extralight line-clamp-3 overflow-hidden text-ellipsis'>
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
