'use client'
import { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import Menu from './Menu'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { languages } from '@/config.json'
import scrollToId from '@/utils/scrollToId'

import { useSearchParams } from 'next/navigation'

export default function header() {
  const pathname = usePathname()
  const params = useSearchParams()
  const section = params.get('section')

  const [dictionary, setDictionary] = useState()

  const { primary, secondary } = languages
  const lang = pathname.startsWith(`/${secondary}`) ? secondary : primary

  useEffect(() => {
    getLang()

    // Scroll to section
    if (section) {
      setTimeout(() => {
        scrollToId(section)
      }, 500)
    }
  }, [])

  const getLang = async () => {
    const res = await import(`@/app/dictionaries/${lang}/header.json`)
    setDictionary(JSON.parse(JSON.stringify(res)))
  }

  return (
    <header className='sticky top-0 left-0 right-0 z-50 flex gap-4 items-center justify-between w-full px-6 py-5 md:max-w-[1000px] md:w-[calc(100vw-100px)] mx-auto bg-front-primary/80
    md:mt-7 md:px-5 md:top-2 rounded-b-xl md:rounded-full md:py-3 backdrop-blur-sm shadow-xl'>

      <Link href="/" className='outline-none'>
        <picture className='max-w-11 w-11 flex items-center justify-start'>
          <img src="/logo.png" alt="logo" className='h-5' />
        </picture>
      </Link>

      <SearchBar dictionary={dictionary} />

      <Menu dictionary={dictionary} lang={lang} />
    </header>
  )
}
