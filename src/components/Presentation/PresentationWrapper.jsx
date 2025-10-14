'use client'

import { Suspense } from 'react'
import Presentation from './Presentation'

function PresentationFallback() {
  return (
    <div className="animate-pulse -ml-[calc((100vw-100%)/2)] -mt-[92px] md:-mt-[110px] lg:ml-0 lg:-mt-[110px]">
      <section className="relative lg:container mx-auto flex flex-col lg:gap-5 lg:flex-row presentation-section">
        <div className='flex-grow h-full w-full lg:order-2 bg-gray-200'>
          <div className='w-full h-[400px] bg-gray-300'></div>
        </div>
        <div className='absolute lg:relative bottom-0 left-0 right-0 flex flex-col gap-10 items-center justify-center mb-5 lg:order-1 w-full'>
          <div>
            <div className='h-24 bg-gray-200 rounded w-64 mb-4'></div>
            <div className='h-6 bg-gray-200 rounded w-32'></div>
          </div>
          <div className='h-10 bg-gray-200 rounded w-32'></div>
        </div>
      </section>
    </div>
  )
}

export default function PresentationWrapper({ job, lang }) {
  return (
    <Suspense fallback={<PresentationFallback />}>
      <Presentation job={job} lang={lang} />
    </Suspense>
  )
}