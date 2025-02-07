'use client'
import './presentation.css'

import scrollToId from '@/utils/scrollToId'

export default function Presentation({job, btn}) {

  return (
    <div className='-ml-[calc((100vw-100%)/2)] -mt-[92px] md:-mt-[110px] lg:ml-0 lg:-mt-[110px]'>

      <section className="relative lg:container mx-auto flex flex-col lg:gap-5 lg:flex-row presentation-section">
        <picture className='flex-grow h-full w-full lg:order-2 drop-shadow-md'>
          <img
            className='w-full h-full object-cover mobile-image-presentation'
            src="/presentationImages/Romi.jpeg"
            alt=""
          />
        </picture>

        <div className='absolute lg:relative bottom-0 left-0 right-0 flex flex-col gap-10 items-center justify-center mb-5 lg:order-1 w-full'>
          <div>
            <h1 className='font-niconne text-8xl text-front-background lg:text-front-secondary flex flex-col'>
              <span>Romina</span>
              <span className='ml-11 -mt-3'>Peruchin</span>
            </h1>

            <h2 className='font-Poppins text-lg text-front-gray lg:text-front-primary ml-11 -mt-4'>
              {job}
            </h2>
          </div>

          <button onClick={() => scrollToId('contact-me')} className='bg-front-primary text-front-gray px-4 py-2 rounded-full w-[calc(100%-40px)] lg:max-w-[300px] font-niconne text-2xl flex items-center justify-center h-10'>
            {btn}
          </button>
        </div>
      </section>

    </div>
  )
}
