'use client'
import './PaintStack.css'
import useLanguageInURL from '@/hooks/useLanguageInURL'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards, Autoplay } from 'swiper/modules';
import Link from 'next/link';

export default function PaintStack({paints}) {

  const { addLangToURL } = useLanguageInURL()

  return (
    <Swiper
      effect={'cards'}
      grabCursor={true}
      modules={[EffectCards, Autoplay]}
      className="mySwiper"
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      id='top-paints'
    >
      {
        paints.map(paint => (
          <SwiperSlide key={paint._id} className='shadow-xl'>
            <Link href={addLangToURL(`/paint/${paint._id}`)} className='relative w-full h-full group'>
              <img
                className='h-full w-full object-cover group-hover:scale-110 duration-500 transition-scale'
                src={paint.images[0].url}
                alt={paint.titleSpanish}
              />
              <span className='absolute bottom-0 right-0 inline-block w-full h-full z-20 bg-[radial-gradient(circle_80px_at_95%_100%,#00000090,transparent)]' />
              <span className='absolute bottom-2 right-5 text-front-gray z-30 font-poppins text-base'>{paint.year}</span>
            </Link>
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}
