'use client'
import { useEffect, useState } from "react"
import { languages } from '@/config.json'
import { CircleX } from "lucide-react"

export default function OpenImage({children, paint, image, lang}) {

  const [openImage, setOpenImage] = useState(false)

  useEffect(() => {

    window.addEventListener('keydown', handleEscape)
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('keydown', handleEscape)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [openImage])

  // methods
  const handleClickOutside = (e) => {
    if (e.target.id === 'background-image' && openImage) {
      setOpenImage(false)
    }
  }

  const handleEscape = (e) => {
    if (e.key === 'Escape' && openImage) {
      setOpenImage(false)
    }
  }

  return (
    <>
      <button onClick={() => setOpenImage(!openImage)} className={`w-full h-full flex`}>
        {children}
      </button>

      <div
        id="background-image"
        className={`fixed inset-0 w-full h-full p-5 bg-black/30 ${openImage ? 'z-50 opacity-100 blur-0' : '-z-50 opacity-0 blur-3xl'} duration-300 flex justify-center items-center`}
      >
        <button onClick={() => setOpenImage(false)} className="absolute right-10 top-10 text-white hover:scale-110 duration-200">
          <CircleX size={40} />
        </button>

        <img
          src={image.url}
          alt={lang === languages.secondary ? paint.titleSpanish : paint.titleEnglish}
          className='max-w-full max-h-full object-contain rounded-xl'
        />
      </div>
    </>
  )
}
