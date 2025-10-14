'use client'
import useScrollToId from "@/hooks/useScrollToId"

export default function ContactMeBTN({lang}) {

  const { scrollToId } = useScrollToId()

  return (
    <button onClick={() => scrollToId('contact-me')} className='bg-front-primary text-front-gray px-4 py-2 rounded-full w-[calc(100%-40px)] lg:max-w-[300px] font-niconne text-2xl flex items-center justify-center h-10 shadow-md hover:shadow-xl duration-200 hover:scale-105'>
      {
        lang === 'es'? 'Contactame' : 'Contact me'
      }
    </button>
  )
}
