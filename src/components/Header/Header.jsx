'use client'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Menu from './Menu'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'
import { languages } from '@/config.json'

export default function header() {
  const pathname = usePathname()

  const [dictionary, setDictionary] = useState()

  const { primary, secondary } = languages
  const lang = pathname.startsWith(`/${secondary}`) ? secondary : primary

  useEffect(() => {getLang()}, [])

  const getLang = async () => {
    const res = await import(`@/app/dictionaries/${lang}/header.json`)
    setDictionary(JSON.parse(JSON.stringify(res)))
  }

  return (
    <header className='sticky top-0 left-0 right-0 z-50 flex gap-4 items-center justify-between w-full px-6 py-5 md:max-w-[1000px] md:w-[calc(100vw-100px)] mx-auto
    md:mt-7 md:px-5 md:top-2 md:py-3 rounded-b-xl md:rounded-full shadow-xl'>

      <Link href="/" className='outline-none hover:scale-110 duration-150'>
        <picture className='max-w-11 w-11 flex items-center justify-start'>
          <img src="/logo.png" alt="logo" className='h-5' />
        </picture>
      </Link>

      <SearchBar dictionary={dictionary} />

      <Menu dictionary={dictionary} lang={lang} />

      {/* Background */}
      <span className='absolute inset-0 w-full h-full bg-front-primary/80 -z-10 backdrop-blur-sm rounded-b-xl md:rounded-full' />
    </header>
  )
}
