import React from 'react'

export default function TitleSection({children}) {
  return (
    <h2 className='relative flex items-center justify-center gap-3 font-niconne text-5xl text-front-secondary text-center before:content-[""] before:inline-block before:w-5 before:h-[1px] before:bg-front-secondary before:mt-4 after:content-[""] after:inline-block after:w-5 after:h-[1px] after:bg-front-secondary after:mt-4'>
      {children}
    </h2>
  )
}
